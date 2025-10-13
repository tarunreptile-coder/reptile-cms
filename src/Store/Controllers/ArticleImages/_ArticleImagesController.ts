import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type IContentImagesController = Reptile.Controllers.IContentImagesController;

export default class _ArticleImagesController implements IContentImagesController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private readonly _articleEditor: Reptile.Controllers.ITextEditorController;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        articleEditor: Reptile.Controllers.ITextEditorController,
    ) {
        makeAutoObservable<_ArticleImagesController, '_domain' | '_uiState' | '_articleEditor'>(this, {
            _domain: false,
            _uiState: false,
            _articleEditor: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._articleEditor = articleEditor;
    }

    private get article(): Reptile.Models.IArticle | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.entities.get(articleId) as Reptile.Models.IArticle | undefined;
        }
        return undefined;
    }

    get loading(): boolean {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            const articleStatus = this._domain.content.status.entities.get(articleId);
            if (articleStatus) {
                if (articleStatus.status !== 'pending') {
                    // If images status is done or error loading has finished.
                    return !['done', 'error'].includes(this.article?.state.images.status ?? '');
                }
            }
        }
        return true;
    }

    get error(): string | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.status.entities.get(articleId)?.error || this.article?.state.images?.error;
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this._uiState.navigation.articleId,
        ];
    }

    get images(): string[] {
        return _.map(this.article?.images ?? [], 'imageUrl').filter((url) => !!url) as string[];
    }

    get imageUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        return this.article?.imageUploadProgress;
    }

    async initialize(): Promise<void> {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            if (!this._domain.content.entities.has(articleId)) {
                await this._domain.content.fetch(articleId);
            }
            if (this.article?.state.images.status !== 'done') {
                await this.article?.fetchImages();
            }
        }
    }

    async addImage(file: File): Promise<void> {
        await this.article?.addImage(file);
    }

    async removeImage(index: number): Promise<void> {
        await this.article?.images[index].delete();
    }

    insertImage(index: number, caption: string): void {
        this._articleEditor.insertImage(this.images[index], caption);
    }

    downloadImage(index: number): void {
        const imageUrl = this.article?.images[index].imageUrl;
        if (imageUrl) {
            window.open(imageUrl);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
