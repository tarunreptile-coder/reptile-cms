import { makeAutoObservable, runInAction } from 'mobx';

type IAssetUpload = Reptile.Models.IAssetUpload;

export default class ImageUpload implements IAssetUpload {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _file: File;

    private readonly _publisher: string;

    private readonly _publisherId: string;

    private readonly _publication: string;

    private readonly _publicationId: string;

    private readonly _onFinish?: (fileName: string, imageUri: string) => Promise<void>;

    constructor(
        entityId: string,
        kind: string | undefined,
        file: File,
        api: Reptile.Service.IReptileApi,
        publisher: string,
        publisherId: string,
        publication: string,
        publicationId: string,
        onFinish?: (fileName: string, imageUri: string) => Promise<void>
    ) {
        makeAutoObservable<ImageUpload, '_api' | '_file' | '_onFinish'>(this, {
            dispose: false,
            _api: false,
            _file: false,
            entityId: false,
            _onFinish: false,
            kind: false,
            filename: false,
            sizeInBytes: false,
        });

        this._api = api;
        this._file = file;
        this._publisher = publisher;
        this._publisherId = publisherId;
        this._publication = publication;
        this._publicationId = publicationId;
        this._onFinish = onFinish;
        this.entityId = entityId;
        this.kind = kind;
        this.progress = 0;
    }

    entityId: string;

    kind?: string | undefined;

    get filename(): string {
        return this._file.name;
    }

    get sizeInBytes() {
        return this._file.size;
    }

    progress: number;

    async upload(): Promise<string> {
        
        const fileName = await this._api.asset.uploadImage(
            this._file,
            this._publisherId,
            this._publisher,
            this._publicationId,
            this._publication,
            (e) => {
                runInAction(() => {
                    this.progress = Math.round((e.loaded * 100) / e.total);
                });
            },
            this._onFinish,
            this.kind
        );
        return fileName;
    }

    dispose(): void {
        /* Do nothing */
    }
}
