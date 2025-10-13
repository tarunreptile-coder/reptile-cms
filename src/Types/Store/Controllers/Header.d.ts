declare namespace Reptile.Controllers {
    export interface IHeaderController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * User avatar url to display.
         */
        readonly avatarUrl?: string;
        /**
         * Gets the current active mode.
         */
        readonly mode:
            | 'content'
            | 'design'
            | 'app-build'
            | 'prototype'
            | 'finish'
            | 'none';

        readonly superUser: boolean;

        isFinishDisabled?: boolean;
        /**
         * Navigates to content page
         */
        navigateToContent(): Promise<void>;
        /**
         * Navigates to design page
         */
        navigateToDesign(): Promise<void>;
        /**
         * Navigates to home page
         */
        navigateToHome(): Promise<void>;
        /**
         * Navigates to styles
         */
        navigateToAppBuild(): Promise<void>;
        /**
         * Navigates to prototype
         */
        navigateToPrototype(): Promise<void>;
        /**
         * Navigates to finish
         */
        navigateToFinish(): Promise<void>;
        /**
         * Navigates to settings
         */
        navigateToSettings(): void;
        /**
         * Navigates to plan
         */
        navigateToPlan(): Promise<void>;
    }
}
