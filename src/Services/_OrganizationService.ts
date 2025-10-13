type IOrganizationService = Reptile.Service.IOrganizationService;

export default class _IOrganizationService implements IOrganizationService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Organization';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

   async getOrganization(pageNumber: number, pageSize: number): Promise<Reptile.Service.OrganizationInfo> {
        return await this._api.httpProtected.get(`/${this.endpoint}/GetOrganizations${pageNumber && pageSize ? `?pageNumber=${pageNumber}&pageSize=${pageSize}` : ''}`);
    }

   async getOrganizationByEntity(id: string): Promise<Reptile.Models.OrganizationModel>{
        return this._api.httpProtected.get(
            `/${this.endpoint}/GetOrganizationByEntityId/${id}`
        );
    }

    async getCurrentOrganization(): Promise<Reptile.Service.OrganizationModel[]> {
        return await this._api.httpProtected.get(`/${this.endpoint}/GetCurrentUserOrganizations`);
    }
    
   async deleteOrganization(id: string): Promise<void> {
        return await this._api.httpProtected.delete(`/${this.endpoint}/DeleteOrganization/${id}`);
     }
   async getIndividualOrganization(id:string):Promise<Reptile.Service.OrganizationModel>{
        return await this._api.httpProtected.get(`/${this.endpoint}/GetOrganization/${id}`);
     }
    async saveEditOrganization(data:Reptile.Service.OrganizationModel):Promise<void>{
        return await this._api.httpProtected.post(`/${this.endpoint}/CreateOrganization/`,data);
     }

}
