import { makeAutoObservable } from 'mobx';

type IFileDropPropertyController =
    Reptile.Controllers.IFileDropPropertyController;

type StyleBackgroundImageControllerPrivateFields =
    | '_domain'
    | '_uiState'
    | '_styleProperties'
    | '_widgetId';

const UPLOAD_KIND = (widgetId: string) => `widget-background-image-${widgetId}`;

export default class StyleBackgroundImageController
    implements IFileDropPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    private _widgetId: string;

    private _type?: string;

    error?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
        widgetId: string,
        type?: string
    ) {
        makeAutoObservable<
            StyleBackgroundImageController,
            StyleBackgroundImageControllerPrivateFields
        >(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            _widgetId: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
        this._widgetId = widgetId;
        this._type = type;
    }

    get label(): string {
        if (this._type === 'splashicon') {
            return 'Splash image';
        }

        if (this._type === 'loadie') {
            return 'Loadie image';
        }

        return 'Background image';
    }

    get fileUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        return this._domain.asset.activeUploads.find(
            ({ entityId, kind }) =>
                entityId === this._uiState.navigation.templateId &&
                kind === UPLOAD_KIND(this._widgetId)
        );
    }

    get value(): string {
        return this._styleProperties.backgroundImage ?? '';
    }

    set value(v: string) {
        const trimmedValue = v.trim();
        // Regular expression to check for a basic URL format.
        // This will match 'http://', 'https://', '//', or data URLs.
        const urlRegex = /^(http|https):\/\/|\/\/|data:image\/(png|jpeg|gif|svg\+xml);base64,/;
        if (urlRegex.test(trimmedValue)) {
            // If the value is a valid URL, format it for CSS.
            this._styleProperties.backgroundImage = `url("${trimmedValue}")`;
        } else {
            this._styleProperties.backgroundImage = v;
        }
    }

    async uploadFile(file: File): Promise<void> {
        if (this.fileUploadInfo) {
            return;
        }

        if (this._uiState.navigation.templateId) {
            try {
                const newImage = await this._domain.asset.uploadGraphic(
                    this._uiState.navigation.templateId,
                    file,
                    UPLOAD_KIND(this._widgetId)
                );

                this._styleProperties.backgroundImage = `url("${newImage}")`;
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
