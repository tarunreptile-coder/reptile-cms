declare namespace Reptile.Controllers {
    export interface IEditThemesController extends IController {
        theme?: Reptile.Models.ITheme;

        ruleId: number;

        selectedRule?: Reptile.Models.Rule;

        selectorType: string;

        filter: string;

        filterIndex?: number;

        filters: string[];

        ThemeStyles: IThemesStylesController | undefined;

        getTheme(id: string | undefined): Promise<void>;
    }

    export interface IThemesStylesController extends IController {
        align: IThemesAlignController;

        fontStyle: IThemesFontStyleController;

        fontFamily: IThemesFontFamilyController;

        fontColor: IThemesFontColorController;

        float: Reptile.Controllers.IThemesAlignController;

        backgroundColor: IThemesBackgroundController;

        textSize: IThemesTextSizeController;

        padding: IThemesPaddingController;

        display: IThemesDisplayController;

        width: IThemesWidthController;

        margin: IThemesMarginController;
    }

    export interface IThemesAlignController extends IController {
        alignment?: string;
    }

    export interface IThemesFontStyleController extends IController {
        label: string;

        bold: boolean;

        italic: boolean;

        underline: boolean;
    }

    export interface IThemesFontFamilyController extends IController {
        /**
         * Gets the available displays.
         */
        readonly fonts: Reptile.Models.FontName[];
        /**
         * Gets the selected display
         */
        readonly font: string;
        /**
         * Gets or sets the index of selected display.
         */
        fontIndex?: number;
    }

    export interface IThemesFontColorController extends IController {
        color: import('color-convert/conversions').HSV;

        label: string;
    }

    export interface IThemesBackgroundController extends IController {
        color: import('color-convert/conversions').HSV;

        label: string;
    }

    export interface IThemesTextSizeController extends IController {
        label: string;

        size: string;

        measureIndex?: number;

        measure: string;

        readonly measures: string[];
    }

    export interface IThemesPaddingController extends IController {
        value:
            | number
            | {
                  top: number;
                  bottom: number;
                  left: number;
                  right: number;
              };

        advanced: boolean;

        label: string;
    }

    export interface IThemesMarginController extends IController {
        value:
            | number
            | {
                  top: number;
                  bottom: number;
                  left: number;
                  right: number;
              };

        advanced: boolean;

        label: string;
    }

    export interface IThemesDisplayController extends IController {
        /**
         * Gets the available displays.
         */
        readonly displays: string[];
        /**
         * Gets the selected display
         */
        readonly display: string;
        /**
         * Gets or sets the index of selected display.
         */
        displayIndex?: number;
    }

    export interface IThemesWidthController extends IController {
        label: string;

        size: string;

        measureIndex?: number;

        measure: string;

        readonly measures: string[];
    }

    export interface IThemesHeightController extends IController {
        label: string;

        size: string;

        measureIndex?: number;

        measure: string;

        readonly measures: string[];
    }
}
