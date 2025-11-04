import { makeAutoObservable } from 'mobx';

type IContentSettingsController = Reptile.Controllers.IContentSettingsController;

export default class _ArticleSettingsController implements IContentSettingsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    tags: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
    ) {
        makeAutoObservable<_ArticleSettingsController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this.tags = [];
    }

    private get article(): Reptile.Models.IArticle | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.entities.get(articleId) as Reptile.Models.IArticle | undefined;
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this._uiState.navigation.articleId,
        ];
    }

    get documentName(): string {
        return this.article?.name ?? '';
    }

    set documentName(value: string) {
        const article = this.article;
        if (article) {
            article.name = value;
        }
    }

    get coverImageUploadInfo(): Reptile.Models.IAssetUpload | undefined {
        return this.article?.coverUploadProgress;
    }

    get coverImage(): string {
        return this.article?.imageUrl ?? '';
    }

    get loading(): boolean {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            const articleStatus = this._domain.content.status.entities.get(articleId);
            if (articleStatus) {
                return articleStatus.status === 'pending';
            }
        }
        return true;
    }

    get error(): string | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.status.entities.get(articleId)?.error;
        }
        return undefined;
    }

    get caption(): string {
        return this.article?.summary ?? '';
    }

    set caption(value: string) {
        const article = this.article;
        if (article) {
            article.summary = value;
        }
    }

    async initialize(): Promise<void> {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            if (!this._domain.content.entities.has(articleId)) {
                await this._domain.content.fetch(articleId);
            }
        }
    }

    async updateCover(file: File): Promise<void> {
        await this.article?.setCover(file);
    }

    addTag(value: string): void {
        this.tags.push(value);
    }

    updateTag(index: number, value: string): void {
        this.tags[index] = value;
    }

    removeTag(index: number): void {
        this.tags = [
            ...this.tags.slice(0, index),
            ...this.tags.slice(index + 1),
        ];
    }

    dispose(): void {
        /* Do nothing */
    }
}
