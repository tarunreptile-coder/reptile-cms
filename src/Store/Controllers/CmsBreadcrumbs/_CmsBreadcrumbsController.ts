import { makeAutoObservable } from 'mobx';

type IBreadcrumbsController = Reptile.Controllers.IBreadcrumbsController;

export default class _CmsBreadcrumbsController implements IBreadcrumbsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _hasMore: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
    ) {
        makeAutoObservable<_CmsBreadcrumbsController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._hasMore = false;
    }

    private get entity(): Reptile.Models.IContentEntity | undefined {
        const entityId = this.currentContentId;
        if (entityId) {
            return this._domain.content.entities.get(entityId);
        }
        return undefined;
    }

    get currentContentId(): string | undefined {
        return this._uiState.navigation.articleId || this._uiState.navigation.templateId || this._uiState.navigation.entityId;
    }

    get loading(): boolean {
        const entityId = this.currentContentId;
        if (entityId) {
            const entityStatus = this._domain.content.status.entities.get(entityId);
            if (!['done', 'error'].includes(entityStatus?.status ?? '')) {
                return true
            }

            let entity: Reptile.Models.IContentEntity | undefined | null = this.entity;
            while (!!entity) {
                if (entity.state.parent.status === 'pending') {
                    return true
                }
                entity = entity.parent;
            }

            return false;
        }
        return true;
    }

    get error(): string | undefined {
        const entityId = this.currentContentId;
        if (entityId) {
            const entityStatus = this._domain.content.status.entities.get(entityId);
            if (entityStatus?.error) {
                return entityStatus?.error;
            }

            let entity: Reptile.Models.IContentEntity | undefined | null = this.entity;
            while (!!entity) {
                if (entity.state.parent.error) {
                    return entity.state.parent.error;
                }
                entity = entity.parent;
            }
        }

        return undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this.currentContentId,
        ];
    }

    get paths(): string[] {
        if (this.currentContentId) {
            const results: string[] = [];

            let entity: Reptile.Models.IContentEntity | undefined | null = this.entity;
            while (!!entity) {
                results.push(entity.name);
                entity = entity.parent;
            }

            if (this._hasMore) {
                results.push('...');
            }

            return results.reverse();
        }

        return [];
    }

    async initialize(): Promise<void> {
        const entityId = this.currentContentId;
        // Initialize up to three paths
        if (entityId) {
            this._hasMore = true;

            // First to fetch
            if (this._domain.content.status.entities.get(entityId)?.status !== 'done') {
                await this._domain.content.fetch(entityId);
            }

            // Second to fetch
            let entity: Reptile.Models.IContentEntity | undefined | null = this.entity;
            if (entity) {
                if (entity.state.parent.status !== 'done') {
                    await entity.fetchParent();
                } else if (entity.parent === null) {
                    this._hasMore = false;
                }
            }

            // Third to fetch
            entity = entity?.parent;
            if (entity) {
                if (entity.state.parent.status !== 'done') {
                    await entity.fetchParent();
                } else if (entity.parent === null) {
                    this._hasMore = false;
                }
            }

            while (!!entity) {
                entity = entity.parent;
            }

            this._hasMore = entity !== null;
        }
    }

    async navigateTo(idx: number): Promise<void> {
        if (idx === 0 && this._hasMore) {
            // Load more if clicked on '...'
            let entity: Reptile.Models.IContentEntity | undefined | null = this.entity;
            while (entity?.parent) {
                entity = entity.parent;
            }

            // First to fetch
            if (entity) {
                if (entity.state.parent.status !== 'done') {
                    await entity.fetchParent();
                } else if (entity.parent === null) {
                    this._hasMore = false;
                }
            }

            // Second to fetch
            entity = entity?.parent;
            if (entity) {
                if (entity.state.parent.status !== 'done') {
                    await entity.fetchParent();
                } else if (entity.parent === null) {
                    this._hasMore = false;
                }
            }

            // Third to fetch
            entity = entity?.parent;
            if (entity) {
                if (entity.state.parent.status !== 'done') {
                    await entity.fetchParent();
                } else if (entity.parent === null) {
                    this._hasMore = false;
                }
            }

            while (!!entity) {
                entity = entity.parent;
            }

            this._hasMore = entity !== null;
        } else {
            // Navigate to clicked entity
            const count = this.paths.length - idx - 1
            let entity = this.entity;
            for (let i = 0; i < count; ++i) {
                if (entity?.parent) {
                    entity = entity.parent;
                }
            }

            if (entity) {
                this._uiState.navigation.navigate(`/${entity.contentEntityType.entityTypeName.toLowerCase()}/${entity.id}`);
            }
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
