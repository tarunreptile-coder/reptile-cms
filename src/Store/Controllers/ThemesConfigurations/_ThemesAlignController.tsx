import { makeAutoObservable } from 'mobx';

type IThemesAlignController = Reptile.Controllers.IThemesAlignController;

export default class ThemesAlignController implements IThemesAlignController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _value: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesAlignController,
            '_domain' | '_uiState' | '_selectedRule'
        >(this, {
            _domain: false,
            _uiState: false,
            _selectedRule: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._selectedRule = selectedRule;
        this._property = 'text-align';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get alignment(): 'left' | 'center' | 'right' {
        return this._value as 'left' | 'center' | 'right';
    }

    set alignment(v: 'left' | 'center' | 'right') {
        if (!this.theme) {
            return;
        }

        if (this._selectedRule) {
            this.theme.update(this._selectedRule, this._property, v);
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
