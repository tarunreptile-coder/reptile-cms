import { makeAutoObservable } from 'mobx';

type IThemesSaveChangesController =
    Reptile.Controllers.IThemesSaveChangesController;

export default class ThemesSaveChangesController
    implements IThemesSaveChangesController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _theme: Reptile.Models.IThemesStyling | undefined;

    _css?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<ThemesSaveChangesController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._theme = undefined;
        this._css = undefined;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._domain.theme.theme;
    }

    get status() {
        if (this.theme) {
            const id = this.theme.id;
            return this._domain.theme.status.themes.get(id)?.status;
        }
        return;
    }

    get css() {
        return this._domain.theme.css;
    }

    async saveChanges() {
      await this.theme?.saveChanges()

        this.theme?.id ? await this.getTheme(this.theme?.id) : null;
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    async getTheme(id: string): Promise<void> {
        await this._domain.theme.fetch(id);
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
