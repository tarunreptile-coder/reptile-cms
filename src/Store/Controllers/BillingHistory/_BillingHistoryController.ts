import { makeAutoObservable } from 'mobx';

type IBillingHistoryController = Reptile.Controllers.IBillingHistoryController;

export default class _BillingHistoryController
    implements IBillingHistoryController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_BillingHistoryController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
    }

    get subscription() {
        return this._domain.subscription.subscription
    }

    get subscriptionsByUser() {
        const paidSubscriptions =
            this._domain.subscription.subscriptionsByUserId?.filter(
                (e) => e.isPaid === true
            );
        return paidSubscriptions;
    }

    navigateToSettings() {
        this._uiState.navigation.navigate('/account-settings');
    }
    
    async getAllOrganizationSubscription() {
        await this._domain.subscription.getAllOrganizationSubscription();
        const isPaid =
            this._domain.subscription.allOrganizationSubscription.find(
                (e) => e.isPaid === true
            );
        if (isPaid) {
            await this._domain.subscription.getSubscription(isPaid.id);
        }
    }
    
    async getAllOrganizationSubscriptionForUser() {
        const currentUserId = this._domain.accounts.user?.id;
        if(currentUserId) {
            await this._domain.subscription.getSubscriptionInfoByUserId(this._domain.user.current?.id);
        } else {
            this.getAllOrganizationSubscription()           
        }
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
