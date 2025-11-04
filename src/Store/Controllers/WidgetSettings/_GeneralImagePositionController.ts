import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type IImagePositionPropertyController =
    Reptile.Controllers.IImagePositionPropertyController;

export default class GeneralImagePositionController
    implements IImagePositionPropertyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

    private readonly _positions: { displayName: string; name: string }[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        generalProperties: Reptile.Models.IWidgetGeneralProperties
    ) {
        makeAutoObservable<
            GeneralImagePositionController,
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
        this._positions = [
            { displayName: 'Before', name: 'BEFORE' },
            { displayName: 'After', name: 'AFTER' },
            { displayName: 'Alternate', name: 'ALTERNATE' },
        ];
    }

    get positions(): { displayName: string; name: string }[] {
        return this._positions;
    }

    get label(): string {
        return 'Image Position';
    }

    get positionIndex(): number {
        return this.positions.findIndex(
            (position) =>
                position.name === this._generalProperties.imagePosition
        );
    }

    set positionIndex(v: number) {
        if (v < this.positions.length) {
            this._generalProperties.imagePosition = this.positions[v].name;
        }
    }

    get position(): string {
        return (
            this.positions.find(
                (position) =>
                    position.name === this._generalProperties.imagePosition
            )?.displayName ?? ''
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
