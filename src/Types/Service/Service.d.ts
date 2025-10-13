declare namespace Reptile.Service {
    interface IAppService {
        fetchPin(id: string): Promise<Reptile.Service.RelatedEntity>;
        saveApp(
            application: Reptile.Service.RelatedEntity
        ): Promise<Reptile.Service.RelatedEntity>;
        setCoverImage(
            entityId: string,
            fileName: string
        ): Promise<{ imageUrl: string }>;
        buildAsync(publicationId: string, payload: Reptile.Service.BuildEntity): Promise<{ 
            didStart: boolean 
        }>;
        releaseAndroidBuild(payload: Reptile.Service.AndroidEntity): Promise<{ 
            didStart: boolean 
        }>;
        getAPKV2(publicationId: string): Promise<{
            file: string;
            exception: null;
        }>;
        getAppInstaller(
            publicationId: string
        ): Promise<Reptile.Service.AppInstaller>;
        getAppInstallerList(
            publicationId: string
        ): Promise<Reptile.Service.AppInstallerList>;
    }
    interface IAssetService {
        /**
         * Uploads image to the server.
         * @param file Image to upload
         * @param onUploadProgress Optional. Callback to report upload progress
         * @returns Name of the uploaded file
         */
        uploadImage(
            file: File,
            publisherId: string,
            publisher: string,
            publicationId: string,
            publication: string,
            onUploadProgress?: (event: ProgressEvent) => void,
            onFinish?: (fileName: string, imageUri: string) => Promise<void>,
            kind?: string
        ): Promise<string>;

        /**
         * Uploads graphic to the server.
         * @param file Image to upload
         * @param relatedEntity Id of entity that is owner of the graphic
         * @param onUploadProgress Optional. Callback to report upload progress
         * @returns Url to the uploaded file
         */
        uploadGraphic(
            file: File,
            relatedEntity: string,
            onUploadProgress?: (event: ProgressEvent) => void
        ): Promise<{ imageUrl: string }>;
    }

    interface IAuthenticationService {
        /**
         * Requests and validates existing token.
         * If token is not valid an authentication request will be raised.
         * @returns JWT token to be used in protected requests
         */
        getToken(): Promise<string>;
        /**
         * Sign in the user with given username and password.
         * @param username Account username
         * @param password Account password
         * @returns JWT token to be used in protected requests
         */
        signIn(username: string, password: string): Promise<AuthToken>;
        /**
         * Sign out the user.
         */
        signOut(): Promise<void>;
        /**
         * Subscribes to event that is raised when there is no token or token has expired.
         * @param listener Callback to call
         * @returns Callback to unsubscribe
         */
        onAuthenticationRequired(listener: () => void): () => void;
    }

    interface IContentEntityService {
        /**
         * Gets all publishers if no id provided or all children of entity with given id.
         * @param id Optional. Id of the entity whose children to get
         * @returns All publishers or all children of the entity
         */
        getAll(
            id?: string,
            pageNumber?: number,
            pageSize?: number,
            sortBy?: string,
            orderBy?: string
        ): Promise<ContentEntityInfo>;
        /**
         * Gets the entity with the given id.
         * @param id Id of the entity to get
         * @returns Entity with given id
         */
        getOne(id: string): Promise<ContentEntity>;
        /**
         * Gets all publishers.
         */
        getPublishers(
            pageNumber: number,
            pageSize: number
        ): Promise<Reptile.Service.ContentEntityInfo>;
        /**
         * Gets all publishers children.
         */
        getPublicationsByPublisherId(
            id: string,
            pageNumber: number,
            pageSize: number
        ): Promise<Reptile.Service.ContentEntityInfo>;
        /**
         * Gets all content relating to the id.
         */
        getContentByFolderId(
            id: string,
            pageNumber: number,
            pageSize: number
        ): Promise<Reptile.Service.ContentEntityInfo>;
        /**
         * Gets template content.
         */
        getContent(id: string): Promise<Reptile.Service.ContentArticle[]>;
        /**
         * Gets requested number of articles in given issues (including articles under sections).
         * @param issueId Id of issue whose articles to get
         * @param skip Number of articles to skip and not include in results
         * @param take Number of articles to return
         */
        getAllArticles(
            issueId: string,
            skip: number,
            take: number
        ): Promise<ContentEntity[]>;
        /**
         * Gets all images associated with the given entity.
         * @param id Id of entity whose images to get
         * @returns Image entities
         */
        getImages(id: string): Promise<ContentEntity[]>;
        /**
         * Gets all publications.
         */
        getPublications(): Promise<ContentEntity[]>;
        /**
         * Gets all available project boilerplates.
         * @returns Array of project boilerplates
         */
        getBoilerplates(): Promise<Boilerplate[]>;
        /**
         * Updates current or creates a new entity.
         * @param value Properties to update. If id provided updates current otherwise creates new entity
         * @returns Id of the created/updated entity (Bug noticed - not reliable)
         */
        set(
            value: Partial<ContentEntity>,
            orgId: string
        ): Promise<{ id: string | null }>;
        /**
         * Clones the entity according to given data.
         * @param info Data needed to clone the entity
         * @returns Id of the created entity
         */
        clone(
            info: ContentEntityCloneInfo,
            orgId: string
        ): Promise<{ id: string }>;
        /**
         * Sets the cover image of given entity.
         * @param entityId Id of entity to update cover image
         * @param fileName Name of the uploaded file
         */
        setCoverImage(
            entityId: string,
            fileName: string,
            shouldSetAsCover: boolean,
            imageUri: string
        ): Promise<{ imageUrl: string }>;
        /**
         * Adds uploaded image to the given entity.
         * @param entityId Id of parent entity
         * @param fileName Name of uploaded file
         * @param shouldSetAsCover If true will also update imageUrl of given entity
         */
        addImage(
            entityId: string,
            fileName: string,
            shouldSetAsCover?: boolean,
            imageUri?: string
        ): Promise<{ imageUrl: string }>;
        /**
         * Publishes given entity.
         * @param info Info about the entity to publish
         */
        publish(info: ContentEntityPublishInfo): Promise<void>;
        /**
         * Unpublishes given entity.
         * @param info Info about the entity to unpublish
         */
        unpublish(info: ContentEntityUnpublishInfo): Promise<void>;
        /**
         * Deletes the entity with given id.
         * @param id Id of the entity to delete
         */
        delete(id: string): Promise<void>;
    }

    interface IFontService {
        /**
         * Fetches all fonts associated to given entity (publisher).
         * @param relatedEntityId Id of entity (publisher) to get available fonts
         */
        get(relatedEntityId: string): Promise<Font[]>;
        /**
         * Adds given font to the entity (publisher)
         * @param font Font info
         */
        add(font: Font): Promise<void>;
        /**
         * Deletes font with given id.
         * @param id Id of font to delete
         */
        delete(id: string): Promise<void>;
    }

    export interface IHttpApi {
        /**
         * HTTP GET method
         * @param url Relative url to call
         * @param config Configuration to use
         */
        get<TConfig, TResponse>(
            url: string,
            config?: TConfig
        ): Promise<TResponse>;
        /**
         * HTTP POST method
         * @param url Relative url to call
         * @param data Body data
         * @param config Configuration to use
         */
        post<TConfig, TData, TResponse>(
            url: string,
            data: TData,
            config?: TConfig
        ): Promise<TResponse>;
        /**
         * HTTP PUT method
         * @param url Relative url to call
         * @param data Body data
         * @param config Configuration to use
         */
        put<TConfig, TData, TResponse>(
            url: string,
            data: TData,
            config?: TConfig
        ): Promise<TResponse>;
        /**
         * HTTP PATCH method
         * @param url Relative url to call
         * @param data Body data
         * @param config Configuration to use
         */
        patch<TConfig, TData, TResponse>(
            url: string,
            data: TData,
            config?: TConfig
        ): Promise<TResponse>;
        /**
         * HTTP DELETE method
         * @param url Relative url to call
         * @param config Configuration to use
         */
        delete<TConfig, TResponse>(
            url: string,
            config?: TConfig
        ): Promise<TResponse>;
    }

    interface ILayoutService {
        getLayouts(publicationId: string): Promise<Reptile.Service.Layout[]>;
        getTemplate(id: string): Promise<Reptile.Service.Template>;
        updateTemplate(
            id: string,
            data: Reptile.Models.Template
        ): Promise<void>;
        setTemplate(data: Reptile.Models.Template): Promise<void>;
        getWidgets(id: string): Promise<Reptile.Service.Screens[]>;
        getAllWidgets(): Promise<Reptile.Service.LayoutWidget[]>;
        getWidgetIdAsync(id: string): Promise<Reptile.Service.LayoutWidget>
        getAllLoadersAsync(id: string): Promise<Reptile.Service.Loader[]>;
        
    }

    interface IReptileApi {
        readonly account: IAccountService;
        readonly asset: IAssetService;
        readonly auth: IAuthenticationService;
        readonly contentEntity: IContentEntityService;
        readonly flatPlan: IFlatPlanService;
        readonly font: IFontService;
        readonly layout: ILayoutService;
        readonly payment: IPaymentService;
        readonly subscription: ISubscriptionService;
        readonly theme: IThemeService;
        readonly template: ITemplateService;
        readonly user: IUserService;
        readonly app: IAppService;
        readonly organization: IOrganizationService;
    }

    interface IAccountService {
        /**
         * @param firstname Firstname
         * @param lastname Lastname
         * @param email Email
         * @param password Password
         * @param termsAndPrivacy T&Cs
         * @param requiredAccountConfirmation Account Confirmation
         */
        signUp(
            email: string,
            firstName: string,
            lastName: string,
            password: string,
            termsAndPrivacy: boolean,
            requiredAccountConfirmation: boolean
        ): Promise<Register>;

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

        sendPasswordReset(id: string): Promise<unknown>;

        resetPassword(
            username: string,
            password: string,
            confirmPassword: string,
            code: string,
            isNewUser?: string
        ): Promise<void>;

        forgetPassword(email: string): Promise<void>;
    }

    interface IFlatPlanService {
        swapFlatPlanOrderInSameParent(
            flatPlanId: string | null,
            entityId: string,
            newPosition: number,
            oldPosition: number
        ): Promise<void>;
    }
    export interface IReptileRestApi extends IReptileApi {
        /**
         * Public non-authorized HTTP methods
         */
        readonly httpPublic: IHttpApi;
        /**
         * Protected authorized HTTP methods
         */
        readonly httpProtected: IHttpApi;
    }

    export interface IServiceFactory<T> {
        /**
         * Returns the instance of requested service.
         * @param api Api to pass to the service
         * @returns new instance of service
         */
        create(api: IReptileApi): T;
    }

    interface IThemeService {
        /**
         * Gets the theme with given id.
         * @param id Id of the theme to get
         * @returns Theme with given id
         */
        get(id: string): Promise<Theme>;
        /**
         * Gets all the themes.
         * @returns Array of themes
         */
        get(
            id?: string,
            pageNumber?: number,
            pageSize?: number,
            includeInactive?: number
        ): Promise<Reptile.Models.ThemesObj>;
        /**
         * Gets the themes associated with given publication.
         * @param publicationId If of the publication which themes to get
         * @returns Array of themes
         */
        getByPublication(publicationId: string): Promise<Theme[]>;
        /**
         * Gets the default themes as json structures.
         * @returns Array of themes in json format
         */
        getDefaultJsonStructure(): Promise<ThemeJsonStructure[]>;
        /**
         * Updates current or creates new theme.
         * @param value Properties to update. If id provided updates current otherwise creates new theme
         */
        set(value: Partial<Theme>): Promise<void>;
        /**
         * Deletes the theme with given id.
         * @param id Id of the theme to delete
         */
        delete(id: string): Promise<void>;
    }

    interface ITemplateService {
        /**
         * Gets the template with given id
         * @param id Id of the template to get
         * @returns Template
         */
        get(id: string): Promise<TemplatePreset>;
        /**
         * Gets all templates.
         * @returns Array of all templates
         */
        get(): Promise<TemplatePreset[]>;
        /**
         * Gets all templates from given publication.
         * @param id Id of publication whose templates to get
         * @returns Array of templates
         */
        getByPublication(
            id: string,
            streamType?: number
        ): Promise<TemplatePreset[]>;
        /**
         * Update given template.
         * @param value Template to update
         */
        set(value: TemplatePreset): Promise<void>;
        /**
         * Delete template with given id.
         * @param id Id of template to delete
         */
        delete(id: string): Promise<void>;
    }

    interface IUserService {
        /**
         * Gets the currently logged in user.
         * @returns Currently logged in user
         */
        get(): Promise<User>;
        /**
         * Gets the user with given id.
         * @param id Id of the user to get
         */
        get(id: string): Promise<User>;
        /**
         * Gets all the users.
         * @param params Pagination parameters
         * @returns Users matching pagination parameters
         */
        getMany(params?: {
            page?: number;
            pageSize?: number;
            sortBy?: string;
            orderBy?: string;
            email?: string;
        }): Promise<{ totalRowCount: number; users: User[] }>;
        /**
         * Gets the roles that current user have.
         * @returns Roles of the current user
         */
        getRoles(): Promise<UserRole[]>;
        /**
         * Gets all available roles.
         * @returns All available roles
         */
        getAllRoles(): Promise<UserRole[]>;
        /**
         * Updates given user.
         * @param data Data to update
         */
        set(data: User): Promise<{ id: string }>;
        /**
         * Sets current user avatar.
         * @param imageUrl Url of avatar to set
         */
        setAvatar(imageUrl: string): Promise<void>;
        /**
         * Sets given user status.
         * @param id Id of the user to set the status
         * @param active True if the user is active, false otherwise
         */
        setStatus(id: string, active: boolean): Promise<void>;
        /**
         * Delete given user.
         * @param id Id of the user to delete
         */
        deleteUser(id: string): Promise<void>;

        /**
         * Gets all the users.
         */
        getAllUsers(
            page?: number,
            pageSize?: number,
            sortBy?: string,
            orderBy?: string,
            email?: string
        ): Promise<Reptile.Models.Users>;
    }
    interface IOrganizationService {
        /**
         * Gets the roles that current user have.
         * @returns Roles of the current user
         */
        getOrganization(
            pageNumber?: number,
            pageSize?: number
        ): Promise<Reptile.Service.OrganizationInfo>;
        /**
         * Delete given organization.
         * @param id Id of the organization to delete
         */
        deleteOrganization(id: string): Promise<void>;
        /**
         * Get given organization.
         * @param id Id of the organization to edit
         */
        getIndividualOrganization(id: string): Promise<OrganizationModel>;
        /**
         * Save updated organization.
         */
        saveEditOrganization(
            data: Reptile.Models.OrganizationModel
        ): Promise<void>;

        getOrganizationByEntity(
            id: string
        ): Promise<Reptile.Models.OrganizationModel>;

        getCurrentOrganization(): Promise<Reptile.Service.OrganizationModel[]>;
    }

    interface IPaymentService {
        getPublicKey(): Promise<string>;

        getProducts(): Promise<Reptile.Service.Products>;

        getPrices(): Promise<Reptile.Service.Prices>;

        getFreeTrialStatus(): Promise<boolean>;
    }

    interface ISubscriptionService {
        getSubscription(
            orgId: string
        ): Promise<Reptile.Service.SubscriptionInfo>;
        
        getSubscriptionsByUserId(
            userId: string
        ): Promise<Reptile.Service.SubscriptionDetailsByUserIdModel[]>;

        getAllOrganizationSubscription(): Promise<
            Reptile.Service.PaidSubscription[]
        >;

        startSubscription(data: Reptile.Service.Subscription): Promise<void>;

        updateBoltOns(data: Reptile.Service.UpdateBoltOns): Promise<void>;
        
        updateGracePeriod(data: Reptile.Service.UpdateGracePeriod): Promise<void>;

        paymentCallback(): Promise<void>;
    }
}
