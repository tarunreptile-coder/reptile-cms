import { makeAutoObservable, toJS } from 'mobx';
import WidgetGeneralProperties from './_WidgetGeneralProperties';
import WidgetStyleProperties from './_WidgetStyleProperties';

type IWidgetComponent = Reptile.Models.IWidgetComponent;

export default class WidgetComponent implements IWidgetComponent {
    private readonly _data: Reptile.Service.WidgetComponent;

    readonly properties: Reptile.Models.IWidgetGeneralProperties;

    readonly styles: Reptile.Models.IWidgetStyleProperties;

    constructor(
        data: Reptile.Service.WidgetComponent,
    ) {
        makeAutoObservable(this, {
            dispose: false,
        });
        this._data = data;
        this.properties = new WidgetGeneralProperties(this._data.properties.general);
        this.styles = new WidgetStyleProperties(this._data.properties.styles);
    }

    get id(): string {
        return this._data.id;
    }

    get type(): string {
        return this._data.type;
    }

    toJson(): Reptile.Service.WidgetComponent {
        return toJS(this._data);
    }

    dispose(): void {
        /* Do nothing */
    }
}
