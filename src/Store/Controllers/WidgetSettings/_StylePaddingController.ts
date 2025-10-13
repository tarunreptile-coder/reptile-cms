import { makeAutoObservable } from 'mobx';

type ISpacingPropertyController =
    Reptile.Controllers.ISpacingPropertyController;

export default class StylePaddingController
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
            StylePaddingController,
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
        return /\d+px \d+px \d+px \d+px/.test(
            this._styleProperties.padding as string
        );
    }

    set advanced(v: boolean) {
        const match =
            /(?<top>\d+)px(?: (?<right>\d+)px (?<bottom>\d+)px (?<left>\d+)px){0,1}/.exec(
                this._styleProperties.padding as string
            );
        if (match) {
            const { top, right } = match.groups as {
                top: string;
                bottom?: string;
                left?: string;
                right?: string;
            };

            if (v && !right) {
                this._styleProperties.padding = `${top}px ${top}px ${top}px ${top}px`;
            } else if (!v && right) {
                this._styleProperties.padding = `${top}px`;
            }
        }
    }

    get value():
        | number
        | { top: number; bottom: number; left: number; right: number } {
        const match =
            /(?<top>\d+)px(?: (?<right>\d+)px (?<bottom>\d+)px (?<left>\d+)px){0,1}/.exec(
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

        if (typeof v === 'number') {
            this._styleProperties.padding = `${isValidNumber(v) ? v : 0}px`;
        }

        if (typeof v !== 'number') {
            const { top, right, bottom, left } = v;

            const paddingValues = {
                top: isValidNumber(top) ? top : 0,
                right: isValidNumber(right) ? right : 0,
                bottom: isValidNumber(bottom) ? bottom : 0,
                left: isValidNumber(left) ? left : 0,
            };

            this._styleProperties.padding = `${paddingValues.top}px ${paddingValues.right}px ${paddingValues.bottom}px ${paddingValues.left}px`;
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
