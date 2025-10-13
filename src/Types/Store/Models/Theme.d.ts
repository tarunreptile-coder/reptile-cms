declare namespace Reptile.Models {
    export type CodePosition = {
        line: number;
        column: number;
    };

    export type CodeRange = {
        start: CodePosition;
        end: CodePosition;
    };

    export type Rule = {
        type: 'rule';
        selectors: string[];
        declarations: RuleDeclaration[];
        position: CodeRange;
        visibility: boolean;
        name: string;
        selectorName: string;
        selectorType: string;
        styleType: string;
    };

    export type RuleDeclaration = {
        type: 'declaration';
        property: string;
        value: string;
        position: CodeRange;
    };

    export type Stylesheet = {
        type: 'stylesheet';
        stylesheet: {
            rules: Rule[];
            parsingErrors: [];
        };
    };

    export type ThemesObj = {
        viewModels: IThemesStyling[];
        totalCount: number;
        exception: any;
    };

    export interface ITheme extends IDisposable {
        readonly id: string;
        name: string;
        readonly isAdvanced: boolean;
        isActive: boolean;
        readonly css: string;
        readonly rules: Rule[];
        publicationContentEntityName: string;
        publicationContentEntityId: string;
        update(
            selectedRule: Reptile.Models.Rule,
            property: string,
            v: string
        ): void;
        advancedCss(structure: Reptile.Models.Stylesheet): void;
        create(structure: Reptile.Models.Rule): void;
        saveChanges(): Promise<void>;
    }

    export interface IThemes {
        _data: IThemesStyling;
    }

    export interface IThemesStyling {
        id: string;
        name: string;
        isAdvanced: boolean;
        isActive: boolean;
        publisherContentEntityName: string;
        publisherContentEntityId: string;
        publicationContentEntityName: string;
        publicationContentEntityId: string;
        css: string;
        jsonStructure: string;
        createdBy: string;
        created: string;
    }

    export type IStructure = {
        id: string
        name: string
        selectorType: string
        selectorName: string
        type: string
        css: Css
      }[]

      export interface Css {
        fontSize?: string
        fontFamily?: string
        color?: string
        fontWeight?: string
        background?: string
        width?: string
        margin?: string
        padding?: string
        float?: string
      }
}
