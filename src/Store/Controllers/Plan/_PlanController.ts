import { makeAutoObservable } from 'mobx';

type IPlanController = Reptile.Controllers.IPlanController;

export default class _PlanController implements IPlanController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _toggle: boolean;

    private _currency: 'gbp' | 'eur' | 'usd';

    private _length: string;

    private _plansList: Reptile.Models.PlansByCurrency;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_PlanController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._toggle = false;
        this._currency = 'gbp';
        this._length = 'month';
        this._plansList = {gbp: {monthly: [], annual: []}, usd: {monthly: [], annual: []}, eur: {monthly: [], annual: []}};
    }

    get toggle() {
        return this._toggle;
    }

    set toggle(v) {
        this._toggle = v;
        if (!this._toggle) {
            this._length = 'month';
        }

        if (this._toggle) {
            this._length = 'year';
        }
    }

    get currency() {
        return this._currency;
    }

    set currency(v) {
        this._currency = v;
    }

    get plansList() {
        return this._plansList;
    }

    get basicPrice() {
        if (this._domain.payment.basicPrice) {
            return this._domain.payment.basicPrice;
        }
        return;
    }

    get professionalPrice() {
        if (this._domain.payment.professionalPrice) {
            return this._domain.payment.professionalPrice;
        }
        return;
    }

    setPrice() {
        if (this._length) {
            this._domain.payment.viewPlans(this._currency, this._length);
        }
    }

    getPlansList() {
        if (this._length) {
            this._plansList = this._domain.payment.getPlansList();
        }
    }

    setSelectedPlan(planId: string) {
        this._domain.payment.setSelectedPlan(planId);
        this._uiState.navigation.navigate('/payment');
    }
    
    handleBasic() {
        this._domain.payment.selectBasicPlan();
        this._uiState.navigation.navigate('/payment');
    }

    handleProfessional() {
        this._domain.payment.selectProfessionalPlan();
        this._uiState.navigation.navigate('/payment');
    }

    async getPrices() {
        await this._domain.payment.getPrices();
        this.setPrice();
        this.getPlansList();
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
