type IReptileRestApi = Reptile.Service.IReptileRestApi;
type IHttpApi = Reptile.Service.IHttpApi;

class ProtectedHttpProxy implements IHttpApi {
    private readonly _http: Reptile.Service.IHttpApi;

    private readonly _auth: Reptile.Service.IAuthenticationService;

    constructor(
        http: Reptile.Service.IHttpApi,
        auth: Reptile.Service.IAuthenticationService
    ) {
        this._http = http;
        this._auth = auth;
    }

    async get<TConfig, TResponse>(
        url: string,
        config?: TConfig | undefined
    ): Promise<TResponse> {
        const token = await this._auth.getToken();
        return await this._http.get(url, {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async post<TConfig, TData, TResponse>(
        url: string,
        data: TData,
        config?: TConfig | undefined
    ): Promise<TResponse> {
        const token = await this._auth.getToken();
        return await this._http.post(url, data, {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async put<TConfig, TData, TResponse>(
        url: string,
        data: TData,
        config?: TConfig | undefined
    ): Promise<TResponse> {
        const token = await this._auth.getToken();
        return await this._http.put(url, data, {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async patch<TConfig, TData, TResponse>(
        url: string,
        data: TData,
        config?: TConfig | undefined
    ): Promise<TResponse> {
        const token = await this._auth.getToken();
        return await this._http.patch(url, data, {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async delete<TConfig, TResponse>(
        url: string,
        config?: TConfig | undefined
    ): Promise<TResponse> {
        const token = await this._auth.getToken();
        return await this._http.delete(url, {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
}

export default class _ReptileApi implements IReptileRestApi {
    readonly httpPublic: Reptile.Service.IHttpApi;
    readonly httpProtected: Reptile.Service.IHttpApi;
    readonly account: Reptile.Service.IAccountService;
    readonly asset: Reptile.Service.IAssetService;
    readonly auth: Reptile.Service.IAuthenticationService;
    readonly contentEntity: Reptile.Service.IContentEntityService;
    readonly flatPlan: Reptile.Service.IFlatPlanService;
    readonly font: Reptile.Service.IFontService;
    readonly layout: Reptile.Service.ILayoutService;
    readonly payment: Reptile.Service.IPaymentService;
    readonly subscription: Reptile.Service.ISubscriptionService;
    readonly theme: Reptile.Service.IThemeService;
    readonly template: Reptile.Service.ITemplateService;
    readonly user: Reptile.Service.IUserService;
    readonly app: Reptile.Service.IAppService;
    readonly organization: Reptile.Service.IOrganizationService;
    constructor(
        http: Reptile.Service.IHttpApi,
        accountFactory: Reptile.Service.IServiceFactory<Reptile.Service.IAccountService>,
        assetFactory: Reptile.Service.IServiceFactory<Reptile.Service.IAssetService>,
        authFactory: Reptile.Service.IServiceFactory<Reptile.Service.IAuthenticationService>,
        contentEntityFactory: Reptile.Service.IServiceFactory<Reptile.Service.IContentEntityService>,
        flatPlanFactory: Reptile.Service.IServiceFactory<Reptile.Service.IFlatPlanService>,
        fontFactory: Reptile.Service.IServiceFactory<Reptile.Service.IFontService>,
        layoutFactory: Reptile.Service.IServiceFactory<Reptile.Service.ILayoutService>,
        paymentFactory: Reptile.Service.IServiceFactory<Reptile.Service.IPaymentService>,
        subscriptionFactory: Reptile.Service.IServiceFactory<Reptile.Service.ISubscriptionService>,
        themeFactory: Reptile.Service.IServiceFactory<Reptile.Service.IThemeService>,
        templateFactory: Reptile.Service.IServiceFactory<Reptile.Service.ITemplateService>,
        userFactory: Reptile.Service.IServiceFactory<Reptile.Service.IUserService>,
        appFactory: Reptile.Service.IServiceFactory<Reptile.Service.IAppService>,
        organizationFactory: Reptile.Service.IServiceFactory<Reptile.Service.IOrganizationService>
    ) {
        this.account = accountFactory.create(this);
        this.asset = assetFactory.create(this);
        this.auth = authFactory.create(this);
        this.contentEntity = contentEntityFactory.create(this);
        this.flatPlan = flatPlanFactory.create(this);
        this.font = fontFactory.create(this);
        this.layout = layoutFactory.create(this);
        this.payment = paymentFactory.create(this);
        this.subscription = subscriptionFactory.create(this);
        this.theme = themeFactory.create(this);
        this.template = templateFactory.create(this);
        this.user = userFactory.create(this);
        this.httpPublic = http;
        this.httpProtected = new ProtectedHttpProxy(http, this.auth);
        this.app = appFactory.create(this);
        this.organization = organizationFactory.create(this);
    }
}
