import { makeAutoObservable } from 'mobx';

type IOrganizationsController = Reptile.Controllers.IOrganizationsController;

export default class OrganizationsController
    implements IOrganizationsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _modalDelete: boolean;

    private _modalEdit: boolean;

    private _modalAdd: boolean;

    private _pageSize: number;

    private _name?: string;

    private _page: number;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<OrganizationsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._modalDelete = false;
        this._modalEdit = false;
        this._modalAdd = false;
        this._pageSize = 7;
        this._page = 1;
    }

    get status() {
        return this._domain.accounts.status;
    }

    get organizations() {
        return this._domain.accounts.organizations;
    }

    get organization() {
        return this._domain.accounts.organization;
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

    get page() {
        return this._page;
    }

    set page(v) {
        this._page = v;
    }

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(v: number) {
        this._pageSize = v;
    }

    get name() {
        return this._name;
    }

    set name(v) {
        this._name = v;
    }

    get subscriptionStatus() {
        return this._domain.subscription.subscription;
    }
    
    get subscriptionsByUserId() {
        return this._domain.subscription.subscriptionsByUserId;
    }

    get totalOrgs() {
        return this._domain.accounts.orgLength ?? 0;
    }

    get totalPages() {
        if (this._domain.accounts.orgLength) {
            return Math.ceil(this._domain.accounts.orgLength / this.pageSize);
        }

        return 0;
    }

    async deleteOrganization(): Promise<void> {
        if (this.organization?.id) {
            await this._domain.accounts.deleteOrganization(
                this.organization.id
            );
            this._modalDelete = !this._modalDelete;
            await this._domain.accounts.getAllorganization();
        }
    }

    async saveOrganization(): Promise<void> {
        if (this.organization && this._name) {
            this.organization.name = this._name;
        }

        if (this.organization) {
            await this._domain.accounts.saveEditOrganization(this.organization);
            this._modalEdit = !this._modalEdit;
            await this._domain.accounts.getAllorganization();
        }
    }

    async addOrganization(): Promise<void> {
        if (this._name) {
            await this._domain.accounts.saveEditOrganization({
                name: this._name,
            });
            this._modalAdd = !this._modalAdd;
            await this._domain.accounts.getAllorganization();
        }
    }

    async getIndividualOrganization(id: string) {
        await this._domain.accounts.getIndividualOrganization(id);
    }

    async updatePage(page: number) {
        this._page = page;
        await this._domain.accounts.getAllorganization(page);
    }

    async initialize(): Promise<void> {
        await this._domain.accounts.getAllorganization();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
