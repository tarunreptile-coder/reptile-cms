import { makeAutoObservable } from 'mobx';

type IInputPropertyController = Reptile.Controllers.IDropdownPropertyController;

export default class GeneralActionController
    implements IInputPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties
    ) {
        makeAutoObservable<
            GeneralActionController,
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
        return this._generalProperties.actions?.map((obj) => obj.Name) ?? [];
    }

    get label(): string {
        return 'Functions';
    }

    get selectedIndex(): number {
        return (
            this._generalProperties.actions?.findIndex(
                (option) => option.Code === this._generalProperties.action
            ) ?? -1
        );
    }

    set selectedIndex(v: number) {
        if (v < this.options.length && this._generalProperties.actions) {
            this._generalProperties.action =
                this._generalProperties.actions[v].Code;
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
