import { makeAutoObservable } from 'mobx';
import TemplatePreset from './_TemplatePreset';

type ITemplateModel = Reptile.Models.ITemplateModel;

type TemplateModelPrivateFields = '_api' | '_domain';

export default class _TemplateModel implements ITemplateModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    constructor(
        store: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi,
    ) {
        makeAutoObservable<_TemplateModel, TemplateModelPrivateFields>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });

        this._api = api;
        this._domain = store;
    }

    createFromData(widgets: Reptile.Service.Widget[], widgetData?: Reptile.Service.Widget[]): Reptile.Models.ITemplatePreset {
        return new TemplatePreset(widgets, widgetData);
    }

    private activeTemplatePreset(templateId: string | undefined, globalStyles: IWidgetStyleProperties): Reptile.Models.ITemplatePreset | undefined {
        if (templateId) {
            const template = this._domain.content.entities.get(templateId) as Reptile.Models.ITemplate | undefined;
            if (template && template.setMasterStyle) { // Check if template and setMasterStyle exist
                template.setMasterStyle(globalStyles); // Update the masterStyle on the template model
            }
            return template?.appTemplate;
        }
        return undefined;
    }

    /**
     * Applies the given global styles to the widgets of the currently active template.
     * This method is called by the Domain.
     * @param globalStyles The object containing the global style properties to apply.
     */
    applyGlobalStylesToActiveTemplate(globalStyles: IWidgetStyleProperties, templateId: string | undefined): void {
        const currentTemplatePreset = this.activeTemplatePreset(templateId, globalStyles);
        if (currentTemplatePreset) {
            currentTemplatePreset.applyGlobalStylesToAllWidgets(globalStyles);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
