import { action, computed, makeObservable, override } from 'mobx';
import ContentEntity from './_ContentEntity';

type IPublisher = Reptile.Models.IPublisher;

type PublisherEntityType = {
    entityTypeId: 1,
    entityTypeName: 'Publisher',
};

export default class Publisher extends ContentEntity implements IPublisher {
    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(api, domain, data);

        makeObservable(this, {
            contentEntityType: override,
            state: override,
            expiryDate: computed,
            mainUserId: computed,
            customerId: computed,
            organizationId: computed,
            fonts: computed,
            fetchFonts: action,
        });
    }

    get state(): Reptile.Models.PublisherState {
        return {
            ...super.state,
            font: this._domain.font.status.get(this.id) ?? {
                status: 'initial',
            },
        };
    }

    get fonts(): Reptile.Models.Font[] | undefined {
        return this._domain.font.fonts.get(this.id);
    }

    get contentEntityType(): PublisherEntityType  {
        return this._data.contentEntityType as PublisherEntityType;
    }

    get expiryDate(): Date | null {
        const expiryDate = this._data.attributes.expiryDate as string | null;
        return expiryDate ? new Date(expiryDate) : null;
    }

    get mainUserId(): string {
        return this._data.attributes.mainUserId as string;
    }

    get customerId(): string | null {
        return this._data.attributes.customerId as string | null;
    }

    get organizationId(): string | null {
        return this._data.attributes.organizationId as string | null;
    }

    async fetchFonts(): Promise<void> {
        await this._domain.font.fetch(this.id);
    }
}
