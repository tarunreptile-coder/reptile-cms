declare namespace Reptile.Store {
    export type CardThreeDotOptionType = {
        icon: React.Component,
        text: string,
        color: Reptile.Props.TextColorType,
        onClick: () => void,
    }

    export type TemplateCardType = 'web' | 'app';
    export type CardStatusType = 'live' | 'unpublished';

    export type ContentEntityType = {
        entityTypeId: number,
        entityTypeName: string,
    }

    export type ContentEntity = {
        id: string,
        allowedChildrenType: Array<ContentEntityType>,
        attributes: Record<string, unknown>,
        contentEntityType: ContentEntityType,
        created: string,
        createdBy?: string,
        flatPlans: Array<Record<string, unknown>>,
        hidden: boolean,
        imageUrl?: string,
        isDeleted: boolean,
        name: string,
        order: number,
        parentId: string,
        streamTypeId?: number,
        updated: string,
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
