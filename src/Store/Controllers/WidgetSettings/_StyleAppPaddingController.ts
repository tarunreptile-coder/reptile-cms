import { makeAutoObservable } from 'mobx';

type ISpacingPropertyController =
    Reptile.Controllers.ISpacingPropertyController;

export default class StyleAppPaddingController
    implements ISpacingPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties
    ) {
        makeAutoObservable<
            StyleAppPaddingController,
            '_domain' | '_uiState' | '_styleProperties'
        >(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
    }

    get label(): string {
        return 'Padding';
    }

    get advanced(): boolean {
        return this._styleProperties?.padding ? this._styleProperties?.padding?.trim().indexOf(' ') !== -1 : false;
    }

    set advanced(v: boolean) {
        const match =
            /(?<top>\d+)(?<unit>px|%)(?: (?<right>\d+)\k<unit> (?<bottom>\d+)\k<unit> (?<left>\d+)\k<unit>){0,1}/.exec(
                this._styleProperties.padding as string
            );
        if (match) {
            const { top, right, unit } = match.groups as {
                top: string;
                unit: string;
                bottom?: string;
                left?: string;
                right?: string;
            };

            if (v && !right) {
                this._styleProperties.padding = `${top}${unit} ${top}${unit} ${top}${unit} ${top}${unit}`;
            } else if (!v && right) {
                this._styleProperties.padding = `${top}${unit}`;
            }
        } else {
            // Handle cases where padding is a single value like '0px' or '0%', or is empty.
            // This ensures the advanced state can be set correctly even with simple padding values.
            if (v) {
                this._styleProperties.padding = '0% 0% 0% 0%';
            } else {
                this._styleProperties.padding = '0%';
            }
        }
    }

    get value():
        | number
        | { top: number; bottom: number; left: number; right: number } {
        const match =
            /(?<top>\d+)(?<unit>px|%)(?: (?<right>\d+)\k<unit> (?<bottom>\d+)\k<unit> (?<left>\d+)\k<unit>){0,1}/.exec(
                this._styleProperties.padding as string
            );
        if (match) {
            const { top, right, bottom, left } = match.groups as {
                top: string;
                bottom?: string;
                left?: string;
                right?: string;
            };

            return right
                ? {
                      top: Number.parseInt(top),
                      right: Number.parseInt(right),
                      bottom: Number.parseInt(bottom as string),
                      left: Number.parseInt(left as string),
                  }
                : Number.parseInt(top);
        }

        return 0;
    }

    set value(
        v: number | { top: number; bottom: number; left: number; right: number }
    ) {
        const isValidNumber = (value: number) => {
            return (
                typeof value === 'number' && !Number.isNaN(value) && value > 0
            );
        };
        // Check if the current padding value is a percentage, and if so, preserve the unit.
        const isPercentage = (this._styleProperties.padding as string).includes('%');
        const unit = isPercentage ? '%' : 'px';

        if (typeof v === 'number') {
            this._styleProperties.padding = `${isValidNumber(v) ? v : 0}${unit}`;
        }

        if (typeof v !== 'number') {
            const { top, right, bottom, left } = v;

            const paddingValues = {
                top: isValidNumber(top) ? top : 0,
                right: isValidNumber(right) ? right : 0,
                bottom: isValidNumber(bottom) ? bottom : 0,
                left: isValidNumber(left) ? left : 0,
            };

            this._styleProperties.padding = `${paddingValues.top}${unit} ${paddingValues.right}${unit} ${paddingValues.bottom}${unit} ${paddingValues.left}${unit}`;
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
