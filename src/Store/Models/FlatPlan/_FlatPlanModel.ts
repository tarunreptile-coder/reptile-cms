import { makeAutoObservable } from 'mobx';

type IFlatPlanModel = Reptile.Models.IFlatPlanModel;

export default class _FlatPlanModel implements IFlatPlanModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<
            _FlatPlanModel,
            '_api' | '_domain' | '_synchronization'
        >(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
        });

        this._api = api;
        this._domain = domain;
    }

    async swapFlatPlanOrderInSameParent(
        flatPlanId: string | null,
        entityId: string,
        newPosition: number,
        oldPosition: number
    ): Promise<void> {
        await this._api.flatPlan.swapFlatPlanOrderInSameParent(
            flatPlanId,
            entityId,
            newPosition,
            oldPosition
        );
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }
}
