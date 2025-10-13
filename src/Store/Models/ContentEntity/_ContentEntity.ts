import {
    action,
    computed,
    IEqualsComparer,
    IReactionDisposer,
    makeObservable,
    observable,
    reaction,
} from 'mobx';
import _ from 'lodash';
import { AsyncEventObject, Semaphore } from '@Reptile/Framework';
import data from '~/../appSettings.json';
import { Notification } from '@Reptile/Components/Atoms';
import { ENTITY_TYPES, MESSAGES } from '@Reptile/Constants/Constants';
import { UTILS } from '~/Utils';

type IContentEntity = Reptile.Models.IContentEntity;

type ContentEntityPrivateFields =
    | '_childrenState'
    | '_saveState'
    | '_deleteState'
    | '_setCoverState'
    | '_data'
    | '_children'
    | '_contentLength';

const INVALID_PARENT_ID = '00000000-0000-0000-0000-000000000000';

const AUTOSAVE_DELAY = 30_000; // ms = 30 seconds

export default class ContentEntity<
    TAutoSaveProperties extends Record<string, unknown> = Record<
        string,
        unknown
    >
> implements IContentEntity
{
    private _childrenState: Reptile.Models.State;

    private _saveState: Reptile.Models.State;

    private _deleteState: Reptile.Models.State;

    private _setCoverState: Reptile.Models.State;

    protected readonly _synchronization = new AsyncEventObject();

    private readonly _saveSemaphore = new Semaphore();

    private _children: string[];

    private _autoSaveDisposer?: IReactionDisposer;

    protected readonly _api: Reptile.Service.IReptileApi;

    protected readonly _domain: Reptile.Models.IDomain;

    protected _data: Reptile.Service.ContentEntity;

    protected _orgId?: string;

    private _contentLength?: number;

    private _content: Reptile.Service.ContentEntityInfo | undefined;

    constructor(
        api: Reptile.Service.IReptileApi,
        store: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity,
        orgId?: string,
        /** Auto save callbacks for entities that want to allow autosaving. */
        autoSavePropertySelector?: () => TAutoSaveProperties,
        autoSaveEquality?: IEqualsComparer<TAutoSaveProperties>,
        autoSaveModifyObjectCb?: (
            newValue: TAutoSaveProperties
        ) => Reptile.Service.ContentEntity
    ) {
        makeObservable<ContentEntity, ContentEntityPrivateFields>(this, {
            _childrenState: observable,
            _deleteState: observable,
            _data: observable,
            _saveState: observable,
            _setCoverState: observable,
            _children: observable,
            _contentLength: observable,
            children: computed,
            contentEntityType: computed.struct,
            created: computed,
            delete: action.bound,
            fetchChildren: action.bound,
            hidden: computed,
            id: computed,
            imageUrl: computed,
            isDeleted: computed,
            name: computed,
            order: computed,
            parent: computed,
            save: action.bound,
            state: computed.struct,
            coverUploadProgress: computed,
            fetchParent: action.bound,
            updated: computed,
            setCover: action.bound,
            update: action.bound,
        });

        this._api = api;
        this._domain = store;
        this._data = data;
        this._orgId = orgId;
        this._childrenState = {
            status: 'initial',
        };
        this._deleteState = {
            status: 'initial',
        };
        this._saveState = {
            status: 'initial',
        };
        this._setCoverState = {
            status: 'initial',
        };
        this._children = [];

        if (autoSavePropertySelector && this._orgId) {
            this._autoSaveDisposer = reaction(
                autoSavePropertySelector,
                (newValue) => {
                    void this._saveSemaphore.acquire().then(() => {
                        const data = autoSaveModifyObjectCb
                            ? autoSaveModifyObjectCb(newValue)
                            : this._data;
                        this._orgId &&
                            this._api.contentEntity
                                .set(data, this._orgId)
                                .finally(() => {
                                    this._saveSemaphore.release();
                                });
                    });
                },
                {
                    delay: AUTOSAVE_DELAY,
                    equals: autoSaveEquality,
                }
            );
        }
    }

    get id(): string {
        return this._data.id;
    }

    get imageUrl(): string | null {
        const imageUrl = this._data.imageUrl;
        if (imageUrl) {
            return UTILS.loadImage(imageUrl);
        }

        return null;
    }

    get isDeleted(): boolean {
        return this._data.isDeleted;
    }

    get hidden(): boolean {
        return this._data.hidden;
    }

    get parent(): Reptile.Models.IContentEntity | undefined {
        return this._data.parentId === INVALID_PARENT_ID
            ? undefined
            : this._domain.content.entities.get(this._data.parentId);
    }

    get updated(): Date {
        return new Date(this._data.updated);
    }

    get created(): Date {
        return new Date(this._data.created);
    }

    get contentEntityType(): Reptile.Service.ContentEntityType {
        return this._data.contentEntityType;
    }

    get name(): string {
        return this._data.name;
    }

    set name(value: string) {
        if (this._data.name != value) {
            this._data.name = value;
        }
    }

    get order(): number {
        return this._data.order;
    }

    set order(value: number) {
        if (this._data.order != value) {
            this._data.order = value;
        }
    }

    get state(): Reptile.Models.ContentEntityState {
        return {
            children: this._childrenState,
            parent: this._domain.content.status.entities.get(
                this._data.parentId
            ) ?? {
                status:
                    this._data.parentId === INVALID_PARENT_ID
                        ? 'done'
                        : 'initial',
            },
            delete: this._deleteState,
            save: this._saveState,
            setCover: this._setCoverState,
        };
    }

    get coverUploadProgress(): Reptile.Models.IAssetUpload | undefined {
        return this._domain.asset.activeUploads.find(
            (progress) =>
                progress.entityId === this.id && progress.kind === 'entity'
        );
    }

    get children(): Reptile.Models.IContentEntity[] {
        return this._children
            .map((id) => this._domain.content.entities.get(id))
            .filter((entity) => !!entity) as Reptile.Models.IContentEntity[];
    }

    get contentLength() {
        return this._contentLength;
    }

    async setCover(file: File): Promise<void> {
        if (this._setCoverState.status === 'pending') {
            await this._synchronization.wait('setCover');
            return;
        }
        this._setCoverState.status = 'pending';

            return new Promise<void>((resolve, reject) => {
                try {
                    (() => {
                        void (async () => {
                            await this._domain.asset.upload(
                                this.id,
                                file,
                                'entity',
                                async (fileName: string, imageUri: string) => {
                                    // Perform any necessary tasks in onFinish
                                    await this._api.contentEntity.setCoverImage(
                                        this.id,
                                        fileName,
                                        false,
                                        imageUri
                                    );
                    
                                    this._data.imageUrl = imageUri;
                                    this._setCoverState.status = 'done';
                    
                                    Notification.success({
                                        description:
                                            MESSAGES.SUCCESS_SAVED_CHANGES.message,
                                    });
                    
                                    // Resolve the outer Promise after onFinish callback is complete
                                    resolve();
                                }
                            );
                        })()
                    })();
                } catch (error) {
                    this._setCoverState = {
                        status: 'error',
                        error: (error as Reptile.Service.Error).data,
                    };
                    Notification.error({
                        description: MESSAGES.ERROR_IMAGE_UPLOAD.message,
                    });
                    // Reject the outer Promise in case of an error
                    reject(error);
                }finally {
                    this._synchronization.signal('setCover');
                }
            });
    }

    async fetchChildren(
        id: string,
        contentId: number,
        pageNumber?: number,
        pageSize?: number
    ): Promise<void> {
        if (this._childrenState.status === 'pending') {
            await this._synchronization.wait('children');
            return;
        }
        this._childrenState.status = 'pending';

        try {
            if (contentId == ENTITY_TYPES.Publisher && pageNumber && pageSize) {
                this._content =
                    await this._api.contentEntity.getPublicationsByPublisherId(
                        id,
                        pageNumber,
                        pageSize
                    );
            }

            if (
                this._data.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Publication ||
                this._data.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Issue ||
                this._data.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Section
            ) {
                this._content =
                    await this._api.contentEntity.getContentByFolderId(
                        id,
                        pageNumber ?? 1,
                        pageSize ?? 32
                    );
            }

            if (
                this._data.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Template ||
                this._data.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Article
            ) {
                const entity = await this._api.contentEntity.getOne(id);
                this._domain.content.set(entity);
                await this._domain.content.getArticles(entity);
                this._childrenState.status = 'done';
            }

            this._childrenState.status = 'done';

            if (this._content) {
                this._content.contentEntities.forEach((child) => {
                    this._domain.content.set(child);
                });

                this._children = _.map(this._content.contentEntities, 'id');
                this._contentLength = this._content.totalCount;

                this._childrenState.status = 'done';
            }
        } catch (error) {
            this._childrenState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('children');
        }
    }

    async fetchParent(): Promise<void> {
        if (this._data.parentId !== INVALID_PARENT_ID) {
            await this._domain.content.fetch(this._data.parentId);
        }
    }

    async delete(): Promise<void> {
        if (this._deleteState.status === 'pending') {
            await this._synchronization.wait('delete');
            return;
        }
        this._deleteState.status = 'pending';

        try {
            await this._api.contentEntity.delete(this.id);
            this._domain.content.remove(this.id);

            const org = await this._api.organization.getCurrentOrganization();

            const orgId = org.find((e) => e.entityId === this.parent?.id)?.id;

            if (orgId) {
                await this._domain.subscription.getSubscription(orgId);
            }

            this._deleteState.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_ORGANIZATION_DELETE.message,
            });
        } catch (error) {
            this._deleteState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_ORGANIZATION_DELETE.message,
            });
        } finally {
            this._synchronization.signal('delete');
        }
    }

    async save(): Promise<void> {
        await this._saveSemaphore.acquire();
        await this._domain.content.fetch(undefined, 1, 1000);

        this._saveState.status = 'pending';

        let entity = this._domain.content.entities.get(this._data.id);

        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Publisher
        ) {
            entity = entity.parent;
        }

        try {
            const getCurrentOrgId = async () => {
                const org =
                    await this._api.organization.getCurrentOrganization();
                return org.find((e) => e.entityId === entity?.id)?.id;
            };

            this._orgId = await getCurrentOrgId();

            if (!this._orgId && this._domain.user.superUser) {
                const getOrgId = async () => {
                    const org = await this._api.organization.getOrganization();
                    return org.organizations.find(
                        (e) => e.entityId === entity?.id
                    )?.id;
                };
                this._orgId = await getOrgId();
            }

            if (this._orgId) {
                let imageURL = this._data.imageUrl
                if (imageURL?.startsWith('/http://') || imageURL?.startsWith('/https://')) {
                    imageURL = imageURL.slice(1); // remove the first slash
                }
                const dataToUpdate = {
                    ...this._data,
                    imageUrl: imageURL,
                }
                await this._api.contentEntity.set(dataToUpdate, this._orgId);
            }
            this._saveState.status = 'done';
        } catch (error) {
            this._saveState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._saveSemaphore.release();
        }
    }

    async saveTemplate(): Promise<void> {
        await this._saveSemaphore.acquire();
        const publication = await this._api.contentEntity.getOne(
            this._data.parentId
        );

        const templatePresets = await this._api.template.getByPublication(
            publication.id,
            2
        );

        if (templatePresets.length === 0 || !templatePresets) {
            return Promise.resolve();
        }

        const template = templatePresets.filter(
            (e) => e.contentEntityType === 2
        )[0];

        this._saveState.status = 'pending';

        template.presetJsonTemplate = this._data.attributes
            .appJsonTemplate as string;

        template.draftJsonTemplate = this._data.attributes
            .appJsonTemplate as string;

        template.streamTypeId = 2;

        template.contentEntityType = 2;

        try {
            await this._api.template.set(template);
            this._saveState.status = 'done';
        } catch (error) {
            this._saveState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._saveSemaphore.release();
        }
    }

    update(data: Reptile.Service.ContentEntity): void {
        this._data = data;
    }

    async refresh(): Promise<void> {
        await this._domain.content.fetch(this.id);
    }

    dispose(): void {
        if (this._autoSaveDisposer) {
            this._autoSaveDisposer();
            this._autoSaveDisposer = undefined;
        }
    }
}
