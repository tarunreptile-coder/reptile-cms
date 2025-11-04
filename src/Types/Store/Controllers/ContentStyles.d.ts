declare namespace Reptile.Controllers {
    export interface IContentStylesController extends IController {
        /**
         * Gets or sets the current active theme.
         */
        theme?: Models.ITheme;
        /**
         * Gets all available themes.
         */
        readonly themes: Models.IThemesStyling[];
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Show theme styles/rules.
         */
        hideStyles: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Fetches all available themes.
         */
        fetchThemes(id?: string): Promise<void>;
        /**
         * Requests to edit given theme
         * @param themeId Id of theme to edit
         */
        requestEditTheme(themeId: string): void;
        /**
         * Requests to apply given style from the active theme to controlled content.
         * @param style Style to apply
         */
        applyStyle(style: Models.Rule): void;
    }
}
