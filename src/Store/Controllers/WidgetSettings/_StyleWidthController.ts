import { makeAutoObservable } from 'mobx';

type ISizePropertyController = Reptile.Controllers.ISizePropertyController;

export default class StyleWidthController implements ISizePropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    measures: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties,
    ) {
        makeAutoObservable<StyleWidthController, '_domain' | '_uiState' | '_styleProperties'>(this, {
            _domain: false,
            _uiState: false,
            _styleProperties: false,
            label: false,
            measures: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._styleProperties = styleProperties;
        this.measures = ['px', '%', 'em', 'pt'];
    }

    get label(): string {
        return 'Width';
    }

    get measure(): string {
        const match = /(px)|(%)|(em)|(pt)/.exec(this._styleProperties.width as string);
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
            this._styleProperties.width = this._styleProperties.width?.replace(/(px)|(%)|(em)|(pt)/, this.measures[v]);
        }
    }

    get size(): string {
        return this._styleProperties.width?.replace(/(px)|(%)|(em)|(pt)/, '') as string;
    }

    set size(v: string) {
        const measure = this.measure;
        this._styleProperties.width = `${v}${measure}`;
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
