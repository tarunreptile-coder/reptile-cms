import React, { useContext } from 'react';
import {
    AccountsModel,
    AssetModel,
    AuthenticationModel,
    ContentEntityModel,
    Domain,
    FontModel,
    RegistrationModel,
    TemplateModel,
    ThemeModel,
    UserModel,
    BuildSettingModel,
    GlobalStyleModel,
    PaymentModel,
    SubscriptionModel,
    FlatPlanModel,
    LayoutModel,
    FinishModel,
} from '@Reptile/Store/Models';
import { Factory } from '@Reptile/Framework';
import {
    AccountService,
    AppService,
    AssetService,
    AuthenticationService,
    AxiosHttp,
    ContentEntityService,
    FontService,
    ReptileApi,
    TemplateService,
    ThemeService,
    UserService,
    OrganizationService,
    PaymentService,
    SubscriptionService,
    FlatPlanService,
    LayoutService,
} from '~/Services';
import {
    NavigationController,
    PublicationTreeViewController,
    UiState,
} from '@Reptile/Store/Controllers';

const api = new ReptileApi(
    new AxiosHttp(),
    new Factory(AccountService),
    new Factory(AssetService),
    new Factory(AuthenticationService),
    new Factory(ContentEntityService),
    new Factory(FlatPlanService),
    new Factory(FontService),
    new Factory(LayoutService),
    new Factory(PaymentService),
    new Factory(SubscriptionService),
    new Factory(ThemeService),
    new Factory(TemplateService),
    new Factory(UserService),
    new Factory(AppService),
    new Factory(OrganizationService)
);

const domain = new Domain(
    api,
    new Factory(AccountsModel),
    new Factory(AssetModel),
    new Factory(AuthenticationModel),
    new Factory(ContentEntityModel),
    new Factory(FlatPlanModel),
    new Factory(FontModel),
    new Factory(LayoutModel),
    new Factory(PaymentModel),
    new Factory(SubscriptionModel),
    new Factory(RegistrationModel),
    new Factory(ThemeModel),
    new Factory(TemplateModel),
    new Factory(UserModel),
    new Factory(BuildSettingModel),
    new Factory(FinishModel),
    new Factory(AccountsModel),
    new Factory(GlobalStyleModel)
);

const uiState = new UiState(
    domain,
    new Factory(NavigationController),
    new Factory(PublicationTreeViewController)
);

const store = {
    domain,
    uiState,
};

export const StoreContext = React.createContext(store);

export const StoreProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useDomain = () => {
    return useContext(StoreContext).domain;
};

export const useUiState = () => {
    return useContext(StoreContext).uiState;
};
