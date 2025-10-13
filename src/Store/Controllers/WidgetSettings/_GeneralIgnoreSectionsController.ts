import { makeAutoObservable } from 'mobx';

type ICheckboxPropertyController = Reptile.Controllers.ICheckboxPropertyController;

export default class GeneralIgnoreSectionsController implements ICheckboxPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties,
    ) {
        makeAutoObservable<GeneralIgnoreSectionsController, '_domain' | '_uiState' | '_generalProperties'>(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._generalProperties = generalProperties;
    }

    get label(): string {
        return 'Ignore sections'
    }

    get active(): boolean {
        return this._generalProperties.ignoreSections as boolean;
    }

    set active(v: boolean) {
        this._generalProperties.ignoreSections = v;
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
