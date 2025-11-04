import { action, computed, makeObservable } from 'mobx';
import StyleBoxShadowBase from './_StyleBoxShadowBase';

type ISliderPropertyController = Reptile.Controllers.ISliderPropertyController;

export default class StyleShadowHorizontalController extends StyleBoxShadowBase implements ISliderPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        super(styleProperties);

        makeObservable<StyleShadowHorizontalController>(this, {
            value: computed,
            initialize: action,
            deps: computed,
        });

        this._uiState = uiState;
        this._domain = domain;
    }

    get label(): string {
        return 'Box shadow: Horizontal length';
    }

    get minValue(): number {
        return 0;
    }

    get maxValue(): number {
        return 50;
    }

    get value(): number {
        return this.horizontal;
    }

    set value(v: number) {
        this.horizontal = v;
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
