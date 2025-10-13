import { makeAutoObservable } from 'mobx';

type ISizePropertyController = Reptile.Controllers.ISizePropertyController;

export default class StyleMinHeightController
    implements ISizePropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _styleProperties: Reptile.Models.IWidgetStyleProperties;

    measures: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        styleProperties: Reptile.Models.IWidgetStyleProperties
    ) {
        makeAutoObservable<
            StyleMinHeightController,
            '_domain' | '_uiState' | '_styleProperties'
        >(this, {
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
        this.measures = ['px', '%', 'em', 'pt', 'auto'];
    }

    get label(): string {
        return 'Height';
    }

    get measure(): string {
        const match = /(px)|(%)|(em)|(pt)|(auto)/.exec(
            this._styleProperties.minHeight as string
        );
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
            this._styleProperties.minHeight =
                this._styleProperties.minHeight?.replace(
                    /(px)|(%)|(em)|(pt)|(auto)/,
                    this.measures[v]
                );
        }
    }

    get size(): string | undefined {
        if (this._styleProperties.minHeight?.includes('auto')) {
            return (this._styleProperties.minHeight = `${this.measure}`);
        }

        if (!this._styleProperties.minHeight?.includes('auto')) {
            return this._styleProperties.minHeight?.replace(
                /(px)|(%)|(em)|(pt)/,
                ''
            ) as string;
        }
    }

    set size(v: string | undefined) {
        let nv = Number.parseInt(v ?? '');

        isNaN(nv) ? (nv = 0) : nv;

        const measure = this.measure;
        if (nv >= 0) {
            this._styleProperties.minHeight = `${nv}${measure}`;
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
