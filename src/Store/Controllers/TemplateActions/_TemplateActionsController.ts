import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES, URL_VALID_REGEX } from '@Reptile/Constants/Constants';
import { makeAutoObservable } from 'mobx';

type ITemplateActionsController =
    Reptile.Controllers.ITemplateActionsController;

export default class _TemplateActionsController
    implements ITemplateActionsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_TemplateActionsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
    }

    private get template(): Reptile.Models.ITemplate | undefined {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            return this._domain.content.entities.get(templateId) as
                | Reptile.Models.ITemplate
                | undefined;
        }
        return undefined;
    }

    get loading(): boolean {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            const articleStatus =
                this._domain.content.status.entities.get(templateId);
            if (!articleStatus || articleStatus.status === 'pending') {
                return true;
            }
        }
        const template = this.template;
        if (template) {
            return (
                template.state.save.status === 'pending' ||
                template.state.publishing.status === 'pending'
            );
        }
        return true;
    }

    get error(): string | undefined {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            return (
                this._domain.content.status.entities.get(templateId)?.error ||
                this.template?.state.save.error ||
                this.template?.state.publishing.error
            );
        }
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [this._uiState.navigation.templateId];
    }

    validateTemplate(): string[] {
        const widgets = this.template?.appTemplate?.widgets;
        const errors: string[] = [];
        if(widgets && widgets.length > 0) {
            widgets.forEach((widget) => {
                if(['url-button', 'nav-button'].includes(widget.type)) {
                    const buttonString = widget.contents[0]?.properties?.text || '';
                    const buttonText = buttonString || widget.friendlyName;
                    if (widget.type === 'url-button' && !URL_VALID_REGEX.test(widget.properties.link)) {
                        errors.push(`Please enter valid URL for '${buttonText}' button.`);
                    }
                    if (widget.type === 'nav-button' && (!widget.properties.link || widget.properties.link === '/')) {
                        errors.push(`Please select Screen for '${buttonText}' button.`);
                    }
                }
            });
        } else {
            errors.push('Please add at least one widget to save.');
        }
        return errors;
    }

    async initialize(): Promise<void> {
        const templateId = this._uiState.navigation.templateId;
        if (templateId) {
            if (!this._domain.content.entities.has(templateId)) {
                await this._domain.content.fetch(templateId);
            }
        }
    }

    async save(): Promise<void> {
        await this.template?.save();

        if (this.template?.state.save.status === 'done') {
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        }

        if (this.template?.state.save.status === 'error') {
            Notification.error({
                description: MESSAGES.ERROR_SAVE_CHANGES.message,
            });
        }
    }

    async saveAndPublish(): Promise<void> {
        await this.template?.save();
        await this.template?.publish();
    }

    async export(): Promise<void> {
        return Promise.reject('Method not implemented.');
    }

    dispose(): void {
        /* Do nothing */
    }
}
