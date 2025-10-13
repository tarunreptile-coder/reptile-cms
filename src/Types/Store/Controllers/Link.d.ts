

declare namespace Reptile.Controllers {

    export interface ILinkController extends IController {
        /**
         * Initializes the controller.
         */
        initialize(): Promise<void>,
        /**
         * Stores reference to link provider.
         * @param linkProvider
         */
        register(linkProvider: IActiveWidgetTracker): void,
        /**
         * Removes reference link provider.
         */
        unregister(): void,
        /**
         * Links node to the currently selected widget.
         * @param nodeId Id of the node which will be linked to the widget
         */
        linkToWidget(nodeId: string): void,
    }
}
