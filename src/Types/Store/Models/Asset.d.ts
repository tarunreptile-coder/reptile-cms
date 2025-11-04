declare namespace Reptile.Models {
    export interface IAssetUpload extends IDisposable {
        /**
         * Id of the entity owner of the image.
         */
        readonly entityId: string,
        /**
         * Custom field to distinguish active progresses.
         */
        readonly kind?: string,
        /**
         * Name of the file being uploaded.
         */
        readonly filename: string,
        /**
         * Size of file in bytes.
         */
        readonly sizeInBytes: number,
        /**
         * Progress in percentage.
         */
        readonly progress: number,
        /**
         * Uploads the file to the server.
         * @returns Url to the uploaded file
         */
        upload(): Promise<string>,
    }
}
