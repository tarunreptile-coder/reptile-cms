declare namespace Reptile.Controllers {
    export interface IAccountSettingsController extends IController {
        /**
         * Gets the users avatar.
         */
        readonly avatarUrl?: string;
        /**
         * Gets the users billing plan.
         */
        readonly usersPlan: string;
        /**
         * Gets and sets the users first name.
         */
        firstName: string;
        /**
         * Gets and sets the users last name.
         */
        lastName: string;
        /**
         * Gets and sets the username.
         */
        username: string;
        /**
         * Gets and sets the users email.
         */
        email: string;
        /**
         * Gets and sets the modal.
         */
        modal: boolean;
        /**
         * Displays the length of time user has for their free account.
         */
        usersFreeTrial?: number;

        trialStatus: boolean;

        status: "initial" | "pending" | "done" | "error"

        /**
         * Uploads users profile picture.
         */
        imageUpload(file: File): Promise<void>;
        /**
         * User purchases plan.
         */
        makePayment(): Promise<void>;
        /**
         * Edits account details.
         */
        editDetails(): Promise<void>;
        /**
         * Edits bolt ons.
         */
        editBoltOns(): void;
        /**
         * Navigate to billing history
         */
        billingHistoryNavigate(): void;
        /**
         * Navigate to email.
         */
        sendEmail(): void;

        navigateToPlan(): void;

        getCurrentUser(): Promise<void>;

        getFreeTrialStatus(): Promise<void>;
    }
}
