type IThemeService = Reptile.Service.IThemeService;

export default class _ThemeService implements IThemeService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Themes';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    get(): Promise<Reptile.Service.Theme[]>;
    get(id: string): Promise<Reptile.Service.Theme>;
    get(id?: string, pageNumber?: number, pageSize?:number, includeInactive?: boolean): Promise<Reptile.Service.Theme | Reptile.Service.Theme[]> {
        if (id) {
            return this._api.httpProtected.get(`/${this.endpoint}/GetTheme/${id}`);
        }
        const queryParams: Record<string, number | boolean> = {};
        if (pageNumber !== undefined) queryParams.pageNumber = pageNumber;
        if (pageSize !== undefined) queryParams.pageSize = pageSize;
        if (includeInactive !== undefined) queryParams.includeinactive = includeInactive;
        const queryString = Object.keys(queryParams).length
            ? '?' + new URLSearchParams(queryParams as any).toString()
            : '';
        return this._api.httpProtected.get(`/${this.endpoint}/GetAll${queryString}`);
    }

    getByPublication(publicationId: string): Promise<Reptile.Service.Theme[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetAllForPublication/${publicationId}`);
    }

    getDefaultJsonStructure(): Promise<Reptile.Service.ThemeJsonStructure[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetDefaultJsonStructure`);
    }

    set(value: Partial<Reptile.Service.Theme>): Promise<void> {
        return this._api.httpProtected.post(`/${this.endpoint}/Post`, value);
    }

    delete(id: string): Promise<void> {
        return this._api.httpProtected.delete(`/${this.endpoint}/Delete/${id}`);
    }
}
