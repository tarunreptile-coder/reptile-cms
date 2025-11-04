import { makeAutoObservable } from 'mobx';
import { Notification } from '@Reptile/Components/Atoms';
import { ENTITY_TYPES, MESSAGES } from '@Reptile/Constants/Constants';

type ILayoutModel = Reptile.Models.ILayoutModel;

export default class _LayoutModel implements ILayoutModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;
    private _activePage: string;
    private _layouts?: Reptile.Models.Layout[];
    private _template?: Reptile.Models.Template;
    private _widgets?: Reptile.Service.Screens[];
    private _preBuiltLoaders?: Reptile.Service.Loader[];
    private _defaultWidgets?: Reptile.Service.LayoutWidget[];
    _screens: { [key: string]: { id: string; name: string }[] };
    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_LayoutModel, '_api' | '_domain'>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this._screens = {};
        this._activePage = 'Splash';
        this._preBuiltLoaders = [];
    }

    get screens() {
        return this._screens;
    }

    get activePage() {
        return this._activePage;
    }

    get template() {
        return this._template;
    }

    get layouts() {
        return this._layouts;
    }

    get widgets() {
        const widgets = this._widgets?.find(
            (screen) => screen.name === this._activePage ?? ''
        )?.widgets;
        // Sorting widgets data in widgetOrder
        const data  = this._widgets?.find((screen) => screen.name === this._activePage);
        const widgetData = data?.json ? JSON.parse(data?.json) : {};
        const widgetOrder = widgetData?.Data?.WidgetOrder ?? widgetData?.data?.widgetOrder;
        const widgetOrderIds = widgetData && widgetOrder ? widgetOrder?.map((w: any) => w.Id.toLowerCase()) : [];

        const sortedWidgets = widgetOrderIds?.map((orderId: any) => data?.widgets.find(w => w.id === orderId))
        .filter(Boolean); // to exclude any nulls if an ID doesn't exist in widgets

        if (widgets) {
            return sortedWidgets;
        }
        return;
    }

    get defaultWidgets() {
        return this._defaultWidgets;
    }
    
    get preBuiltLoaders() {
        return this._preBuiltLoaders;
    }

    async resetTemplate() {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        if(publicationId) {
            this._widgets = await this._api.layout.getWidgets(publicationId)
        }
    }

    async selectPage(page?: string) {
        if (page && page != this._activePage) {
            this._activePage = page
        }

        const layouts = this.layouts?.flatMap((e) => e.layouts) ?? [];
        const array = layouts.flat(2);
        const id = array.find((e) => e.name === this._activePage)?.id;

        if (id) {
            let templateData = await this._api.layout.getTemplate(id);
            // Sorting widgets data in widgetOrder
            const widgetData = templateData && templateData?.json ? JSON.parse(templateData?.json) : {};
            const widgetOrder = widgetData?.Data?.WidgetOrder ?? widgetData?.data?.widgetOrder;
            const widgetOrderIds = widgetData && widgetOrder ? widgetOrder?.map((w: any) => w.Id.toLowerCase()) : [];

            const sortedWidgets = widgetOrderIds?.map((orderId: any) => templateData?.widgets.find(w => w.id === orderId))
            .filter(Boolean); // to exclude any nulls if an ID doesn't exist in widgets
    
            this._template = {...templateData, widgets: sortedWidgets};
        }
    }

    async getLayouts(entityId: string) {
        let entity = this._domain.content.entities.get(entityId);

        if (!entity) {
            await this._domain.content.fetch(entityId);
            entity = this._domain.content.entities.get(entityId);
        }

        while (
            entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Publication
        ) {
            entity = entity.parent;
        }

        if (entity) {
            this._layouts = await this._api.layout.getLayouts(entity.id);
        }

        this._layouts?.forEach((root) => {
            const layouts = root.layouts.map((layout) => layout);
            this._screens[root.name] = layouts;
        });
    }

    async updateTemplate(template: Reptile.Models.Template) {
        if (template.id) {
            try {
                await this._api.layout.updateTemplate(template.id, template);

                Notification.success({
                    description: MESSAGES.SUCCESS_SAVE_APP.message,
                });
            } catch (error) {
                Notification.error({
                    description: MESSAGES.ERROR_SAVE_CHANGES.message,
                });
            }
        }
    }

    async setTemplate(template: Reptile.Models.Template) {
        await this._api.layout.setTemplate(template);
    }

    async getWidgets(id: string) {
        this._widgets = await this._api.layout.getWidgets(id);
    }

    async getAllWidgets() {
        this._defaultWidgets = await this._api.layout.getAllWidgets();
    }

    async getWidgetResponse(id: string) {
        return await this._api.layout.getWidgetIdAsync(id);
    }
    
    async getAllLoadersAsync() {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];
        if(publicationId) {
            this._preBuiltLoaders = await this._api.layout.getAllLoadersAsync(publicationId);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
