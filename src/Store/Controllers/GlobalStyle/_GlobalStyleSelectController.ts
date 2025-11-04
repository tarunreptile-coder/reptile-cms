import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type IGlobalStyleSelectController =
    Reptile.Controllers.IGlobalStyleSelectController;

export default class GlobalStyleSelectController
    implements IGlobalStyleSelectController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule | undefined;

    _property?: string;

    _options: string[];

    _selectedOption: string;

    _selectedIndex?: number;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<GlobalStyleSelectController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                label: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._options = [
            'Splash Screen',
            'Home',
            'Settings',
            'Help',
            'Search',
            'Bookmark',
        ];
        this._selectedOption = 'Splash Screen';
    }

    get label() {
        return 'Display Screen';
    }

    get options() {
        return this._options;
    }

    get selectedOption() {
        if (this._selectedOption) {
            return this._selectedOption;
        }
        return '';
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(v) {
        this._selectedIndex = v;
        if (this._selectedIndex) {
            this.getSelectedIndex(this._selectedIndex);
            this._selectedOption = this._options[this._selectedIndex];
        }
        if(!this._selectedIndex){
            this._selectedIndex = 0
            this.getSelectedIndex(this._selectedIndex);
            this._selectedOption = this._options[this._selectedIndex];
        }
    }

    getSelectedIndex(index: number) {
        this._domain.globalStyle.getSelectedIndex(index);
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
