import { makeAutoObservable } from 'mobx';

type INavigationSideMenuController =
    Reptile.Controllers.INavigationSideMenuController;

export default class _NavigationSideMenuController
    implements INavigationSideMenuController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _page: number;

    private _pageSize: number;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<
            _NavigationSideMenuController,
            '_domain' | '_uiState'
        >(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });
        this._uiState = uiState;
        this._domain = domain;
        this._page = 1;
        this._pageSize = 7;
    }

    get admin() {
        return this._domain.user.superUser || this._domain.user.admin;
    }

    get superUser() {
        return this._domain.user.superUser;
    }

    get isActive() {
        return this._domain.buildSetting.isActive;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    handleIsActive() {
        this._domain.buildSetting.handleIsActive();
    }

    async getAllUsers(): Promise<void> {
        await this._domain.accounts.getAllUsers();
    }

    async initialize(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const entityName = splitUrl[1];

        if (
            (entityName === 'template' &&
                !this._domain.buildSetting.isActive) ||
            (entityName === 'app-build' && !this._domain.buildSetting.isActive)
        ) {
            this._domain.buildSetting.handleIsActive();
        }

        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
