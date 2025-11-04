import { makeAutoObservable, toJS } from 'mobx';

type IWidgetStyleProperties = Reptile.Models.IWidgetStyleProperties;

export default class WidgetStyleProperties implements IWidgetStyleProperties {
    private readonly _data: Reptile.Service.WidgetStyleProperties;

    constructor(data: Reptile.Service.WidgetStyleProperties) {
        makeAutoObservable(this, {
            dispose: false,
        });
        this._data = data;
    }

    get backgroundImage(): string | undefined {
        return this._data.backgroundImage;
    }

    set backgroundImage(v: string | undefined) {
        this._data.backgroundImage = v;
    }

    get backgroundColor(): string | undefined {
        return this._data.backgroundColor;
    }

    set backgroundColor(v: string | undefined) {
        this._data.backgroundColor = v;
    }

    get minHeight(): string | undefined {
        return this._data.minHeight;
    }

    set minHeight(v: string | undefined) {
        this._data.minHeight = v;
    }

    get color(): string | undefined {
        return this._data.color;
    }

    set color(v: string | undefined) {
        this._data.color = v;
    }

    get display() {
        return this._data.display;
    }

    set display(v) {
        this._data.display = v;
    }

    get flexDirection() {
        return this._data.flexDirection;
    }

    set flexDirection(v) {
        this._data.flexDirection = v;
    }

    get fontSize(): string | undefined {
        return this._data.fontSize;
    }

    set fontSize(v: string | undefined) {
        this._data.fontSize = v;
    }

    get fontFamily(): string | undefined {
        return this._data.fontFamily;
    }

    set fontFamily(v: string | undefined) {
        this._data.fontFamily = v;
    }

    get margin(): string | undefined {
        return this._data.margin;
    }

    set margin(v: string | undefined) {
        this._data.margin = v;
    }

    get padding(): string | undefined {
        return this._data.padding;
    }

    set padding(v: string | undefined) {
        this._data.padding = v;
    }

    get width(): string | undefined {
        return this._data.width;
    }

    set width(v: string | undefined) {
        this._data.width = v;
    }

    get height(): string | undefined {
        return this._data.height;
    }

    set height(v: string | undefined) {
        this._data.height = v;
    }

    get borderColor(): string | undefined {
        return this._data.borderColor;
    }

    set borderColor(v: string | undefined) {
        this._data.borderColor = v;
    }

    get borderRadius(): string | undefined {
        return this._data.borderRadius;
    }

    set borderRadius(v: string | undefined) {
        this._data.borderRadius = v;
    }

    get borderWidth(): string | undefined {
        return this._data.borderWidth;
    }

    set borderWidth(v: string | undefined) {
        this._data.borderWidth = v;
    }

    get boxShadow(): string | undefined {
        return this._data.boxShadow;
    }

    set boxShadow(v: string | undefined) {
        this._data.boxShadow = v;
    }

    get fontWeight(): string | undefined {
        return this._data.fontWeight;
    }

    set fontWeight(v: string | undefined) {
        this._data.fontWeight = v;
    }

    get fontStyle(): string | undefined {
        return this._data.fontStyle;
    }

    set fontStyle(v: string | undefined) {
        this._data.fontStyle = v;
    }

    get textDecoration(): string | undefined {
        return this._data.textDecoration;
    }

    set textDecoration(v: string | undefined) {
        this._data.textDecoration = v;
    }

    get textAlign():
        | 'start'
        | 'end'
        | 'left'
        | 'right'
        | 'center'
        | 'justify'
        | 'match-parent'
        | undefined {
        return this._data.textAlign;
    }

    set textAlign(
        v:
            | 'start'
            | 'end'
            | 'left'
            | 'right'
            | 'center'
            | 'justify'
            | 'match-parent'
            | undefined
    ) {
        this._data.textAlign = v;
    }

    toJson(): Reptile.Service.WidgetStyleProperties {
        return toJS(this._data);
    }

    dispose(): void {
        /* Do nothing */
    }
}
