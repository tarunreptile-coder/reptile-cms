import { makeAutoObservable } from 'mobx';

type IAlignmentPropertyController = Reptile.Controllers.IAlignmentPropertyController;

export default class StyleTextAlignController implements IAlignmentPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleTextAlignController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
    }

    get alignment(): 'left' | 'center' | 'right' {
        return this._styleProperties.textAlign as 'left' | 'center' | 'right';
    }

    set alignment(v: 'left' | 'center' | 'right') {
        this._styleProperties.textAlign = v;
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
