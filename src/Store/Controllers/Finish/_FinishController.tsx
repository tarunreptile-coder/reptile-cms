import { makeAutoObservable } from 'mobx';

type IFinishController = Reptile.Controllers.IFinishController;

export default class _FinishController implements IFinishController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _step: number;

    private _submit: boolean;

    private _isSubmitted: boolean;

    private _type?: 'android' | 'IOS';

    private _android: {
        androidServiceAccount: string;
        appIdentifier: string;
        keyAlias: string;
        keyPassword: string;
        keyStoreFileName: File | string;
        keyStorePassword: string;
        serviceAccountJsonBlobURL: File | string;
    };

    private _IOS: {
        appIdentifier: string;
        appSpecificId: string;
        apiKey: string;
        apiKeyId: string;
        p12FileName: string;
        p12Password: string;
        provisioningProfile: string;
        pat: string;
    };

    private _existing: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_FinishController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
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
        this._existing = false;
        this._submit = false;
        this._isSubmitted = false;
        this._step = 1;
    }

    get step() {
        return this._step;
    }

    set step(v) {
        this._step = v;
    }

    get submit() {
        return this._submit;
    }

    set submit(v) {
        this._submit = v;
    }
    
    get isSubmitted() {
        return this._isSubmitted;
    }

    set isSubmitted(v) {
        this._isSubmitted = v;
    }

    get type() {
        return this._type;
    }

    set type(v) {
        this._type = v;
    }

    get android() {
        return this._android;
    }

    set android(v) {
        this._android = v;
    }

    get isDisabled() {
        if (
            Object.values(this._android).every((str) => str) ||
            Object.values(this._IOS).every((str) => str)
        ) {
            return false;
        }
        this._isSubmitted = false;
        return true;
    }

    get IOS() {
        return this._IOS;
    }

    set IOS(v) {
        this._IOS = v;
    }

    get existing() {
        return this._existing;
    }

    set existing(v) {
        this._existing = v;
    }

    get keyStoreFileUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        const splitUrl = location.pathname.split('/');
        const templateId = splitUrl[3];
        return this._domain.asset.activeUploads.find(
            (progress) =>
                progress.entityId === templateId && progress.kind === 'entity'
        );
    }

    navigateToDocs() {
        if (this._type === 'android') {
            window.open('https://support.google.com/a/answer/7378726?hl=en');
        }

        if (this._type === 'IOS') {
            window.open(
                'https://support.appmachine.com/support/solutions/articles/80001023345-v2-how-to-setup-app-store-connect-api-key'
            );
        }
    }

    navigateToMail() {
        window.location.href = 'mailto:info@pagelizard.com';
    }

    async onActionClick() {
        if (
            (this._submit &&
                Object.values(this._android).every((str) => str)) ||
            (this._submit && Object.values(this._IOS).every((str) => str))
        ) {
            if(this.type === 'android') {
                if(this.type === 'android' && 
                    this.android.keyStoreFileName && 
                    typeof this.android.keyStoreFileName !== 'string'
                ) {
                    const keyStoreUrl = await this._domain.finish.uploadFile(
                        this.android.keyStoreFileName, 'keyStoreFileName'
                    );
                    this.android.keyStoreFileName = keyStoreUrl;
                }
                if(this.type === 'android' && 
                    this.android.serviceAccountJsonBlobURL && 
                    typeof this.android.serviceAccountJsonBlobURL !== 'string') {
                    const serviceAccountUrl = await this._domain.finish.uploadFile(
                        this.android.serviceAccountJsonBlobURL, 'serviceAccountJsonBlobURL'
                    );
                    this.android.serviceAccountJsonBlobURL = serviceAccountUrl;
                }
                const payload = {
                    ...this.android,
                    applicationId: "00000000-0000-0000-0000-000000000000",
                }
                const isSuccess = await this._domain.finish.releaseAndroidAsync(payload);
                if(isSuccess) {
                    this._isSubmitted = true;
                    // this._existing = true;
                    this._step = 1;
                }
            } else {
                console.log('submit logic here');
            }
            return;
        }

        this._step = this._step + 1;

        if (this.type === 'android' && this._step === 4) {
            this._submit = true;
        }

        if (this.type === 'IOS' && this._step === 6) {
            this._submit = true;
        }
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
