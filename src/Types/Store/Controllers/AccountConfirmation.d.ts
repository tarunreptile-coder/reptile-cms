declare namespace Reptile.Controllers {
    export interface IAccountConfirmationController extends IController {
        /**
         * Sets users verification status
         */
        readonly verified: boolean;
        /**
         * Checks if the user is already verified
         */
        readonly emailVerified: boolean;
        /**
         * Checks is user is a partner
         */
        readonly partner: boolean;
        /**
         * Fetches verification status
         */
        readonly status: Reptile.Models.State;
        /**
         * Navigates to the login page
         */
        navigateToLogin: () => void;
        /**
         * Creates new tab for book a meeting page
         */
        navigateTobookAMeeting: () => void;
        /**
         * Sets verification status on mount
         */
        confirmAccount(
            userId: string | (string | null)[] | null,
            code: string | (string | null)[] | null,
            isPartner: string | (string | null)[] | null,
            isEmailVerified: string | (string | null)[] | null
        ): Promise<void>;
    }
}
