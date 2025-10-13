import { HSV } from 'color-convert/conversions';
import { action, computed, makeObservable, observable } from 'mobx';
import * as convert from 'color-convert';
import StyleBoxShadowBase from './_StyleBoxShadowBase';

type IColorPropertyController = Reptile.Controllers.IColorPropertyController;

export default class StyleShadowColorController extends StyleBoxShadowBase implements IColorPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _color: HSV;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        super(styleProperties);

        makeObservable<StyleShadowColorController, '_color'>(this, {
            alpha: computed,
            color: computed,
            _color: observable,
            initialize: action,
            deps: computed,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._color = convert.rgb.hsl.raw(this.colorRgb);
    }

    get label(): string {
        return 'Box shadow: Color';
    }

    get alpha(): number {
        return this.colorAlpha * 100;
    }

    set alpha(v: number) {
        this.colorAlpha = v / 100;
    }

    get color(): HSV {
        return this._color;
    }

    set color(v: HSV) {
        this.colorRgb = convert.hsl.rgb(v);
        this._color = v;
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
