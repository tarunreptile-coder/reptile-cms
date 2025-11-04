import { makeAutoObservable } from 'mobx';

type IFontStylePropertyController = Reptile.Controllers.IFontStylePropertyController;

export default class StyleFontStyleController implements IFontStylePropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    measures: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleFontStyleController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            measures: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
        this.measures = ['px', '%', 'em', 'pt'];
    }

    get label(): string {
        return 'Font style';
    }

    get bold(): boolean {
        return this._styleProperties.fontWeight === 'bold';
    }

    set bold(v: boolean) {
        this._styleProperties.fontWeight = v ? 'bold' : 'unset';
    }

    get italic(): boolean {
        return this._styleProperties.fontStyle === 'italic';
    }

    set italic(v: boolean) {
        this._styleProperties.fontStyle = v ? 'italic' : 'unset';
    }

    get underline(): boolean {
        return this._styleProperties.textDecoration === 'underline';
    }

    set underline(v: boolean) {
        this._styleProperties.textDecoration = v ? 'underline' : 'unset';
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
