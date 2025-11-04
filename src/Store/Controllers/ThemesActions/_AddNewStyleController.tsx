import { makeAutoObservable } from 'mobx';
import { DECLARATIONS, RULE_TEMPLATE } from '@Reptile/Constants/Constants';

type IAddNewStyleController = Reptile.Controllers.IAddNewStyleController;

export default class AddNewStyleController implements IAddNewStyleController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _theme: Reptile.Models.IThemesStyling | undefined;

    _css?: string;

    _stylesheetObject?: Reptile.Models.Stylesheet;

    _ruleTemplate: Reptile.Models.Rule;

    _name: string;

    _selectorName: string;

    _styleType: string;

    _styleTypes: string[];

    _styleTypeIndex?: number;

    _type: string;

    _types: string[];

    _typeIndex?: number;

    _modal: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<AddNewStyleController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._theme = undefined;
        this._css = undefined;
        this._ruleTemplate = RULE_TEMPLATE;
        this._name = '';
        this._selectorName = '';
        this._styleType = '';
        this._type = '';
        this._styleTypes = ['text', 'image'];
        this._types = ['class', 'id', 'tag'];
        this._modal = false;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._domain.theme.theme;
    }

    get css() {
        return this._domain.theme.css;
    }

    get name() {
        return this._name;
    }

    set name(v) {
        this._name = v;
    }

    get selectorName() {
        return this._selectorName;
    }

    set selectorName(v) {
        this._selectorName = v;
    }

    get styleType() {
        return this._styleType;
    }

    get styleTypes() {
        return this._styleTypes;
    }

    get styleTypeIndex() {
        return this._styleTypeIndex;
    }

    set styleTypeIndex(v) {
        this._styleTypeIndex = v;
        if (this._styleTypeIndex === 0 || this._styleTypeIndex) {
            this._styleType = this._styleTypes[this._styleTypeIndex];
        }
    }

    get type() {
        return this._type;
    }

    get types() {
        return this._types;
    }

    get typeIndex() {
        return this._typeIndex;
    }

    set typeIndex(v) {
        this._typeIndex = v;
        if (this._typeIndex === 0 || this._typeIndex) {
            this._type = this._types[this._typeIndex];
        }
    }

    get modal() {
        return this._modal;
    }

    set modal(v) {
        this._modal = v;
    }

    updateJsonStructure() {
        this._ruleTemplate.selectors[0] = '.' + this._name;

        this._ruleTemplate.name = this._name;

        this._ruleTemplate.selectorName = '.' + this._name;

        this._ruleTemplate.selectorType = this._type;

        this._ruleTemplate.styleType = this._styleType;

        if (this._ruleTemplate.styleType === 'image') {
            
            this._ruleTemplate.declarations.push({
                type: 'declaration',
                property: 'width',
                value: '100%',
                position: {
                    start: {
                        line: 0,
                        column: 0,
                    },
                    end: {
                        line: 0,
                        column: 0,
                    },
                },
            });
        }

        this.theme?.create(this._ruleTemplate);

        this._name = '';

        this._selectorName = '';

        this._typeIndex = undefined;

        this._type = '';

        this._styleTypeIndex = undefined;

        this._styleType = '';
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    //Gets the theme by the id
    async getTheme(id: string): Promise<void> {
        await this._domain.theme.fetch(id);
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
