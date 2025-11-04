import { makeAutoObservable } from 'mobx';
import { AsyncEventObject } from '@Reptile/Framework';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';

type ISubscriptionModel = Reptile.Models.ISubscriptionModel;

export default class _SubscriptionModel implements ISubscriptionModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject<'auth'>();

    private _allOrganizationSubscription: Reptile.Models.PaidSubscription[];

    _subscription?: Reptile.Models.SubscriptionInfo;
    
    _subscriptionsByUserId?: Reptile.Service.SubscriptionDetailsByUserIdModel[];

    status: Reptile.Models.State;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<
            _SubscriptionModel,
            '_api' | '_domain' | '_synchronization'
        >(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this.status = { status: 'initial' };
        this._allOrganizationSubscription = [];
        this._subscriptionsByUserId = [];
    }

    get allOrganizationSubscription() {
        return this._allOrganizationSubscription;
    }

    get subscription() {
        return this._subscription;
    }

    get subscriptionsByUserId() {
        return this._subscriptionsByUserId;
    }

    get subscriptionInfo() {
        return this._domain.subscription.subscription;
    }

    async getSubscriptionInfo(entityId: string | undefined) {
        let orgId: string | undefined;
        if (entityId) {
            const organization = await this.getOrganizationByEntity(entityId);

            if (organization && organization.id) {
                orgId = organization.id;
            }
        }

        if (!entityId) {
            await this.getAllOrganizationSubscription();

            const userIds = this._domain.user.current?.organizationIds;

            orgId = userIds?.find((userId) =>
                this.allOrganizationSubscription
                    .filter((e) => e.isPaid === true)
                    .some((e) => userId === e.id)
            );
        }

        if (orgId) {
            await this.getSubscription(orgId);
        }
    }

    async getOrganizationByEntity(
        id: string
    ): Promise<Reptile.Models.OrganizationModel | undefined> {
        try {
            return await this._api.organization.getOrganizationByEntity(id);
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        }
        return;
    }
    
    async getSubscriptionInfoByUserId(
        userId: string
    ): Promise<Reptile.Service.SubscriptionDetailsByUserIdModel[]> {
        this.status.status = 'pending';
        try {
            this._subscriptionsByUserId =
                await this._api.subscription.getSubscriptionsByUserId(userId)
            this.status.status = 'done';
            return this._subscriptionsByUserId;
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({description: (error as Reptile.Service.Error).data || MESSAGES.ERROR_API_FETCH.message})
        }
        return [];
    }

    async getSubscription(
        orgId: string
    ): Promise<Reptile.Models.SubscriptionInfo> {
        return (this._subscription =
            await this._api.subscription.getSubscription(orgId));
    }

    async getAllOrganizationSubscription(): Promise<
        Reptile.Models.PaidSubscription[]
    > {
        return (this._allOrganizationSubscription =
            await this._api.subscription.getAllOrganizationSubscription());
    }

    async startSubscription(data: Reptile.Models.Subscription): Promise<void> {
        this.status.status = 'pending';
        try {
            await this._api.subscription.startSubscription(data);
            await this._domain.user.updateRole();
            this.status.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_PAYMENT.message,
            });
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_PAYMENT.message,
            });
        }
    }

    async updateBoltOns(data: Reptile.Models.UpdateBoltOns): Promise<void> {
        this.status.status = 'pending';
        try {
            await this._api.subscription.updateBoltOns(data);
            this.status.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_BOLTONCOUNT_SAVED.message,
            });
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_BOLTONCOUNT_CHANGES.message,
            });
        }
    }
    
    async updateGracePeriod(data: Reptile.Models.UpdateGracePeriod): Promise<void> {
        this.status.status = 'pending';
        try {
            await this._api.subscription.updateGracePeriod(data);
            this.status.status = 'done';
            Notification.success({
                description: MESSAGES.SUCCESS_GRACEPERIOD_SAVED.message,
            });
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_GRACEPERIOD_CHANGES.message,
            });
        }
    }

    async paymentCallback(): Promise<void> {
        await this._api.subscription.paymentCallback();
    }

    async forgetPassword(email: string): Promise<void> {
        if (this.status.status === 'pending') {
            await this._synchronization.wait('auth');
            return;
        }
        this.status.status = 'pending';

        try {
            await this._api.account.forgetPassword(email);
            this.status.status = 'done';
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_PASSWORD_RESET.message,
            });
        }
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }
}
