declare namespace Reptile.Controllers {
    export interface IHelpSettingsController extends IController {
        /**
         * Gets selected help menu
         */
        name: string | null;

        isActive: boolean;

        /**
         * Gets the chatbot node from the dom
         */
        // chatBotNode: HTMLElement | null;

        onActiveMenu(newName: string): void;

        removeChatBot(): void;

        moveChatBot():void;
    }
}
