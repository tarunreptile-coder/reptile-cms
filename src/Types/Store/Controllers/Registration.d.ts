declare namespace Reptile.Controllers {
    export interface IRegistrationController extends IController {
        /**
         * Firstname that the user inputs
         */
        firstname: string;
        /**
         * Lastname that the user inputs
         */
        lastname: string;
        /**
         * Email that the user inputs
         */
        email: string;
        /**
         * Password that the user inputs
         */
        password: string;
        /**
         * Sets the visibilty of the password
         */
        passwordVisibility: boolean;
        /**
         * T&C's user has to agree to
         */
        termsAndPrivacy: boolean;
        /**
         * User required to confirm email address
         */
        requiredAccountConfirmation: boolean;
        /**
         * Set to true when user signs up successfully
         */
        successRegistration: boolean;
        /**
         * Sends the user inputs to the backend
         */
        signUp(): Promise<void>;
    }
}
