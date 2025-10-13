declare namespace Reptile.Controllers {
    export interface IBreadcrumbsController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
        /**
         * Array of paths to display in breadcrumbs
         */
        readonly paths: string[],
        /**
         * Gets the current content id.
         */
        readonly currentContentId?: string,
        /**
         * Navigates to given index in paths array.
         * @param idx Index of path to navigate to
         */
        navigateTo(idx: number): Promise<void>,
    }
}
