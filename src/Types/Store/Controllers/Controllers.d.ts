declare namespace Reptile.Controllers {
    export interface IController<T extends readonly unknown[] = []> extends IDisposable {
        /**
         * Initializes the controller
         * @param args Arguments to pass to the initialize function.
         */
        initialize(...args: T): Promise<void>,
        /**
         * Dependencies to the controller initialize function
         */
        readonly deps: readonly unknown[],
    }

    export interface IUiState {
        readonly navigation: INavigationController,
        readonly treeView: ITreeViewController,
    }

    export interface IControllerFactory<T> {
        /**
         * Factory to create specific controller.
         * @param uiState Root controller container
         * @param domain Root model container
         */
        create(uiState: IUiState, domain: Models.IDomain): T,
    }
}
