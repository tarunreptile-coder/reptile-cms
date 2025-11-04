import { makeAutoObservable } from 'mobx';

type ITemplateBuilderController = Reptile.Controllers.ITemplateBuilderController;

export default class _TemplateBuilderController implements ITemplateBuilderController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _activeWidgetId?: string | undefined;

    private _mode: 'edit' | 'drag';

    registry: Map<string, Reptile.Controllers.WidgetRegistryEntry>;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
    ) {
        makeAutoObservable<_TemplateBuilderController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this.registry = new Map<string, Reptile.Controllers.WidgetRegistryEntry>();
        this._mode = 'drag';
    }

    get mode(): 'edit' | 'drag' {
        return this._mode;
    }

    set mode(v: 'edit' | 'drag') {
        // If changing mode to drag, unselect the current widget
        if (v === 'drag') {
            this._activeWidgetId = undefined;
        }
        this._mode = v;
    }

    private get template(): Reptile.Models.ITemplate | undefined {
        return (this._uiState.navigation.templateId
            ? this._domain.content.entities.get(this._uiState.navigation.templateId)
            : undefined) as Reptile.Models.ITemplate | undefined;
    }

    get widgets(): Reptile.Models.IWidget[] {
        return this.template?.appTemplate.widgets ?? [];
    }
    
    get masterStyle(): Reptile.Models.IGlobalStyle {
        return this.template?.masterStyle;
    }

    get activeWidget(): Reptile.Models.IWidget | undefined {
        return this.widgets.find(({ id }) => id === this._activeWidgetId);
    }

    get loading(): boolean {
        const templateId = this._uiState.navigation.templateId;
        if (!templateId) {
            return true;
        }
        return !['done', 'error'].includes(this._domain.content.status.entities.get(templateId)?.status ?? '');
    }

    get error(): string | undefined {
        const templateId = this._uiState.navigation.templateId;
        return templateId ? this._domain.content.status.entities.get(templateId)?.error : undefined;
    }

    get deps(): readonly unknown[] {
        return [this._uiState.navigation.templateId];
    }

    get basicCollection(): Reptile.Controllers.WidgetCollectionItem[] {
        return Array.from(this.registry.entries())
            .filter(([, { category }]) => category === 'basic')
            .map(([kind, { name, icon, widget }]) => ({
                kind,
                name,
                icon,
                widget,
            }));
    }

    get advancedCollection(): Reptile.Controllers.WidgetCollectionItem[] {
        return Array.from(this.registry.entries())
            .filter(([, { category }]) => category === 'advanced')
            .map(([kind, { name, icon, widget }]) => ({
                kind,
                name,
                icon,
                widget,
            }));
    }

    async initialize(): Promise<void> {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            if (this._domain.content.status.entities.get(templateId)?.status !== 'done') {
                await this._domain.content.fetch(templateId);
            }
        }
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        await this._domain.layout.getLayouts(publicationId);
        this._uiState.treeView.register(this);
    }

    async select(id: string): Promise<void> {
        this.mode = 'edit';
        this._activeWidgetId = id;
        if (this.activeWidget?.properties.linkedTo) {
            await this._uiState.treeView.expand(this.activeWidget.properties.linkedTo);
        }
    }

    add(widgetType: string, idx: number): void {
        this.template?.appTemplate.add(widgetType, idx);
    }

    remove(id: string): void {
        this.template?.appTemplate.remove(id);
        if (id === this._activeWidgetId) {
            this._activeWidgetId = undefined;
            this.mode = 'drag';
        }
    }

    duplicate(id: string): void {
        this.template?.appTemplate.duplicate(id);
    }

    move(id: string, newPosition: number): void {
        this.template?.appTemplate.move(id, newPosition);
    }

    register(type: string, entry: Reptile.Controllers.WidgetRegistryEntry): void {
        this.registry.set(type, entry);
    }

    dispose(): void {
        this._uiState.treeView.unregister();
    }
}
