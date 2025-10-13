import { action, computed, makeObservable, override } from 'mobx';
import ContentEntity from './_ContentEntity';

type IPublication = Reptile.Models.IPublication;

type PublicationEntityType = {
    entityTypeId: 2,
    entityTypeName: 'Publication',
};

export default class Publication extends ContentEntity implements IPublication {
    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(api, domain, data);

        makeObservable(this, {
            contentEntityType: override,
            state: override,
            widgetLayoutId: computed,
            projectType: computed,
            fonts: computed,
            fetchFonts: action,
        });
    }

    get state(): Reptile.Models.PublisherState {
        return {
            ...super.state,
            font: this._domain.font.status.get(this._data.parentId) ?? {
                status: 'initial',
            },
        };
    }

    get fonts(): Reptile.Models.Font[] | undefined {
        return this._domain.font.fonts.get(this._data.parentId);
    }

    get contentEntityType(): PublicationEntityType  {
        return this._data.contentEntityType as PublicationEntityType;
    }

    get widgetLayoutId(): string | null {
        return this._data.attributes.widgetLayoutId as string | null;
    }

    get projectType(): 2 | 1 | null {
        const projectType = this._data.attributes.projectType as string | null;
        return projectType ? Number.parseInt(projectType) as 1 | 2 : null;
    }

    async fetchFonts(): Promise<void> {
        await this._domain.font.fetch(this._data.parentId);
    }
}
