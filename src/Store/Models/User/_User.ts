import { makeAutoObservable } from 'mobx';

type IUser = Reptile.Models.IUser;

type UserPrivateFields = '_api' | '_domain';

export default class User implements IUser {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _data: Reptile.Service.User;

    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.User
    ) {
        makeAutoObservable<User, UserPrivateFields>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this._data = data;
    }

    get id(): string | undefined {
        return this._data.id;
    }

    get email(): string | undefined {
        return this._data.email;
    }

    set email(v) {
        this._data.email = v;
    }

    get userName(): string | undefined {
        return this._data.userName;
    }

    set userName(v) {
        this._data.userName = v;
    }

    get isActive(): boolean | undefined {
        return this._data.isActive;
    }

    get emailConfirmed(): boolean | undefined {
        return this._data.emailConfirmed;
    }

    get country(): string | null | undefined {
        return this._data.country;
    }

    get firstName(): string | undefined {
        return this._data.firstName;
    }

    set firstName(v) {
        this._data.firstName = v;
    }

    get lastName(): string | undefined {
        return this._data.lastName;
    }

    set lastName(v) {
        this._data.lastName = v;
    }

    get created(): string | undefined {
        return this._data.created;
    }

    get industry(): string | null | undefined {
        return this._data.industry;
    }

    get organizationIds(): string[] | undefined {
        return this._data.organizationIds;
    }

    set organizationIds(v) {
        this._data.organizationIds = v;
    }

    get roleIds(): string[] | undefined {
        return this._data.roleIds;
    }

    set roleIds(v) {
        this._data.roleIds = v;
    }

    get organizations() {
        return this._data.organizations;
    }

    set organizations(v) {
        this._data.organizations = v;
    }

    get roles() {
        return this._data.roles;
    }

    set roles(v) {
        this._data.roles = v;
    }

    get isPartner(): boolean | undefined {
        return this._data.isPartner;
    }

    get imageUrl(): string | null | undefined {
        return this._data.imageUrl;
    }

    [key: string]: unknown;

    dispose(): void {
        /* Do nothing */
    }
}
