import { LOGOS } from '@Reptile/Assets';
import { makeAutoObservable } from 'mobx';
import GlobalStyleColorController from './_GlobalStyleColorController';
import GlobalStyleSelectController from './_GlobalStyleSelectController';

type IGlobalStyleController = Reptile.Controllers.IGlobalStyleController;

export default class _GlobalStyleController implements IGlobalStyleController {
    private readonly _domain: Reptile.Models.IDomain;
    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_GlobalStyleController, '_domain' | '_uiState'>(
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

    get homeScreenColor() {
        return this._domain.globalStyle.homeScreenColor;
    }

    get settingScreenColor() {
        return this._domain.globalStyle.settingScreenColor;
    }

    get searchScreenColor() {
        return this._domain.globalStyle.searchScreenColor;
    }

    get helpScreenColor() {
        return this._domain.globalStyle.helpScreenColor;
    }

    get bookmarkScreenColor() {
        return this._domain.globalStyle.bookmarkScreenColor;
    }

    get splashScreenColor() {
        return this._domain.globalStyle.splashScreenColor;
    }

    get color(): Reptile.Controllers.IGlobalStyleColorController {
        return new GlobalStyleColorController(this._uiState, this._domain);
    }

    get screenSelect(): Reptile.Controllers.IGlobalStyleSelectController {
        return new GlobalStyleSelectController(this._uiState, this._domain);
    }

    get logo() {
        if (this._domain.globalStyle.logo) {
            return this._domain.globalStyle.logo;
        }
        return LOGOS.PNG_MAIN_LOGO as string;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async saveApp() {
        await this._domain.globalStyle.saveApp();
    }

    async getData() {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        await this._domain.globalStyle.getData(publicationId);
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
