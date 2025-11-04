import { makeAutoObservable } from 'mobx';

type IThemesTextSizeController = Reptile.Controllers.IThemesTextSizeController;

export default class ThemesTextSizeController
    implements IThemesTextSizeController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _value: string;

    measures: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesTextSizeController,
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
        this.measures = ['unset', 'px', '%', 'pt', 'em'];
        this._property = 'font-size';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get label(): string {
        return 'Font size';
    }

    get measure(): string {
        const match = /(px)|(%)|(em)|(pt)/.exec(this._value);
        if (match) {
            return match[0];
        }

        return 'px';
    }

    get measureIndex(): number {
        const measure = this.measure;
        return this.measures.findIndex((meas) => meas === measure);
    }

    set measureIndex(v: number) {
        if (v < this.measures.length) {
            this.theme?.update(
                this._selectedRule,
                this._property,
                this._value?.replace(/(px)|(%)|(em)|(pt)/, this.measures[v])
            );
        }
    }

    get size(): string {
        return this._value?.replace(/(px)|(%)|(em)|(pt)/, '');
    }

    set size(v: string) {
        const measure = this.measure;
        this.theme?.update(
            this._selectedRule,
            this._property,
            `${v}${measure}`
        );
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
