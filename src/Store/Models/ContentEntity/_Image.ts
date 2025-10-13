import { makeObservable, override } from 'mobx';
import ContentEntity from './_ContentEntity';

type IImage = Reptile.Models.IImage;

type ImageEntityType = {
    entityTypeId: 7,
    entityTypeName: 'Image',
};

export default class Image extends ContentEntity implements IImage {
    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(api, domain, data);

        makeObservable(this, {
            contentEntityType: override,
        });
    }

    get contentEntityType(): ImageEntityType  {
        return this._data.contentEntityType as ImageEntityType;
    }
}
