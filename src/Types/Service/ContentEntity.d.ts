declare namespace Reptile.Service {
  export type Boilerplate = {
    id: string;
    name: string;
    imageUrl: string | null;
    url: string;
    type: 'WEB' | 'APP';
  };

  export interface ContentEntityInfo {
    contentEntities: ContentEntity[];
    totalCount: number;
    exception: any;
  }

  export type ContentArticle = {
    id: string;
    articles: {
      name: string;
      imageUrl: string;
      attributes: {
        summary?: string;
        htmlBody: string;
        publishDate: string;
      };
    }[];
  };

  export type ContentEntity = {
    id: string;
    name: string;
    imageUrl: string | null;
    isDeleted: boolean;
    hidden: boolean;
    parentId: string;
    updated: string;
    created: string;
    createdBy: string | null;
    externalId: string | null;
    order: number;
    streamTypeId: number | null;
    contentEntityType: ContentEntityType;
    allowedChildrenType: ContentEntityType[];
    attributes: Record<string, unknown>;
    flatPlans: FlatPlan[];
    parentOrder: number | null;
  };

  export type ContentEntityCloneInfo = {
    parentId: string;
    name: string;
    entityToCloneId: string;
    projectType: number;
  };

  export type ContentEntityPublishInfo = {
    entityId: string;
    requestFrom: number;
    publishedDate: Date | null;
    embargoDate: Date | null;
    title: string | null;
    summary: string | null;
    themeId: string | null;
  };

  export type ContentEntityType = {
    entityTypeId: number;
    entityTypeName: string;
  };

  export type ContentEntityUnpublishInfo = {
    entityId: string;
    requestFrom: number;
  };

  export type FlatPlan = {
    id: string;
    name: string;
    flatPlanOrders: FlatPlanOrder[];
  };

  export type FlatPlanOrder = {
    id: string;
    flatPlanId: string;
    parentId: string;
    entityId: string;
    order: number;
  };

  export type RelatedEntity = {
    logo: string;
    relatedEntity: [];

    relatedEntityId: string;

    isActive: boolean;

    typeOfContent: number;

    basedOnEntityType: number;

    authenticationSettings: string;

    settings: string;

    pin: string;

    isBuilt: string | null;

    id: string;
  };

  export type BuildEntity = {
    appName: string | undefined;
    appIcon: string | undefined;
    splashIcon: string | undefined;
    splashColor: string | undefined;
    iconColor: string | undefined;
    loaderBGColor: string | undefined;
    loaderGIF: string | undefined;
  };

  export type AndroidEntity = {
    applicationId: string | undefined,
    publicationId: string | undefined,
    appName: string | undefined;
    appIcon: string | undefined | null;
    splashIcon: string | undefined | null;
    splashColor: string | undefined;
    loaderBGColor: string | undefined | null;
    loaderGIF: string | undefined;
    iconColor: string | undefined;
    packageName: string | undefined;
    applicationName: string | undefined;
    keyAlias: string | undefined;
    keyPassword: string | undefined;
    keyStoreFileURL: string | undefined;
    keyStorePassword: string | undefined;
    serviceAccountJsonBlobURL: string | undefined;
  };

  export interface buildSettings {
    id: string;
    screens: Screen[];
    configuration: Configuration;
  }

  export interface entitySettings {
    appDesign: AppDesign;
    configuration: Configuration;
  }

  export interface AppDesign {
    defaultStyles: DefaultStyles;
    screens: Screen[];
  }

  export interface DefaultStyles {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  }

  export interface Screen {
    type: string;
    name: string;
    settings: Settings;
  }

  export interface Settings {
    general: any;
    styles: Styles;
  }

  export interface Styles {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  }

  export interface Configuration {
    name: string;
    logo: string;
  }
}
