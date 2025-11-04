import { makeAutoObservable } from 'mobx';

type IAccountController = Reptile.Models.IUser;

export default class ConfigureAccountController implements IAccountController {
    private readonly _account: Reptile.Models.IUser;

    private _firstname?: string;

    private _lastname?: string;

    private _email?: string;

    private _username?: string;

    private _organizationIds?: string[];

    private _rolesIds?: string[];

    constructor(account: IAccountController) {
        makeAutoObservable<ConfigureAccountController, '_account'>(this, {
            _account: false,
        });
        this._account = account;
        this._firstname = this._account.firstName;
        this._lastname = this._account.lastName;
        this._email = this._account.email;
        this._username = this._account.userName;
        this._organizationIds = this._account.organizationIds;
        this._rolesIds = this._account.roleIds;
    }

    get firstName() {
        return this._firstname;
    }

    set firstName(v) {
        this._firstname = v;
    }

    get lastName() {
        return this._lastname;
    }

    set lastName(v) {
        this._lastname = v;
    }

    get email() {
        return this._email;
    }

    set email(v) {
        this._email = v;
    }

    get userName() {
        return this._username;
    }

    set userName(v) {
        this._username = v;
    }

    get organizationIds() {
        return this._organizationIds;
    }

    set organizationIds(v) {
        this._organizationIds = v;
    }

    get roleIds() {
        return this._rolesIds;
    }

    set roleIds(v) {
        this._rolesIds = v;
    }

    [key: string]: unknown;

    save() {
        this._account.firstName = this._firstname;
        this._account.lastName = this._lastname;
        this._account.email = this._email;
        this._account.userName = this._username;
        this._account.organizationIds = this._organizationIds;
        this._account.roleIds = this.roleIds;
    }

    dispose(): void {
        /* Do nothing */
    }
}
