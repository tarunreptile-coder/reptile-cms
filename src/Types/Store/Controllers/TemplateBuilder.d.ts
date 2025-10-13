declare namespace Reptile.Controllers {
    export interface IActiveWidgetTracker {
        /**
         * Gets currently active widget.
         */
        readonly activeWidget?: Models.IWidget,
    }

    export interface IWidgetRegistry {
        /**
         * Gets the widget registry for displaying and modifying widgets.
         * Key is the widget type.
         */
        readonly registry: Map<string, WidgetRegistryEntry>,
    }

    export interface ITemplateBuilderController extends IController, IWidgetRegistry, IActiveWidgetTracker {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
        /**
         * Gets all widgets in current template.
         */
        readonly widgets: Models.IWidget[],

        masterStyle: Models.IGlobalStyle;
        /**
         * Gets or sets the builder mode.
         */
        mode: 'drag' | 'edit',
        activePage: string;
        /**
         * Gets the widgets widget register entry belonging to the basic category.
         */
        readonly basicCollection: WidgetCollectionItem[],
        /**
         * Gets the widgets widget register entry belonging to the advanced category.
         */
        readonly advancedCollection: WidgetCollectionItem[],
        /**
         * Selects the widget with given id.
         * @param id Id of widget to select
         */
        select(id: string): Promise<void>,
        /**
         * Adds widget to the template.
         * @param widgetType Kind of widget to create
         * @param idx Index at which the widget will be inserted
         */
        add(widgetType: string, idx: number): void,
        /**
         * Remove widget from the template.
         * @param id Id of widget to remove
         */
        remove(id: string): void,
        /**
         * Duplicates widget from the template.
         * @param id Id of widget to duplicate
         */
        duplicate(id: string): void,
        /**
         * Moves the widget inside the template to given position.
         * @param id Id of widget to move
         * @param newPosition New widget position
         */
        move(id: string, newPosition: number): void,
        /**
         * Registers widget display options for given type
         * @param entry Entry to register
         */
        register(type: string, entry: WidgetRegistryEntry): void,
    }

    export type WidgetCollectionItem = {
        category: string;
        name: string,
        friendlyName: string,
        icon: React.FunctionComponent<React.SVGProps<React.ReactSVGElement>>,
        widget: React.FunctionComponent<Reptile.Props.WidgetProps>,
        kind: string,
    }

    export type WidgetSettingsLayout = Record<string, Array<{ type: string, data: string }>>

    export type WidgetRegistryEntry = {
        name: string,
        friendlyName: string,
        icon: React.FunctionComponent<React.SVGProps<React.ReactSVGElement>>,
        widget: React.FunctionComponent<Reptile.Props.WidgetProps>,
        category: 'basic' | 'advanced' | 'none',
        settings: WidgetSettingsLayout,
    }
}
