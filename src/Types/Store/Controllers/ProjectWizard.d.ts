declare namespace Reptile.Controllers {
    export interface IProjectWizardController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Gets if the status.
         */
        readonly status?: string;
        /**
         * Gets all available boilerplates.
         */
        readonly boilerplates: Reptile.Models.IBoilerplate[];
        /**
         * Gets the currently navigated content entities.
         */
        readonly entities: Models.IContentEntity[];
        /**
         * Gets or sets current step of project creation wizard.
         */
        step: 0 | 1 | 2 | 3;
        /**
         * Gets or sets the desired project kind.
         */
        kind?: 'web' | 'app';
        /**
         * Gets or sets the project name.
         */
        name: string;
        /**
         * Gets or sets selected boilerplate.
         */
        boilerplate?: Reptile.Models.IBoilerplate | null;

        subscription: Reptile.Models.SubscriptionInfo | undefined;

        trialStatus: boolean;

        upgradeModal: boolean;

        subscriptionStatus: boolean;

        handleUpgradeModal(): void;
        /**
         * Starts the wizard for creating web project.
         */
        startWebWizard(): void;
        /**
         * Starts the wizard for creating app project.
         */
        startAppWizard(): void;
        /**
         * Creates the project with given settings.
         */
        create(): Promise<void>;

        getSubscriptionInfo(entityId: string | undefined): Promise<void>;

        getFreeTrialStatus(): Promise<void>;

        navigateToPlan(): void;
    }
}
