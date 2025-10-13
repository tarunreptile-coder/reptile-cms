declare namespace Reptile.Controllers {
    export interface IResetPasswordController extends IController {
        /**
         * Sets the visibility of the password
         */
        passwordVisibility: boolean;
        /**
         * Sets the visibility of the password
         */
        confirmVisibility: boolean;
        /**
         * Gets and sets users password
         */
        password: string;
        /**
         * Gets and sets users password
         */
        confirm: string;
        /**
         * Lets user know if authentication was successful
         */
        done: boolean;
        /**
         * Makes sure password matches criteria
         */
        validatePassword: boolean;
        /**
         * Makes sure password matches criteria
         */
        missingChar: boolean;
        /**
         * Submits the users password details
         */
        resetPassword(
            username?: string | (string | null)[] | null,
            code?: string | (string | null)[] | null,
            isNewUser?: string | (string | null)[] | null
        ): Promise<void>;
        /**
         * Redirect user to login page
         */
        navigateToLoginPage(): void;
    }
}
