import { makeAutoObservable } from 'mobx';
import AccountsController from './AccountsController';
import OrganizationsController from './OrganizationsController';

type ITeamsController = Reptile.Controllers.ITeamsController;

export default class _TeamsController implements ITeamsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_TeamsController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
    }

    get users() {
        return this._domain.accounts.users;
    }

    get accounts(): Reptile.Controllers.IAccountsController {
        return new AccountsController(this._uiState, this._domain);
    }

    get organizations(): Reptile.Controllers.IOrganizationsController {
        return new OrganizationsController(this._uiState, this._domain);
    }

    async getAllUsers() {
        await this._domain.accounts.getAllUsers();
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
