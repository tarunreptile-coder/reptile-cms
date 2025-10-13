import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type IFontFamilyPropertyController = Reptile.Controllers.IFontFamilyPropertyController;

export default class StyleFontFamilyController implements IFontFamilyPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleFontFamilyController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
    }

    private get template(): Reptile.Models.ITemplate | undefined {
        return (this._uiState.navigation.templateId
            ? this._domain.content.entities.get(this._uiState.navigation.templateId)
            : undefined) as Reptile.Models.ITemplate | undefined;
    }

    private get publication(): Reptile.Models.IPublication | undefined {
        return this.template?.publication;
    }

    get loading(): boolean {
        const templateId = this._uiState.navigation.templateId;
        if (!templateId) {
            return true;
        }
        return !['done', 'error'].includes(this._domain.content.status.entities.get(templateId)?.status ?? '')
            || !['done', 'error'].includes(this.template?.state.publication.status ?? '')
            || !['done', 'error'].includes(this.publication?.state.font.status ?? '');
    }

    get error(): string | undefined {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            return this._domain.content.status.entities.get(templateId)?.error
                || this.template?.state.publication.error
                || this.publication?.state.font.error;
        }
        return undefined;
    }

    get fonts(): Reptile.Models.FontName[] {
        return _.map(this.publication?.fonts ?? [], 'name');
    }

    get label(): string {
        return 'Font family';
    }

    get fontIndex(): number {
        return this.fonts.findIndex(({ name }) => name === this._styleProperties.fontFamily);
    }

    set fontIndex(v: number) {
        if (v < this.fonts.length) {
            this._styleProperties.fontFamily = this.fonts[v].name;
        }
    }

    get font(): string {
        return this.fontIndex !== -1 ? this.fonts[this.fontIndex].displayName : '';
    }

    async initialize(): Promise<void> {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            if (this._domain.content.status.entities.get(templateId)?.status !== 'done') {
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

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
