import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type ILinkedContentController = Reptile.Controllers.ILinkedContentController;

type WidgetLinkedContentControllerPrivateFields = '_domain' | '_uiState';

export default class _WidgetLinkedContentController
    implements ILinkedContentController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _widget?: Reptile.Models.IWidget;

    private _articlesStatus: Reptile.Models.State;

    private _articles: string[];

    private _prevWidgetProperties?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<
            _WidgetLinkedContentController,
            WidgetLinkedContentControllerPrivateFields
        >(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._articles = [];
        this._articlesStatus = {
            status: 'initial',
        };
    }

    private get linkedContent(): Reptile.Models.IContentEntity | undefined {
        const entityId = this._widget?.properties.linkedTo;
        if (entityId) {
            return this._domain.content.entities.get(entityId);
        }
        return undefined;
    }

    get loading(): boolean {
        const entityId = this._widget?.properties.linkedTo;
        if (entityId) {
            const entityStatus =
                this._domain.content.status.entities.get(entityId);
            if (
                !entityStatus ||
                !['done', 'error'].includes(entityStatus.status)
            ) {
                return true;
            }

            if (
                ['done', 'error'].includes(
                    this.linkedContent?.state.children.status ?? ''
                ) ||
                ['done', 'error'].includes(this._articlesStatus.status)
            ) {
                return false;
            }

            return true;
        }

        return false;
    }

    get error(): string | undefined {
        const entityId = this._widget?.properties.linkedTo;
        if (entityId) {
            return (
                this._domain.content.status.entities.get(entityId)?.error ||
                this.linkedContent?.state.children.error ||
                this._articlesStatus.error
            );
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this._widget?.properties.linkedTo,
            this._widget?.properties.skipArticles,
            this._widget?.properties.visibleItems,
            this._widget?.properties.ignoreSections,
        ];
    }

    get prevWidgetProperties() {
        return this._prevWidgetProperties;
    }

    set prevWidgetProperties(v) {
        this._prevWidgetProperties = v;
    }

    get items(): Array<Reptile.Controllers.LinkedContentItem | null> {
        const WidgetProperties = JSON.stringify(this._widget?.properties);

        if (!this._widget?.properties.linkedTo || this.loading) {
            return Array.from(
                { length: this._widget?.properties.visibleItems ?? 9 },
                () => null
            );
        }

        const initArticles = this._domain.content.articles
            ?.find((e) => e.id === this._widget?.id)
            ?.articles.map((entity) => {
                return {
                    name: entity.name,
                    caption: entity.attributes.summary ?? undefined,
                    publishDate:
                        new Date(entity.attributes.publishDate) ?? undefined,
                    image: entity.imageUrl ?? undefined,
                };
            });

        const newArticles = this._articles
            .filter((id) => this._domain.content.entities.has(id))
            .map((id) => {
                const entity = this._domain.content.entities.get(
                    id
                ) as Reptile.Models.IArticle;

                return {
                    name: entity.name,
                    caption: entity.summary ?? undefined,
                    publishDate: entity.publishDate ?? undefined,
                    image: entity.imageUrl ?? undefined,
                };
            });

        if (
            ( initArticles === newArticles && initArticles) ||
            (WidgetProperties === this._prevWidgetProperties && initArticles)
        ) {
            return initArticles.map((article) => {
                if (article.image && !article.image.startsWith('/')) {
                    const datastoreIndex = article.image.indexOf('Datastore');
                    article.image = article.image.substring(datastoreIndex);

                    article.image = `/${article.image}`;
                }

                return {
                    name: article.name,
                    caption: article.caption ?? undefined,
                    publishDate: new Date(article.publishDate ?? ''),
                    image: article.image ?? undefined,
                } as Reptile.Controllers.LinkedContentItem;
            });
        }

        if (
            initArticles !== newArticles ||
            WidgetProperties !== this._prevWidgetProperties
        ) {
            return newArticles;
        }

        return [];
    }

    async initialize(widget: Reptile.Models.IWidget): Promise<void> {
        this._widget = widget;
        const entityId = this._widget.properties.linkedTo;
        if (entityId) {
            if (!this._domain.content.entities.has(entityId)) {
                await this._domain.content.fetch(entityId);
            }

            if (
                this.linkedContent?.contentEntityType.entityTypeId ==
                    ENTITY_TYPES.Issue &&
                this._widget.properties.ignoreSections
            ) {
                try {
                    this._articlesStatus = {
                        status: 'pending',
                    };
                    this._articles = await (
                        this.linkedContent as Reptile.Models.IIssue
                    ).fetchArticles(
                        this._widget.properties.skipArticles ?? 0,
                        this._widget.properties.visibleItems ?? 1
                    );
                    this._articlesStatus = {
                        status: 'done',
                    };
                } catch (error) {
                    this._articlesStatus = {
                        status: 'error',
                        error: (error as Reptile.Service.Error).data,
                    };
                }
            } else {
                if (this.linkedContent?.state.children.status !== 'done') {
                    await this.linkedContent?.fetchChildren(
                        this.linkedContent.id,
                        this.linkedContent.contentEntityType.entityTypeId
                    );
                }

                // Check if it is a section carousel which displays sections instead of articles
                const entityType =
                    this._widget.allowedLinkedContentTypes?.length === 1 &&
                    this._widget.allowedLinkedContentTypes[0] ===
                        ENTITY_TYPES.Issue
                        ? ENTITY_TYPES.Section
                        : ENTITY_TYPES.Article;

                this._articles = _.map(
                    this.linkedContent?.children.filter(
                        ({ contentEntityType }) =>
                            contentEntityType.entityTypeId == entityType
                    ) ?? [],
                    'id'
                ).slice(
                    this._widget.properties.skipArticles ?? 0,
                    (this._widget.properties.skipArticles ?? 0) +
                        (this._widget.properties.visibleItems ?? 9)
                );
            }
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
