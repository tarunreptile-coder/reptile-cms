declare namespace Reptile.Controllers {
    export interface IFinishController extends IController {
        step: number;

        submit: boolean;

        isSubmitted: boolean;

        type?: 'android' | 'IOS';

        keyStoreFileUploadInfo?: Models.IAssetUpload;

        android: {
            androidServiceAccount: string;
            appIdentifier: string;
            keyAlias: string;
            keyPassword: string;
            keyStoreFileName: File | string;
            keyStorePassword: string;
            serviceAccountJsonBlobURL: File | string;
        };

        IOS: {
            appIdentifier: string;
            appSpecificId: string;
            apiKey: string;
            apiKeyId: string;
            p12FileName: string;
            p12Password: string;
            provisioningProfile: string;
            pat: string;
        };

        isDisabled: boolean;

        existing: boolean;
        /**
         * Submit inputs on click.
         */
        onActionClick(): void;

        navigateToDocs(): void;

        navigateToMail(): void;
    }
}
