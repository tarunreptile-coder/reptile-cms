import { makeAutoObservable } from 'mobx';

type ISliderPropertyController = Reptile.Controllers.ISliderPropertyController;

export default class StyleBorderRadiusController implements ISliderPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleBorderRadiusController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            minValue: false,
            maxValue: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
    }

    get label(): string {
        return 'Border radius';
    }

    get minValue(): number {
        return 0;
    }

    get maxValue(): number {
        return 50;
    }

    get value(): number {
        const match = /(?<value>\d+)px/.exec(this._styleProperties.borderRadius as string);
        if (match) {
            const { value } = match.groups as { value: string };
            return Number.parseInt(value);
        }
        return 0;
    }

    set value(v: number) {
        this._styleProperties.borderRadius = `${v}px`;
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
