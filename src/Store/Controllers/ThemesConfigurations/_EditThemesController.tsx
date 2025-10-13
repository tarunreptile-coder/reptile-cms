import { makeAutoObservable } from 'mobx';
import ThemesStylesController from './_ThemesStylesController';

type IEditThemesController = Reptile.Controllers.IEditThemesController;

export default class _EditThemesController implements IEditThemesController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _stylesheet?: Reptile.Models.Stylesheet;

    _ruleId: number;

    _filter: string;

    _filterIndex: number;

    _filters: string[];

    _selectorType: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_EditThemesController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._ruleId = -1;
        this._filter = 'both';
        this._filters = ['both', 'text', 'image'];
        this._filterIndex = 0;
        this._selectorType = 'text';
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._domain.theme.theme;
    }

    get ruleId(): number {
        return this._ruleId;
    }

    set ruleId(v: number) {
        this._ruleId = v;
    }

    get selectedRule() {
        return this.theme?.rules[this._ruleId];
    }

    get selectorType() {
        return this._selectorType;
    }

    set selectorType(v: string) {
        this._selectorType = v;
    }

    get filter() {
        return this._filter;
    }

    set filter(v) {
        this._filter = v;
    }

    get filters() {
        return this._filters;
    }

    get filterIndex() {
        return this._filterIndex;
    }

    set filterIndex(v) {
        this._filterIndex = v;
        this._filter = this._filters[this._filterIndex];
    }

    get ThemeStyles() {
        return this.selectedRule
            ? new ThemesStylesController(
                  this._uiState,
                  this._domain,
                  this.selectedRule
              )
            : undefined;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async getTheme(id: string): Promise<void> {
        await this._domain.theme.fetch(id);
    }

    async initialize(): Promise<void> {
        const themeId = this._uiState.navigation.entityId;
        if (themeId) {
            await this._domain.theme.fetch(themeId);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
