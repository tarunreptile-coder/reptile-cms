import { makeAutoObservable } from 'mobx';
import AddNewStyleController from './_AddNewStyleController';
import AdvancedCssController from './_AdvancedCssController';
import ThemesOptionsController from './_ThemesOptionsController';
import ThemesSaveChangesController from './_ThemesSaveChangesController';


type IThemesActionsController = Reptile.Controllers.IThemesActionsController;

export default class _ThemesActionsController
    implements IThemesActionsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ThemesActionsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
    }

    get addNewStyle(): Reptile.Controllers.IAddNewStyleController {
        return new AddNewStyleController(this._uiState, this._domain);
    }

    get saveChanges(): Reptile.Controllers.IThemesSaveChangesController {
        return new ThemesSaveChangesController(this._uiState, this._domain);
    }

    get advancedCss(): Reptile.Controllers.IAdvancedCssController {
        return new AdvancedCssController(this._uiState, this._domain);
    }

    get options(): Reptile.Controllers.IThemesOptionsController {
        return new ThemesOptionsController(this._uiState, this._domain);
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
