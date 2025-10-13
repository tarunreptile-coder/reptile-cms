declare namespace Reptile.Service {
    export type Users = {
        totalRowCount: number;
        users: User[];
        errors: Record<string, unknown>;
    };

    export type User = {
        id?: string;
        email?: string;
        userName?: string;
        password?: any;
        isActive?: boolean;
        emailConfirmed?: boolean;
        country?: string | null;
        firstName?: string;
        lastName?: string;
        created?: string;
        industry?: string | null;
        organizationIds?: string[];
        organizations?: {
            value?: string;
            label: string;
        }[]
        roleIds?: string[];
        roles?: {
            value: string;
            label: string;
        }[]
        isPartner?: boolean;
        imageUrl?: string | null;
        save?: () => void;
        [key: string]: unknown;
    };

    export type UserRole = {
        key: string;
        value: string;
        permissions: string[];
    };

    export type Organization = OrganizationModel[]

    export type OrganizationInfo = {
        organizations: OrganizationModel[];
        totalCount: number;
        exception: any;
    }

    export interface OrganizationModel {
        id?: string
        userIds?: string[]
        name: string
        entityId?: string
    }
}
