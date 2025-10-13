declare namespace Reptile.Controllers {
    export interface IPrototypeController extends IController {
        pin: string;
        appName?: string;
        newAppName?: string;
        coverImage?: string;
        newCoverImage: string;
        coverImageUploadInfo?: Models.IAssetUpload;
        loading: boolean;
        saveStatus?: Reptile.Models.State;
        superUser: boolean;
        subscription?: Reptile.Models.SubscriptionInfo;
        appStatus?: {
            error: boolean;
            pending: boolean;
            complete: boolean;
        };
        appList?: Reptile.Service.AppInstallerList;
        app?: Reptile.Service.AppInstaller;
        active: number;
        selectedApp?: Reptile.Service.AppInstaller;
        steps: string[];
        tabValue: string;
        fetchPin(): Promise<void>;
        getData(): Promise<void>;
        getSubscriptionData(): Promise<void>;
        updateCover(file: File): void;
        removeImage(): void;
        saveApp(): Promise<void>;
        buildAsync(): Promise<void>;
        navigateToPlan(): void;
        getDefaultProjectCount(): number;
    }

    export interface IBuildSettingController extends IController {
        id: string;
        pin: string;
        appName: string;
        response: string;
        buildResponse: boolean;
        /**
         * Gets the cover image upload status.
         */
        readonly coverImageUploadInfo?: Models.IAssetUpload;
        /**
         * Gets the cover image of the document.
         */
        readonly coverImage: string;
        /**
         * Uploads new cover image.
         * @param file Image to upload
         */
        updateCover(file: File): Promise<void>;
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Gets the document tags.
         */
        readonly tags: string[];
        /**
         * Adds given tag to tags collection.
         * @param value Tag to add
         */
        addTag(value: string): void;
        /**
         * Renames the tag from tags collection.
         * @param index Index of tag to update
         * @param value New value of tag
         */
        updateTag(index: number, value: string): void;
        /**
         * Removes the tag at given position.
         * @param index Position of tag to remove
         */
        removeImage(): void;
        saveApp(): Promise<void>;
        getData(): Promise<void>;
        buildAsync(): Promise<void>;
    }
}
