declare namespace Reptile.Models {
    export type Subscription = {
        organizationId: string;
        boltOnCount: number;
        paymentMethodId: string;
    };

    export type UpdateBoltOns = {
        newBoltOnCount: number;
        subscriptionId: string;
    };
    
    export type UpdateGracePeriod = {
        gracePeriod: number;
        subscriptionId: string;
    };

    export interface PaidSubscription {
        id: string;
        name: string;
        isPaid: boolean;
    }

    export interface SubscriptionInfo {
        remainingUserQouta: number;
        totalUserQouta: number;
        remainingClinetQouta: number;
        totalClientQouta: number;
        id: string;
        organizationId: string;
        subscriptionPeriod: {
            startDate: string;
            endDate: string;
            paymentDate: string;
            isEnded: boolean;
        };
        price: Price;
        subscriptionQuotas: {
            boltOnCount: number;
            draftBoltOnCount: number;
            usersPerBoltOn: number;
            clientsPerBoltOn: number;
        };
        gracePeriod: {
            gracePeriodInWeeks: number;
        };
        enableUsage: boolean;
        paymentSubscriptionId: string;
        paymentPriceId: any;
        subscriptionStatus: number;
        isPaid: boolean;
        events: any[];
    }
}
