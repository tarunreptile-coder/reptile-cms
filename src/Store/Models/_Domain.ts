type IDomain = Reptile.Models.IDomain;

export default class _Domain implements IDomain {
    readonly accounts: Reptile.Models.IAccountsModel;
    readonly asset: Reptile.Models.IAssetModel;
    readonly auth: Reptile.Models.IAuthenticationModel;
    readonly content: Reptile.Models.IContentEntityModel;
    readonly flatPlan: Reptile.Models.IFlatPlanModel;
    readonly font: Reptile.Models.IFontModel;
    readonly layout: Reptile.Models.ILayoutModel;
    readonly payment: Reptile.Models.IPaymentModel;
    readonly subscription: Reptile.Models.ISubscriptionModel;
    readonly register: Reptile.Models.IRegistrationModel;
    readonly theme: Reptile.Models.IThemeModel;
    readonly template: Reptile.Models.ITemplateModel;
    readonly user: Reptile.Models.IUserModel;
    readonly buildSetting: Reptile.Models.IBuildSettingModel;
    readonly finish: Reptile.Models.IFinishModel;
    readonly organization: Reptile.Models.IOrganizationModel;
    readonly globalStyle: Reptile.Models.IGlobalStyleModel;

    constructor(
        api: Reptile.Service.IReptileApi,
        accountsFactory: Reptile.Models.IModelFactory<Reptile.Models.IAccountsModel>,
        assetFactory: Reptile.Models.IModelFactory<Reptile.Models.IAssetModel>,
        authFactory: Reptile.Models.IModelFactory<Reptile.Models.IAuthenticationModel>,
        contentFactory: Reptile.Models.IModelFactory<Reptile.Models.IContentEntityModel>,
        flatPlanFactory: Reptile.Models.IModelFactory<Reptile.Models.IFlatPlanModel>,
        fontFactory: Reptile.Models.IModelFactory<Reptile.Models.IFontModel>,
        layoutFactory: Reptile.Models.IModelFactory<Reptile.Models.ILayoutModel>,
        paymentFactory: Reptile.Models.IModelFactory<Reptile.Models.IPaymentModel>,
        subscriptionFactory: Reptile.Models.IModelFactory<Reptile.Models.ISubscriptionModel>,
        registrationFactory: Reptile.Models.IModelFactory<Reptile.Models.IRegistrationModel>,
        themeFactory: Reptile.Models.IModelFactory<Reptile.Models.IThemeModel>,
        templateFactory: Reptile.Models.IModelFactory<Reptile.Models.ITemplateModel>,
        userFactory: Reptile.Models.IModelFactory<Reptile.Models.IUserModel>,
        buildSettingFactory: Reptile.Models.IModelFactory<Reptile.Models.IBuildSettingModel>,
        finishFactory: Reptile.Models.IModelFactory<Reptile.Models.IFinishModel>,
        organizationFactory: Reptile.Models.IModelFactory<Reptile.Models.IOrganizationModel>,
        globalStyleFactory: Reptile.Models.IModelFactory<Reptile.Models.IGlobalStyleModel>
    ) {
        this.accounts = accountsFactory.create(this, api);
        this.asset = assetFactory.create(this, api);
        this.auth = authFactory.create(this, api);
        this.content = contentFactory.create(this, api);
        this.flatPlan = flatPlanFactory.create(this, api);
        this.font = fontFactory.create(this, api);
        this.layout = layoutFactory.create(this, api);
        this.payment = paymentFactory.create(this, api);
        this.subscription = subscriptionFactory.create(this, api);
        this.register = registrationFactory.create(this, api);
        this.theme = themeFactory.create(this, api);
        this.template = templateFactory.create(this, api);
        this.user = userFactory.create(this, api);
        this.buildSetting = buildSettingFactory.create(this, api);
        this.finish = finishFactory.create(this, api);
        this.organization = organizationFactory.create(this, api);
        this.globalStyle = globalStyleFactory.create(this, api);
    }

    dispose(): void {
        this.accounts.dispose();
        this.asset.dispose();
        this.auth.dispose();
        this.content.dispose();
        this.flatPlan.dispose();
        this.font.dispose();
        this.layout.dispose();
        this.payment.dispose();
        this.register.dispose();
        this.theme.dispose();
        this.template.dispose();
        this.user.dispose();
        this.buildSetting.dispose();
        this.finish.dispose();
        this.organization.dispose();
        this.globalStyle.dispose();
    }
}
