declare namespace Reptile.Controllers {
    export interface INavigationSideMenuController extends IController {
        /**
         * Checks if user is admin
         */
        readonly admin?: boolean;
        /**
         * Checks if user is superUser
         */
        readonly superUser?: boolean;
        /**
         * Checks if nav is minimised
         */
        isActive: boolean;
        /**
         * Get organizations and roles
         */
        getAllUsers(): Promise<void>;
    }
}
