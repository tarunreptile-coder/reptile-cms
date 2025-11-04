type ITemplateService = Reptile.Service.ITemplateService;

export default class _TemplateService implements ITemplateService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'TemplatePreset';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    get(): Promise<Reptile.Service.TemplatePreset[]>;
    get(id: string): Promise<Reptile.Service.TemplatePreset>;
    get(id?: string): Promise<Reptile.Service.TemplatePreset | Reptile.Service.TemplatePreset[]> {
        if (id) {
            return this._api.httpProtected.get(`/${this.endpoint}/getTemplatePreset/${id}`);
        }
        return this._api.httpProtected.get(`/${this.endpoint}/getTemplatePresets`);
    }

    getByPublication(id: string, streamType?: number | undefined): Promise<Reptile.Service.TemplatePreset[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/getByEntityId/${id}${streamType ? `/${streamType}` : ''}`);
    }

    set(value: Reptile.Service.TemplatePreset): Promise<void> {
        return this._api.httpProtected.post(`/${this.endpoint}/post`, value);
    }

    delete(id: string): Promise<void> {
        return this._api.httpProtected.get(`/${this.endpoint}/Delete/${id}`);
    }
}
