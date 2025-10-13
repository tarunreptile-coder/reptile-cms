import { makeAutoObservable } from 'mobx';

type IProjectWizardController = Reptile.Controllers.IProjectWizardController;

export default class _ProjectWizardController
    implements IProjectWizardController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _step: 0 | 1 | 2 | 3;

    private _kind?: 'app' | 'web' | undefined;

    private _name: string;

    private _boilerplate?: Reptile.Models.IBoilerplate | null | undefined;

    private _upgradeModal: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ProjectWizardController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._step = 0;
        this._name = '';
        this._upgradeModal = false;
    }

    private get currentEntity(): Reptile.Models.IContentEntity | undefined {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            return this._domain.content.entities.get(entityId);
        }
        return undefined;
    }

    get loading(): boolean {
        if (
            !['done', 'error'].includes(
                this._domain.content.status.boilerplates.status
            )
        ) {
            return true;
        }
        if (
            !['done', 'error'].includes(
                this._domain.content.status.publicationCreation.status
            )
        ) {
            return true;
        }
        return false;
    }

    get error(): string | undefined {
        return (
            this._domain.content.status.boilerplates.error ||
            this._domain.content.status.publicationCreation.error
        );
    }

    get status(): string | undefined {
        return this._domain.content.status.publicationCreation.status;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    get boilerplates(): Reptile.Models.IBoilerplate[] {
        if (this._kind) {
            return this._domain.content.publicationBoilerplates[this._kind];
        }
        return [];
    }

    get step(): 0 | 1 | 2 | 3 {
        return this._step;
    }

    set step(v: 0 | 1 | 2 | 3) {
        if (v === 0) {
            // Unset everything if returning to step 0 (closing the modal).
            this._name = '';
            this._boilerplate = undefined;
            this._kind = undefined;
        }
        // Do not allow manual update to step 3 (done through create function).
        if (v < 3) {
            this._step = v;
        }
    }

    get kind(): 'app' | 'web' | undefined {
        return this._kind;
    }

    set kind(v: 'app' | 'web' | undefined) {
        this._kind = v;
    }

    get name(): string {
        return this._name;
    }

    set name(v: string) {
        this._name = v;
    }

    get boilerplate(): Reptile.Models.IBoilerplate | null | undefined {
        return this._boilerplate;
    }

    set boilerplate(v: Reptile.Models.IBoilerplate | null | undefined) {
        this._boilerplate = v;
    }

    get entities(): Reptile.Models.IContentEntity[] {
        const entityId = this._uiState.navigation.entityId;
        return entityId
            ? this.currentEntity?.children ?? []
            : this._domain.content.publishers;
    }

    get subscription() {
        return this._domain.subscription.subscriptionInfo;
    }

    get trialStatus() {
        return this._domain.payment.trialStatus;
    }

    get upgradeModal() {
        return this._upgradeModal;
    }

    get subscriptionStatus() {
        // old approach to check subscription
        // const subscription =
        //     this.subscription?.isPaid === true &&
        //     this.subscription.remainingClinetQouta > 0;

        // const freeTrial =
        //     this.subscription?.isPaid !== true && this.trialStatus;

        // const superUser = this._domain.user.superUser;

        // if (superUser) {
        //     return false;
        // }

        // if (subscription || freeTrial) {
        //     return false;
        // }
        // return true;
        const superUser = this._domain.user.superUser;
        let isValidSubscription = false;
        if (superUser) {
            isValidSubscription = true;
        } else {
            if(this.subscription) {
                const priceId = this.subscription.paymentPriceId
                const currentPlan = this._domain.payment.findPlanById(priceId);
                const remainingProjectCount = this.subscription?.remainingClinetQouta;
                const totalProjectCount = this.subscription?.totalClientQouta || 0;
                isValidSubscription = this.subscription?.isPaid && !this.subscription.subscriptionPeriod.isEnded && (remainingProjectCount > 0 && remainingProjectCount <= totalProjectCount);
            }
        }
        return !isValidSubscription;
    }

    handleUpgradeModal() {
        this._upgradeModal = !this._upgradeModal;
    }

    navigateToPlan() {
        this._uiState.navigation.navigate('/plan');
    }

    async getFreeTrialStatus(): Promise<void> {
        await this._domain.payment.getFreeTrialStatus();
    }

    async getSubscriptionInfo(entityId: string | undefined) {
        await this._domain.subscription.getSubscriptionInfo(entityId);
    }

    async initialize(): Promise<void> {
        if (this._domain.content.status.boilerplates.status !== 'done') {
            await this._domain.content.fetchPublicationBoilerplates();
        }
    }

    startWebWizard(): void {
        this._kind = 'web';
        this._step = 1;
    }

    startAppWizard(): void {
        this._kind = 'app';
        this._step = 1;
    }

    async create(): Promise<void> {
        if (this._uiState.navigation.entityId) {
            this._step = 3;
            await this._domain.content.createPublication(
                this._uiState.navigation.entityId,
                this._name,
                this._kind?.toUpperCase() as 'WEB' | 'APP',
                this._boilerplate ?? undefined
            );
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
