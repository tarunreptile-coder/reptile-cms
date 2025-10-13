import { makeAutoObservable } from 'mobx';

type ICheckboxPropertyController =
    Reptile.Controllers.ICheckboxPropertyController;

export default class StyleDisplayController
    implements ICheckboxPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    private _isActive: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties
    ) {
        makeAutoObservable<
            StyleDisplayController,
            '_domain' | '_uiState' | '_generalProperties'
        >(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
        this._isActive = false;
    }

    get label(): string {
        return 'Active';
    }

    get active() {
        return this._isActive;
    }

    set active(v) {
        this._isActive = v;
        if (v) {
            this._styleProperties.display = 'block';
        } else {
            this._styleProperties.display = 'none';
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
