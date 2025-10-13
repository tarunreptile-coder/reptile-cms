import { makeAutoObservable } from 'mobx';
import ThemesAlignController from './_ThemesAlignController';
import ThemesFontWeightController from './_ThemesFontStyleController';
import ThemesFontFamilyController from './_ThemesFontFamilyController';
import ThemesFontColorController from './_ThemesFontColorController';
import ThemesBackgroundController from './_ThemesBackgroundController';
import ThemesTextSizeController from './_ThemesTextSizeController';
import ThemesPaddingController from './_ThemesPaddingController';
import ThemesDisplayController from './_ThemesDisplayController';
import ThemesMarginController from './_ThemesMarginController';
import ThemesFloatController from './_ThemesFloatController';
import ThemesWidthController from './_ThemesWidthController';


type IThemesStylesController = Reptile.Controllers.IThemesStylesController;

export default class ThemesStylesController implements IThemesStylesController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesStylesController,
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
    }

    get align(): Reptile.Controllers.IThemesAlignController {
        return new ThemesAlignController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get fontStyle(): Reptile.Controllers.IThemesFontStyleController {
        return new ThemesFontWeightController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get fontFamily(): Reptile.Controllers.IThemesFontFamilyController {
        return new ThemesFontFamilyController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get fontColor(): Reptile.Controllers.IThemesFontColorController {
        return new ThemesFontColorController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get float(): Reptile.Controllers.IThemesAlignController {
        return new ThemesFloatController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get backgroundColor(): Reptile.Controllers.IThemesBackgroundController {
        return new ThemesBackgroundController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get textSize(): Reptile.Controllers.IThemesTextSizeController {
        return new ThemesTextSizeController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get padding(): Reptile.Controllers.IThemesPaddingController {
        return new ThemesPaddingController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get display(): Reptile.Controllers.IThemesDisplayController {
        return new ThemesDisplayController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
    }

    get width(): Reptile.Controllers.IThemesWidthController {
        return new ThemesWidthController(
            this._uiState,
            this._domain,
            this._selectedRule
        )
    }

    get margin(): Reptile.Controllers.IThemesMarginController {
        return new ThemesMarginController(
            this._uiState,
            this._domain,
            this._selectedRule
        );
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
