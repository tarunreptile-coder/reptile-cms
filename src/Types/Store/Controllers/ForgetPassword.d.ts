declare namespace Reptile.Controllers {
    export interface IForgetPasswordController extends IController {
        /**
         * Email that the user inputs
         */
        email: string;
        /**
         * Warns warns user if authentication fails
         */
        error: boolean;
        /**
         * Lets user know if authentication was successful
         */
        done: boolean;
        /**
         * User will recieve a link to reset their password
         */
        forgetPassword(): Promise<void>;
        /**
         * Redirect user to login page
         */
        navigateToLoginPage(): void;
    }
}
