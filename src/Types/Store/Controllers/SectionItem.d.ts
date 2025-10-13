declare namespace Reptile.Controllers {
    export interface ISectionItemController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Gets or sets current step of project creation wizard.
         */
        step: 0 | 1 | 2 | 3;
        /**
         * Gets or sets the project name.
         */
        name: string;
        /**
         * Opens or closes article modal.
         */
        modalArticle: boolean;
        /**
         * Opens the article modal.
         */
        onClickArticle(): void;
        /**
         * Creates the article with given settings.
         */
        createArticle(): Promise<void>;
    }
}
