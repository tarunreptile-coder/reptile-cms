type IUserService = Reptile.Service.IUserService;

export default class _UserService implements IUserService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'UserManagement';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    get(): Promise<Reptile.Service.User>;
    get(id: string): Promise<Reptile.Service.User>;
    get(id?: string): Promise<Reptile.Service.User> {
        if (id) {
            return this._api.httpProtected.get(`/${this.endpoint}/getUser/${id}`);
        }
        return this._api.httpProtected.get(`/${this.endpoint}/getCurrentUser`);
    }

    getMany(params: {
        page?: number;
        pageSize?: number;
        sortBy?: string;
        orderBy?: string;
        email?: string;
    }): Promise<{ totalRowCount: number; users: Reptile.Service.User[]; }> {
        return this._api.httpProtected.get(`/${this.endpoint}`, { params });
    }

    getRoles(): Promise<Reptile.Service.UserRole[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetCurrentUserRoles`);
    }

    getAllRoles(): Promise<Reptile.Service.UserRole[]> {
        return this._api.httpProtected.get(`/${this.endpoint}/GetRoles`);
    }

    set(data: Reptile.Service.User): Promise<{ id: string; }> {
        return this._api.httpProtected.post(`/${this.endpoint}/post`, data);
    }

    setAvatar(imageUrl: string): Promise<void> {
        return this._api.httpProtected.post(`/${this.endpoint}/ChangeAvatar`, { imageUrl });
    }

    setStatus(id: string, active: boolean): Promise<void> {
        return this._api.httpProtected.post(`/${this.endpoint}/ChangeUserStatus/${id}/${active ? 'true' : 'false'}`, {});
    }
    deleteUser(id: string): Promise<void> {
        return this._api.httpProtected.delete(`/${this.endpoint}/delete/${id}`);
    }
    
    async getAllUsers(
        page?: number,
        pageSize?: number,
        sortBy?: string,
        orderBy?: string,
        email?: string
    ): Promise<Reptile.Service.Users> {
        const params = [];
        if (page) params.push(`page=${page}`);
        if (pageSize) params.push(`pageSize=${pageSize}`);
        if (sortBy) params.push(`sortBy=${sortBy}`);
        if (orderBy) params.push(`orderBy=${orderBy}`);
        if (email) params.push(`email=${email}`);

        const param = params.join('&');
        return await this._api.httpProtected.get(
            `${this.endpoint}/GetAllUsers?${param}`
        );
    }

}
