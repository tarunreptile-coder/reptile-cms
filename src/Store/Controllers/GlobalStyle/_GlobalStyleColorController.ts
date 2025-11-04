import { HSV } from 'color-convert/conversions';
import * as convert from 'color-convert';
import { makeAutoObservable } from 'mobx';

type IGlobalStyleColorController =
    Reptile.Controllers.IGlobalStyleColorController;

export default class GlobalStyleColorController
    implements IGlobalStyleColorController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _color?: HSV;

    private _colorString?: string;

    error?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<GlobalStyleColorController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                label: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
    }

    get label(): string {
        return 'Primary Colour';
    }

    get alpha(): number {
        return this._colorString === 'transparent' ? 0 : 100;
    }

    set alpha(v: number) {
        if (v === 100 && this._color) {
            this._colorString = `#${convert.hsv.hex.raw(this._color)}`;
        } else {
            this._colorString = 'transparent';
        }
    }

    get colorString() {
        if (this._color) {
            return this._colorString;
        }
        return;
    }

    set colorString(v: string | undefined) {
        if (v) {
            this._color = convert.hex.hsv(v) as HSV;
        }
        this._color = undefined;
    }

    get color() {
        if (this._color) {
            this._colorString = `#${convert.hsv.hex.raw(this._color)}`;
            return this._color;
        }

        if (!this._color && this._domain.globalStyle.selectedColor) {
            return convert.hex.hsv(
                this._domain.globalStyle.selectedColor
            ) as HSV;
        }

        return [0, 0, 0];
    }

    set color(v: HSV) {
        this._color = v;
        if (this._color) {
            this.colorToString(this._color);
        }
    }

    get deps(): readonly unknown[] {
        return [];
    }

    colorToString(color: HSV) {
        if (color)
            this._domain.globalStyle.colorToString(
                `#${convert.hsv.hex.raw(color)}`
            );
    }

    async initialize(): Promise<void> {
        await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
