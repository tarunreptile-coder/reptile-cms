declare namespace Reptile.Models {
    export interface IUser extends IDisposable {
        readonly id?: string;
        email?: string;
        userName?: string;
        readonly isActive?: boolean;
        readonly emailConfirmed?: boolean;
        readonly country?: string | null;
        firstName?: string;
        lastName?: string;
        readonly created?: string;
        readonly industry?: string | null;
        organizationIds?: string[];
        roleIds?: string[];
        organizations?: {
            value?: string;
            label: string;
        }[];
        roles?: {
            value: string;
            label: string;
        }[];
        readonly isPartner?: boolean;
        readonly imageUrl?: string | null;
        [key: string]: unknown;
    }
}
