import { makeAutoObservable } from 'mobx';

type IPaymentController = Reptile.Controllers.IPaymentController;

export default class _PaymentController implements IPaymentController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _boltOns?: number;

    private _paymentId?: string;

    private _selectedOrg?: { label: string; value?: string | undefined };

    private _orgIndex?: number;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_PaymentController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
    }

    get key() {
        return this._domain.payment.key;
    }

    get selectedPlan() {
        const priceId = JSON.parse(localStorage.getItem('product') ?? '') as string;
        let currentSelectedPlan: Reptile.Models.Plan | undefined = undefined;
        if(priceId) {
          currentSelectedPlan = this._domain.payment.findPlanById(priceId);
        }
        return currentSelectedPlan;
    }

    get paymentId() {
        return this._paymentId;
    }

    set paymentId(v) {
        this._paymentId = v;
    }

    get boltOns() {
        return this._boltOns;
    }

    set boltOns(v) {
        this._boltOns = v;
        if (this._boltOns && this._boltOns < 0) {
            this._boltOns = 0;
        }
    }

    get orgs() {
        return this._domain.accounts.userOrganizations;
    }

    get selectedOrg() {
        if (!this._selectedOrg && this.orgs) {
            return this.orgs[0].label;
        }
        if (this._selectedOrg) {
            return this._selectedOrg.label;
        }
        return '';
    }

    get orgIndex() {
        if (this._orgIndex) {
            return this._orgIndex;
        }
        return 0;
    }

    set orgIndex(v) {
        this._orgIndex = v;
        if (
            (this._orgIndex === 0 && this.orgs) ||
            (this._orgIndex && this.orgs)
        ) {
            this._selectedOrg = this.orgs[this._orgIndex];
        }
    }

    get subscriptionStatus() {
        return this._domain.subscription.status
    }

    navigateToPlan() {
        this._uiState.navigation.navigate('/plan');
    }

    navigateToSettings() {
        this._uiState.navigation.navigate('/account-settings');
    }

    async getOrgs() {
        await this._domain.accounts.getAllorganization();
    }

    async getPublicKey() {
        await this._domain.payment.getPublicKey();
    }

    async getPrices() {
        await this._domain.payment.getPrices();
    }

    async handleSubscribe() {
        if (
            this._paymentId &&
            this._domain.user.current?.organizationIds &&
            this.selectedPlan
        ) {
            const projectCountString = this.selectedPlan.featuresList['item_1_project_count'];
            const projectCount = parseInt(projectCountString.match(/\d+/)?.[0] || '0', 10);
            const data = {
                organizationId:
                    this._selectedOrg?.value ??
                    this._domain.user.current?.organizationIds[0],
                boltOnCount: projectCount ? projectCount : 1, // this.selectedPlan.product.name.includes('Professional') ? 5 : 1, // kept static as price will be considered from stripe
                paymentMethodId: this._paymentId,
                paymentPriceId: this.selectedPlan.priceId,
            };

            await this._domain.subscription.startSubscription(data);
            if(this.subscriptionStatus.status === 'done') {
                this._uiState.navigation.navigate('/billing-history');
            }
        }
    }

    async initialize(): Promise<void> {
        await this._domain.payment.getPrices();
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
