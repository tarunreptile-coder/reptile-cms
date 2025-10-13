import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import { action, makeObservable, observable, override } from 'mobx';
import ContentEntity from './_ContentEntity';
import { Notification } from '@Reptile/Components/Atoms';

type ITemplate = Reptile.Models.ITemplate;

type TemplateEntityType = {
    entityTypeId: 8;
    entityTypeName: 'Template';
};

type AutoSaveProperties = {
    webJsonTemplate: string;
    appJsonTemplate: string;
    masterStyle: string;
};

export default class Template
    extends ContentEntity<AutoSaveProperties>
    implements ITemplate
{
    webTemplate: Reptile.Models.ITemplatePreset;

    appTemplate: Reptile.Models.ITemplatePreset;
    
    masterStyle: Reptile.Models.IGlobalStyles;

    private _publishState: Reptile.Models.State;

    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(
            api,
            domain,
            data,
            undefined,
            /** Auto save callbacks */
            () => ({
                appJsonTemplate: this.appTemplate.toJson(),
                webJsonTemplate: this.webTemplate.toJson(),
                masterStyle: JSON.stringify(this.masterStyle) 
            }),
            (lhs, rhs) => {
                return (
                    lhs.appJsonTemplate === rhs.appJsonTemplate &&
                    lhs.webJsonTemplate === rhs.webJsonTemplate
                );
            },
            (newAttributes) => ({
                ...this._data,
                attributes: {
                    ...newAttributes,
                },
            })
        );

        makeObservable(this, {
            contentEntityType: override,
            webTemplate: observable,
            appTemplate: observable,
            update: override,
            publish: action.bound,
            unpublish: action.bound,
        });

        this.webTemplate = this._domain.template.createFromData(
            this._data.attributes.webJsonTemplate
                ? (JSON.parse(
                      this._data.attributes.webJsonTemplate as string
                  ) as Reptile.Service.Widget[] | null) ?? []
                : []
        );

        this.appTemplate = this._domain.template.createFromData(
            this._data.attributes.appJsonTemplate
                ? (JSON.parse(
                      this._data.attributes.appJsonTemplate as string
                  ) as Reptile.Service.Widget[] | null) ?? []
                : []
        );
        this.masterStyle = this._data.attributes.masterStyle ? JSON.parse(this._data.attributes.masterStyle) : '';

        this._publishState = {
            status: 'initial',
        };
    }

    get state(): Reptile.Models.TemplateState {
        let publication = super.state.parent;

        let entity = this.parent;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Publication
        ) {
            publication = entity.state.parent;
            entity = entity.parent;
        }

        return {
            ...super.state,
            publication,
            publishing: this._publishState,
        };
    }

    get publication(): Reptile.Models.IPublication | undefined {
        let entity = this as Reptile.Models.IContentEntity | undefined | null;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Publication
        ) {
            entity = entity.parent;
        }
        return (entity ?? undefined) as Reptile.Models.IPublication | undefined;
    }

    get contentEntityType(): TemplateEntityType {
        return this._data.contentEntityType as TemplateEntityType;
    }

    async fetchPublication(): Promise<void> {
        // Fetch parents of the template until the publication is reached
        let entity = this as Reptile.Models.IContentEntity | undefined | null;
        while (
            !!entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Publication
        ) {
            await entity.fetchParent();
            entity = entity.parent;
        }
    }

    update(data: Reptile.Service.ContentEntity): void {
        super.update(data);

        // this.webTemplate = this._domain.template.createFromData(
        //     JSON.parse(
        //         this._data.attributes.webJsonTemplate as string
        //     ) as Reptile.Service.Widget[]
        // );

        this.appTemplate = this._domain.template.createFromData(
            JSON.parse(
                this._data.attributes.appJsonTemplate as string
            ) as Reptile.Service.Widget[]
        );
    }

    async save(): Promise<void> {
        this._data.attributes.webJsonTemplate = this.webTemplate.toJson();
        this._data.attributes.appJsonTemplate = this.appTemplate.toJson();
        this._data.attributes.masterStyle = JSON.stringify(this.masterStyle); //this.masterStyle.toJson();
        try {
            await super.save();
            await super.saveTemplate();
        } catch (error) {
            // Handle the error, log it, or take appropriate action.
            Notification.error({description: 'Error in saveTemplate or save'})
        }
    }

    setMasterStyle(newStyles: Reptile.Models.IGlobalStyles): void {
        // Clear existing properties that are not in newStyles to ensure accurate reflection
        for (const sectionKey in this.masterStyle) {
            if (Object.prototype.hasOwnProperty.call(this.masterStyle, sectionKey) && !(sectionKey in newStyles)) {
                delete (this.masterStyle as any)[sectionKey];
            }
        }

        for (const sectionKey in newStyles) {
            if (Object.prototype.hasOwnProperty.call(newStyles, sectionKey)) {
                const section = sectionKey as keyof Reptile.Models.IGlobalStyles;
                if (!this.masterStyle[section]) {
                    this.masterStyle[section] = observable({});
                }
                const currentSection = this.masterStyle[section] as Reptile.Models.IWidgetStyleProperties;
                const incomingSection = newStyles[section] as Reptile.Models.IWidgetStyleProperties;

                // Clear existing properties in the section that are not in incomingSection
                for (const propKey in currentSection) {
                    if (Object.prototype.hasOwnProperty.call(currentSection, propKey) && !(propKey in incomingSection)) {
                        delete (currentSection as any)[propKey];
                    }
                }

                for (const propKey in incomingSection) {
                    if (Object.prototype.hasOwnProperty.call(incomingSection, propKey)) {
                        const prop = propKey as keyof Reptile.Models.IWidgetStyleProperties;
                        if (currentSection[prop] !== incomingSection[prop]) {
                            currentSection[prop] = incomingSection[prop];
                        }
                    }
                }
            }
        }
    }

    async publish(): Promise<void> {
        if (this._publishState.status === 'pending') {
            await this._synchronization.wait('publish');
            return;
        }
        this._publishState.status = 'pending';

        try {
            await this._api.contentEntity.publish({
                entityId: this.id,
                requestFrom: 0,
                publishedDate: new Date(),
                embargoDate: null,
                title: null,
                summary: null,
                themeId: null,
            });
            this._publishState.status = 'done';
        } catch (error) {
            this._publishState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publish');
        }
    }

    async unpublish(): Promise<void> {
        if (this._publishState.status === 'pending') {
            await this._synchronization.wait('publish');
            return;
        }
        this._publishState.status = 'pending';

        try {
            await this._api.contentEntity.unpublish({
                entityId: this.id,
                requestFrom: 0,
            });
            this._publishState.status = 'done';
        } catch (error) {
            this._publishState = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
        } finally {
            this._synchronization.signal('publish');
        }
    }
}
