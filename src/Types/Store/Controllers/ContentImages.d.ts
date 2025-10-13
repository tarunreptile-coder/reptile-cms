declare namespace Reptile.Controllers {
    export interface IContentImagesController extends IController {
        /**
         * Gets all images in the library.
         */
        readonly images: string[],
        /**
         * Gets the image upload status.
         */
        readonly imageUploadInfo?: Models.IAssetUpload,
        /**
         * Uploads new image to the library.
         * @param file Image to upload
         */
        addImage(file: File): Promise<void>,
        /**
         * Removes the image at given index from the library.
         * @param index Index of image to remove
         */
        removeImage(index: number): Promise<void>,
        /**
         * Opens image in a new tab.
         * @param index Index of image to open
         */
        downloadImage(index: number): void,
        /**
         * Allows inserting image at given index to some controlled content.
         * @param index Index of image to insert
         * @param caption Caption of the image
         */
        insertImage(index: number, caption: string): void,
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
    }
}
