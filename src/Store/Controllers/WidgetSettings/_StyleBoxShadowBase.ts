import { RGB } from 'color-convert/conversions';
import { computed, makeObservable } from 'mobx';

const BOX_SHADOW_REGEXP = /(?<horizontal>\d+)px (?<vertical>\d+)px (?<blur>\d+)px (?<spread>\d+)px rgba\((?<r>\d+\.?\d*),(?<g>\d+\.?\d*),(?<b>\d+\.?\d*),(?<a>\d+\.?\d*)\)/;

type BoxShadow = {
    horizontal: string,
    vertical: string,
    blur: string,
    spread: string,
    r: string,
    g: string,
    b: string,
    a: string,
}

type StyleBoxShadowBaseProtectedFields = 'horizontal' | 'vertical' | 'blur' | 'spread' | 'colorRgb' | 'colorAlpha';

export default class StyleBoxShadowBase {
    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeObservable<StyleBoxShadowBase, StyleBoxShadowBaseProtectedFields>(this, {
            horizontal: computed,
            vertical: computed,
            blur: computed,
            colorAlpha: computed,
            colorRgb: computed,
            spread: computed,
        });
        this._styleProperties = styleProperties;
    }

    protected get horizontal(): number {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);

        if (match) {
            return Number.parseInt((match.groups as BoxShadow).horizontal);
        }

        return 0;
    }

    protected set horizontal(v: number) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${v}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${boxShadow.r},${boxShadow.g},${boxShadow.b},${boxShadow.a})`;
        }
    }

    protected get vertical(): number {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);

        if (match) {
            return Number.parseInt((match.groups as BoxShadow).vertical);
        }

        return 0;
    }

    protected set vertical(v: number) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${boxShadow.horizontal}px ${v}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${boxShadow.r},${boxShadow.g},${boxShadow.b},${boxShadow.a})`;
        }
    }

    protected get blur(): number {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);

        if (match) {
            return Number.parseInt((match.groups as BoxShadow).blur);
        }

        return 0;
    }

    protected set blur(v: number) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${v}px ${boxShadow.spread}px rgba(${boxShadow.r},${boxShadow.g},${boxShadow.b},${boxShadow.a})`;
        }
    }

    protected get spread(): number {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);

        if (match) {
            return Number.parseInt((match.groups as BoxShadow).spread);
        }

        return 0;
    }

    protected set spread(v: number) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${v}px rgba(${boxShadow.r},${boxShadow.g},${boxShadow.b},${boxShadow.a})`;
        }
    }

    protected get colorRgb(): RGB {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);

        if (match) {
            return [
                Number.parseFloat((match.groups as BoxShadow).r),
                Number.parseFloat((match.groups as BoxShadow).g),
                Number.parseFloat((match.groups as BoxShadow).b),
            ];
        }

        return [0, 0, 0];
    }

    protected set colorRgb(v: RGB) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${v[0]},${v[1]},${v[2]},${boxShadow.a})`;
        }
    }

    protected get colorAlpha(): number {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);


        if (match) {
            return Number.parseFloat((match.groups as BoxShadow).a);
        }

        return 0;
    }

    protected set colorAlpha(v: number) {
        const match = BOX_SHADOW_REGEXP.exec(this._styleProperties.boxShadow as string);
        if (match) {
            const boxShadow = match.groups as BoxShadow;
            this._styleProperties.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${boxShadow.r},${boxShadow.g},${boxShadow.b},${v})`;
        }
    }
}
