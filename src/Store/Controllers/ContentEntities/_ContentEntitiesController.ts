import { makeAutoObservable } from 'mobx';
import ConfigureEntityController from './_ConfigureEntityController';
import ModalStylesController from './_ModalStylesController';

type IContentEntitiesController =
    Reptile.Controllers.IContentEntitiesController;

export default class _ContentEntitiesController
    implements IContentEntitiesController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _entityToDelete?: string;

    private _entityToConfigure?: string;

    private _pageNumber: number;

    private _sortBy?: string;

    private orderBy?: string;

    private _isDisabled: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ContentEntitiesController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._pageNumber = 1;
        this._isDisabled = true;
    }

    private get currentEntity(): Reptile.Models.IContentEntity | undefined {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            return this._domain.content.entities.get(entityId);
        }
        return undefined;
    }

    get loading(): boolean {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            const entityStatus =
                this._domain.content.status.entities.get(entityId);
            if (!entityStatus || entityStatus.status === 'pending') {
                return true;
            }

            return !['done', 'error'].includes(
                this.currentEntity?.state.children.status ?? ''
            );
        }
        return !['done', 'error'].includes(
            this._domain.content.status.publishers.status
        );
    }

    get error(): string | undefined {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            return (
                this._domain.content.status.entities.get(entityId)?.error ||
                this.currentEntity?.state.children.error
            );
        }
        return this._domain.content.status.publishers.error;
    }

    get deps(): readonly unknown[] {
        return [this.currentContentId];
    }

    get currentContentId(): string | undefined {
        return this._uiState.navigation.entityId;
    }

    get entities(): Reptile.Models.IContentEntity[] {
        const entityId = this._uiState.navigation.entityId;
        return entityId
            ? this.currentEntity?.children ?? []
            : this._domain.content.publishers;
    }

    get entityToDelete(): Reptile.Models.IContentEntity | undefined {
        return this._entityToDelete
            ? this._domain.content.entities.get(this._entityToDelete)
            : undefined;
    }

    get entityToConfigure(): Reptile.Models.IContentEntity | undefined {
        const contentEntity =
            this._entityToConfigure &&
            this._domain.content.entities.get(this._entityToConfigure);
        return contentEntity
            ? new ConfigureEntityController(contentEntity)
            : undefined;
    }

    get pageNumber() {
        return this._pageNumber;
    }

    set pageNumber(v) {
        this._pageNumber = v;
    }

    get pageSize() {
        return this._domain.content.pageSize;
    }

    get contentLength() {
        if (this.currentEntity?.contentLength !== undefined) {
            return this.currentEntity.contentLength;
        }

        if (this._domain.content?.contentLength !== undefined) {
            return this._domain.content.contentLength;
        }

        return;
    }

    get totalPages() {
        const loading =
            this._uiState.navigation.entityId &&
            this._domain.content.entities.get(this._uiState.navigation.entityId)
                ?.state.children.status;

        if (loading === 'pending') {
            return 0;
        }

        if (this.contentLength) {
            return Math.ceil(this.contentLength / this.pageSize);
        }

        return 0;
    }

    get isDisabled() {
        return this._isDisabled;
    }

    set isDisabled(v) {
        this._isDisabled = v;
    }

    get editTheme() {
        const contentEntity =
            this._entityToConfigure &&
            this._domain.content.entities.get(this._entityToConfigure);

        return contentEntity
            ? new ModalStylesController(
                  this._domain,
                  this._uiState,
                  contentEntity
              )
            : undefined;
    }

    async initialize(): Promise<void> {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            if (!this._domain.content.entities.has(entityId)) {
                await this._domain.content.fetch(entityId, this._pageNumber);
            }
            const entity = this.currentEntity;
            if (entity) {
                this._pageNumber = 1;
                await entity.fetchChildren(
                    entity.id,
                    entity.contentEntityType.entityTypeId,
                    this._pageNumber,
                    this._domain.content.pageSize
                );
            }
        } else {
            if (this._domain.content.status.publishers.status !== 'done') {
                await this._domain.content.fetch(undefined, this._pageNumber);
            }
        }
    }

    async swapFlatPlan(
        flatPlanId: string | null,
        entityId: string,
        newPosition: number,
        oldPosition: number
    ) {
        await this._domain.flatPlan.swapFlatPlanOrderInSameParent(
            flatPlanId,
            entityId,
            newPosition,
            oldPosition
        );
    }

    async fetchContent() {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            if (!this._domain.content.entities.has(entityId)) {
                await this._domain.content.fetch(entityId, this._pageNumber);
            }
            const entity = this.currentEntity;

            if (entity) {
                await entity.fetchChildren(
                    entity.id,
                    entity.contentEntityType.entityTypeId,
                    this._pageNumber,
                    this._domain.content.pageSize
                );
            }
        } else {
            await this._domain.content.fetch(undefined, this._pageNumber);
        }
    }

    get fonts(): Reptile.Models.Font[] | undefined {
        const entityId = this._entityToConfigure;
        if (entityId) {
            return this._domain.font.fonts.get(this.entityToConfigure?.id);
        }
    }

    async fetchFonts(id: string): Promise<void> {
        if (id) {
            await this._domain.font.fetch(id);
        }
    }

    async saveFont(fontData: Reptile.Service.Font): Promise<void> {
        if (fontData) {
            if(fontData) {
                const fileData = {
                    file: fontData.fontFile,
                    publisherId: this.entityToConfigure?.id,
                    publisherName: this.entityToConfigure?.name,
                    onFinish: async (fileName: string, imageUri: string) => {
                        const updatedFont = { ...fontData, path: imageUri };
                        const { fontFile, ...fontToSend } = updatedFont;
                        if(fontToSend.name && fontToSend.path) {
                            await this._domain.font.saveFont(fontToSend);
                            await this.fetchFonts(this.entityToConfigure?.id);
                        }
                    }
                }
                await this._domain.font.uploadFile(fileData);
            }
        }
    }
    
    async deleteFont(id: string): Promise<void> {
        if (id) {
            await this._domain.font.delete(id);
            await this.fetchFonts(this.entityToConfigure?.id);
        }
    }

    async moreContent() {
        this._pageNumber = this._pageNumber + 1;

        await this.fetchContent();
    }

    async lessContent() {
        this._pageNumber = this._pageNumber - 1;

        await this.fetchContent();
    }

    async pageContent() {
        this._pageNumber = this._pageNumber;

        await this.fetchContent();
    }

    selectEntity(id: string): void {
        const entity = this._domain.content.entities.get(id);
        if (entity) {
            this._uiState.navigation.navigate(
                `/${entity.contentEntityType.entityTypeName.toLowerCase()}/${id}`
            );
        }
    }

    deleteEntity(id?: string): void {
        this._entityToDelete = id;
    }

    configureEntity(id?: string): void {
        this._entityToConfigure = id;
    }

    dispose(): void {
        /* Do nothing */
    }
}
