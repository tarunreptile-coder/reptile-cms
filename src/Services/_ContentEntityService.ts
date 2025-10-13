type IContentEntityService = Reptile.Service.IContentEntityService;

export default class _ContentEntityService implements IContentEntityService {
  private readonly _api: Reptile.Service.IReptileRestApi;

  readonly endpoint = 'ContentEntity';

  constructor(api: Reptile.Service.IReptileApi) {
    this._api = api as Reptile.Service.IReptileRestApi;
  }

  getAll(
    id?: string | undefined,
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    orderBy?: string
  ): Promise<Reptile.Service.ContentEntityInfo> {
    const params = [];
    if (pageNumber) params.push(`pageNumber=${pageNumber}`);
    if (pageSize) params.push(`pageSize=${pageSize}`);
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (orderBy) params.push(`orderBy=${orderBy}`);
    const param = params.join('&');

    return this._api.httpProtected.get(
      `/${this.endpoint}/Get${id ? `/${id}?${param}` : `?${param}`}`
    );
  }

  getOne(id: string): Promise<Reptile.Service.ContentEntity> {
    return this._api.httpProtected.get(`/${this.endpoint}/getCurrent/${id}`);
  }

  getPublishers(
    pageNumber: number,
    pageSize: number
  ): Promise<Reptile.Service.ContentEntityInfo> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/getPublishers?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getPublicationsByPublisherId(
    id: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Reptile.Service.ContentEntityInfo> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/getPublicationsByPublisherId/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getContentByFolderId(
    id: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Reptile.Service.ContentEntityInfo> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/getContentByFolderId/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getContent(entityId: string): Promise<Reptile.Service.ContentArticle[]> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/GetContentV3/${entityId}`
    );
  }

  getAllArticles(
    issueId: string,
    skip: number,
    take: number
  ): Promise<Reptile.Service.ContentEntity[]> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/GetIssueAllArticles/${issueId}/${skip}/${take}`
    );
  }

  getImages(id: string): Promise<Reptile.Service.ContentEntity[]> {
    return this._api.httpProtected.get(`/${this.endpoint}/GetImages/${id}`);
  }

  getPublications(): Promise<Reptile.Service.ContentEntity[]> {
    return this._api.httpProtected.get(
      `/${this.endpoint}/getAvailablePublications`
    );
  }

  async getBoilerplates(): Promise<Reptile.Service.Boilerplate[]> {
    // For some reason API returns string instead of a parsed JSON object,
    // so we need to parse it here.
    return await this._api.httpProtected.get(
      //const data = await this._api.httpProtected.get(
      `/${this.endpoint}/GetBoilerplatesV2`
    );
    //return JSON.parse(data as string) as Reptile.Service.Boilerplate[];
  }

  set(
    value: Partial<Reptile.Service.ContentEntity>,
    orgId: string
  ): Promise<{ id: string | null }> {
    return this._api.httpProtected.post(
      `/${this.endpoint}/Post?organizationId=${orgId}`,
      value
    );
  }

  clone(
    info: Reptile.Service.ContentEntityCloneInfo,
    orgId: string
  ): Promise<{ id: string }> {
    return this._api.httpProtected.post(
      `/${this.endpoint}/CloneEntityV2/${orgId}`,
      info
    );
  }

  setCoverImage(
    entityId: string,
    fileName: string,
    shouldSetAsCover: boolean,
    imageUri: string
  ): Promise<{ imageUrl: string }> {
    return this._api.httpProtected.post(
      `/${this.endpoint}/DownloadAndSetCover`,
      { entityId, fileName, shouldSetAsCover, imageUri }
    );
  }

  addImage(
    entityId: string,
    fileName: string,
    shouldSetAsCover?: boolean | undefined,
    imageUri?: string
  ): Promise<{ imageUrl: string }> {
    return this._api.httpProtected.post(`/${this.endpoint}/DownloadAndSave`, {
      entityId,
      fileName,
      shouldSetAsCover,
      imageUri,
    });
  }

  publish(info: Reptile.Service.ContentEntityPublishInfo): Promise<void> {
    return this._api.httpProtected.post(
      `/${this.endpoint}/PublishEntity`,
      info
    );
  }

  unpublish(info: Reptile.Service.ContentEntityUnpublishInfo): Promise<void> {
    return this._api.httpProtected.post(
      `/${this.endpoint}/UnpublishEntity`,
      info
    );
  }

  delete(id: string): Promise<void> {
    return this._api.httpProtected.delete(
      `/${this.endpoint}/deleteContentEntity/${id}`
    );
  }
}
