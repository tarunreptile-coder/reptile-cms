type ISubscriptionService = Reptile.Service.ISubscriptionService;

export default class _SubscriptionService implements ISubscriptionService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Subscription';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    getSubscription(orgId: string): Promise<Reptile.Service.SubscriptionInfo> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetSubscription/${orgId}`
        );
    }

    getSubscriptionsByUserId(userId: string): Promise<Reptile.Service.SubscriptionDetailsByUserIdModel[]> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetAllSubscriptionByUserId/${userId}`
        );
    }

    getAllOrganizationSubscription(): Promise<
        Reptile.Models.PaidSubscription[]
    > {
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetAllOrganizationSubscription`
        );
    }

    startSubscription(data: Reptile.Service.Subscription): Promise<void> {
        return this._api.httpProtected.post(
            `/${this.endpoint}/StartSubscription`,
            data
        );
    }

    updateBoltOns(data: Reptile.Service.UpdateBoltOns): Promise<void> {
        return this._api.httpProtected.post(
            `/${this.endpoint}/UpdateBoltOnCount`,
            data
        );
    }

    updateGracePeriod(data: Reptile.Service.UpdateGracePeriod): Promise<void> {
        return this._api.httpProtected.post(
            `/${this.endpoint}/UpdateGracePeriod`,
            data
        );
    }

    //need to define the parameters
    paymentCallback(): Promise<void> {
        return this._api.httpProtected.post(
            `/${this.endpoint}/PaymentCallback`,
            undefined
        );
    }
}
