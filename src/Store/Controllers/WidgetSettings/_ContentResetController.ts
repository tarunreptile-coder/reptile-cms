import { makeAutoObservable } from 'mobx';
import { UTILS } from '~/Utils';

type IResetPropertyController = Reptile.Controllers.IResetPropertyController;

export default class ContentResetController
    implements IResetPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _contentsProperties?: Reptile.Models.IWidgetComponent[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        ContentsProperties?: Reptile.Models.IWidgetComponent[]
    ) {
        makeAutoObservable<
            ContentResetController,
            '_domain' | '_uiState' | '_contentsProperties'
        >(this, {
            _domain: false,
            _uiState: false,
            _contentsProperties: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._contentsProperties = ContentsProperties;
    }

    get label(): string {
        return 'Reset Content';
    }

    get value(): string | undefined {
        return (
            this._contentsProperties &&
            this._contentsProperties[0].properties.htmlBody
        );
    }

    set value(v: string | undefined) {
        if (this._contentsProperties && this._contentsProperties[0].properties.htmlBody) {
            this._contentsProperties[0].properties.htmlBody = UTILS.removeStyleFromHTMLString(this._contentsProperties[0].properties.htmlBody);
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
