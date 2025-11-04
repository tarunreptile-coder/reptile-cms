import { makeAutoObservable } from 'mobx';

type IContentActionsController = Reptile.Controllers.IContentActionsController;

export default class _ArticleActionsController implements IContentActionsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
    ) {
        makeAutoObservable<_ArticleActionsController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
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
            if (!articleStatus || articleStatus.status === 'pending') {
                return true;
            }
        }
        const article = this.article;
        if (article) {
            return article.state.save.status === 'pending'
                || article.state.publishing.status === 'pending';
        }
        return true;
    }

    get error(): string | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.status.entities.get(articleId)?.error
                || this.article?.state.save.error
                || this.article?.state.publishing.error;
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this._uiState.navigation.articleId,
        ];
    }

    async initialize(): Promise<void> {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            if (!this._domain.content.entities.has(articleId)) {
                await this._domain.content.fetch(articleId);
            }
        }
    }

    async save(): Promise<void> {
        
        await this.article?.save();
    }

    async saveAndPublish(): Promise<void> {
        await this.article?.save();
        await this.article?.publish();
    }

    dispose(): void {
        /* Do nothing */
    }
}
