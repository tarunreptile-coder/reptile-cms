import { URL_VALID_REGEX } from '@Reptile/Constants/Constants';
import { makeAutoObservable } from 'mobx';

type IAppBuildController = Reptile.Controllers.IAppBuildController;

export default class _AppBuildController implements IAppBuildController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _mode: 'edit' | 'drag';

    private _preBuiltSelectedLoader: Reptile.Service.Loader | null;

    private _activeWidgetId?: string | undefined;

    private _screenModal: boolean;
    
    private _errorModal: boolean;

    private _screenName?: string;

    private _widgetErrors: string[];

    expandedNodes: string[];

    registry: Map<string, Reptile.Controllers.WidgetRegistryEntry>;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_AppBuildController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });
        this._uiState = uiState;
        this._domain = domain;
        this.expandedNodes = [];
        this._mode = 'drag';
        this.registry = new Map<
            string,
            Reptile.Controllers.WidgetRegistryEntry
        >();
        this._screenModal = false;
        this._errorModal = false;
        this._preBuiltSelectedLoader = null;
        this._widgetErrors = [];
    }

    private get template(): Reptile.Models.ITemplatePreset | undefined {
        const widgets = this._domain.layout.widgets;

        if (!widgets) {
            return;
        }

        const widgetData = widgets?.map((widget) => {
            const data = JSON.parse(widget.json) as Reptile.Service.Widget;

            data.widgetId = widget?.widgetId;

            data.layoutId = widget.id;

            return data;
        });

        const defaultWidgets = this._domain.layout.defaultWidgets?.map(
            (widget) => {
                const data = JSON.parse(widget.json) as Reptile.Service.Widget;

                data.widgetId = widget.id;

                return data;
            }
        );

        return this._domain.template.createFromData(
            widgetData && widgetData?.length > 0 ? widgetData : [],
            defaultWidgets
        );
    }

    get activePage() {
        return this._domain.layout.activePage;
    }

    get layouts() {
        return this._domain.layout.layouts;
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
    
    get preBuiltSelectedLoader() {
        return this._preBuiltSelectedLoader;
    }

    set preBuiltSelectedLoader(v: any) {
        this._preBuiltSelectedLoader = v;
    }

    get deps(): readonly unknown[] {
        return [this._uiState.navigation.templateId];
    }

    get widgets(): Reptile.Models.IWidget[] {       
        return this.template?.widgets ?? [];
    }

    get activeWidget(): Reptile.Models.IWidget | undefined {
        return this.widgets.find(({ id }) => id === this._activeWidgetId);
    }

    get loading(): boolean {
        return false;
    }

    get error(): string | undefined {
        const templateId = this._uiState.navigation.templateId;
        return templateId
            ? this._domain.content.status.entities.get(templateId)?.error
            : undefined;
    }

    get defaultWidgets() {
        return this._domain.layout.defaultWidgets;
    }

    get basicCollection(): Reptile.Controllers.WidgetCollectionItem[] {
        return Array.from(this.registry.entries())
            .filter(([, { category }]) => category === 'basic')
            .map(([kind, { name, icon, widget, friendlyName }]) => ({
                kind,
                name,
                friendlyName,
                icon,
                widget,
            }));
    }

    get advancedCollection(): Reptile.Controllers.WidgetCollectionItem[] {
        return Array.from(this.registry.entries())
            .filter(([, { category }]) => category === 'advanced')
            .map(([kind, { name, icon, widget, friendlyName }]) => ({
                kind,
                name,
                friendlyName,
                icon,
                widget,
            }));
    }

    get screenModal() {
        return this._screenModal;
    }

    set screenModal(v: boolean) {
        this._screenModal = v;
    }
    
    get showErrorModal() {
        return this._errorModal;
    }

    set showErrorModal(v: boolean) {
        this._errorModal = v;
    }

    get screenName() {
        return this._screenName;
    }

    set screenName(v: string | undefined) {
        this._screenName = v;
    }

    get preBuiltLoadersList() {
        return this._domain.layout.preBuiltLoaders ?? [];
    }

    get widgetErrors() {
        return this._widgetErrors;
    }

    resetTemplate(): void {
        this._domain.layout.resetTemplate();
    }

    async initialize(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        await this._domain.layout.getLayouts(publicationId);
        await this._domain.layout.selectPage();
        await Promise.resolve();
    }

    async select(id: string): Promise<void> {
        this.mode = 'edit';
        this._activeWidgetId = id;
        if (this.activeWidget?.properties.linkedTo) {
            await this._uiState.treeView.expand(
                this.activeWidget.properties.linkedTo
            );
        }
    }

    private validateWidgets() {
        const errors = [];
        if(this.widgets && this.widgets.length > 0) {
            this.widgets.forEach((widget) => {
                if(['urlbutton', 'actionbutton', 'navbutton'].includes(widget.type)) {
                    // parse button html string and get button text
                    const htmlString = widget.contents[0]?.properties?.htmlBody || '';
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = htmlString;
                    const buttonText = tempDiv.textContent.trim() || widget.friendlyName;
                    if (widget.type === 'urlbutton' && !URL_VALID_REGEX.test(widget.properties.link)) {
                        errors.push(`Please enter valid URL for '${buttonText}' button.`);
                    }
                    if (widget.type === 'actionbutton' && !widget.properties.action) {
                        errors.push(`Please select Functions for '${buttonText}' button.`);
                    }
                    if (widget.type === 'navbutton' && (!widget.properties.link || widget.properties.link === '/')) {
                        errors.push(`Please select Screen for '${buttonText}' button.`);
                    }
                }
            });
        } else {
            errors.push('Please add at least one widget to save.');
        }
        return errors;
    }

    async updateTemplate() {
        const errors = this.validateWidgets();
        this._widgetErrors = errors;
        if(errors.length > 0) {
            this._errorModal = true;
        } else {
            this._errorModal = false;
            const template = this._domain.layout.template;

            const widgets: Reptile.Models.LayoutWidget[] = [];

            this.widgets.forEach((widget) => {
                const defaultWidget = this.defaultWidgets?.find((defaultWidget) => {
                    return (
                        widget.type ===
                        defaultWidget.name.toLowerCase().replace(/\s/g, '')
                    );
                });

                const newWidget = Object.assign({}, defaultWidget);
                if (newWidget && widget.widgetId) {
                    const updatedJson = widget.toJson();

                    newWidget.json = JSON.stringify(updatedJson);

                    newWidget.id =
                        widget.layoutId ?? '00000000-0000-0000-0000-000000000000';

                    newWidget.widgetId = widget.widgetId;

                    widgets.push(newWidget);
                }
            });

            if (widgets.length > 0 && template) {
                template.widgets = widgets;
            }

            if (this.widgets.length <= 0 && template) {
                template.widgets = {};
            }

            if (template) {
                await this._domain.layout.updateTemplate(template);
            }
        }
    }

    async getWidgets() {
        await this._domain.layout.getAllWidgets();
    }

    async getLayout(id: string) {
        await this._domain.layout.getWidgets(id);
    }
    
    async getPrebuiltLoaders() {
        await this._domain.layout.getAllLoadersAsync();
    }

    async setTemplate() {
        // const template = SCREENTEMPLATE;
        // const publisherId = this._uiState.navigation.entityId;
        // const splitUrl = location.pathname.split('/');
        // const publicationId = splitUrl[3];
        // if (!this._screenName || !publisherId || !publicationId) {
        //     return;
        // }
        // template.name = this._screenName;
        // template.publicationId = publicationId;
        // template.publisherId = publisherId;
        // await this._domain.layout.setTemplate(template);
    }

    add(widgetType: string, idx: number, url: string = ''): void {
        const widgetResponse = async (id: string) => {
            let widgetResponse = await this._domain.layout.getWidgetResponse(id);
            if(url) {
                const jsonString = widgetResponse.json;
                const parsed = JSON.parse(jsonString);
                // Update backgroundImage URL
                if(parsed && parsed?.properties?.styles) {
                    parsed.properties.styles.backgroundImage = `url("${url}")`;
                    // Convert back to JSON string
                    const updatedJsonString = JSON.stringify(parsed, null, 2);
                    widgetResponse.json = updatedJsonString;
                }
            }
            return widgetResponse;
        };

        this.template?.add(widgetType, idx, widgetResponse);
    }

    remove(id: string): void {
        this.template?.remove(id);
        if (id === this._activeWidgetId) {
            this._activeWidgetId = undefined;
            this.mode = 'drag';
        }
    }

    duplicate(id: string): void {
        const widgetResponse = async (id: string) => {
            return await this._domain.layout.getWidgetResponse(id);
        };

        this.template?.duplicate(id, widgetResponse);
    }

    move(id: string, newPosition: number): void {
        this.template?.move(id, newPosition);
    }

    register(
        type: string,
        entry: Reptile.Controllers.WidgetRegistryEntry
    ): void {
        this.registry.set(type, entry);
    }

    dispose(): void {
        return;
    }
}
