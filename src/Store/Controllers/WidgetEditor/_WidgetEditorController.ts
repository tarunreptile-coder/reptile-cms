import { makeAutoObservable } from 'mobx';
import { Editor } from 'tinymce';

type ITextEditorController = Reptile.Controllers.ITextEditorController;

type IController = Reptile.Controllers.IController<[Reptile.Models.IWidget]>;

type WidgetEditorControllerPrivateFields = '_domain' | '_uiState' | '_editor';

export default class _WidgetEditorController
    implements ITextEditorController, IController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _editor?: Editor;

    private _widget?: Reptile.Models.IWidget;

    private _contents: boolean;

    readonly mode: 'content' | 'rich-text' = 'rich-text';

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        widget?: Reptile.Models.IWidget,
    ) {
        makeAutoObservable<
            _WidgetEditorController,
            WidgetEditorControllerPrivateFields
        >(this, {
            _domain: false,
            _uiState: false,
            _editor: false,
            mode: false,
            loading: false,
            error: false,
            insertImage: false,
            applyStyle: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._contents = false;
        this._widget = widget;
    }

    private get template(): Reptile.Models.ITemplate | undefined {
        return (
            this._uiState.navigation.templateId
                ? this._domain.content.entities.get(
                      this._uiState.navigation.templateId
                  )
                : undefined
        ) as Reptile.Models.ITemplate | undefined;
    }

    private get publication(): Reptile.Models.IPublication | undefined {
        return this.template?.publication;
    }

    get fonts(): string {
        return (
            this.publication?.fonts
                ?.map(({ name }) => `${name.displayName}=${name.name}`)
                .join(';') ?? ''
        );
    }

    get styles(): string {
        return 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }';
    }

    get loading(): boolean {
        const templateId = this._uiState.navigation.templateId;
        if (!templateId) {
            return true;
        }
        return (
            !['done', 'error'].includes(
                this._domain.content.status.entities.get(templateId)?.status ??
                    ''
            ) ||
            !['done', 'error'].includes(
                this.template?.state.publication.status ?? ''
            ) ||
            !['done', 'error'].includes(
                this.publication?.state.font.status ?? ''
            )
        );
    }

    get error(): string | undefined {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            return (
                this._domain.content.status.entities.get(templateId)?.error ||
                this.template?.state.publication.error ||
                this.publication?.state.font.error
            );
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    get value(): string {
        if (this._widget && !this._contents) {
            return this._widget.contents[0]?.properties?.htmlBody ?? '';
        }

        if (this._widget && this._contents) {
            return this._widget.contents[1]?.properties?.htmlBody ?? '';
        }

        return '';
    }

    set value(v: string) {
        if (this._widget && !this._contents) {
            this._widget.contents[0].properties.htmlBody = v;
        }
        if (this._widget && this._contents) {
            this._widget.contents[1].properties.htmlBody = v;
        }
    }

    async initialize(
        widget?: Reptile.Models.IWidget,
        contents?: boolean
    ): Promise<void> {
        if (widget) {
            this._widget = widget;
        }

        if (contents) {
            this._contents = contents;
        }

        if (!widget) {
            const templateId = this._uiState.navigation.templateId;
            if (templateId) {
                if (
                    this._domain.content.status.entities.get(templateId)
                        ?.status !== 'done'
                ) {
                    await this._domain.content.fetch(templateId);
                }
            }

            const template = this.template;
            if (template) {
                if (template.state.publication.status !== 'done') {
                    await this.template?.fetchPublication();
                }
            }

            const publication = this.publication;
            if (publication) {
                if (publication.state.font.status !== 'done') {
                    await publication.fetchFonts();
                }
            }
        }
    }

    initEditor(editor: Editor): void {
        this._editor = editor;
    }

    insertImage(): void {
        throw new Error('Insert image is not available in rich-text mode.');
    }

    applyStyle(): void {
        throw new Error('Apply style is not available in rich-text mode.');
    }

    dispose(): void {
        /* Do nothing */
    }
}
