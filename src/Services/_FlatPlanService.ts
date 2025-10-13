type IFlatPlanService = Reptile.Service.IFlatPlanService;

export default class _FlatPlanService implements IFlatPlanService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'FlatPlan';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    swapFlatPlanOrderInSameParent(
        flatPlanId: string | null,
        entityId: string,
        newPosition: number,
        oldPosition: number
    ): Promise<void> {
        const data = { flatPlanId, entityId, newPosition, oldPosition };

        return this._api.httpProtected.post(
            `/${this.endpoint}/SwapFlatPlanOrderInSameParent`,
            data
        );
    }
}
