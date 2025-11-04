import { makeAutoObservable, observable } from 'mobx';
import { MESSAGES, SCREENS } from '@Reptile/Constants/Constants';
import { Notification } from '@Reptile/Components/Atoms';
import { UTILS } from '~/Utils';

type IBuildSettingModel = Reptile.Models.IBuildSettingModel;

export default class _BuildSettingModel implements IBuildSettingModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    _appName?: string;
    _imageUrl?: string;
    _image?: string;
    status: Reptile.Models.State;
    _pin?: string;
    _application?: Reptile.Service.RelatedEntity;
    _settings: Reptile.Service.buildSettings;
    _applicationObj?: Reptile.Service.buildSettings;
    _appId?: string;
    _app?: Reptile.Service.AppInstaller;
    _appList?: Reptile.Service.AppInstallerList;
    splashColor: string;
    splashIcon: string;
    private _imagesState: Reptile.Models.State;
    private _AppState: Reptile.Models.State;
    protected _data: Reptile.Service.RelatedEntity;
    _isActive: boolean;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi,
        data: Reptile.Service.RelatedEntity
    ) {
        makeAutoObservable<_BuildSettingModel, '_api' | '_domain' | '_data'>(
            this,
            {
                _api: false,
                _domain: false,
                dispose: false,
                _data: observable,
            }
        );

        this._api = api;
        this._domain = domain;
        this._data = data;
        this.status = { status: 'initial' };
        this._settings = {
            id: '',
            screens: SCREENS,
            configuration: { name: '', logo: '' },
        };
        this._imagesState = {
            status: 'initial',
        };
        this._AppState = {
            status: 'initial',
        };
        this._isActive = false;
        this.splashColor = '';
        this.splashIcon = '';
    }

    get appName(): string | undefined {
        return this._appName;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get appId() {
        return this._appId;
    }

    get app() {
        if (this._app) {
            return {
                ...this._app,
                states: [
                    this._app.initializationStageState,
                    this._app.configurationStageState,
                    this._app.buildAndSignStageState,
                    this._app.uploadStageState,
                    this._app.deployStageState,
                ],
            };
        }
        return;
    }

    get appList() {
        const appList = this._appList?.map((app) => {
            return {
                ...app,
                states: [
                    app.initializationStageState,
                    app.configurationStageState,
                    app.buildAndSignStageState,
                    app.uploadStageState,
                    app.deployStageState,
                ],
            };
        });

        if (appList && appList.length > 0) {
            appList.splice(0, 1);
        }

        if (typeof this.app !== 'number' && this.app) {
            appList?.unshift(this.app);
        }

        return appList;
    }

    get imageUploadProgress(): Reptile.Models.IAssetUpload | undefined {
        const splitUrl = location.pathname.split('/');
        const templateId = splitUrl[3];
        return this._domain.asset.activeUploads.find(
            (progress) =>
                progress.entityId === templateId && progress.kind === 'entity'
        );
    }

    get pin(): string {
        return this._pin ?? '';
    }

    get isActive() {
        return this._isActive;
    }

    handleIsActive() {
        this._isActive = !this._isActive;
    }

    async getData(id: string): Promise<void> {
        this._application = await this._api.app.fetchPin(id);

        if (!this._application) {
            this._appId = undefined;
            this._appName = undefined;
            this._imageUrl = '';
            return;
        }

        this._applicationObj = JSON.parse(
            this._application.settings
        ) as Reptile.Service.buildSettings;

        this._appId = this._application.id;

        if (this._applicationObj.configuration) {
            this._appName = this._applicationObj.configuration.name;
            this._imageUrl = this._applicationObj.configuration.logo;
        }
    }

    async saveApp(appName: string): Promise<void> {
        const image = this._image ?? this._imageUrl;

        if (this._applicationObj?.configuration && appName) {
            this._applicationObj.configuration.name = appName;
        }

        if (this._applicationObj?.configuration && image) {
            this._applicationObj.configuration.logo = image;
        }

        if (this._applicationObj?.configuration && this._application && image) {
            this._application.settings = JSON.stringify(this._applicationObj);

            if (this.status.status === 'pending') {
                return;
            }
            this.status.status = 'pending';

            try {
                const res = await this._api.app.saveApp(this._application);
                this._appId = res.id;
                this.status.status = 'done';
                Notification.success({
                    description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
                });
            } catch (error) {
                this.status.status = 'error';
                Notification.error({
                    description: MESSAGES.ERROR_SAVE_CHANGES.message,
                });
            }
        }

        if (
            !this._applicationObj?.configuration &&
            this._application &&
            image
        ) {
            this._settings.configuration.name = appName;

            this._settings.configuration.logo = image;

            this._application.settings = JSON.stringify(this._settings);

            if (this.status.status === 'pending') {
                return;
            }
            this.status.status = 'pending';

            try {
                const res = await this._api.app.saveApp(this._application);
                this._appId = res.id;
                this.status.status = 'done';
                Notification.success({
                    description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
                });
            } catch (error) {
                this.status.status = 'error';
                Notification.error({
                    description: MESSAGES.ERROR_SAVE_CHANGES.message,
                });
            }
        }
    }

    async buildAsync(appName: string): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        if (this.status.status === 'pending') {
            return;
        }

        try {
            const buildData = await this.fetchSplashFromDB();
            const payload: Reptile.Service.BuildEntity = {
                appName: appName || this._appName,
                appIcon: UTILS.loadImage(this._imageUrl || '') || '',
                splashColor: buildData.splashColor,
                splashIcon: UTILS.loadImage(buildData.splashIcon) || '',
                iconColor: '#FFFFFF', // Set static icon color as don't have UI for icon color
                loaderBGColor: buildData.loaderBGColor,
                loaderGIF: UTILS.loadImage(buildData.loaderGIF) || '',
            }
            const isPayloadValid = Object.keys(payload).every(key => {
                const value = payload[key as keyof typeof payload];
                return typeof value === 'string' ? value.trim() !== '' : !!value;
            });
            if(isPayloadValid) {
                await this._api.app.buildAsync(publicationId, payload);
                this.status.status = 'done';
                Notification.success({
                    description: MESSAGES.SUCCESS_BUILD.message,
                });
            } else {
                Notification.error({ description: MESSAGES.ERROR_BUILD.message });
            }
        } catch (error) {
            this.status.status = 'error';
            Notification.error({ description: MESSAGES.ERROR_BUILD.message });
        }
    }

    async fetchSplashFromDB() {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        let buildData = {
            splashIcon: '',
            splashColor: '',
            loaderBGColor: '',
            loaderGIF: '',
        }
        let splashJson = null;
        let loaderJson = null;
        if(publicationId) {
            const data = await this._api.layout.getWidgets(publicationId);
            const splashScreenData = data?.find(item => item.name === "Splash");
            splashJson = splashScreenData.widgets?.find(i => i.name === 'Splash Icon');            
            const loaderScreenData = data?.find(item => item.name === "Load Spinner");
            loaderJson = loaderScreenData.widgets?.find(i => i.name === "Loadie");
        } else {
            const data = await this._api.layout.getAllWidgets();
            splashJson = data?.find(i => i.name === 'Splash Icon');
            loaderJson = data?.find(i => i.name === 'Loadie');                
        }
        const splashData = splashJson ? JSON.parse(splashJson.json) : null;
        const splashStyles = splashData ? splashData.properties.styles : null;
        if(splashStyles) {
            const extractedUrl = splashStyles?.backgroundImage?.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            buildData.splashIcon = extractedUrl;
            buildData.splashColor = splashStyles.backgroundColor;
        };
        const loaderData = loaderJson ? JSON.parse(loaderJson.json) : null;
        const loaderStyles = loaderData ? loaderData.properties.styles : null;
        if(loaderStyles) {
            const extractedUrl = loaderStyles?.backgroundImage?.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            buildData.loaderGIF = extractedUrl;
            buildData.loaderBGColor = loaderStyles.backgroundColor;
        };
        return buildData;
    }

    async getAppInstaller(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        if (this._AppState.status === 'pending') {
            return;
        }

        try {
            this._app = await this._api.app.getAppInstaller(publicationId);
            this._AppState.status = 'done';
        } catch (error) {
            this._AppState.status = 'error';
        }
    }

    async waitForAppUrl(): Promise<void> {
        return new Promise<void>((resolve) => {
            const intervalId = setInterval(async () => {
                if (
                    !this.app?.initializationStageState ||
                    this.app?.deployStageState === 'Completed' ||
                    this.app?.states.includes('Failed') ||
                    this._AppState.status === 'error'
                ) {
                    clearInterval(intervalId);
                    resolve();
                } else {
                    await this.getAppInstaller();
                }
            }, 15000);
        });
    }

    async getAppInstallerList(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        try {
            this._appList = await this._api.app.getAppInstallerList(
                publicationId
            );
        } catch (error) {
            Notification.error({ description: MESSAGES.ERROR_API_FETCH.message });
        }
    }

    async setCover(file: File): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        this._imagesState.status = 'pending';

        return new Promise<void>((resolve, reject) => {
            try {
                (() => {
                    void (async () => {
                        await this._domain.asset.upload(
                            publicationId,
                            file,
                            'MobileMedia',
                            async (fileName: string, imageUri: string) => {
                                // Perform any necessary tasks in onFinish
                                await this._api.contentEntity.addImage(
                                    publicationId,
                                    fileName,
                                    false,
                                    imageUri
                                );

                                this._image = imageUri;
                                this._imagesState.status = 'done';

                                // Resolve the outer Promise after onFinish callback is complete
                                resolve();
                            }
                        );
                    })();
                })();
            } catch (error) {
                this._imagesState = {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                };
                Notification.error({
                    description: MESSAGES.ERROR_IMAGE_UPLOAD.message,
                });
                // Reject the outer Promise in case of an error
                reject(error);
            }
        });
    }

    async fetchPin(id: string): Promise<void> {
        const data = await this._api.app.fetchPin(id);
        if (data) {
            const response = data.pin.trim();
            this._pin = response;
        }

        if (!data) {
            this._pin = '';

            this._settings = {
                id: '',
                screens: SCREENS,
                configuration: { name: '', logo: '' },
            };
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
