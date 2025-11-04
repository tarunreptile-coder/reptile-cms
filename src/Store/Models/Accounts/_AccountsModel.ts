import { makeAutoObservable } from 'mobx';
import { AsyncEventObject } from '@Reptile/Framework';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';
import { AxiosError } from 'axios';

type IAccountsModel = Reptile.Models.IAccountsModel;

type AccountStoreStatus = {
    delete: Reptile.Models.State;
    edit: Reptile.Models.State;
    reset: Reptile.Models.State;
    add: Reptile.Models.State;
    update: Reptile.Models.State;
    confirm: Reptile.Models.State;
};

export default class _AccountsModel implements IAccountsModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject<'auth'>();

    private _verified: boolean;

    status: AccountStoreStatus;

    _user?: Reptile.Service.User;

    _users: Reptile.Models.Users;

    _organizations?: Reptile.Service.OrganizationInfo;

    _roles?: Reptile.Service.UserRole[];

    _organization?: Reptile.Models.OrganizationModel;

    _selectedUserOrganizations?:
        | {
              label: string;
              value?: string;
          }[]
        | undefined;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<
            _AccountsModel,
            '_api' | '_domain' | '_synchronization'
        >(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this.status = {
            delete: {
                status: 'initial',
            },
            edit: {
                status: 'initial',
            },
            reset: {
                status: 'initial',
            },
            add: {
                status: 'initial',
            },
            update: {
                status: 'initial',
            },
            confirm: {
                status: 'initial',
            },
        };
        this._users = { totalRowCount: 0, users: [], errors: {} };
        this._verified = false;
    }

    get users() {
        return this._users;
    }

    get user() {     
        return this._user;
    }

    get organization() {
        return this._organization;
    }

    get roles() {
        if (this._roles) {
            return this._roles.map((option) => {
                return { label: option.value, value: option.key };
            });
        }
        return;
    }

    get organizations() {
        if (this._organizations && 'organizations' in this._organizations) {
            const orgs = this._organizations.organizations;
            return orgs.map((option) => {
                return { label: option.name, value: option.id };
            });
        }

        return;
    }

    get orgLength() {
        if (this._organizations && 'totalCount' in this._organizations) {
            return this._organizations.totalCount;
        }
        return;
    }

    get userRoles() {
        if (this._domain.user.current?.roleIds && this.roles) {
            const userRole = this.roles.filter((item) =>
                this._domain.user.current?.roleIds?.includes(item.value)
            );

            if (userRole[0]) {
                return userRole;
            }
            return;
        }
        return;
    }

    get userOrganizations() {
        if (this._domain.user.current?.organizationIds && this.organizations) {
            const userOrg = this.organizations.filter(
                (item) =>
                    item.value &&
                    this._domain.user.current?.organizationIds?.includes(
                        item.value
                    )
            );

            if (userOrg[0]) {
                return userOrg;
            }
            return;
        }
        return;
    }

    get selectedUserOrganizations() {
        if (this._user && this.organizations) {
            const userOrg = this.organizations.filter(
                (item) =>
                    item.value &&
                    this._user?.organizationIds?.includes(item.value)
            );

            if (userOrg[0]) {
                return userOrg;
            }
            return;
        }
        return;
    }

    get selectedUserRoles() {
        if (this._user && this.roles) {
            const userRoles = this.roles.filter(
                (item) =>
                    item.value && this._user?.roleIds?.includes(item.value)
            );

            if (userRoles[0]) {
                return userRoles;
            }
            return;
        }
        return;
    }

    get verified(): boolean {
        return this._verified;
    }

    async saveUser(data: Reptile.Service.User): Promise<void> {
        this.status.edit.status = 'pending';
        try {
            await this._api.user.set(data);
            this.status.edit.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            this.status.edit.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_SAVING_DATA.message,
            });
        }
    }

    async addUser(data: Reptile.Service.User): Promise<void> {
        this.status.add.status = 'pending';
        try {
            await this._api.user.set(data);
            this.status.add.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_ADDED_USER.message,
            });
        } catch (error) {
            this.status.add.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_SAVING_DATA.message,
            });
        }
    }

    async setAvatar(file: File, entity: string) {
        try {
            const imageUrl = await this._api.asset.uploadGraphic(file, entity);
            await this._api.user.setAvatar(imageUrl.imageUrl);
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            const errorMessage =
                ((error as AxiosError)?.response?.data as Error)?.message ??
                'An error occurred.';
            Notification.error({ description: errorMessage });
        }
    }

    async saveEditOrganization(
        data: Reptile.Service.OrganizationModel
    ): Promise<void> {
        this.status.edit.status = 'pending';
        try {
            await this._api.organization.saveEditOrganization(data);
            this.status.edit.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            this.status.edit.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_SAVING_DATA.message,
            });
        }
    }

    async getAllorganization(pageNumber?: number): Promise<void> {
        this._organizations = await this._api.organization.getOrganization(
            pageNumber ?? 1,
            7
        );
    }

    async getAllroles(): Promise<void> {
        const res = await this._api.user.getAllRoles();
        this._roles = res;
    }

    async getAllUsers(
        page?: number,
        pageSize?: number,
        sortBy?: string,
        orderBy?: string,
        email?: string
    ): Promise<Reptile.Models.Users> {
        if (this.status.update.status === 'pending') {
            await this._synchronization.wait('auth');
            return this._users;
        }

        this.status.update.status = 'pending';
        try {
            const res = await this._api.user.getAllUsers(
                page ?? 1,
                pageSize ?? 7,
                sortBy,
                orderBy,
                email
            );
            this._roles = await this._api.user.getAllRoles();

            this._organizations =
                await this._api.organization.getOrganization();

            this._users = res;
            this.status.update.status = 'done';
            return this._users;
        } catch (error) {
            this.status.update = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('auth');
        }

        return this._users;
    }

    async getIndividualUser(id?: string): Promise<void> {
        if (id) {
            this._user = await this._api.user.get(id);
        }
        if (!id) {
            this._user = undefined;
        }
    }

    async getCurrentUser(): Promise<void> {
        this._user = await this._api.user.get();

        this._roles = await this._api.user.getAllRoles();

        this._organizations = await this._api.organization.getOrganization();
    }

    async getIndividualOrganization(id: string): Promise<void> {
        this._organization =
            await this._api.organization.getIndividualOrganization(id);
    }

    async deleteUser(id: string): Promise<void> {
        this.status.delete.status = 'pending';
        try {
            await this._api.user.deleteUser(id);
            this.status.delete.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            this.status.delete.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_ACCOUNT_DELETE.message,
            });
        }
    }

    async deleteOrganization(id: string): Promise<void> {
        this.status.delete.status = 'pending';
        try {
            await this._api.organization.deleteOrganization(id);
            this.status.delete.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            this.status.delete.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_ACCOUNT_DELETE.message,
            });
        }
    }

    async sendPasswordReset(id: string) {
        this.status.reset.status = 'pending';
        try {
            await this._api.account.sendPasswordReset(id);
            this.status.reset.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_PASSWORD_REST.message,
            });
        } catch (error) {
            this.status.reset.status = 'error';
            Notification.error({
                description: MESSAGES.ERROR_PASSWORD_RESET.message,
            });
        }
    }

    async confirmAccount(
        userId: string,
        code: string,
        partner: string
    ): Promise<boolean> {
        if (this.status.confirm.status === 'pending') {
            await this._synchronization.wait('auth');
            return this._verified;
        }
        this.status.confirm.status = 'pending';

        try {
            const isVerified = await this._api.account.confirmAccount(
                userId,
                code,
                partner
            );
            this.status.confirm.status = 'done';
            return (this._verified = isVerified);
        } catch (error) {
            this.status.confirm = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('auth');
        }
        return this._verified;
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }
}
