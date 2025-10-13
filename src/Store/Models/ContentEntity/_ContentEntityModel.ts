import { AsyncEventObject } from '@Reptile/Framework';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import Article from './_Article';
import Boilerplate from './_Boilerplate';
import Image from './_Image';
import Issue from './_Issue';
import Publication from './_Publication';
import Publisher from './_Publisher';
import Section from './_Section';
import Template from './_Template';
import { DEFAULT_MASTER_STYLES, ENTITY_TYPES } from '@Reptile/Constants/Constants';

type IContentEntityModel = Reptile.Models.IContentEntityModel;

type ContentEntityStorePrivateFields = '_api' | '_domain' | '_synchronization';

type ContentEntityCreatorFunction = (
    api: Reptile.Service.IReptileApi,
    store: Reptile.Models.IDomain,
    data: Reptile.Service.ContentEntity
) => Reptile.Models.IContentEntity;

type ContentEntityStoreStatus = {
    articles: Reptile.Models.State;
    publishers: Reptile.Models.State;
    entities: Map<string, Reptile.Models.State>;
    publicationCreation: Reptile.Models.State;
    boilerplates: Reptile.Models.State;
};

const ContentEntityFactory = new Map<number, ContentEntityCreatorFunction>([
    [1, (...args) => new Publisher(...args)],
    [2, (...args) => new Publication(...args)],
    [3, (...args) => new Issue(...args)],
    [4, (...args) => new Section(...args)],
    [5, (...args) => new Article(...args)],
    [7, (...args) => new Image(...args)],
    [8, (...args) => new Template(...args)],
]);

const ProjectTypeEnumToNumber = new Map<string, number>([
    ['APP', 1],
    ['WEB', 2],
]);

export default class _ContentEntityStore implements IContentEntityModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject();

    private _publishers: string[];

    private _pageSize: number;

    private _articles?: Reptile.Service.ContentArticle[];

    entities: Map<string, Reptile.Models.IContentEntity>;

    publications: Publication[];

    publicationBoilerplates: {
        app: Reptile.Models.IBoilerplate[];
        web: Reptile.Models.IBoilerplate[];
    };

    status: ContentEntityStoreStatus;

    _contentLength: number;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        this._api = api;
        this._domain = domain;

        makeAutoObservable<
            _ContentEntityStore,
            ContentEntityStorePrivateFields
        >(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this.entities = new Map<string, Reptile.Models.IContentEntity>();
        this._publishers = [];
        this.publications = [];
        this.status = {
            entities: new Map<string, Reptile.Models.State>(),
            articles: {
                status: 'initial',
            },
            publicationCreation: {
                status: 'initial',
            },
            publishers: {
                status: 'initial',
            },
            boilerplates: {
                status: 'initial',
            },
        };
        this.publicationBoilerplates = {
            app: [],
            web: [],
        };
        this._contentLength = 0;
        this._pageSize = 32;
    }

    get publishers(): Reptile.Models.IPublisher[] {
        return this._publishers
            .map((id) => this.entities.get(id))
            .filter((entity) => !!entity) as Reptile.Models.IPublisher[];
    }

    get contentLength() {
        return this._contentLength;
    }

    get pageSize() {
        return this._pageSize;
    }

    get articles() {
        return this._articles;
    }

    fetch(): Promise<void>;
    fetch(id: string): Promise<void>;
    async fetch(
        id?: string,
        pageNumber?: number,
        pageSize?: number,
        sortBy?: string,
        orderBy?: string
    ): Promise<void> {
        if (id) {
            if (this.status.entities.get(id)?.status === 'pending') {
                await this._synchronization.wait(`entities.${id}`);
                return;
            }
            this.status.entities.set(id, { status: 'pending' });

            try {
                const entity = await this._api.contentEntity.getOne(id);
                this.set(entity);
                this.status.entities.set(id, { status: 'done' });
            } catch (error) {
                this.status.entities.set(id, {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                });
            } finally {
                this._synchronization.signal(`entities.${id}`);
            }
        } else {
            if (this.status.publishers.status === 'pending') {
                await this._synchronization.wait('publishers');
                return;
            }
            this.status.publishers.status = 'pending';

            try {
                const publishers = await this._api.contentEntity.getPublishers(
                    pageNumber ?? 1,
                    pageSize ?? this._pageSize
                );

                publishers.contentEntities.forEach((publisher) =>
                    this.set(publisher)
                );
                this._publishers = _.map(publishers.contentEntities, 'id');
                this._contentLength = publishers.totalCount;
                this.status.publishers.status = 'done';
            } catch (error) {
                this.status.publishers = {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                };
            } finally {
                this._synchronization.signal('publishers');
            }
        }
    }

    async getArticles(entity: Reptile.Service.ContentEntity) {
        const templatePresets = await this._api.template.getByPublication(
            entity.parentId,
            2
        );
        const activeHomeTemplate = templatePresets.find(
            (x) =>
                x.isActive === true &&
                x.contentEntityType === ENTITY_TYPES.Publication
        );
        const articlesData = await this._api.contentEntity.getContent(
            activeHomeTemplate ? activeHomeTemplate?.id : entity.id
        );
        const sortedArticles = articlesData?.map(item => ({
            ...item,
            articles: [...item.articles].sort((a, b) => {
              if (a.level === b.level) return a.order - b.order;
              return a.level - b.level;
            })
        }));
        this._articles = sortedArticles;
    }

    async fetchPublicationBoilerplates(): Promise<void> {
        if (this.status.boilerplates.status === 'pending') {
            await this._synchronization.wait('boilerplates');
            return;
        }
        this.status.boilerplates.status = 'pending';

        try {
            const boilerplates =
                await this._api.contentEntity.getBoilerplates();
            this.publicationBoilerplates = {
                app: boilerplates
                    .filter((boilerplate) => boilerplate.type === 'APP')
                    .map(
                        (boilerplate) =>
                            new Boilerplate(
                                this._api,
                                this._domain,
                                boilerplate
                            )
                    ),
                web: boilerplates
                    .filter((boilerplate) => boilerplate.type === 'WEB')
                    .map(
                        (boilerplate) =>
                            new Boilerplate(
                                this._api,
                                this._domain,
                                boilerplate
                            )
                    ),
            };
            this.status.boilerplates.status = 'done';
        } catch (error) {
            this.status.boilerplates = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('boilerplates');
        }
    }

    async createPublication(
        publisherId: string,
        name: string,
        projectKind: 'WEB' | 'APP',
        boilerplate?: Reptile.Models.IBoilerplate | undefined
    ): Promise<void> {
        if (this.status.publicationCreation.status === 'pending') {
            await this._synchronization.wait('publicationCreation');
            return;
        }
        this.status.publicationCreation.status = 'pending';

        try {
            let orgId;
            const org = await this._api.organization.getCurrentOrganization();

            orgId = org.find((e) => e.entityId === publisherId)?.id;

            if (!orgId && this._domain.user.superUser) {
                const org = await this._api.organization.getOrganization();
                orgId = org.organizations.find(
                    (e) => e.entityId === publisherId
                )?.id;
            }

            if (boilerplate && orgId) {
                const { id } = await this._api.contentEntity.clone(
                    {
                        name,
                        entityToCloneId: boilerplate.id,
                        parentId: publisherId,
                        projectType: ProjectTypeEnumToNumber.get(
                            projectKind
                        ) as number,
                    },
                    orgId
                );

                const fromThemes = await this._api.theme.getByPublication(
                    boilerplate.id
                );
                const toThemes = await this._api.theme.getByPublication(id);

                const srcTheme = fromThemes.find(({ isActive }) => isActive);
                const dstTheme = toThemes[0];

                if (srcTheme) {
                    const fromTheme = await this._api.theme.get(srcTheme.id);
                    const toTheme = await this._api.theme.get(dstTheme.id);
                    await this._api.theme.set({
                        ...toTheme,
                        name: `${toTheme.name} - ${name}`,
                        css: fromTheme.css,
                        isAdvanced: fromTheme.isAdvanced,
                        jsonStructure: fromTheme.jsonStructure,
                    });
                }
            } else {
                if (orgId) {
                    await this._api.contentEntity.set(
                        {
                            name,
                            contentEntityType: {
                                entityTypeId: 2,
                                entityTypeName: 'Publication',
                            },
                            parentId: publisherId,
                        },
                        orgId
                    );
                }
            }

            if (orgId) {
                await this._domain.subscription.getSubscription(orgId);
            }

            this.status.publicationCreation.status = 'done';

            // Refetch the publisher children (publications) on successful creation
            const publisher = this.entities.get(publisherId);
            if (publisher) {
                await publisher.fetchChildren(
                    publisher.id,
                    publisher.contentEntityType.entityTypeId,
                    1,
                    32
                );
            }
        } catch (error) {
            this.status.publicationCreation = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publicationCreation');
        }
    }

    async createIssue(entityId: string, name: string): Promise<void> {
        if (this.status.publicationCreation.status === 'pending') {
            await this._synchronization.wait('publicationCreation');
            return;
        }
        this.status.publicationCreation.status = 'pending';

        const entity = this.entities.get(entityId);
        if (!entity) {
            return;
        }
        let orgId;
        const org = await this._api.organization.getCurrentOrganization();

        orgId = org.find((e) => e.entityId === entity?.parent?.id)?.id;

        if (!orgId && this._domain.user.superUser) {
            const org = await this._api.organization.getOrganization();

            orgId = org.organizations.find(
                (e) => e.entityId === entity?.parent?.id
            )?.id;
        }

        try {
            if (orgId) {
                await this._api.contentEntity.set(
                    {
                        name,
                        contentEntityType: {
                            entityTypeId: 3,
                            entityTypeName: 'Issue',
                        },
                        parentId: entity.id,
                    },
                    orgId
                );
            }

            this.status.publicationCreation.status = 'done';

            // Refetch the publisher children (publications) on successful creation
            await entity.fetchChildren(
                entityId,
                entity.contentEntityType.entityTypeId,
                1,
                32
            );
        } catch (error) {
            this.status.publicationCreation = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publicationCreation');
        }
    }

    async createSection(
        entityId: string,
        publisherId: string,
        name: string
    ): Promise<void> {
        if (this.status.publicationCreation.status === 'pending') {
            await this._synchronization.wait('publicationCreation');
            return;
        }
        this.status.publicationCreation.status = 'pending';

        let orgId;
        const org = await this._api.organization.getCurrentOrganization();

        orgId = org.find((e) => e.entityId === publisherId)?.id;

        if (!orgId && this._domain.user.superUser) {
            const org = await this._api.organization.getOrganization();

            orgId = org.organizations.find(
                (e) => e.entityId === publisherId
            )?.id;
        }

        try {
            if (orgId) {
                await this._api.contentEntity.set(
                    {
                        name,
                        contentEntityType: {
                            entityTypeId: 4,
                            entityTypeName: 'Section',
                        },
                        parentId: entityId,
                    },
                    orgId
                );
            }

            this.status.publicationCreation.status = 'done';

            const entity = this.entities.get(entityId);
            // Refetch the publisher children (publications) on successful creation
            entity &&
                (await entity.fetchChildren(
                    entityId,
                    entity.contentEntityType.entityTypeId,
                    1,
                    32
                ));
        } catch (error) {
            this.status.publicationCreation = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publicationCreation');
        }
    }

    async createArticle(
        entityId: string,
        publisherId: string,
        name: string
    ): Promise<void> {
        if (this.status.publicationCreation.status === 'pending') {
            await this._synchronization.wait('publicationCreation');
            return;
        }
        this.status.publicationCreation.status = 'pending';

        let orgId;
        const org = await this._api.organization.getCurrentOrganization();

        orgId = org.find((e) => e.entityId === publisherId)?.id;

        if (!orgId && this._domain.user.superUser) {
            const org = await this._api.organization.getOrganization();

            orgId = org.organizations.find(
                (e) => e.entityId === publisherId
            )?.id;
        }

        try {
            if (orgId) {
                await this._api.contentEntity.set(
                    {
                        name,
                        contentEntityType: {
                            entityTypeId: 5,
                            entityTypeName: 'Article',
                        },
                        parentId: entityId,
                    },
                    orgId
                );
            }

            this.status.publicationCreation.status = 'done';

            const entity = this.entities.get(entityId);
            // Refetch the publisher children (publications) on successful creation
            entity &&
                (await entity.fetchChildren(
                    entityId,
                    entity.contentEntityType.entityTypeId,
                    1,
                    32
                ));
        } catch (error) {
            this.status.publicationCreation = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publicationCreation');
        }
    }

    async getPublications(): Promise<void> {
        const publications = await this._api.contentEntity.getPublications();
        publications.forEach((publication) => {
            this.publications.push(
                new Publication(this._api, this._domain, publication)
            );
        });
    }

    set(contentEntity: Reptile.Service.ContentEntity): void { 
        if (
            contentEntity.contentEntityType.entityTypeId ==
            ENTITY_TYPES.Template
        ) {
            contentEntity.attributes = {
                appJsonTemplate: contentEntity.attributes.appJsonTemplate,
                webJsonTemplate: '[]',
                masterStyle: contentEntity.attributes.masterStyle ?? JSON.stringify(DEFAULT_MASTER_STYLES),
            };
        }

        if (contentEntity.imageUrl && !contentEntity.imageUrl.startsWith('/')) {
            const datastoreIndex = contentEntity.imageUrl.indexOf('Datastore');
            contentEntity.imageUrl =
                contentEntity.imageUrl.substring(datastoreIndex);

            contentEntity.imageUrl = `/${contentEntity.imageUrl}`;
        }

        const entity = this.entities.get(contentEntity.id);

        if (
            contentEntity.attributes &&
            Object.keys(contentEntity.attributes).length === 0 &&
            entity &&
            entity.contentEntityType.entityTypeId ===
                contentEntity.contentEntityType.entityTypeId
        ) {
            return;
        }

        if (!entity) {
            const factory = ContentEntityFactory.get(
                contentEntity.contentEntityType.entityTypeId
            );
            if (factory) {
                this.entities.set(
                    contentEntity.id,
                    factory(this._api, this._domain, contentEntity)
                );
            }
        } else if (
            entity.contentEntityType.entityTypeId !== 8 &&
            entity.contentEntityType.entityTypeId ===
                contentEntity.contentEntityType.entityTypeId
        ) {
            entity.update(contentEntity);
        } else {
            const factory = ContentEntityFactory.get(
                contentEntity.contentEntityType.entityTypeId
            );
            if (factory) {
                this.entities.set(
                    contentEntity.id,
                    factory(this._api, this._domain, contentEntity)
                );
            } else {
                this.entities.delete(contentEntity.id);
            }
            entity.dispose();
        }

        // Update status of new entity to done
        this.status.entities.set(contentEntity.id, {
            status: 'done',
        });
    }

    remove(id: string) {
        const entity = this.entities.get(id);
        if (entity) {
            this.entities.delete(id);
            entity.dispose();
        }
    }

    dispose(): void {
        this.entities.forEach((entity) => entity.dispose());
        this.entities.clear();
    }
}
