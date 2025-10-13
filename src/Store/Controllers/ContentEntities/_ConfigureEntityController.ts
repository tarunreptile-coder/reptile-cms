import { makeAutoObservable } from 'mobx';

type IContentEntity = Reptile.Models.IContentEntity;

export default class ConfigureEntityController implements IContentEntity {
    private readonly _contentEntity: Reptile.Models.IContentEntity;

    private _name: string;

    private _image: string | null;

    private _imageFile: File | null;

    constructor(contentEntity: IContentEntity) {
        makeAutoObservable<ConfigureEntityController, '_contentEntity'>(this, {
            _contentEntity: false,
            dispose: false,
        });

        this._contentEntity = contentEntity;
        this._name = this._contentEntity.name;
        this._image = this._contentEntity.imageUrl;
        this._imageFile = null;
    }

    get id(): string {
        return this._contentEntity.id;
    }

    get imageUrl(): string | null {
        return this._image;
    }

    get isDeleted(): boolean {
        return this._contentEntity.isDeleted;
    }

    get hidden(): boolean {
        return this._contentEntity.hidden;
    }

    get parent(): Reptile.Models.IContentEntity | undefined {
        return this._contentEntity.parent;
    }

    get updated(): Date {
        return this._contentEntity.updated;
    }

    get created(): Date {
        return this._contentEntity.created;
    }

    get contentEntityType(): Reptile.Service.ContentEntityType {
        return this._contentEntity.contentEntityType;
    }

    get name(): string {
        return this._name;
    }

    set name(v: string) {
        this._name = v;
    }

    get order(): number {
        return this._contentEntity.order;
    }

    get state(): Reptile.Models.ContentEntityState {
        return this._contentEntity.state;
    }

    get coverUploadProgress(): Reptile.Models.IAssetUpload | undefined {
        return this._contentEntity.coverUploadProgress;
    }

    get children(): Reptile.Models.IContentEntity[] {
        return this._contentEntity.children;
    }

    get contentLength() {
        return this._contentEntity.contentLength;
    }

    async setCover(file: File): Promise<void> {
        this._imageFile = file;
        this._image = URL.createObjectURL(file);
        return await Promise.resolve();
    }

    async fetchChildren(): Promise<void> {
        await this._contentEntity.fetchChildren(
            this._contentEntity.id,
            this._contentEntity.contentEntityType.entityTypeId
        );
    }

    async fetchParent(): Promise<void> {
        await this._contentEntity.fetchParent();
    }

    async delete(): Promise<void> {
        await this._contentEntity.delete();
    }

    async save(): Promise<void> {
        if (this._imageFile) {
            await this._contentEntity.setCover(this._imageFile);
        }

        this._contentEntity.name = this._name;
        await this._contentEntity.save();
    }

    update(data: Reptile.Service.ContentEntity): void {
        this._contentEntity.update(data);
    }

    async refresh(): Promise<void> {
        await this._contentEntity.refresh();
    }

    dispose(): void {
        this._contentEntity.dispose();
    }
}
