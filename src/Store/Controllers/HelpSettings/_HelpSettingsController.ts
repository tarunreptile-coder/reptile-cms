import { makeAutoObservable } from 'mobx';

type IHelpSettingsController = Reptile.Controllers.IHelpSettingsController;

export default class _HelpSettingsController
    implements IHelpSettingsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _name: string | null;

    private _isActive: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_HelpSettingsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );
        this._uiState = uiState;
        this._domain = domain;
        this._name = null;
        this._isActive = false;
    }

    get name() {
        return this._name;
    }

    set name(v) {
        this._name = v
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(v) {
        this._isActive = v;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    onActiveMenu(newName: string): void {
        if (this._name === newName) {
            this._name = null;
        } else {
            this._name = newName;
        }
    }

    //vanilla javascript until botpress release their component
    moveChatBot(): void {
        const chatMenu = document.getElementById('Chatbot');
        const chatBotNode = document.getElementById('bp-web-widget-container');

        if (chatBotNode && chatBotNode.parentNode && chatMenu) {
            chatMenu.appendChild(chatBotNode);
        }
    }

    removeChatBot(): void {
        const chatbotNode = document.querySelectorAll(
            '#bp-web-widget-container'
        );
        if (chatbotNode) {
            chatbotNode.forEach((element) =>
                element.parentNode?.removeChild(element)
            );
        }
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
