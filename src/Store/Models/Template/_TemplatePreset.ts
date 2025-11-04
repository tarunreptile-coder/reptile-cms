import { makeAutoObservable, observable } from 'mobx';
import uuid4 from 'uuid4';
import Widget from './_Widget';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';

type ITemplatePreset = Reptile.Models.ITemplatePreset;

export default class TemplatePreset implements ITemplatePreset {
    widgets: Reptile.Models.IWidget[];
    widgetData?: Reptile.Service.Widget[];

    constructor(
        data: Reptile.Service.Widget[],
        widgetData?: Reptile.Service.Widget[]
    ) {
        makeAutoObservable(this, {
            dispose: false,
            widgets: observable,
        });
        this.widgets = data.map((widget) => new Widget(widget));
        this.widgetData = widgetData;
    }

    toJson(): string {
        return JSON.stringify(this.widgets.map((widget) => widget.toJson()));
    }

    async add(
        widgetType: string,
        idx: number,
        widgetResponse: (id: string) => Promise<Reptile.Service.LayoutWidget>
    ): Promise<void> {
        const data = AppWidgets.find(
            (widget) => widget.type === widgetType
        ) as Reptile.Service.Widget;

        const layoutData = this.widgetData?.find(
            (widget) =>
                widget.type.toLowerCase().replace(/\s/g, '') === widgetType
        );

        if (!data && !layoutData) {
            throw new Error('Invalid widget type!');
        }

        if (data && !layoutData) {
            this.widgets = [
                ...this.widgets.slice(0, idx),
                new Widget({
                    ...data,
                    id: uuid4(),
                }),
                ...this.widgets.slice(idx),
            ];

            await Promise.resolve();
        }

        if (layoutData?.widgetId) {
            const data = await widgetResponse(layoutData.widgetId);

            const dataObj = JSON.parse(data.json) as Reptile.Service.Widget;
            dataObj.type = dataObj.type.toLowerCase().replace(/\s/g, '');

            this.widgets = [
                ...this.widgets.slice(0, idx),
                new Widget({
                    ...dataObj,
                    widgetId: data.id,
                    id: uuid4(),
                }),
                ...this.widgets.slice(idx),
            ];
        }
    }

    remove(id: string): void {
        const idx = this.widgets.findIndex(
            ({ id: widgetId }) => widgetId === id
        );
        if (idx === -1) {
            return;
        }

        this.widgets = [
            ...this.widgets.slice(0, idx),
            ...this.widgets.slice(idx + 1),
        ];
    }

    async duplicate(
        id: string,
        widgetResponse?: (id: string) => Promise<Reptile.Service.LayoutWidget>
    ): Promise<void> {
        const idx = this.widgets.findIndex(
            ({ id: widgetId }) => id === widgetId
        );
        if (idx === -1) {
            return;
        }

        const widget = this.widgets[idx].toJson();

        if (widget.widgetId && widgetResponse) {
            const data = await widgetResponse(widget.widgetId);

            const dataObj = JSON.parse(data.json) as Reptile.Service.Widget;

            dataObj.contents = widget.contents;

            dataObj.properties = widget.properties;

            this.widgets = [
                ...this.widgets.slice(0, idx + 1),
                new Widget({
                    widgetId: data?.id,
                    ...dataObj,
                    id: uuid4(),
                }),
                ...this.widgets.slice(idx + 1),
            ];
        } else {
            this.widgets = [
                ...this.widgets.slice(0, idx + 1),
                new Widget({
                    ...widget,
                    id: uuid4(),
                }),
                ...this.widgets.slice(idx + 1),
            ];
        }
    }

    move(id: string, newPosition: number): void {
        const idx = this.widgets.findIndex(
            ({ id: widgetId }) => id === widgetId
        );
        // Ignore change when index is staying the same
        if (
            idx === -1 ||
            idx === newPosition ||
            (newPosition > idx && idx === newPosition - 1)
        ) {
            return;
        }
        if (idx < newPosition) {
            this.widgets = [
                ...this.widgets.slice(0, idx),
                ...this.widgets.slice(idx + 1, newPosition),
                this.widgets[idx],
                ...this.widgets.slice(newPosition),
            ];
        } else {
            this.widgets = [
                ...this.widgets.slice(0, newPosition),
                this.widgets[idx],
                ...this.widgets.slice(newPosition, idx),
                ...this.widgets.slice(idx + 1),
            ];
        }
    }

    /**
     * Helper function to apply global styles to a target style object.
     * It checks if the property exists in targetStyles._data before applying.
     * @param targetStyles The style object (e.g., widget.styles or widget.contents[x].styles) to apply styles to.
     * @param globalSectionStyles The object containing the global style properties for a specific section.
     */
    private applyStylesToTarget(targetStyles: IWidgetStyleProperties, globalSectionStyles: IWidgetStyleProperties): void {
        // Access the underlying _data object for existence check
        const targetData = (targetStyles as any)._data; // Cast to any to access _data

        if (!targetData) {
            return;
        }

        for (const key in globalSectionStyles) {
            if (Object.prototype.hasOwnProperty.call(globalSectionStyles, key)) {
                const styleKey = key as keyof IWidgetStyleProperties;
                const globalValue = globalSectionStyles[styleKey];

                // Only apply if the global style has a defined value
                // AND the property exists in the target's _data object
                if (globalValue !== undefined && Object.prototype.hasOwnProperty.call(targetData, styleKey)) {
                    targetData[styleKey] = globalValue;
                }
            }
        }
    }

    /**
     * Helper function to update inline styles within an HTML string.
     * This is a basic implementation and might need to be more robust for complex HTML.
     * It will replace or add specific style properties to the style attribute found in each tag.
     * @param html The HTML string to modify.
     * @param stylesToApply The global styles object containing the properties to apply.
     * @returns The modified HTML string.
     */
    private updateInlineHtmlStyles(html: string, stylesToApply: IWidgetStyleProperties): string {
        if (!html) return html;
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        // Define the specific styles from globalStyles that should be applied to rich text HTML
        // These are the properties that control font styling and color.
        const specificStylesToApply: (keyof IWidgetStyleProperties)[] = [
            'fontStyle',
            'fontSize',
            'fontFamily',
            'color',
            'fontWeight',    // For 'bold'
            'textDecoration' // For 'underline'
        ];
        // Iterate over all elements in the parsed HTML
        tempDiv.querySelectorAll('*').forEach(element => {
            const currentStyle = element.getAttribute('style') || '';
            const styleMap = new Map<string, string>();
            // Parse existing inline styles into a map
            currentStyle.split(';').forEach(stylePart => {
                const [prop, value] = stylePart.split(':').map(s => s.trim());
                if (prop && value) {
                    styleMap.set(prop, value);
                }
            });
            // Apply only the specific global styles
            specificStylesToApply.forEach(styleKey => {
                const globalValue = stylesToApply[styleKey];
                if (globalValue !== undefined) {
                    // Convert camelCase to kebab-case for CSS properties
                    const cssProperty = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
                    // Always apply these specific global styles if they have a value,
                    // overriding any existing inline values for these properties.
                    styleMap.set(cssProperty, globalValue);
                }
            });
            // Reconstruct the style attribute
            const newStyleParts: string[] = [];
            styleMap.forEach((value, prop) => {
                newStyleParts.push(`${prop}: ${value}`);
            });
            element.setAttribute('style', newStyleParts.join('; '));
        });
        return tempDiv.innerHTML;
    }

    /**
     * Applies the given global styles to all widgets and their content components in this template.
     * It will override current widget and content styles with the global styles where applicable.
     * Special handling for 'rich-text' content types to update inline HTML styles.
     * @param globalStyles The object containing the global style properties to apply.
     */
    applyGlobalStylesToAllWidgets(globalStyles: IGlobalStyles): void {
        this.widgets.forEach(widget => {
            // Check if the entire widget is locked using the new isLocked property
            if (widget.isLocked === true) {
                return; // Skip this widget entirely
            }
            // Apply general background color to the widget if it exists
            if (globalStyles.general?.backgroundColor && (widget.styles as any)?._data?.backgroundColor !== undefined) {
                (widget.styles as any)._data.backgroundColor = globalStyles.general.backgroundColor;
            }
            // Apply styles based on widget type
            let appliedWidgetSpecificStyle = false;
            if (widget.type === 'app-button') {
                if (globalStyles.button) {
                    this.applyStylesToTarget(widget.styles, globalStyles.button);
                    appliedWidgetSpecificStyle = true;
                }
            } else if (widget.type === 'app-image') {
                if (globalStyles.image) {
                    this.applyStylesToTarget(widget.styles, globalStyles.image);
                    appliedWidgetSpecificStyle = true;
                }
            }
            // apply global styles to each content component's styles within this widget
            widget.contents.forEach((content: IWidgetComponent) => {
                // Apply general background color to content components if they have it
                if (globalStyles.general?.backgroundColor && (content.styles as any)?._data?.backgroundColor !== undefined) {
                    (content.styles as any)._data.backgroundColor = globalStyles.general.backgroundColor;
                }
                // Apply styles based on content type
                let appliedContentSpecificStyle = false;
                if (content.type === 'button-content') {
                    if (globalStyles.button) {
                        this.applyStylesToTarget(content.styles, globalStyles.button);
                        appliedContentSpecificStyle = true;
                    }
                } else if (content.type === 'image') { // Assuming 'image' is a content type within an image widget
                    if (globalStyles.image) {
                        this.applyStylesToTarget(content.styles, globalStyles.image);
                        appliedContentSpecificStyle = true;
                    }
                } else if (content.type === 'label-content') { // For title styles
                    if (globalStyles.title) {
                        this.applyStylesToTarget(content.styles, globalStyles.title);
                        appliedContentSpecificStyle = true;
                    }
                } else if (content.type === 'text' || content.type === 'rich-text') {
                    if (globalStyles.text) {
                        this.applyStylesToTarget(content.styles, globalStyles.text);
                        // Special handling for 'rich-text' content type's htmlBody
                        if (content.type === 'rich-text' && content.properties.htmlBody !== undefined) {
                            const updatedHtmlBody = this.updateInlineHtmlStyles(
                                content.properties.htmlBody,
                                globalStyles.text
                            );
                            (content.properties as any).htmlBody = updatedHtmlBody;
                        }
                        appliedContentSpecificStyle = true;
                    }
                }
                // Fallback for text styles if no specific style was applied to content
                // and it's not a button, image, or label (title) content
                if (!appliedContentSpecificStyle && globalStyles.text) {
                    const excludedContentTypes = ['button-content', 'image', 'label-content'];
                    if (!excludedContentTypes.includes(content.type)) {
                        this.applyStylesToTarget(content.styles, globalStyles.text);
                    }
                }
            });
            // Fallback for text styles at the widget level if no specific style was applied
            // and it's not a button or image widget.
            if (!appliedWidgetSpecificStyle && globalStyles.text) {
                const excludedWidgetTypes = ['app-button', 'app-image'];
                if (!excludedWidgetTypes.includes(widget.type)) {
                    // Check if the widget has text-like content that might benefit from general text styles.
                    // This is a heuristic; adjust based on actual widget structure.
                    const hasTextContent = widget.contents.some(c => c.type === 'text' || c.type === 'rich-text');
                    if (hasTextContent) {
                         this.applyStylesToTarget(widget.styles, globalStyles.text);
                    }
                }
            }
        });
    }

    dispose(): void {
        /* Do nothing */
    }
}
