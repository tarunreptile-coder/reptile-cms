import { makeAutoObservable } from 'mobx';
import * as convert from 'color-convert';
import { HSV } from 'color-convert/conversions';

type IThemesBackgroundController =
    Reptile.Controllers.IThemesBackgroundController;

export default class ThemesBackgroundController
    implements IThemesBackgroundController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _color: HSV;

    private _value: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesBackgroundController,
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
        this._property = 'background-color';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
        this._color = convert.hex.hsv.raw(this._value);
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get label(): string {
        return 'Background color';
    }

    get alpha(): number {
        return this._value === 'transparent' ? 0 : 100;
    }

    set alpha(v: number) {
        if (!this.theme) {
            return;
        }

        if (v === 100) {
            this.theme.update(
                this._selectedRule,
                this._property,
                `#${convert.hsv.hex.raw(this._color)}`
            );
        } else {
            this.theme.update(
                this._selectedRule,
                this._property,
                'transparent'
            );
        }
    }

    get color(): HSV {
        return this._color;
    }

    set color(v: HSV) {
        if (!this.theme) {
            return;
        }

        this._color = v;
        if (this._value !== 'transparent') {
            this.theme.update(
                this._selectedRule,
                this._property,
                `#${convert.hsv.hex.raw(v)}`
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
