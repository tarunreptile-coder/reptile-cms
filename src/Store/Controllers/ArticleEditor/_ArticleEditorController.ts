import _ from 'lodash';
import { IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import { AstNode, Editor } from 'tinymce';

type ITextEditorController = Reptile.Controllers.ITextEditorController;

type ArticleEditorControllerPrivateFields =
    | '_domain'
    | '_uiState'
    | '_editor'
    | 'createElementWithContent'
    | 'styleInnerNodes';

export default class _ArticleEditorController implements ITextEditorController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _editor?: Editor;

    private _themeUpdateDisposer?: IReactionDisposer;

    readonly mode: 'content' | 'rich-text' = 'content';

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<
            _ArticleEditorController,
            ArticleEditorControllerPrivateFields
        >(this, {
            _domain: false,
            _uiState: false,
            _editor: false,
            mode: false,
            createElementWithContent: false,
            styleInnerNodes: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        // Listen for theme change
        this._themeUpdateDisposer = reaction(
            () => this.theme?.css,
            (newValue) => {
                if (newValue && this._editor) {
                    // Apply theme styles to editor
                    const element = this._editor.dom
                        ?.select('head')[0]
                        .getElementsByTagName('style')
                        .item(0);
                    if (element) {
                        element.innerHTML = this.styles;
                    }
                }
            }
        );
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
        return this.article?.issue;
    }

    private get publication(): Reptile.Models.IPublication | undefined {
        return this.issue?.publication;
    }

    get rawFonts(): Reptile.Models.Font[] | undefined {
        return this.publication?.fonts;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this.issue?.theme;
    }

    get fonts(): string {
        return (
            this.rawFonts
                ?.map(({ name }) => `${name.displayName}=${name.name}`)
                .join(';') ?? ''
        );
    }

    get styles(): string {
        return `${_.map(this.rawFonts ?? [], 'css').join('') ?? ''}${
            this.theme?.css ?? ''
        }`;
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
                !['done', 'error'].includes(
                    this.issue?.state.publication.status ?? ''
                ) ||
                !['done', 'error'].includes(
                    this.publication?.state.font.status ?? ''
                )
            );
        }

        return true;
    }

    get error(): string | undefined {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            return (
                this._domain.content.status.entities.get(articleId)?.error ||
                this.article?.state.issue.error ||
                this.issue?.state.theme.error ||
                this.issue?.state.publication.error ||
                this.publication?.state.font.error
            );
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [this._uiState.navigation.articleId];
    }

    get value(): string {
        return this.article?.htmlBody ?? '';
    }

    set value(v: string) {
        const article = this.article;
        if (article) {
            article.htmlBody = v;
        }
    }

    private createElementWithContent(
        rule: Reptile.Models.Rule,
        text: string | null
    ): HTMLElement {
        let element = null;
        if (rule.selectorType === 'tag') {
            element = document.createElement(rule.selectors[0]);
        } else {
            element = document.createElement('span');
        }

        element.innerHTML = text ?? '';

        if (rule.selectorType === 'id') {
            element.id = rule.selectors[0].replace('#', '');
        } else if (rule.selectorType === 'class') {
            element.className = rule.selectors[0].replace('.', '');
        }

        return element;
    }

    private styleInnerNodes(
        wrapper: HTMLDivElement,
        rule: Reptile.Models.Rule
    ): HTMLDivElement {
        for (const childNode in wrapper.childNodes) {
            if (wrapper.childNodes.hasOwnProperty(childNode)) {
                if (
                    wrapper.childNodes[childNode].nodeType === Node.ELEMENT_NODE
                ) {
                    wrapper.childNodes[childNode].replaceWith(
                        this.styleInnerNodes(
                            wrapper.childNodes[childNode] as HTMLDivElement,
                            rule
                        )
                    );
                } else {
                    const elementHtml =
                        wrapper.childNodes[childNode].textContent;
                    wrapper.childNodes[childNode].replaceWith(
                        this.createElementWithContent(rule, elementHtml)
                    );
                }
            }
        }
        return wrapper;
    }

    private styleImage(
        node: AstNode,
        rule: Reptile.Models.Rule
    ): HTMLDivElement {
        const element = document.createElement('img');

        if (rule.selectorType === 'id') {
            element.id = rule.selectors[0].replace('#', '');
        } else if (rule.selectorType === 'class') {
            element.className = rule.selectors[0].replace('.', '');
        }

        element.src =
            node?.firstChild?.attributes?.find((x) => x.name === 'src')
                ?.value ?? '';

        return element;
    }

    initEditor(editor: Editor): void {
        this._editor = editor;
        this._editor.undoManager.clear();
    }

    async initialize(): Promise<void> {
        const articleId = this._uiState.navigation.articleId;
        if (articleId) {
            if (!this._domain.content.entities.has(articleId)) {
                await this._domain.content.fetch(articleId);
            }

            const article = this.article;
            if (article) {
                if (article.state.issue.status !== 'done') {
                    await article.fetchIssue();
                }
            }

            const issue = this.issue;
            if (issue) {
                await issue.fetchTheme();
            }

            if (issue) {
                if (issue.state.publication.status !== 'done') {
                    await issue.fetchPublication();
                }
            }

            const publication = this.publication;
            if (publication) {
                if (publication.state.font.status !== 'done') {
                    await publication.fetchFonts();
                }
            }
        }

        if (this._editor) {
            this._editor.undoManager.clear();
        }
    }

    insertImage(img: string, caption: string): void {
        const htmlImage =
            caption != undefined
                ? `<div data-article-image='RT_article-image'><img src="${img}" /><div class="caption"><p>${caption}</p></div></div>`
                : `<div data-article-image='RT_article-image'><img src="${img}" /></div>`;

        this._editor?.selection.setContent(htmlImage);
        this._editor?.undoManager.add({
            content: this._editor?.selection.getContent(),
        } as never);
    }

    applyStyle(styleRule: Reptile.Models.Rule): void {
        let wrapper = document.createElement('div');
        let selection: AstNode | string | undefined;

        selection = this._editor?.selection.getContent({ format: 'tree' });

        if (selection?.firstChild?.name === 'img') {
            wrapper.replaceChildren(this.styleImage(selection, styleRule));
        }

        if (selection?.firstChild?.name !== 'img') {
            selection = this._editor?.selection.getContent({ format: 'text' });

            if (!selection) {
                return;
            }

            wrapper.innerHTML = selection;

            wrapper = this.styleInnerNodes(wrapper, styleRule);
        }

        this._editor?.selection.setContent(wrapper.innerHTML);
        this._editor?.setContent(this._editor?.getContent());
        this._editor?.undoManager.add({
            content: this._editor?.getContent(),
        } as never);
    }

    dispose(): void {
        if (this._themeUpdateDisposer) {
            this._themeUpdateDisposer();
            this._themeUpdateDisposer = undefined;
        }
    }
}
