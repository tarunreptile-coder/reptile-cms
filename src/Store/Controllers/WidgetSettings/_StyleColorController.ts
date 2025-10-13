import { HSV } from 'color-convert/conversions';
import * as convert from 'color-convert';
import { makeAutoObservable } from 'mobx';

type IColorPropertyController = Reptile.Controllers.IColorPropertyController;

export default class StyleColorController implements IColorPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    private _color: HSV;

    error?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleColorController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
        this._color = convert.hex.hsv.raw(this._styleProperties.color as string);
    }

    get label(): string {
        return 'Color';
    }

    get alpha(): number {
        return this._styleProperties.color === 'transparent' ? 0 : 100;
    }

    set alpha(v: number) {
        if (v === 100) {
            this._styleProperties.color = `#${convert.hsv.hex.raw(this._color)}`;
        } else {
            this._styleProperties.color = 'transparent';
        }
    }

    get color(): HSV {
        return this._color;
    }

    set color(v: HSV) {
        this._color = v;
        if (this._styleProperties.color !== 'transparent') {
            this._styleProperties.color = `#${convert.hsv.hex.raw(v)}`;
        }
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
