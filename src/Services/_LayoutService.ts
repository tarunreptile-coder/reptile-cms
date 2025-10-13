type ILayoutService = Reptile.Service.ILayoutService;

export default class _LayoutService implements ILayoutService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Layout';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    getLayouts(publicationId: string): Promise<Reptile.Service.Layout[]> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/getnavigationasync/${publicationId}`
        );
    }

    getTemplate(id: string): Promise<Reptile.Service.Template> {
        return this._api.httpProtected.get(
            `/${this.endpoint}/getbyidasync/${id}`
        );
    }

    updateTemplate(id: string, data: Reptile.Models.Template): Promise<void> {
        return this._api.httpProtected.put(`/Layout/updateasync/${id}`, data);
    }

    setTemplate(data: Reptile.Models.Template): Promise<void> {
        return this._api.httpProtected.post(
            `/${this.endpoint}/saveasync`,
            data
        );
    }

    getWidgets(id: string): Promise<Reptile.Service.Screens[]> {
        return this._api.httpProtected.get(
            `Layout/getweblayoutsbypublicationidasync/${id}`
        );
    }

    getAllWidgets(): Promise<Reptile.Service.LayoutWidget[]> {
        return this._api.httpProtected.get(`/Widget/getallasync`);
    }

    getWidgetIdAsync(id: string): Promise<Reptile.Service.LayoutWidget> {
        return this._api.httpProtected.get(`Widget/getbyidasync/${id}`);
    }

    getAllLoadersAsync(id: string): Promise<Reptile.Service.Loader[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/getAllLoadersAsync/${id}`);
    }
}
