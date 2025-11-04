import { makeAutoObservable } from 'mobx';

type IAlignmentPropertyController = Reptile.Controllers.IAlignmentPropertyController;

export default class StyleMenuAlignController implements IAlignmentPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleMenuAlignController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
    }

    get alignment():  'row' | 'row-reverse' {
        return this._styleProperties.flexDirection as 'row' | 'row-reverse';
    }

    set alignment(v:  'row' | 'row-reverse') {
        this._styleProperties.flexDirection = v;
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
