import { makeAutoObservable, toJS } from 'mobx';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES, SCREENS } from '@Reptile/Constants/Constants';

type IGlobalStyleModel = Reptile.Models.IGlobalStyleModel;

export default class _GlobalStyleModel implements IGlobalStyleModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;
    private _application?: Reptile.Service.GlobalStyles;
    private _activePage: string;
    _logo?: string;
    _screens: {
        general: string[];
        styles: string[];
    };
    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_GlobalStyleModel, '_api' | '_domain'>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this._screens = { general: ['Main layout'], styles: [] };
        this._activePage = 'Splash screen';
    }

    get application() {
        return this._application;
    }

    get screens() {
        return this._screens;
    }

    get activePage() {
        return this._activePage;
    }

    selectPage(page: string) {
        this._activePage = page;
    }

    async getData(id: string): Promise<void> {
        const res = await this._api.app.fetchPin(id);
        this._application = JSON.parse(
            res.settings
        ) as Reptile.Service.GlobalStyles;

        this._application.appDesign.screens.forEach((screen) =>
            !this._screens.styles.includes(screen.name)
                ? (this._screens.styles = [
                      ...this._screens.styles,
                      screen.name,
                  ])
                : null
        );
    }

    // async saveApp(): Promise<void> {
    //     if (this._applicationObj?.screens && this._colorString) {
    //         this._applicationObj.screens[
    //             this._selectedIndex ?? 0
    //         ].settings.styles.primaryColor = this._colorString;
    //     }

    //     if (this._application) {
    //         this._application.settings = JSON.stringify(this._applicationObj);

    //         try {
    //             const response = await this._api.app.saveApp(this._application);
    //             this._response = response.id;
    //             Notification.success({
    //                 description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
    //             });
    //         } catch (error) {
    //             Notification.error({
    //                 description: MESSAGES.ERROR_SAVE_CHANGES.message,
    //             });
    //         }
    //     }

    //     if (
    //         !this._applicationObj?.screens &&
    //         this._application &&
    //         this._colorString
    //     ) {
    //         this._settings.screens[
    //             this._selectedIndex ?? 0
    //         ].settings.styles.primaryColor = this._colorString;

    //         this._application.settings = JSON.stringify(this._settings);

    //         try {
    //             const response = await this._api.app.saveApp(this._application);
    //             this._response = response.id;
    //             Notification.success({
    //                 description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
    //             });
    //         } catch (error) {
    //             Notification.error({
    //                 description: MESSAGES.ERROR_SAVE_CHANGES.message,
    //             });
    //         }
    //     }
    // }

    dispose(): void {
        /* Do nothing */
    }
}
