declare namespace Reptile.Controllers {
    export interface IBillingHistoryController extends IController {
        subscription?: Reptile.Models.SubscriptionInfo;
        subscriptionsByUser?: Reptile.Service.SubscriptionDetailsByUserIdModel[] | undefined;
        navigateToSettings(): void;
        getAllOrganizationSubscription(): Promise<void>;
        getAllOrganizationSubscriptionForUser(): Promise<void>;
    }
}
