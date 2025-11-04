import { makeAutoObservable } from 'mobx';

type IInputPropertyController = Reptile.Controllers.IInputPropertyController;

export default class GeneralTextController implements IInputPropertyController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties,
    ) {
        makeAutoObservable<GeneralTextController, '_domain' | '_uiState' | '_generalProperties'>(this, {
            _domain: false,
            _uiState: false,
            _generalProperties: false,
            label: false,
            type: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._generalProperties = generalProperties;
    }

    get label(): string {
        return 'Text';
    }

    get type(): string {
        return 'text';
    }

    get value(): string {
        return this._generalProperties.text as string;
    }

    set value(v: string) {
        this._generalProperties.text = v;
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
