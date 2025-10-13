import { makeAutoObservable, toJS } from 'mobx';
import WidgetComponent from './_WidgetComponent';
import WidgetGeneralProperties from './_WidgetGeneralProperties';
import WidgetStyleProperties from './_WidgetStyleProperties';

type IWidget = Reptile.Models.IWidget;

export default class Widget implements IWidget {
    private readonly _data: Reptile.Service.Widget;

    readonly contents: Reptile.Models.IWidgetComponent[];

    readonly properties: Reptile.Models.IWidgetGeneralProperties;

    readonly styles: Reptile.Models.IWidgetStyleProperties;

    constructor(
        data: Reptile.Service.Widget,
    ) {
        makeAutoObservable(this, {
            dispose: false,
        });
        this._data = data;
        this.contents = this._data.contents.map((content) => new WidgetComponent(content));
        this.properties = new WidgetGeneralProperties(this._data.properties.general);
        this.styles = new WidgetStyleProperties(this._data.properties.styles);
    }

    get id(): string {
        return this._data.id;
    }

    get layoutId(): string | undefined {
        return this._data.layoutId
    }

    get widgetId(): string | undefined {
        return this._data.widgetId
    }

    get type(): string {
        return this._data.type;
    }

    get className(): string {
        return this._data.className;
    }

    get friendlyName(): string {
        return this._data.friendlyName;
    }

    get allowedLinkedContentTypes(): number[] | undefined {
        return this._data.allowedLinkedContentTypes;
    }

    get isLocked(): boolean {
        return this._data.isLocked ?? false;
    }

    set isLocked(v: boolean) {
        this._data.isLocked = v;
    }

    toJson(): Reptile.Service.Widget {
        return toJS(this._data);
    }

    dispose(): void {
        /* Do nothing */
    }
}
