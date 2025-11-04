declare namespace Reptile.Controllers {
    export interface IContentSettingsController extends IController {
        /**
         * Gets or sets the document name.
         */
        documentName: string,
        /**
         * Gets the cover image upload status.
         */
        readonly coverImageUploadInfo?: Models.IAssetUpload,
        /**
         * Gets the cover image of the document.
         */
        readonly coverImage: string,
        /**
         * Uploads new cover image.
         * @param file Image to upload
         */
        updateCover(file: File): Promise<void>,
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
        /**
         * Gets or sets the cover image of the document.
         */
        caption: string,
        /**
         * Gets the document tags.
         */
        readonly tags: string[],
        /**
         * Adds given tag to tags collection.
         * @param value Tag to add
         */
        addTag(value: string): void,
        /**
         * Renames the tag from tags collection.
         * @param index Index of tag to update
         * @param value New value of tag
         */
        updateTag(index: number, value: string): void,
        /**
         * Removes the tag at given position.
         * @param index Position of tag to remove
         */
        removeTag(index: number): void,
    }
}
