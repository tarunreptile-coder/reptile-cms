import { makeAutoObservable } from 'mobx';

type IPrototypeController = Reptile.Controllers.IPrototypeController;

export default class PrototypeController implements IPrototypeController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _newAppName?: string;
    private _file?: File;
    private _fileImg?: string;
    private _active: number;
    private _tabValue: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<PrototypeController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });
        this._uiState = uiState;
        this._domain = domain;
        this._active = 0;
        this._tabValue = 'Build'; //'Prototype'; {/* Work Item - 1493: Hide Prototype tab */}
    }

    get pin(): string {
        return this._domain.buildSetting.pin;
    }

    get appName() {
        if (this._domain.buildSetting?.appName) {
            return this._domain.buildSetting?.appName;
        }
        return;
    }

    get newAppName() {
        if (!this._newAppName && this._domain.buildSetting?.appName) {
            return this._domain.buildSetting?.appName;
        }

        if (this._newAppName) {
            return this._newAppName;
        }

        return;
    }

    set newAppName(v) {
        this._newAppName = v;
    }

    get coverImage() {
        if (this._fileImg == undefined && this._domain.buildSetting.imageUrl) {
            return this._domain.buildSetting.imageUrl;
        }
        if (this._fileImg) {
            return this._fileImg;
        }
        return;
    }

    get newCoverImage() {
        if (this._fileImg == undefined && this._domain.buildSetting.imageUrl) {
            return this._domain.buildSetting.imageUrl;
        }

        if (this._fileImg) {
            return this._fileImg;
        }

        return '';
    }

    get coverImageUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        return this._domain.buildSetting.imageUploadProgress;
    }

    get saveStatus() {
        return this._domain.buildSetting.status;
    }

    get loading(): boolean {
        const entityId = this._uiState.navigation.entityId;
        if (entityId) {
            const entityStatus =
                this._domain.content.status.entities.get(entityId);
            if (entityStatus) {
                return entityStatus.status === 'pending';
            }
        }
        return true;
    }

    get app() {
        if (this._domain.buildSetting.app) {
            return this._domain.buildSetting.app;
        }
        return;
    }

    get appList() {
        return this._domain.buildSetting.appList;
    }

    get selectedApp() {
        if (this.appList) {
            return this.appList[this._active];
        }
        return;
    }

    get active() {
        return this._active;
    }

    set active(v) {
        this._active = v;
    }

    get steps() {
        return [
            'Initialization',
            'Configuration',
            'BuildAndSign',
            'Upload',
            'Deploy',
        ];
    }

    get appStatus() {
        if (this.selectedApp?.states) {
            return {
                error: this.selectedApp.states.includes('Failed'),
                pending: this.selectedApp.states.includes('Inprogress'),
                complete: this.selectedApp.deployStageState === 'Completed',
            };
        }

        return;
    }

    get tabValue() {
        return this._tabValue;
    }

    set tabValue(v) {
        this._tabValue = v;
    }

    get subscription() {
        return this._domain.subscription.subscription;
    }

    get superUser() {
        return this._domain.user.superUser;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    getDefaultProjectCount(): number {
        const currentPlan  = this.subscription;
        const isValidPlan = currentPlan?.isPaid && !currentPlan.subscriptionPeriod.isEnded;
        const priceId = this.subscription?.paymentPriceId;
        const currentPlanPrice = this._domain.payment.findPlanById(priceId);
        const totalBuildCount = isValidPlan ? currentPlan.totalClientQouta : currentPlanPrice?.featuresList['item_1_project_count'] || 0;
        return totalBuildCount;
    }

    updateCover(file: File): void {
        this._file = file;
        this._fileImg = URL.createObjectURL(file);
    }

    navigateToPlan() {
        this._uiState.navigation.navigate('/plan');
    }

    removeImage(): void {
        this._fileImg = '';
    }

    async fetchPin(): Promise<void> {
        if (this._uiState.navigation.templateId) {
            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;
            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }
                if (template.publication) {
                    await this._domain.buildSetting.fetchPin(
                        template.publication.id
                    );
                }
            }
        } else {
            const splitUrl = location.pathname.split('/');
            const publicationId = splitUrl[2];
            await this._domain.buildSetting.fetchPin(publicationId);
        }
    }

    async getData(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        await this._domain.buildSetting.getData(publicationId);
    }
    
    async getSubscriptionData(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        const publisherId =
                publicationId &&
                this._domain.content.entities.get(publicationId)?.parent?.id;
        return this._domain.subscription.getSubscriptionInfo(publisherId);
    }

    async saveApp(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        if (this._file) {
            await this._domain.buildSetting.setCover(this._file);
        }

        const appName = this._newAppName ?? this._domain.buildSetting.appName;

        if (appName) {
            await this._domain.buildSetting.saveApp(appName);
        }

        await this._domain.buildSetting.getData(publicationId);
    }

    async buildAsync(): Promise<void> {
        if (!this._domain.buildSetting.appId) {
            await this.saveApp();
        }
        const appName = this._newAppName ?? this._domain.buildSetting.appName;
        await this._domain.buildSetting.buildAsync(appName || '');
        await this._domain.buildSetting.getAppInstaller();
        await this._domain.buildSetting.getAppInstallerList();

        if (
            this._domain.buildSetting.app?.deployStageState !== 'Completed' ||
            !this.app?.states?.includes('Failed')
        ) {
            await this._domain.buildSetting.waitForAppUrl();
        }
    }

    async initialize(): Promise<void> {
        await this._domain.buildSetting.getAppInstaller();
        await this._domain.buildSetting.getAppInstallerList();

        if (
            this._domain.buildSetting.app?.deployStageState !== 'Completed' ||
            this.app?.states?.includes('Failed')
        ) {
            await this._domain.buildSetting.waitForAppUrl();
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
