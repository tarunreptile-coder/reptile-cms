import { makeAutoObservable } from 'mobx';
import data from '~/../appSettings.json';
import { UTILS } from '~/Utils';

type IBoilerplate = Reptile.Models.IBoilerplate;

type BoilerplatePrivateFields = '_api' | '_domain';

export default class Boilerplate implements IBoilerplate {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _data: Reptile.Service.Boilerplate;

    constructor(
        api: Reptile.Service.IReptileApi,
        store: Reptile.Models.IDomain,
        data: Reptile.Service.Boilerplate
    ) {
        makeAutoObservable<Boilerplate, BoilerplatePrivateFields>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = store;
        this._data = data;
    }

    get id(): string {
        return this._data.id;
    }

    get name(): string {
        return this._data.name;
    }

    get imageUrl(): string | null {
        const imageUrl = this._data.imageUrl;
        if (imageUrl) {
            return UTILS.loadImage(imageUrl);
        }

        return null;
    }

    get url(): string {
        return this._data.url;
    }

    get type(): 'WEB' | 'APP' {
        return this._data.type;
    }

    dispose(): void {
        /* Do nothing */
    }
}
