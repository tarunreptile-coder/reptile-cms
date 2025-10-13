import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';
import { CssService } from '~/Services';
import { makeAutoObservable } from 'mobx';

type IAdvancedCssController = Reptile.Controllers.IAdvancedCssController;

export default class AdvancedCssController implements IAdvancedCssController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _theme: Reptile.Models.IThemesStyling | undefined;

    _css?: string;

    _stylesheetObject?: Reptile.Models.Stylesheet;

    _modal: boolean;

    _updatedCss?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<AdvancedCssController, '_domain' | '_uiState'>(
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
        this._modal = false;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._domain.theme.theme;
    }

    get css() {
        return this._domain.theme.css;
    }

    get updatedCss() {
        return this._updatedCss;
    }

    set updatedCss(v) {
        this._updatedCss = v;
    }

    get modal() {
        return this._modal;
    }

    set modal(v) {
        this._modal = v;
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    async updateJsonStructure() {
        if (this._domain.theme.theme && this._updatedCss) {
            const cssObj = CssService.convertToJson(this._updatedCss);
            this._domain.theme.theme.advancedCss(cssObj);

            await this._domain.theme.theme.saveChanges();
            Notification.success({
                description: MESSAGES.SUCCESS_STYLES_SAVED.message,
            });
        }
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
