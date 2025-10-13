type IAppService = Reptile.Service.IAppService;

export default class _IAppService implements IAppService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'App';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    async buildAsync(
        publicationId: string, payload: Reptile.Service.BuildEntity
    ): Promise<{ didStart: boolean }> {
        return await this._api.httpProtected.post(`/${this.endpoint}/buildV2/${publicationId}`, payload);
    }

    async getAPKV2(publicationId: string): Promise<{
        file: string;
        exception: null;
    }> {
        return await this._api.httpProtected.get(
            `/${this.endpoint}/getAPKV2/${publicationId}`
        );
    }

    async getAppInstaller(
        publicationId: string
    ): Promise<Reptile.Service.AppInstaller> {
        return await this._api.httpPublic.get(
            `/${this.endpoint}/getAppInstaller/${publicationId}`
        );
    }

    async getAppInstallerList(publicationId: string): Promise<Reptile.Service.AppInstallerList> {
        return await this._api.httpPublic.get(
            `/${this.endpoint}/getAppInstallerList/${publicationId}`
        );
    }

    async saveApp(
        application: Reptile.Service.RelatedEntity
    ): Promise<Reptile.Service.RelatedEntity> {
        // Call server
        return await this._api.httpPublic.post(
            `/${this.endpoint}/save`,
            application
        );
    }

    async fetchPin(id: string): Promise<Reptile.Service.RelatedEntity> {
        // Call server
        return await this._api.httpProtected.get(
            `/${this.endpoint}/getByRelatedEntity/${id}`
        );
    }
    async setCoverImage(
        entityId: string,
        fileName: string
    ): Promise<{ imageUrl: string }> {
        // Call server
        return await this._api.httpProtected.post(
            `/${this.endpoint}/DownloadAndSetCover`,
            { entityId, fileName }
        );
    }

    async releaseAndroidBuild(
        payload: Reptile.Service.AndroidEntity
    ): Promise<{ didStart: boolean }> {
        return await this._api.httpProtected.post(`/${this.endpoint}/ReleaseAndroidAppBuildV2`, payload);
    }
}
