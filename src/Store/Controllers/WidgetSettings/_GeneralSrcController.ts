import { makeAutoObservable } from 'mobx';

type IFileDropPropertyController = Reptile.Controllers.IFileDropPropertyController;

type GeneralSrcControllerPrivateFields = '_domain' | '_uiState' | '_generalProperties' | '_widgetId';

const UPLOAD_KIND = (widgetId: string) => `widget-src-${widgetId}`;

export default class GeneralSrcController implements IFileDropPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    private _widgetId: string;

    error?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties,
        widgetId: string,
    ) {
        makeAutoObservable<GeneralSrcController, GeneralSrcControllerPrivateFields>(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            _widgetId: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._generalProperties = generalProperties;
        this._widgetId = widgetId;
    }

    get label(): string {
        return 'Image';
    }

    get fileUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        return this._domain.asset.activeUploads.find(({
            entityId,
            kind,
        }) => entityId === this._uiState.navigation.templateId && kind === UPLOAD_KIND(this._widgetId));
    }

    get imageUrl(): string {
        return this._generalProperties.src ?? '';
    }

    set imageUrl(v: string) {
        this._generalProperties.src = v;
    }

    async uploadFile(file: File): Promise<void> {
        if (this.fileUploadInfo) {
            return;
        }

        if (this._uiState.navigation.templateId) {
            try {
                this._generalProperties.src = await this._domain.asset.uploadGraphic(
                    this._uiState.navigation.templateId,
                    file,
                    UPLOAD_KIND(this._widgetId),
                );
            } catch (error) {
                this.error = (error as Reptile.Service.Error).data;
            }
        }
    }

    async initialize(): Promise<void> {
        await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
