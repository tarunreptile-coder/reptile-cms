declare namespace Reptile.Controllers {
    export interface IContentActionsController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,

        validateTemplate(): string[],
        /**
         * Saves the content on the server.
         */
        save(): Promise<void>,
        /**
         * Saves and publishes content on the server.
         */
        saveAndPublish(): Promise<void>,
    }
}
