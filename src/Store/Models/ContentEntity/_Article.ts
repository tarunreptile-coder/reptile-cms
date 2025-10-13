import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import _ from 'lodash';
import { action, computed, makeObservable, observable, override } from 'mobx';
import ContentEntity from './_ContentEntity';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';

type IArticle = Reptile.Models.IArticle;

type ArticleEntityType = {
    entityTypeId: 5;
    entityTypeName: 'Article';
};

type ArticlePrivateFields = '_imagesState' | '_publishState' | '_images';

type AutoSaveProperties = {
    name: string;
    htmlBody: string;
    summary: string;
};

export default class Article
    extends ContentEntity<AutoSaveProperties>
    implements IArticle
{
    private _imagesState: Reptile.Models.State;

    private _publishState: Reptile.Models.State;

    private _images: string[];

    constructor(
        api: Reptile.Service.IReptileApi,
        store: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(
            api,
            store,
            data,
            undefined,
            /** Auto save callbacks */
            () => ({
                name: this._data.name,
                htmlBody: this._data.attributes.htmlBody as string,
                summary: this._data.attributes.summary as string,
            }),
            (lhs, rhs) =>
                lhs.name === rhs.name &&
                lhs.htmlBody === rhs.htmlBody &&
                lhs.summary === rhs.summary
        );

        makeObservable<Article, ArticlePrivateFields>(this, {
            contentEntityType: override,
            state: override,
            _imagesState: observable,
            _publishState: observable,
            _images: observable,
            imageUploadProgress: computed,
            htmlBody: computed,
            summary: computed,
            originalHtmlBody: computed,
            publishDate: computed,
            tagQueryParameter: computed,
            images: computed,
            issue: computed,
            fetchIssue: action.bound,
            fetchImages: action.bound,
            addImage: action.bound,
            publish: action.bound,
            save: override,
            unpublish: action.bound,
        });

        this._imagesState = {
            status: 'initial',
        };
        this._publishState = {
            status: 'initial',
        };
        this._images = [];
    }

    get contentEntityType(): ArticleEntityType {
        return this._data.contentEntityType as ArticleEntityType;
    }

    get state(): Reptile.Models.ArticleState {
        let issue = super.state.parent;

        let entity = this.parent;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Issue
        ) {
            issue = entity.state.parent;
            entity = entity.parent;
        }

        return {
            ...super.state,
            images: this._imagesState,
            publishing: this._publishState,
            issue,
        };
    }

    get imageUploadProgress(): Reptile.Models.IAssetUpload | undefined {
        return this._domain.asset.activeUploads.find(
            (progress) =>
                progress.entityId === this.id && progress.kind === 'article'
        );
    }

    get htmlBody(): string | null {
        return this._data.attributes.htmlBody as string | null;
    }

    set htmlBody(value: string | null) {
        if (this._data.attributes.htmlBody !== value) {
            this._data.attributes.htmlBody = value;
        }
    }

    get summary(): string | null {
        return this._data.attributes.summary as string | null;
    }

    set summary(value: string | null) {
        if (this._data.attributes.summary !== value) {
            this._data.attributes.summary = value;
        }
    }

    get originalHtmlBody(): string | null {
        return this._data.attributes.originalHtmlBody as string | null;
    }

    get publishDate(): Date | null {
        const publishDate = this._data.attributes.publishDate as string | null;
        return publishDate ? new Date(publishDate) : null;
    }

    get tagQueryParameter(): string | null {
        return this._data.attributes.tagQueryParameter as string | null;
    }

    get images(): Reptile.Models.IImage[] {
        return this._images
            .map((id) => this._domain.content.entities.get(id))
            .filter((entity) => !!entity) as Reptile.Models.IImage[];
    }

    get issue(): Reptile.Models.IIssue | undefined {
        let entity = this as Reptile.Models.IContentEntity | undefined | null;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Issue
        ) {
            entity = entity.parent;
        }
        return (entity ?? undefined) as Reptile.Models.IIssue | undefined;
    }

    async fetchIssue(): Promise<void> {
        // Fetch parents of the article until the issue is reached
        let entity = this as Reptile.Models.IContentEntity | undefined | null;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Issue
        ) {
            await entity.fetchParent();
            entity = entity.parent;
        }
    }

    async fetchImages(): Promise<void> {
        if (this._imagesState.status === 'pending') {
            await this._synchronization.wait('images');
            return;
        }
        this._imagesState.status = 'pending';

        try {
            const images = await this._api.contentEntity.getImages(this.id);
            images.forEach((img) => this._domain.content.set(img));
            this._images = _.map(images, 'id');
            this._imagesState.status = 'done';
        } catch (error) {
            this._imagesState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('images');
        }
    }

    async save(): Promise<void> {
        await super.save();
        // Save the issue in case the theme was changed.
        if (this.issue) {
            await this.issue.save();
        }
        if (this.state.save.status === 'done') {
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        }
    }

    async addImage(file: File): Promise<void> {
        const onFinish = async (fileName: string, imageUri: string) => {
            await this._api.contentEntity.addImage(
                this.id,
                fileName,
                !this._images.length,
                imageUri
            );
            this._imagesState.status = 'done';

            await this.fetchImages();
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        };

        if (this._imagesState.status === 'pending') {
            await this._synchronization.wait('images');
            return;
        }
        this._imagesState.status = 'pending';

        try {
            await this._domain.asset.upload(this.id, file, 'article', onFinish);
        } catch (error) {
            this._imagesState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_IMAGE_UPLOAD.message,
            });
        } finally {
            this._synchronization.signal('images');
        }
    }

    async publish(): Promise<void> {
        if (this._publishState.status === 'pending') {
            await this._synchronization.wait('publish');
            return;
        }
        this._publishState.status = 'pending';

        try {
            await this._api.contentEntity.publish({
                entityId: this.id,
                requestFrom: 0,
                publishedDate: new Date(),
                embargoDate: null,
                title: null,
                summary: null,
                themeId: null,
            });
            this._publishState.status = 'done';
        } catch (error) {
            this._publishState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publish');
        }
    }

    async unpublish(): Promise<void> {
        if (this._publishState.status === 'pending') {
            await this._synchronization.wait('publish');
            return;
        }
        this._publishState.status = 'pending';

        try {
            await this._api.contentEntity.unpublish({
                entityId: this.id,
                requestFrom: 0,
            });
            this._publishState.status = 'done';
        } catch (error) {
            this._publishState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publish');
        }
    }
}
