import { makeAutoObservable } from 'mobx';

type IThemesDisplayController = Reptile.Controllers.IThemesDisplayController;

export default class ThemesDisplayController
    implements IThemesDisplayController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _value: string;

    private _displays: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesDisplayController,
            '_domain' | '_uiState' | '_selectedRule'
        >(this, {
            _domain: false,
            _uiState: false,
            _selectedRule: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._selectedRule = selectedRule;
        this._displays = ['inline', 'inline-block', 'block'];
        this._property = 'display';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get displays() {
        return this._displays;
    }

    get label(): string {
        return 'Display';
    }

    get displayIndex(): number {        
        return this.displays.findIndex((e) => e === this._value);
    }

    set displayIndex(v: number) {
        if (v < this.displays.length) {
            this.theme?.update(
                this._selectedRule,
                this._property,
                this.displays[v]
            );
        }
    }

    get display(): string {
        return this.displayIndex !== -1 ? this.displays[this.displayIndex] : '';
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
