declare namespace Reptile.Service {
    export type AuthToken = {
        access_token: string,
        token_type: string,
        expires_in: number,
    }

    export type RoleType = {
        key: string,
        permissions: Array<string>,
        value: string
    }

    export type UserInfo = {
        created: Date,
        email: string,
        emailConfirmed: boolean,
        firstName: string,
        id: string,
        imageUrl: string,
        isActive: boolean,
        isPartner: boolean,
        lastName: string,
        organizationIds: Array<string>,
        roleIds: Array<string>,
        userName: string,
    }
}
