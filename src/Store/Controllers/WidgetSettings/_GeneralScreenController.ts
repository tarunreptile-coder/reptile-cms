import { makeAutoObservable } from 'mobx';

type IDropdownPropertyController = Reptile.Controllers.IDropdownPropertyController;

export default class GeneralScreenController implements IDropdownPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties
    ) {
        makeAutoObservable<
        GeneralScreenController,
            '_domain' | '_uiState' | '_generalProperties'
        >(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._generalProperties = generalProperties;
    }

    get options(): string[] {
        const combinedLayout = (this._domain.layout.layouts || []).reduce<
            string[]
        >((result, item) => item.layouts.map((layout) => layout.name), []);
        return combinedLayout;
    }

    get label(): string {
        return 'Screen';
    }

    get selectedIndex(): number {
        return this.options.findIndex(
            (option) => option === this._generalProperties.link
        );
    }

    set selectedIndex(v: number) {
        if (v < this.options.length) {
            this._generalProperties.link = this.options[v];
        }
    }

    get selectedOption(): string {
        return this.selectedIndex !== -1
            ? this.options[this.selectedIndex]
            : '';
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
