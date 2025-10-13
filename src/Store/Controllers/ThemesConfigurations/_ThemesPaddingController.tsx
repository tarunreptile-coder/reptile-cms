import { makeAutoObservable } from 'mobx';

type IThemesPaddingController = Reptile.Controllers.IThemesPaddingController;

export default class ThemesPaddingController
    implements IThemesPaddingController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _value: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesPaddingController,
            '_domain' | '_uiState' | '_selectedRule'
        >(this, {
            _domain: false,
            _uiState: false,
            _selectedRule: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._selectedRule = selectedRule;
        this._property = 'padding';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get label(): string {
        return 'Padding';
    }

    get advanced(): boolean {
        return /\d+px \d+px \d+px \d+px/.test(this._value);
    }

    set advanced(v: boolean) {
        const match =
            /(?<top>\d+)px(?: (?<right>\d+)px (?<bottom>\d+)px (?<left>\d+)px){0,1}/.exec(
                this._value
            );
        if (match) {
            const { top, right } = match.groups as {
                top: string;
                bottom?: string;
                left?: string;
                right?: string;
            };

            if (v && !right) {
                this.theme?.update(
                    this._selectedRule,
                    this._property,
                    `${top}px ${top}px ${top}px ${top}px`
                );
            } else if (!v && right) {
                this.theme?.update(
                    this._selectedRule,
                    this._property,
                    `${top}px`
                );
            }
        }
    }

    get value():
        | number
        | { top: number; bottom: number; left: number; right: number } {
        const match =
            /(?<top>\d+)px(?: (?<right>\d+)px (?<bottom>\d+)px (?<left>\d+)px){0,1}/.exec(
                this._value
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
            this.theme?.update(
                this._selectedRule,
                this._property,
                `${isValidNumber(v) ? v : 0}px`
            );
        }

        if (typeof v !== 'number') {
            const { top, right, bottom, left } = v;

            const paddingValues = {
                top: isValidNumber(top) ? top : 0,
                right: isValidNumber(right) ? right : 0,
                bottom: isValidNumber(bottom) ? bottom : 0,
                left: isValidNumber(left) ? left : 0,
            };
            this.theme?.update(
                this._selectedRule,
                this._property,
                `${paddingValues.top}px ${paddingValues.right}px ${paddingValues.bottom}px ${paddingValues.left}px`
            );
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
