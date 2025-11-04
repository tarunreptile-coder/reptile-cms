declare namespace Reptile.Controllers {
    export interface IIssueItemController extends IController {
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
         * Opens or closes template modal.
         */
        modalArticle: boolean;
        /**
         * Opens or closes folder modal.
         */
        modalSection: boolean;
        /**
         * Opens the article modal.
         */
        onClickArticle(): void;
        /**
         * Opens the section modal.
         */
        onClickSection(): void;
        /**
         * Creates the article with given settings.
         */
        createArticle(): Promise<void>;
        /**
         * Creates the section with given settings.
         */
        createSection(): Promise<void>;
    }
}