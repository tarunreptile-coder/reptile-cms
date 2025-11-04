import { AsyncEventObject } from '@Reptile/Framework';
import { makeAutoObservable } from 'mobx';
import User from './_User';
import { ROLES } from '@Reptile/Constants/Constants';

type IUserModel = Reptile.Models.IUserModel;

type UserModelPrivateFields = '_api' | '_domain';

export default class _UserModel implements IUserModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private _currentUserId?: string;

    private readonly _synchronization = new AsyncEventObject();

    users: Map<string, Reptile.Models.IUser>;

    status: {
        users: Map<string, Reptile.Models.State>;
        current: Reptile.Models.State;
    };

    _superUser?: string;

    _admin?: string;

    _editor?: string;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_UserModel, UserModelPrivateFields>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this.users = new Map<string, Reptile.Models.IUser>();
        this.status = {
            current: {
                status: 'initial',
            },
            users: new Map<string, Reptile.Models.State>(),
        };
    }

    get current(): Reptile.Models.IUser | undefined {
        return this._currentUserId
            ? this.users.get(this._currentUserId)
            : undefined;
    }

    get superUser(): boolean {
        return localStorage.getItem('role') === ROLES[2].value;
    }

    get admin() {
        return this._admin === ROLES[1].value;
    }

    fetch(): Promise<void>;
    fetch(id: string): Promise<void>;
    async fetch(id?: string): Promise<void> {
        if (id) {
            if (this.status.users.get(id)?.status === 'pending') {
                await this._synchronization.wait(`user.${id}`);
                return;
            }
            this.status.users.set(id, { status: 'pending' });

            try {
                const user = await this._api.user.get(id);
                this.users.set(id, new User(this._api, this._domain, user));
                this.status.users.set(id, { status: 'done' });
            } catch (error) {
                this.status.users.set(id, {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                });
            } finally {
                this._synchronization.signal(`user.${id}`);
            }
        } else {
            if (this.status.current.status === 'pending') {
                await this._synchronization.wait(`currentUser`);
                return;
            }
            this.status.current.status = 'pending';
            try {
                await this.updateRole();
                this.status.current.status = 'done';
            } catch (error) {
                this.status.current = {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                };
            } finally {
                this._synchronization.signal(`currentUser`);
            }
        }
    }

    async updateRole() {
        const user = await this._api.user.get();
        if (user.id) {
            this.users.set(user.id, new User(this._api, this._domain, user));
            this._currentUserId = user.id;
        }

        this._superUser =
            user.roleIds && user.roleIds.find((e) => e === ROLES[2].value);

        this._admin =
            user.roleIds && user.roleIds.find((e) => e === ROLES[1].value);

        this._editor =
            user.roleIds && user.roleIds.find((e) => e === ROLES[0].value);

        if (this._superUser) {
            localStorage.setItem('role', this._superUser);
        } else if (this._admin) {
            localStorage.setItem('role', this._admin);
        } else if (this._editor) {
            localStorage.setItem('role', this._editor);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
