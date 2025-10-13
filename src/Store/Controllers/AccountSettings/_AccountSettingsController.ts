import { makeAutoObservable } from 'mobx';
import { addWeeks } from "date-fns";

type IAccountSettingsController =
    Reptile.Controllers.IAccountSettingsController;

export default class _AccountSettingsController
    implements IAccountSettingsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _firstName?: string;

    private _lastName?: string;

    private _username?: string;

    private _email?: string;

    private _modal: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_AccountSettingsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._modal = false;
    }

    get status() {
        return this._domain.accounts.status.edit.status
    }

    get avatarUrl() {
        if (this._domain.accounts.user?.imageUrl) {
            return this._domain.accounts.user?.imageUrl;
        }
        return;
    }

    get usersPlan() {
        // return this._domain.accountSettings.usersPlan
        return '';
    }

    get firstName() {
        if (!this._firstName && this._domain.accounts.user?.firstName) {
            return this._domain.accounts.user.firstName;
        }
        if (this._firstName) {
            return this._firstName;
        }
        return '';
    }

    set firstName(v) {
        this._firstName = v;
    }

    get lastName() {
        if (!this._lastName && this._domain.accounts.user?.lastName) {
            return this._domain.accounts.user.lastName;
        }
        if (this._lastName) {
            return this._lastName;
        }
        return '';
    }

    set lastName(v) {
        this._lastName = v;
    }

    get username() {
        if (!this._username && this._domain.accounts.user?.userName) {
            return this._domain.accounts.user.userName;
        }
        if (this._username) {
            return this._username;
        }
        return '';
    }

    set username(v) {
        this._username = v;
    }

    get email() {
        if (!this._email && this._domain.accounts.user?.email) {
            return this._domain.accounts.user.email;
        }
        if (this._email) {
            return this._email;
        }
        return '';
    }

    set email(v) {
        this._email = v;
    }

    get modal() {
        return this._modal;
    }

    set modal(v) {
        this._modal = v;
    }

    get usersFreeTrial() {
        const subscription = this._domain.subscription.subscription;
        const isValidPlan = subscription?.isPaid && !subscription.subscriptionPeriod.isEnded;
        if(isValidPlan) {
            const endDate = subscription.subscriptionPeriod.endDate;
            const gracePeriodInWeek = subscription.gracePeriod?.gracePeriodInWeeks || 0;
            const endDateTime = new Date(endDate);
            // Add grace period weeks
            const extendedEndDate = addWeeks(endDateTime, gracePeriodInWeek);
            // Calculate remaining days from today
            const today = new Date();
            const remainingTimeInDays = Math.ceil(
                (extendedEndDate.getTime() - today.getTime()) /
                    (24 * 60 * 60 * 1000)
            );
            return remainingTimeInDays >= 0 ? remainingTimeInDays : undefined;
        }
        // old approach to calculate free trial remaining days
        // if (this._domain.accounts.user?.created) {
            // const dateString =
            //     this._domain.accounts.user?.created.split('T')[0];

            // const startDate = new Date(dateString);

            // const endDate = new Date(
            //     startDate.getTime() + 30 * 24 * 60 * 60 * 1000
            // );

            // const remainingTimeInDays = Math.ceil(
            //     (endDate.getTime() - new Date().getTime()) /
            //         (24 * 60 * 60 * 1000)
            // );
            // return remainingTimeInDays >= 0 ? remainingTimeInDays : undefined;
        // }
        return;
    }

    get trialStatus() {
        return this._domain.payment.trialStatus
    }

    get deps(): readonly unknown[] {
        return [];
    }

    navigateToPlan() {
        this._uiState.navigation.navigate('/plan');
    }

    async getCurrentSubscription() {
        const orgId = this._domain.accounts.user?.organizationIds?.[0]
        await this._domain.subscription.getSubscription(orgId);
    }

    async getCurrentUser() {
        await this._domain.accounts.getCurrentUser();
    }

    async imageUpload(file: File): Promise<void> {
        if (this._domain.accounts.user?.id) {
            await this._domain.accounts.setAvatar(
                file,
                this._domain.accounts.user?.id
            );
            void this.getCurrentUser();
            this._modal = !this._modal;
        }
    }

    makePayment(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async editDetails(): Promise<void> {
        if (this._domain.accounts.user) {
            if (this._firstName) {
                this._domain.accounts.user.firstName = this._firstName;
            }

            if (this._lastName) {
                this._domain.accounts.user.lastName = this._lastName;
            }

            if (this._username) {
                this._domain.accounts.user.userName = this._username;
            }

            if (this._email) {
                this._domain.accounts.user.email = this._email;
            }

            if (
                this._domain.accounts.user &&
                this._domain.accounts.userOrganizations
            ) {
                this._domain.accounts.user.organizations =
                    this._domain.accounts.userOrganizations.map((e) => {
                        return e;
                    });
            }

            if (this._domain.accounts.user && this._domain.accounts.userRoles) {
                this._domain.accounts.user.roles =
                    this._domain.accounts.userRoles.map((e) => {
                        return e;
                    });
            }

            await this._domain.accounts.saveUser(this._domain.accounts.user);
        }
    }

    async getFreeTrialStatus(): Promise<void> {
      await this._domain.payment.getFreeTrialStatus()
      this.getCurrentSubscription();
    }

    editBoltOns(): void {
        this._uiState.navigation.navigate('/bolt-ons');
    }

    billingHistoryNavigate(): void {
        this._uiState.navigation.navigate('/billing-history');
    }

    sendEmail(): void {
        window.location.href = 'mailto:info@pagelizard.com';
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
