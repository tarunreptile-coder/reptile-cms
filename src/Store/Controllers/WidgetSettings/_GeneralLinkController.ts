import { makeAutoObservable } from 'mobx';

type IInputPropertyController = Reptile.Controllers.IInputPropertyController;

export default class GeneralLinkController implements IInputPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties
    ) {
        makeAutoObservable<
            GeneralLinkController,
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

    get label(): string {
        return 'URL';
    }

    get placeholder(): string {
        return "https://app.onreptile.com"
    }

    get type(): string {
        return 'text';
    }

    get value(): string {
        return this._generalProperties.link as string;
    }

    set value(v: string) {
        this._generalProperties.link = v;
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
