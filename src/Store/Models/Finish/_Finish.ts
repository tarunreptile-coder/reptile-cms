import { makeAutoObservable, observable } from 'mobx';
import { MESSAGES } from '@Reptile/Constants/Constants';
import { Notification } from '@Reptile/Components/Atoms';
import { UTILS } from '~/Utils';

type IFinishModel = Reptile.Models.IFinishModel;

export default class _FinishModel implements IFinishModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    status: Reptile.Models.State;
    _step: number;
    _submit: boolean;
    _type?: 'android' | 'IOS';
    _android: {
        androidServiceAccount: string;
        appIdentifier: string;
        keyAlias: string;
        keyPassword: string;
        keyStoreFileName: string;
        keyStorePassword: string;
        serviceAccountJsonBlobURL: string;
    };
    _IOS: {
        appIdentifier: string;
        appSpecificId: string;
        apiKey: string;
        apiKeyId: string;
        p12FileName: string;
        p12Password: string;
        provisioningProfile: string;
        pat: string;
    };
    _isDisabled?: boolean;
    _existing?: boolean;
    private _appData: {
        appName: string | undefined;
        appIcon: string | undefined;
        splashIcon: string;
        splashColor: string;
        loaderBGColor: string,
        loaderGIF: string,
    }
    private _imagesState: Reptile.Models.State;
    protected _data: Reptile.Service.RelatedEntity;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi,
        data: Reptile.Service.RelatedEntity
    ) {
        makeAutoObservable<_FinishModel, '_api' | '_domain' | '_data'>(
            this,
            {
                _api: false,
                _domain: false,
                _data: observable,
                dispose: false,
            }
        );

        this._api = api;
        this._domain = domain;
        this._data = data;
        this.status = { status: 'initial' };
        this._imagesState = {
            status: 'initial',
        };
        this._step = 1;
        this._submit = false;
        this._android = {
            androidServiceAccount: '',
            appIdentifier: '',
            keyAlias: '',
            keyPassword: '',
            keyStoreFileName: '',
            keyStorePassword: '',
            serviceAccountJsonBlobURL: '',
        };
        this._IOS = {
            appIdentifier: '',
            appSpecificId: '',
            apiKey: '',
            apiKeyId: '',
            p12FileName: '',
            p12Password: '',
            provisioningProfile: '',
            pat: '',
        };
        this._isDisabled = false;
        this._existing = false;
        this._appData = {
            appName: '',
            appIcon: '',
            splashIcon: '',
            splashColor: '',
        }
    }

    get step(): number {
        return this._step;
    }

    get submit() {
        return this._submit;
    }
    get type() {
        return this._type;
    }
    get android() {
        return this._android;
    }
    get IOS() {
        return this._IOS;
    }
    get isDisabled() {
        return this._isDisabled;
    }
    get existing() {
        return this._existing;
    }

    get keyStoreFileUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        const splitUrl = location.pathname.split('/');
        const templateId = splitUrl[3];
        return this._domain.asset.activeUploads.find(
            (progress) =>
                progress.entityId === templateId && progress.kind === 'entity'
        );
    }

    async getData(id: string): Promise<void> {
        // this._application = await this._api.app.fetchPin(id);

        // if (!this._application) {
        //     this._appId = undefined;
        //     this._appName = undefined;
        //     this._imageUrl = '';
        //     return;
        // }

        // this._applicationObj = JSON.parse(
        //     this._application.settings
        // ) as Reptile.Service.buildSettings;

        // this._appId = this._application.id;

        // if (this._applicationObj.configuration) {
        //     this._appName = this._applicationObj.configuration.name;
        //     this._imageUrl = this._applicationObj.configuration.logo;
        // }
    }

    async getAppData() {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        await this.fetchSplashFromDB();
        await this.fetchAppDataFromDB(publicationId);
    }

    async fetchSplashFromDB(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
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
            this._appData.splashIcon = extractedUrl;
            this._appData.splashColor = splashStyles.backgroundColor;
        };
        const loaderData = loaderJson ? JSON.parse(loaderJson.json) : null;
        const loaderStyles = loaderData ? loaderData.properties.styles : null;
        if(loaderStyles) {
            const extractedUrl = loaderStyles?.backgroundImage?.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            this._appData.loaderGIF = extractedUrl;
            this._appData.loaderBGColor = loaderStyles.backgroundColor;
        };
    }
   
    async fetchAppDataFromDB(id: string): Promise<void> {
        await this._domain.buildSetting.getData(id);
        this._appData.appName = this._domain.buildSetting.appName;
        this._appData.appIcon = this._domain.buildSetting.imageUrl;
    }

    async releaseAndroidAsync(payload: any): Promise<boolean> {        
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        let isSuccess = false;
        if (this.status.status === 'pending') {
            return isSuccess;
        }

        try {
            await this.getAppData();

            const params: Reptile.Service.AndroidEntity = {
                applicationId: payload.applicationId,
                publicationId: publicationId,
                appName: this._appData.appName,
                appIcon: this._appData.appIcon ? UTILS.loadImage(this._appData.appIcon) : '',
                splashColor: this._appData.splashColor,
                splashIcon: this._appData.splashIcon ? UTILS.loadImage(this._appData.splashIcon) : '',
                loaderBGColor: this._appData.loaderBGColor,
                loaderGIF: UTILS.loadImage(this._appData.loaderGIF) || '',
                iconColor: '#FFFFFF', // Set static icon color as don't have UI for icon color
                packageName: payload.appIdentifier,
                applicationName: payload.androidServiceAccount,
                keyAlias: payload.keyAlias,
                keyPassword: payload.keyPassword,
                keyStoreFileURL: payload.keyStoreFileName,
                keyStorePassword: payload.keyStorePassword,
                serviceAccountJsonBlobURL: payload.serviceAccountJsonBlobURL,
            }
            const isPayloadValid = Object.keys(params).every(key => {
                const value = params[key as keyof typeof params];
                return typeof value === 'string' ? value.trim() !== '' : !!value;
            });
            if(isPayloadValid) {
                await this._api.app.releaseAndroidBuild(params);
                this.status.status = 'done';
                Notification.success({
                    description: MESSAGES.SUCCESS_RELEASE.message,
                });
                isSuccess = true;
            } else {
                Notification.error({ description: MESSAGES.ERROR_RELEASE.message });
            }
        } catch (error) {
            this.status.status = 'error';
            Notification.error({ description: MESSAGES.ERROR_RELEASE.message });
        }
        return isSuccess;
    }

    async uploadFile(file: File, name: string): Promise<string> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        this._imagesState.status = 'pending';

        return new Promise<string>((resolve, reject) => {
            try {
                (() => {
                    void (async () => {
                        await this._domain.asset.upload(
                            publicationId,
                            file,
                            'AppBuildDetails',
                            async (_fileName: string, imageUri: string) => {
                                // Perform any necessary tasks in onFinish
                                // this._fileUploadUrls = {...this._fileUploadUrls, [name]: imageUri};
                                this._imagesState.status = 'done';
                                // Resolve the outer Promise after onFinish callback is complete
                                resolve(imageUri);
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
    
    dispose(): void {
        /* Do nothing */
    }
}
