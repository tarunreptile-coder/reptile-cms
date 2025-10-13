declare namespace Reptile.Models {
  export interface IAccountsModel extends IDisposable {
    roles?: { label: string; value: string }[];
    organizations?: { label: string; value?: string }[];
    orgLength?: number;
    organization?: Reptile.Models.OrganizationModel;
    users: Users;
    user?: Reptile.Service.User;
    userRoles:
      | {
          label: string;
          value: string;
        }[]
      | undefined;
    userOrganizations:
      | {
          label: string;
          value?: string;
        }[]
      | undefined;
    selectedUserOrganizations:
      | {
          label: string;
          value?: string;
        }[]
      | undefined;
    selectedUserRoles:
      | {
          label: string;
          value: string;
        }[]
      | undefined;
    /**
     * Checks if the user is verified
     */
    verified: boolean;
    /**
     * The status of the fetch request.
     */
    readonly status: {
      delete: State;
      edit: State;
      reset: State;
      add: State;
      update: Reptile.Models.State;
      confirm: Reptile.Models.State;
    };
    /**
     * @param page Page
     * @param pageSize Page size
     * @param sortBy Sort by
     * @param orderBy Order by
     * @param email Email
     */
    saveUser(User: Reptile.Service.User): Promise<void>;

    addUser(User: Reptile.Service.User): Promise<void>;

    saveEditOrganization(
      data: Reptile.Service.OrganizationModel
    ): Promise<void>;

    getAllUsers(
      page?: number,
      pageSize?: number,
      sortBy?: string,
      orderBy?: string,
      email?: string
    ): Promise<Users>;

    getIndividualUser(id: string): Promise<void>;

    getCurrentUser(): Promise<void>;

    setAvatar(file: File, entity: string): Promise<void>;

    getIndividualOrganization(id: string): Promise<void>;

    deleteUser(id: string): Promise<void>;

    deleteOrganization(id: string): Promise<void>;

    getAllorganization(pageNumber?: number): Promise<void>;

    getAllroles(): Promise<void>;

    sendPasswordReset(id: string): Promise<void>;
    /**
     * @param userId User's ID
     * @param code Code
     * @param partner Partner
     */
    confirmAccount(
      userId: string,
      code: string,
      partner: string
    ): Promise<boolean>;
  }

  interface IAssetModel extends IDisposable {
    /**
     * Array of active uploads
     */
    readonly activeUploads: IAssetUpload[];
    /**
     * Uploads given file to the server.
     * @param entityId Id of the owner entity. Used for tracking purpose.
     * @param file File to upload
     * @param kind Custom field to distinguish active progresses
     */
    upload(
      entityId: string,
      file: File,
      kind?: string,
      onFinish?: (fileName: string, imageUri: string) => Promise<void>
    ): Promise<string>;
    /**
     * Uploads given graphic to the server.
     * @param entityId Id of the owner entity.
     * @param file File to upload
     * @param kind Custom field to distinguish active progresses
     */
    uploadGraphic(entityId: string, file: File, kind?: string): Promise<string>;
  }

  interface IAuthenticationModel extends IDisposable {
    validateLogin(arg0: { username: string; password: string }): unknown;
    /**
     * True if user needs to login to access protected API.
     */
    readonly shouldAuthenticate: boolean;
    /**
     * Indicates current store state.
     */
    readonly authState: State;
    /**
     * Action that sign in the user.
     * @param username Username
     * @param password Password
     */
    signIn(username: string, password: string): Promise<void>;
    /**
     * Action the sign out the user
     */
    signOut(): Promise<void>;
  }

  interface IContentEntityModel extends IDisposable {
    /**
     * Map of all fetched entities.
     */
    readonly entities: Map<string, IContentEntity>;
    /**
     * Array of all publishers in the organization.
     */
    readonly publishers: IPublisher[];
    /**
     * Array of all publishers in the organization.
     */
    readonly publications: IPublication[];
    /**
     * Gets all available publication boilerplates
     */
    readonly publicationBoilerplates: {
      app: IBoilerplate[];
      web: IBoilerplate[];
    };
    /**
     * Map with key being id of the entity (or `publishers` if fetching publishers)
     * and State as value.
     */
    readonly status: {
      publishers: State;
      entities: Map<string, State>;
      publicationCreation: State;
      boilerplates: State;
      articles: State;
    };

    readonly contentLength: number;

    readonly pageSize: number;

    readonly articles?: Reptile.Service.ContentArticle[];
    /**
     * Fetches all publishers.
     */
    fetch(
      id?: string,
      pageNumber?: number,
      pageSize?: number,
      sortBy?: string,
      orderBy?: string
    ): Promise<void>;
    /**
     * Fetches entity with given id.
     * @param id Id of the entity to fetch
     */
    fetch(
      id: string,
      pageNumber: number,
      pageSize: number,
      sortBy?: string,
      orderBy?: string
    ): Promise<void>;
    /**
     * Fetches all articles within given issues (including the articles in sections).
     * @param issueId Id of issue whose articles to fetch
     * @param skip Number of articles to skip before returning first result
     * @param take Number of articles to include in result
     *
     * @returns Array of fetched article ids
     */
    // fetchArticles(
    //     issueId: string,
    //     skip: number,
    //     take: number
    // ): Promise<string[]>;
    /**
     * Fetches available publication boilerplates.
     */
    fetchPublicationBoilerplates(): Promise<void>;
    /**
     * Creates or clones new publication.
     * @param publisherId Publisher id that new project belongs too
     * @param name Name of the publication
     * @param projectKind Type of publication
     * @param boilerplate Optional. If provided clones given boilerplate
     */
    createPublication(
      publisherId: string,
      name: string,
      projectKind: "WEB" | "APP",
      boilerplate?: IBoilerplate
    ): Promise<void>;
    /**
     * Creates new Issue.
     * @param entityId Publisher id that new project belongs too
     * @param name Name of the publication
     */
    createIssue(entityId: string, name: string): Promise<void>;
    /**
     * Creates new Section.
     * @param entityId Publisher id that new project belongs too
     * @param name Name of the publication
     */
    createSection(
      entity: string,
      publisherId: string,
      name: string
    ): Promise<void>;
    /**
     * Creates new Article.
     * @param entityId Publisher id that new project belongs too
     * @param name Name of the publication
     */
    createArticle(
      entityId: string,
      publisherId: string,
      name: string
    ): Promise<void>;
    /**
     * Get Publications.
     */
    getPublications(): Promise<void>;
    /**
     * Get Articles.
     */
    getArticles(entity: Reptile.Service.ContentEntity): Promise<void>;
    /**
     * Adds or updates the given content entity in `entities`.
     * @param contentEntity Content entity to add
     */
    set(contentEntity: Reptile.Service.ContentEntity): void;
    /**
     * Removes the entity with given id from 'entities`.
     * @param id Id of entity to remove
     */
    remove(id: string): void;
  }

  interface IDomain extends IDisposable {
    readonly accounts: IAccountsModel;
    readonly asset: IAssetModel;
    readonly auth: IAuthenticationModel;
    readonly content: IContentEntityModel;
    readonly flatPlan: IFlatPlanModel;
    readonly font: IFontModel;
    readonly layout: ILayoutModel;
    readonly payment: IPaymentModel;
    readonly subscription: ISubscriptionModel;
    readonly register: IRegistrationModel;
    readonly template: ITemplateModel;
    readonly theme: IThemeModel;
    readonly user: IUserModel;
    readonly buildSetting: IBuildSettingModel;
    readonly finish: IFinishModel;
    readonly organization: IOrganizationModel;
    readonly globalStyle: IGlobalStyleModel;
  }

  interface IFlatPlanModel extends IDisposable {
    swapFlatPlanOrderInSameParent(
      flatPlanId: string | null,
      entityId: string,
      newPosition: number,
      oldPosition: number
    ): Promise<void>;
  }

  interface IFontModel extends IDisposable {
    /**
     * Map of all fetched fonts (sorted by name) where keys are related entities (publishers).
     */
    readonly fonts: Map<string, Font[]>;
    /**
     * Map of status where key is related entity for which fonts are being fetched.
     */
    readonly status: Map<string, Reptile.Models.State>;
    /**
     * Fetch all fonts related to given entity (publisher).
     * @param relatedEntityId Id of related entity (publisher)
     */
    fetch(relatedEntityId: string): Promise<void>;
    /**
     * delete font related to given entity (publisher).
     * @param relatedEntityId Id of related entity (publisher)
     */
    delete(id: string): Promise<void>;

    saveFont(fontData: Reptile.Service.Font): Promise<void>;

    uploadFile(data: any): Promise<string>;
  }

  interface ILayoutModel extends IDisposable {
    screens: { [key: string]: { id: string; name: string }[] };

    activePage: string;

    layouts?: Reptile.Models.Layout[];

    template?: Reptile.Models.Template;

    widgets?: Reptile.Service.LayoutWidget[];

    defaultWidgets?: Reptile.Service.LayoutWidget[];

    preBuiltLoaders?: Reptile.Service.Loader[];

    selectPage(page?: string): Promise<void>;

    getLayouts(entityId: string): Promise<void>;

    updateTemplate(template: Reptile.Models.Template): Promise<void>;

    setTemplate(template: Reptile.Models.Template): Promise<void>;

    getWidgets(id: string): Promise<void>;

    getAllWidgets(): Promise<void>;

    getWidgetResponse(id: string): Promise<Reptile.Service.LayoutWidget>;
    
    getAllLoadersAsync(): Promise<void>;

    resetTemplate(): void;
  }

  export interface IModelFactory<T> {
    /**
     * Factory to create specific model.
     * @param domain Root container containing all models
     * @param api Transportation layer
     */
    create(domain: IDomain, api: Service.IReptileApi): T;
  }

  interface IRegistrationModel extends IDisposable {
    /**
     * True if user successfully creates an account.
     */
    readonly status: State;
    /**
     * Action that signs the user up.
     * @param firstname Firstname
     * @param lastname Lastname
     * @param email Email
     * @param password Password
     * @param termsAndPrivacy T&Cs
     * @param requiredAccountConfirmation Account Confirmation
     */
    signUp(
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      termsAndPrivacy: boolean,
      requiredAccountConfirmation: boolean
    ): Promise<void>;

    forgetPassword(email: string): Promise<void>;

    resetPassword(
      username: string,
      password: string,
      confirm: string,
      code: string,
      isNewUser?: string
    ): Promise<void>;
  }
  export interface IGlobalStyleModel extends IDisposable {
    application?: Reptile.Service.GlobalStyles;

    screens: {
      general: string[];
      styles: string[];
    };

    activePage: string;

    selectPage(page: string): void;

    getData(id: string): Promise<void>;

    // saveApp(): Promise<void>;
  }
  interface IBuildSettingModel extends IDisposable {
    appName?: string;
    imageUrl?: string;
    status: Reptile.Models.State;
    pin: string;
    appId?: string;
    app?: Reptile.Service.AppInstaller;
    appList?: Reptile.Service.AppInstallerList;
    isActive: boolean;
    splashIcon?: string;
    splashColor?: string;
    /**
     * Gets the upload progress of the library image.
     */
    readonly imageUploadProgress?: IAssetUpload;
    // name:string;
    /**
     *
     */
    /**
         * Action that signs the user up.
         * @param id Id
         * @param appName AppName
         * @param pin Lastname
         * @param cacheProducts: [], CacheProducts
         * @param relatedEntityId RelatedEntity
         * @param isActive IsActive
         * @param isBuilt IsBuild
         * @param typeOfContent TypeOfContent
         * @param basedOnEntityType BasedOnEntityType
         * @param authenticationSettings AuthenticationSettings
         * @param settings Settings
         * @param logo AppLogo
         * @param applicationId ApplicationId
        {
}
         */
    handleIsActive(): void;
    saveApp(appName: string): Promise<void>;
    setCover(file: File): Promise<void>;
    getData(id: string): Promise<void>;
    buildAsync(appName: string): Promise<void>;
    fetchPin(id: string): Promise<void>;
    getAppInstaller(): Promise<void>;
    getAppInstallerList(): Promise<void>;
    waitForAppUrl(): Promise<void>;
  }
  interface IFinishModel extends IDisposable {
    status: Reptile.Models.State;
    step: number;
    submit: boolean;
    type?: 'android' | 'IOS';
    android: {
        androidServiceAccount: string;
        appIdentifier: string;
        keyAlias: string;
        keyPassword: string;
        keyStoreFileName: string;
        keyStorePassword: string;
        serviceAccountJsonBlobURL: string;
    };
    IOS: {
        appIdentifier: string;
        appSpecificId: string;
        apiKey: string;
        apiKeyId: string;
        p12FileName: string;
        p12Password: string;
        provisioningProfile: string;
        pat: string;
    };
    isDisabled?: boolean;
    existing?: boolean;
    /**
     * Gets the upload progress of the library image.
     */
    readonly keyStoreFileUploadInfo?: IAssetUpload;
    /**
     *
     */
    /**
         * Action that signs the user up.
         * @param id Id
         * @param appName AppName
         * @param pin Lastname
         * @param cacheProducts: [], CacheProducts
         * @param relatedEntityId RelatedEntity
         * @param isActive IsActive
         * @param isBuilt IsBuild
         * @param typeOfContent TypeOfContent
         * @param basedOnEntityType BasedOnEntityType
         * @param authenticationSettings AuthenticationSettings
         * @param settings Settings
         * @param logo AppLogo
         * @param applicationId ApplicationId
        {
}
         */
    /**
     * Submit inputs on click.
     */
    uploadFile(file: File, name: string): Promise<string>;
    getData(id: string): Promise<void>;
    releaseAndroidAsync(payload: any): Promise<boolean>;
  }
  interface ITemplateModel extends IDisposable {
    /**
     * Creates observable template preset from the given widgets.
     * @param widgets Widgets to construct template preset
     */
    createFromData(
      widgets: Reptile.Service.Widget[],
      widgetData?: Reptile.Service.Widget[]
    ): ITemplatePreset;

    applyGlobalStylesToActiveTemplate(globalStyles: Reptile.Models.IWidgetStyleProperties, templateId: string | undefined): void;
  }

  interface IThemeModel extends IDisposable {
    /**
     * Map of all fetched themes.
     */
    readonly themes: Reptile.Models.IThemesStyling[];
    /**
     * Returns the number of themes.
     */
    readonly totalCount: number;
    /**
     * Fetched theme.
     */
    readonly theme: ITheme | undefined;
    /**
     * Map of states for each theme and state when fetching all themes.
     */
    readonly status: {
      themes: Map<string, State>;
      all: State;
    };
    /**
     * Converts stylesheet object into string.
     */
    readonly css?: string;

    advanced: boolean;
    /**
     * Fetches the theme with given id.
     * @param id Id of theme to fetch
     * Or by pages
     */
    fetch(id?: string, pageNumber?: number, pageSize?: number, includeInactive?: boolean): Promise<void>;
    /**
     * Deletes the selected theme
     */
    deleteTheme(id: string): Promise<void>;
    /**
     * Creates a new theme
     */
    createTheme(
      css: string,
      name: string,
      isActive: boolean,
      isAdvanced: boolean,
      jsonStructure: string,
      publisherContentEntityId: string,
      publicationContentEntityId: string,
      publisherContentEntityName: string,
      publicationContentEntityName: string,
      pageNumber: number,
      pageSize: number
    ): Promise<void>;
  }

  interface IPaymentModel extends IDisposable {
    key?: string;

    prices?: Reptile.Models.Prices;

    basicPrice?: string;

    professionalPrice?: string;

    trialStatus: boolean;

    selectedPlanId: string;

    getPlansList(): PlansByCurrency;

    findPlanById(priceId: string): Reptile.Models.Plan | undefined;

    viewPlans(currency: "gbp" | "eur" | "usd", product: string): void;

    setSelectedPlan(planId: string): void;
    
    selectBasicPlan(): void;

    selectProfessionalPlan(): void;

    getPublicKey(): Promise<void>;

    getPrices(): Promise<void>;

    getFreeTrialStatus(): Promise<void>;
  }

  interface ISubscriptionModel extends IDisposable {
    /**
     * The status of the fetch request.
     */
    readonly status: State;

    allOrganizationSubscription: Reptile.Models.PaidSubscription[];

    subscription?: Reptile.Models.SubscriptionInfo;
    
    subscriptionsByUserId?: Reptile.Service.SubscriptionDetailsByUserIdModel[];

    subscriptionInfo: Reptile.Models.SubscriptionInfo | undefined;

    getSubscriptionInfo(entityId?: string | undefined): Promise<void>;
    
    getSubscriptionInfoByUserId(userId: string): Promise<Reptile.Service.SubscriptionDetailsByUserIdModel[]>;

    getSubscription(orgId: string): Promise<Reptile.Models.SubscriptionInfo>;

    getAllOrganizationSubscription(): Promise<
      Reptile.Models.PaidSubscription[]
    >;

    startSubscription(data: Reptile.Models.Subscription): Promise<void>;

    getOrganizationByEntity(
      id: string
    ): Promise<Reptile.Models.OrganizationModel | undefined>;

    updateBoltOns(data: Reptile.Models.UpdateBoltOns): Promise<void>;
    
    updateGracePeriod(data: Reptile.Models.UpdateGracePeriod): Promise<void>;

    paymentCallback(): Promise<void>;
  }

  interface IUserModel extends IDisposable {
    /**
     * Map of all fetched users.
     */
    readonly users: Map<string, IUser>;

    readonly superUser: boolean;

    readonly admin: boolean;

    /**
     * States for asynchronous actions.
     */
    readonly status: {
      users: Map<string, State>;
      current: State;
    };
    /**
     * Current user
     */
    readonly current?: IUser;
    /**
     * Fetches current user
     */
    fetch(): Promise<void>;
    /**
     * Fetches the user with given id.
     * @param id Id of user to fetch
     */
    fetch(id: string): Promise<void>;

    updateRole(): Promise<void>;
  }
  interface IOrganizationModel extends IDisposable {
    getOrganization(): Promise<void>;
  }
}
