type IPaymentService = Reptile.Service.IPaymentService;

export default class _PaymentService implements IPaymentService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Payment';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    getPublicKey(): Promise<string> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetStripePublicKey`
        );
    }

    getProducts(): Promise<Reptile.Service.Products> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetProducts`);
    }

    getPrices(): Promise<Reptile.Service.Prices> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetPrices`);
    }

    getFreeTrialStatus(): Promise<boolean> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetUserFreeTrialStatus`
        );
    }
}
