declare namespace Reptile.Controllers {
    export interface ILoginController extends IController {
        /**
         * Username that the user inputs
         */
        username: string;
        /**
         * Password that the user inputs
         */
        password: string;
        /**
         * Sets the visibility of the password
         */
        passwordVisibility: boolean;
        /**
         * Warns warns user if authentication fails
         */
        error: boolean;
        /**
         * Login user with username and password to receive token
         */
        login(): Promise<void>;
        /**
         * Redirect user to register page
         */
        navigateToRegisterPage(): void;
        /**
         * Redirect user to reset password page
         */
        navigateToForgetPasswordPage(): void;
        /**
         * Opens new tab for terms and conditions
         */
        navigateToTermsAndConditions(): void;
    }
}
