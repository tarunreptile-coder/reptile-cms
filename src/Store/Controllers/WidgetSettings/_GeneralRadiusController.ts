import { makeAutoObservable } from 'mobx';

type ISliderPropertyController = Reptile.Controllers.ISliderPropertyController;

export default class GeneralRadiusController implements ISliderPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties,
    ) {
        makeAutoObservable<GeneralRadiusController, '_domain' | '_uiState' | '_generalProperties'>(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            label: false,
            minValue: false,
            maxValue: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._generalProperties = generalProperties;
    }

    get label(): string {
        return 'Border radius';
    }

    get minValue(): number {
        return 10;
    }

    get maxValue(): number {
        return 200;
    }

    get value(): number {
        return Number.parseInt(this._generalProperties.radius as string);
    }

    set value(v: number) {
        this._generalProperties.radius = v.toString();
    }

    async initialize(): Promise<void> {
        await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
