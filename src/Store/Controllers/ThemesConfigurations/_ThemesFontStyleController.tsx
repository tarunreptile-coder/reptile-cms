import { makeAutoObservable } from 'mobx';

type IThemesFontStyleController =
    Reptile.Controllers.IThemesFontStyleController;

export default class ThemesFontStyleController
    implements IThemesFontStyleController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _bold: string;

    private _italic: string;

    private _underline: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesFontStyleController,
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
        this._bold =
            this._selectedRule.declarations.find(
                (e) => e.property === 'font-weight'
            )?.value ?? '';
        this._italic =
            this._selectedRule.declarations.find((e) => e.property === 'font-style')
                ?.value ?? '';
        this._underline =
            this._selectedRule.declarations.find(
                (e) => e.property === 'text-decoration'
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get label(): string {
        return 'Font style';
    }

    get bold(): boolean {
        return this._bold === 'bold';
    }

    set bold(v: boolean) {
        v
            ? this.theme?.update(this._selectedRule, 'font-weight', 'bold')
            : this.theme?.update(this._selectedRule, 'font-weight', 'unset');
    }

    get italic(): boolean {
        return this._italic === 'italic';
    }

    set italic(v: boolean) {
        v
            ? this.theme?.update(this._selectedRule, 'font-style', 'italic')
            : this.theme?.update(this._selectedRule, 'font-style', 'unset');
    }

    get underline(): boolean {
        return this._underline === 'underline';
    }

    set underline(v: boolean) {
        v
            ? this.theme?.update(this._selectedRule, 'text-decoration', 'underline')
            : this.theme?.update(this._selectedRule, 'text-decoration', 'unset');
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
