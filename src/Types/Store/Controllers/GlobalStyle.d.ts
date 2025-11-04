declare namespace Reptile.Controllers {
    export interface IGlobalStyleController extends IController {
        selectedOption?: string;

        homeScreenColor?: string;

        settingScreenColor?: string;

        searchScreenColor?: string;

        helpScreenColor?: string;

        bookmarkScreenColor?: string;

        splashScreenColor?: string;

        color: IGlobalStyleColorController;

        screenSelect: IGlobalStyleSelectController;

        logo: string;

        saveApp(): Promise<void>;

        getData(): Promise<void>;
    }

    export interface IGlobalStyleColorController extends IController {
        /**
         * Gets the color picker label.
         */
        readonly label: string;
        /**
         * Gets or sets alpha channel of color
         */
        alpha?: number;
        /**
         * Gets or sets the HSV values of color
         */
        color: import('color-convert/conversions').HSV;

        colorString?: string
    }

    export interface IGlobalStyleSelectController extends IController {
        label: string;
        /**
         * Gets the available option.
         */
        readonly options: string[];
        /**
         * Gets the selected option
         */
        readonly selectedOption: string;
        /**
         * Gets or sets the index
         */
        selectedIndex?: number;
    }
}
