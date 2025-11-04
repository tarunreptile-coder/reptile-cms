type IFontService = Reptile.Service.IFontService;

export default class _FontService implements IFontService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Font';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    get(relatedEntityId: string): Promise<Reptile.Service.Font[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/Get/${relatedEntityId}`);
    }

    add(font: Reptile.Service.Font): Promise<void> {
        return this._api.httpProtected.post(`/${this.endpoint}/Post`, font);
    }

    delete(id: string): Promise<void> {
        return this._api.httpProtected.delete(`/${this.endpoint}/Delete/${id}`);
    }
}
