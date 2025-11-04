import { computed, makeObservable, override } from 'mobx';
import ContentEntity from './_ContentEntity';

type ISection = Reptile.Models.ISection;

type SectionEntityType = {
    entityTypeId: 4,
    entityTypeName: 'Section',
};

export default class Section extends ContentEntity implements ISection {
    constructor(
        api: Reptile.Service.IReptileApi,
        store: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(api, store, data);

        makeObservable(this, {
            contentEntityType: override,
            firstChild: computed,
        });
    }

    get contentEntityType(): SectionEntityType  {
        return this._data.contentEntityType as SectionEntityType;
    }

    get firstChild(): Reptile.Models.IContentEntity | undefined {
        const firstChildId = this._data.attributes.firstChildId as string | null
        if (firstChildId) {
            return this._domain.content.entities.get(firstChildId);
        }
        return undefined;
    }
}
