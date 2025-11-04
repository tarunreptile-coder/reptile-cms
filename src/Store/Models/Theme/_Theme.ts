import { CssService } from '~/Services';
import { makeAutoObservable } from 'mobx';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';

type ITheme = Reptile.Models.ITheme;

type ThemePrivateFields = '_api' | '_domain';

export default class Theme implements ITheme {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _data: Reptile.Service.Theme;

    constructor(
        api: Reptile.Service.IReptileApi,
        store: Reptile.Models.IDomain,
        data: Reptile.Service.Theme
    ) {
        makeAutoObservable<Theme, ThemePrivateFields>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = store;
        this._data = data;
    }

    get id(): string {
        return this._data.id;
    }

    get name(): string {
        return this._data.name;
    }

    set name(v: string) {
        this._data.name = v;
    }

    get isAdvanced(): boolean {
        return this._data.isAdvanced;
    }

    get isActive(): boolean {
        return this._data.isActive;
    }

    set isActive(v: boolean) {
        this._data.isActive = v;
    }

    get css(): string {
        return this._data.css;
    }

    get rules(): Reptile.Models.Rule[] {
        const structure = JSON.parse(this._data.jsonStructure) as
            | Reptile.Models.Stylesheet
            | Reptile.Models.IStructure;

        let rules;

        if ((structure as Reptile.Models.Stylesheet).stylesheet) {
            rules = (structure as Reptile.Models.Stylesheet).stylesheet.rules;
        } else {
            const cssObj = CssService.convertToJson(this._data.css).stylesheet
                .rules;

            cssObj.forEach((rule) => {
                rule.styleType =
                    (structure as Reptile.Models.IStructure).find((e) => {
                        return e.selectorName === rule.name;
                    })?.type ?? 'image';

                return rule;
            });

            rules = cssObj;
        }

        return rules;
    }

    get publicationContentEntityName(): string {
        return this._data.publicationContentEntityName;
    }

    set publicationContentEntityName(v: string) {
        this._data.publicationContentEntityName = v;
    }

    get publicationContentEntityId(): string {
        return this._data.publicationContentEntityId;
    }

    set publicationContentEntityId(v: string) {
        this._data.publicationContentEntityId = v;
    }

    create(rule: Reptile.Models.Rule) {
        const jsonStructure = JSON.parse(this._data.jsonStructure) as
            | Reptile.Models.Stylesheet
            | Reptile.Models.IStructure;

        if ((jsonStructure as Reptile.Models.Stylesheet)?.stylesheet) {
            (
                jsonStructure as Reptile.Models.Stylesheet
            ).stylesheet.rules.unshift(rule);

            this._data.jsonStructure = JSON.stringify(jsonStructure);
        }

        if (!(jsonStructure as Reptile.Models.Stylesheet)?.stylesheet) {
            const newObj = {
                css: rule.declarations,
                id: '',
                name: rule.name,
                selectorName: rule.selectorName,
                selectorType: 'tag',
                type: rule.styleType,
            };
            (jsonStructure as Reptile.Models.IStructure).unshift(newObj);

            this._data.jsonStructure = JSON.stringify(jsonStructure);
        }

        const css = CssService.convertToJson(this._data.css);

        if (css.stylesheet) {
            css.stylesheet.rules.unshift(rule);

            this._data.css = CssService.convertToCss(css);
        }
    }

    advancedCss(structure: Reptile.Models.Stylesheet) {
        this._data.jsonStructure = JSON.stringify(structure);

        this._data.css = CssService.convertToCss(structure);
    }

    update(selectedRule: Reptile.Models.Rule, property: string, v: string) {
        const jsonStructure = JSON.parse(
            this._data.jsonStructure
        ) as Reptile.Models.Stylesheet;

        if (jsonStructure?.stylesheet) {
            const structureRule = jsonStructure.stylesheet.rules.find(
                (e) => e.name === selectedRule.name
            );

            const index = structureRule?.declarations.findIndex(
                (obj) => obj.property === property
            );

            if (index !== -1) {
                const value = structureRule?.declarations.find(
                    (e) => e.property === property
                );
                value ? (value.value = v) : null;
            }

            if (index === -1) {
                structureRule?.declarations.push({
                    type: 'declaration',
                    position: {
                        start: { line: 0, column: 1 },
                        end: { line: 0, column: 1 },
                    },
                    property,
                    value: v,
                });
            }

            this._data.jsonStructure = JSON.stringify(jsonStructure);

            this._data.css = CssService.convertToCss(jsonStructure);
        }

        if (!jsonStructure?.stylesheet) {
            const css = CssService.convertToJson(this._data.css);

            const structureRule = css.stylesheet.rules.find(
                (e) => e.name === selectedRule.name
            );

            const index = structureRule?.declarations.findIndex(
                (obj) => obj.property === property
            );

            if (index !== -1) {
                const value = structureRule?.declarations.find(
                    (e) => e.property === property
                );
                value ? (value.value = v) : null;
            }

            if (index === -1) {
                structureRule?.declarations.push({
                    type: 'declaration',
                    position: {
                        start: { line: 0, column: 1 },
                        end: { line: 0, column: 1 },
                    },
                    property,
                    value: v,
                });
            }

            this._data.css = CssService.convertToCss(css);
        }
    }

    async saveChanges() {
        await this._api.theme.set(this._data);

        Notification.success({
            description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
        });
    }

    dispose(): void {
        /* Do nothing */
    }
}
