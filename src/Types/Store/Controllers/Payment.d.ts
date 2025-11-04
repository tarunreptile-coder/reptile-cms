declare namespace Reptile.Controllers {
    export interface IPaymentController extends IController {
        key?: string;

        boltOns?: number;

        paymentId?: string;

        selectedPlan: Reptile.Models.Plan | undefined;

        selectedOrg?: string;

        orgs:
            | {
                  label: string;
                  value?: string | undefined;
              }[]
            | undefined;

        orgIndex?: number;

        subscriptionStatus: Reptile.Models.State

        navigateToPlan(): void;

        navigateToSettings(): void;

        getOrgs(): Promise<void>;

        getPrices(): Promise<void>;

        getPublicKey(): Promise<void>;

        handleSubscribe(): Promise<void>;
    }
}
