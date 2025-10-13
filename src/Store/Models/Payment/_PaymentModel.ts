import { CURRENCY_SYMBOLS } from '@Reptile/Constants/Constants';
import { makeAutoObservable } from 'mobx';

type IPaymentModel = Reptile.Models.IPaymentModel;

export default class _PaymentModel implements IPaymentModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private _key?: string;

    private _products?: Reptile.Models.Products;

    private _prices?: Reptile.Models.Prices;

    private _basicPlan?: Reptile.Models.Price;

    private _professionalPlan?: Reptile.Models.Price;
    
    private _selectedPlanId?: string;

    private _trialStatus: boolean;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_PaymentModel, '_api' | '_domain'>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this._trialStatus = false;
    }

    get key() {
        return this._key;
    }

    get products() {
        return this._products;
    }

    get prices() {
        return this._prices;
    }
    
    get selectedPlanId() {
        return this._selectedPlanId ?? '';
    }

    get basicPrice() {
        if (this._basicPlan?.unit_amount) {
            return `${
                CURRENCY_SYMBOLS[this._basicPlan.currency]
            }${JSON.stringify(this._basicPlan?.unit_amount / 100)}`;
        }
        return;
    }

    get professionalPrice() {
        if (this._professionalPlan?.unit_amount) {
            return `${
                CURRENCY_SYMBOLS[this._professionalPlan.currency]
            }${JSON.stringify(this._professionalPlan?.unit_amount / 100)}`;
        }
        return;
    }

    get trialStatus() {
        return this._trialStatus;
    }

    getPlansList(): Reptile.Models.PlansByCurrency {
        const plansByCurrency: Reptile.Models.PlansByCurrency = {};

        // Filter active prices whose associated product is also active
        const activePrices = this._prices?.data.filter(
            item => item.active && item.product.active
        ) ?? [];

        activePrices.forEach((item) => {
            const { id, product, recurring, unit_amount, currency } = item;
            const plan: Reptile.Models.Plan = {
                priceId: id,
                planName: product.name,
                price: unit_amount / 100,
                currency,
                planInfo: product.description ?? "",
                featuresList: product.metadata ?? {},
            };
            if (!plansByCurrency[currency]) {
                plansByCurrency[currency] = { monthly: [], annual: [] };
            }
            if (recurring?.interval === "month") {
                plansByCurrency[currency].monthly.push(plan);
            } else if (recurring?.interval === "year") {
                plansByCurrency[currency].annual.push(plan);
            }
        });
        return plansByCurrency;
    }

    findPlanById(priceId: string): Reptile.Models.Plan | undefined {
        if (!this._prices?.data) return undefined;

        const item = this._prices.data.find((item) => item.id === priceId);
        if (!item) return undefined;

        const { id, product, unit_amount, currency } = item;
        const plan: Reptile.Models.Plan = {
            priceId: id,
            planName: product.name,
            price: unit_amount / 100,
            currency,
            planInfo: product.description ?? "",
            featuresList: product.metadata ?? {},
        };

        return plan;
    }

    viewPlans(currency: 'gbp' | 'eur' | 'usd', product: string): void {
        this._basicPlan = this._prices?.data
            .filter((e) => e.currency === currency)
            .filter((e) => e.recurring?.interval === product)
            .find((e) => e.product.name.includes("Basic"));

        this._professionalPlan = this._prices?.data
            .filter((e) => e.currency === currency)
            .filter((e) => e.recurring?.interval === product)
            .find((e) => e.product.name.includes("Professional"));
    }

    setSelectedPlan(planId: string): void {
        if(planId) {
            this._selectedPlanId = planId;
            localStorage.setItem('product', JSON.stringify(planId));
        }
    }
    
    selectBasicPlan() {
        if (this._basicPlan) {
            this._selectedPlanId = this._basicPlan.id;
            localStorage.setItem('product', JSON.stringify(this._basicPlan.id));
        }
    }

    selectProfessionalPlan() {
        if (this._professionalPlan) {
            this._selectedPlanId = this._professionalPlan.id;
            localStorage.setItem(
                'product',
                JSON.stringify(this._professionalPlan.id)
            );
        }
    }

    async getPublicKey(): Promise<void> {
        this._key = await this._api.payment.getPublicKey();
    }

    async getPrices(): Promise<void> {
        this._prices = await this._api.payment.getPrices();
    }

    async getFreeTrialStatus(): Promise<void> {
        this._trialStatus = await this._api.payment.getFreeTrialStatus();
    }

    dispose(): void {
        /* Do nothing */
    }
}
