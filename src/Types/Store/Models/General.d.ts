declare namespace Reptile.Models {
    export type State = {
        status: 'initial' | 'pending' | 'done' | 'error';
        error?: string;
    };

    type Users = {
        totalRowCount: number;
        users: User[];
        errors: Record<string, unknown>;
    };
    type User = {
        id: string;
        email: string;
        userName: string;
        password: any;
        isActive: boolean;
        emailConfirmed: boolean;
        country: string | null;
        firstName: string;
        lastName: string;
        created: string;
        industry: any;
        organizationIds: string[];
        roleIds: string[];
        organizations: { value: string; label: string }[];
        roles: { value: string; label: string }[];
        isPartner: boolean;
        imageUrl: string;
    };
    type Organization = OrganizationModel[];

    type OrganizationModel = {
        id?: string;
        userIds?: string[];
        name: string;
        entityId?: string;
    };

    type SubscriptionDetailsByUserIdModel = Array <{
        id: string;
        name: string;
        isPaid: boolean;
        subscription?: Reptile.Models.SubscriptionInfo;
    }>;
}
