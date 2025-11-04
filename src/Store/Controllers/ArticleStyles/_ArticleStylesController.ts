import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import { makeAutoObservable } from 'mobx';

type IContentStylesController = Reptile.Controllers.IContentStylesController;

export default class _ArticleStylesController
    implements IContentStylesController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private readonly _articleEditor: Reptile.Controllers.ITextEditorController;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        articleEditor: Reptile.Controllers.ITextEditorController
    ) {
        makeAutoObservable<
            _ArticleStylesController,
            '_domain' | '_uiState' | '_articleEditor'
        >(this, {
            _domain: false,
            _uiState: false,
            _articleEditor: false,
            requestEditTheme: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._articleEditor = articleEditor;
    }

    async fetchThemes(id?: string): Promise<void> {
            await this._domain.theme.fetch(id);

            if(this.issue && this._domain.theme.theme){
                this.issue.theme = this._domain.theme.theme
            }
    }

    private get article(): Reptile.Models.IArticle | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return this._domain.content.entities.get(articleId) as
                | Reptile.Models.IArticle
                | undefined;
        }
        return undefined;
    }

    private get issue(): Reptile.Models.IIssue | undefined {
        let entity = this.article as
            | Reptile.Models.IContentEntity
            | undefined
            | null;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Issue
        ) {
            entity = entity.parent;
        }
        return (entity ?? undefined) as Reptile.Models.IIssue | undefined;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this.issue?.theme;
    }

    get themes(): Reptile.Models.IThemesStyling[] {
        return this._domain.theme.themes;
    }

    get loading(): boolean {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return (
                !['done', 'error'].includes(
                    this._domain.content.status.entities.get(articleId)
                        ?.status ?? ''
                ) ||
                !['done', 'error'].includes(
                    this.article?.state.issue.status ?? ''
                ) ||
                !['done', 'error'].includes(
                    this.issue?.state.theme.status ?? ''
                ) ||
                this._domain.theme.status.all.status === 'pending'
            );
        }

        return true;
    }

    get hideStyles(): boolean {
        return false;
    }

    get error(): string | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return (
                this._domain.content.status.entities.get(articleId)?.error ||
                this.article?.state.issue.error ||
                this.issue?.state.theme.error ||
                this._domain.theme.status.all.error
            );
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [this._uiState.navigation.articleId];
    }

    async initialize(): Promise<void> {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            if (!this._domain.content.entities.has(articleId)) {
                await this._domain.content.fetch(articleId);
            }

            // Fetch issue
            const article = this.article;
            if (article) {
                if (article.state.issue.status !== 'done') {
                    await article.fetchIssue();
                }
            }

            // Fetch theme
            const issue = this.issue;
            if (issue) {
                await issue.fetchTheme();
            }
        }
    }

    requestEditTheme(themeId: string): void {
        this._uiState.navigation.navigate(`/edit-themes/${themeId}`);
    }

    applyStyle(style: Reptile.Models.Rule): void {
        this._articleEditor.applyStyle(style);
    }

    dispose(): void {
        /* Do nothing */
    }
}
