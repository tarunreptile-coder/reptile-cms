declare namespace Reptile.Controllers {
    export interface ITeamsController extends IController {
        accounts: IAccountsController;

        organizations: IOrganizationsController;

        getAllUsers(): Promise<void>;
    }

    export interface IAccountsController extends IController {
        page: number;
        pageSize: number;
        sortBy?: string;
        orderBy?: string;
        users: Reptile.Models.Users;
        emailSearch: string;
        modalDelete: boolean;
        modalEdit: boolean;
        modalAdd: boolean;
        modalReset: boolean;
        subscriptionModal: boolean;
        userId?: string;
        currentUserId?: string;
        admin: boolean;
        roles?: { value: string; label: string }[];
        selectedRole?: { value: string; label: string }[];
        organizations?: { value?: string; label: string }[];
        selectedOrganization?: { value: string; label: string }[];
        userRoles?: { value: string; label: string }[];
        userOrganizations?: { value?: string; label: string }[];
        subscriptionStatus?: Reptile.Models.SubscriptionInfo | undefined;
        subscriptionsByUserId?: Reptile.Service.SubscriptionDetailsByUserIdModel[] | undefined;
        trialStatus: boolean;
        status: {
            delete: Reptile.Models.State;
            edit: Reptile.Models.State;
            reset: Reptile.Models.State;
            add: Reptile.Models.State;
            update: Reptile.Models.State;
            confirm: Reptile.Models.State;
        };
        readonly superUser: boolean;
        subscriptionAPIstatus: Reptile.Models.State;
        planPricesList: Reptile.Models.PlansByCurrency;
        upgradeModal: boolean;
        totalPages: number;
        totalAccounts: number;
        accountToConfigure: Reptile.Service.User | undefined;
        newUser: Reptile.Service.User;
        loading: boolean;
        handleUpgradeModal(): void;
        navigateToPlan(): void;
        getFreeTrialStatus(): Promise<void>;
        getIndividualUser(id?: string): Promise<void>;
        sendPasswordReset(): Promise<void>;
        deleteUser(): Promise<void>;
        saveUser(): Promise<void>;
        addUser(): Promise<void>;
        getAllUsers(): Promise<void>;
        getSubscriptionInfo(): Promise<void>;
        getSubscriptionInfoByUserId(): Promise<void>;
        getPlanDetailsById(priceId: string): Reptile.Models.Plan | undefined;
        onSaveSubscriptionData(boltOnData: Reptile.Models.UpdateBoltOns | null, gracePeriodData: Reptile.Models.UpdateGracePeriod | null): Promise<void>;
    }

    export interface IOrganizationsController extends IController {
        organizations?: { value?: string; label: string }[];
        organization?: Reptile.Models.OrganizationModel;
        totalOrgs: number;
        pageSize: number;
        modalDelete: boolean;
        modalEdit: boolean;
        modalAdd: boolean;
        name?: string;
        page: number;
        subscriptionStatus?: Reptile.Models.SubscriptionInfo;
        subscriptionsByUserId?: Reptile.Service.SubscriptionDetailsByUserIdModel[] | undefined;
        status: {
            delete: Reptile.Models.State;
            edit: Reptile.Models.State;
            add: Reptile.Models.State;
        };
        totalPages: number;
        deleteOrganization(): Promise<void>;
        saveOrganization(): Promise<void>;
        addOrganization(): Promise<void>;
        getIndividualOrganization(id: string): Promise<void>;
        updatePage(page: number): Promise<void>;
    }
}
