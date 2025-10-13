import { ROLES } from '@Reptile/Constants/Constants';
import { makeAutoObservable } from 'mobx';
import ConfigureAccountController from './ConfigureAccountsController';

type IAccountsController = Reptile.Controllers.IAccountsController;

export default class AccountsController implements IAccountsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _page: number;

    private _pageSize: number;

    private _sortBy: string | undefined;

    private _orderBy: string | undefined;

    private _modalDelete: boolean;

    private _modalEdit: boolean;

    private _modalAdd: boolean;

    private _modalReset: boolean;
    
    private _subscriptionModal: boolean;

    private _emailSearch: string;

    private _userId?: string;

    private _upgradeModal: boolean;

    private _newUser: Reptile.Service.User;

    private _plansPriceList: Reptile.Models.PlansByCurrency;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<AccountsController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._modalDelete = false;
        this._modalEdit = false;
        this._modalAdd = false;
        this._modalReset = false;
        this._subscriptionModal = false;
        this._plansPriceList = null;
        this._page = 1;
        this._pageSize = 7;
        this._emailSearch = '';
        this._upgradeModal = false;
        this._newUser = {
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            organizationIds: [],
            roleIds: [],
        };
    }

    get status() {
        return this._domain.accounts.status;
    }

    get superUser() {
        return this._domain.user.superUser;
    }
    
    get subscriptionAPIstatus() {
        return this._domain.subscription.status;
    }

    get users() {
        return this._domain.accounts.users;
    }

    get user() {
        if (this.userId) {
            return this._domain.user.users.get(this.userId);
        }
        return;
    }

    get admin() {
        const admin = this._domain.user.admin;

        if (admin) {
            return true;
        }

        return false;
    }

    get roles() {
        if (this._domain.user.superUser) {
            return this._domain.accounts.roles;
        }

        if (this._domain.user.admin) {
            return this._domain.accounts.roles?.filter((superUser) => {
                if (superUser.value !== ROLES[2].value) {
                    return superUser;
                }
                return;
            });
        }

        return;
    }

    get organizations() {
        return this._domain.accounts.organizations;
    }

    get emailSearch() {
        return this._emailSearch;
    }

    set emailSearch(v) {
        this._emailSearch = v;
    }

    get modalDelete() {
        return this._modalDelete;
    }

    set modalDelete(v) {
        this._modalDelete = v;
    }

    get modalEdit() {
        return this._modalEdit;
    }

    set modalEdit(v) {
        this._modalEdit = v;
    }

    get modalAdd() {
        return this._modalAdd;
    }

    set modalAdd(v) {
        this._modalAdd = v;
    }

    get modalReset() {
        return this._modalReset;
    }

    set modalReset(v) {
        this._modalReset = v;
    }
    
    get subscriptionModal() {
        return this._subscriptionModal;
    }

    set subscriptionModal(v) {
        this._subscriptionModal = v;
    }

    get upgradeModal() {
        return this._upgradeModal;
    }

    get userId() {
        return this._userId;
    }

    set userId(v) {
        this._userId = v;
    }

    get currentUserId() {
        return this._domain.user.current?.id;
    }

    get page(): number {
        return this._page;
    }

    set page(v: number) {
        this._page = v;
    }

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(v: number) {
        this._pageSize = v;
    }

    get totalPages() {
        return Math.ceil(
            this._domain.accounts.users.totalRowCount / this.pageSize
        );
    }

    get totalAccounts() {
        return this._domain.accounts.users.totalRowCount;
    }

    get sortBy(): string | undefined {
        return this._sortBy;
    }

    set sortBy(v: string | undefined) {
        this._sortBy = v;
    }

    get orderBy(): string | undefined {
        return this._orderBy;
    }

    set orderBy(v: string | undefined) {
        this._orderBy = v;
    }

    get subscriptionStatus() {
        return this._domain.subscription.subscriptionInfo;
    }
    
    get subscriptionsByUserId() {
        const paidSubscriptions = this._domain.subscription.subscriptionsByUserId?.filter(org => 
            org.isPaid && org.subscription !== null
        )
        return paidSubscriptions;
    }

    get planPricesList() {
        return this._plansPriceList;
    }

    get trialStatus() {
        return this._domain.payment.trialStatus;
    }

    get newUser() {
        return this._newUser;
    }

    set newUser(v) {
        this.newUser = v;
    }

    get accountToConfigure() {
        const user = this.userId && this._domain.user.users.get(this.userId);
        return user ? new ConfigureAccountController(user) : undefined;
    }

    get loading() {
        if (
            this._domain.accounts.users.users.length === 0 &&
            this._domain.accounts.status.update.status === 'pending'
        ) {
            return true;
        }
        return false;
    }

    handleUpgradeModal() {
        this._upgradeModal = !this._upgradeModal;
    }

    navigateToPlan() {
        this._uiState.navigation.navigate('/plan');
    }

    async getFreeTrialStatus(): Promise<void> {
        await this._domain.payment.getFreeTrialStatus();
    }

    async getSubscriptionInfo() {
        await this._domain.subscription.getSubscriptionInfo();
    }
    
    async getSubscriptionInfoByUserId() {
        if(this._userId) {
            await this._domain.subscription.getSubscriptionInfoByUserId(this._userId);
        }
    }

    async getAllUsers(): Promise<void> {
        await this._domain.accounts.getAllUsers(
            this.page,
            this._pageSize,
            this._sortBy,
            this._orderBy,
            this._emailSearch
        );
    }

    async getIndividualUser(id: string) {
        await this._domain.user.fetch(id);
    }

    async saveUser(): Promise<void> {        
        if (!this.user) {
            return;
        }

        const orgs: { value?: string; label: string }[] = [];

        const roles: { value: string; label: string }[] = [];

        if (this.user.organizationIds) {
            this.user?.organizationIds?.forEach((id) => {
                const org = this.organizations?.find((org) => org.value === id);
                if (org) {
                    orgs.push(org);
                }
            });
        }

        if (this.user.roleIds) {
            this.user?.roleIds?.forEach((id) => {
                const role = this.roles?.find((role) => role.value === id);
                if (role) {
                    roles.push(role);
                }
            });
        }

        const data = {
            id: this.user.id,
            email: this.user.email,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            userName: this.user.userName,
            roles: roles,
            organizations: orgs,
        };

        if (Object.values(data).every((value) => !value)) {
            return;
        }

        await this._domain.accounts.saveUser(data);
        if (this.status.edit.status !== 'error') {
            this.modalEdit = !this.modalEdit;
            await this._domain.accounts.getAllUsers();
        }
    }
    
    async onSaveSubscriptionData(boltOnData: Reptile.Models.UpdateBoltOns | null, gracePeriodData: Reptile.Models.UpdateGracePeriod | null): Promise<void> {      
        // Save grace period if endDate changed
        if(gracePeriodData) {
            await this._domain.subscription.updateGracePeriod(gracePeriodData); 
        }
        // Save project count if changed
        if (boltOnData) {
            await this._domain.subscription.updateBoltOns(boltOnData); 
        }
        this.getSubscriptionInfoByUserId();
    }

    async addUser(): Promise<void> {
        const orgs: { value?: string; label: string }[] = [];

        const roles: { value: string; label: string }[] = [];

        if (this.newUser.organizationIds) {
            this.newUser?.organizationIds?.forEach((id) => {
                const org = this.organizations?.find((org) => org.value === id);
                if (org) {
                    orgs.push(org);
                }
            });
        }

        if (this.newUser.roleIds) {
            this.newUser?.roleIds?.forEach((id) => {
                const role = this.roles?.find((role) => role.value === id);
                if (role) {
                    roles.push(role);
                }
            });
        }

        const data = {
            id: this.newUser.id,
            email: this.newUser.email,
            firstName: this.newUser.firstName,
            lastName: this.newUser.lastName,
            userName: this.newUser.userName,
            roles: roles,
            organizations: orgs,
        };

        if (Object.values(data).every((value) => !value)) {
            return;
        }

        await this._domain.accounts.addUser(data);

        if (this.status.add.status !== 'error') {
            this._modalAdd = !this._modalAdd;
            await this._domain.accounts.getAllUsers();
            await this._domain.subscription.getSubscriptionInfo();
        }
    }

    async deleteUser(): Promise<void> {
        if (this._userId) {
            await this._domain.accounts.deleteUser(this._userId);
            if (this.status.delete.status !== 'error') {
                this._modalDelete = !this._modalDelete;
                await this._domain.accounts.getAllUsers();
            }
        }
    }

    async sendPasswordReset(): Promise<void> {
        if (this._userId) {
            await this._domain.accounts.sendPasswordReset(this._userId);
            if (this.status.reset.status !== 'error') {
                this._modalReset = !this._modalReset;
            }
        }
    }

    async initialize(): Promise<void> {
        await this._domain.payment.getPrices();
        this._plansPriceList = this._domain.payment.getPlansList();
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
