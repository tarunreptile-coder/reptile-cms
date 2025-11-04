import { makeAutoObservable, runInAction } from 'mobx';

type IAssetUpload = Reptile.Models.IAssetUpload;

export default class GraphicUpload implements IAssetUpload {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _file: File;

    constructor(
        entityId: string,
        kind: string | undefined,
        file: File,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<GraphicUpload, '_api' | '_file'>(this, {
            dispose: false,
            _api: false,
            _file: false,
            entityId: false,
            kind: false,
            filename: false,
            sizeInBytes: false,
        });

        this._api = api;
        this._file = file;
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
        const { imageUrl } = await this._api.asset.uploadGraphic(
            this._file,
            this.entityId,
            (e) => {
                runInAction(() => {
                    this.progress = Math.round((e.loaded * 100) / e.total);
                });
            },
        );
        return imageUrl;
    }

    dispose(): void {
        /* Do nothing */
    }
}
