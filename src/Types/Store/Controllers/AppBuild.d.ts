declare namespace Reptile.Controllers {
    export interface IActiveWidgetTracker {
        /**
         * Gets currently active widget.
         */
        readonly activeWidget?: Models.IWidget;
    }

    export interface IWidgetRegistry {
        /**
         * Gets the widget registry for displaying and modifying widgets.
         * Key is the widget type.
         */
        readonly registry: Map<string, WidgetRegistryEntry>;
    }

    export interface IAppBuildController
        extends IController,
            IWidgetRegistry,
            IActiveWidgetTracker {
        activePage: string;
        screenModal: boolean;
        screenName?: string;
        layouts: Reptile.Models.Layout[] | undefined;

        defaultWidgets?: Reptile.Service.LayoutWidget[]
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Gets all widgets in current template.
         */
        readonly widgets: Models.IWidget[];

        showErrorModal: boolean;

        widgetErrors: string[];
        /**
         * Gets or sets the builder mode.
         */
        mode: 'drag' | 'edit';

        preBuiltSelectedLoader: Reptile.Service.Loader;
        
        preBuiltLoadersList: Reptile.Service.Loader[];
        /**
         * Gets the widgets widget register entry belonging to the basic category.
         */
        readonly basicCollection: WidgetCollectionItem[];
        /**
         * Gets the widgets widget register entry belonging to the advanced category.
         */
        readonly advancedCollection: WidgetCollectionItem[];
        /**
         * Selects the widget with given id.
         * @param id Id of widget to select
         */
        select(id: string): Promise<void>;
        /**
         * Adds widget to the template.
         * @param widgetType Kind of widget to create
         * @param idx Index at which the widget will be inserted
         */
        add(widgetType: string, idx: number, url?: string): void;
        /**
         * Remove widget from the template.
         * @param id Id of widget to remove
         */
        remove(id: string): void;
        /**
         * Duplicates widget from the template.
         * @param id Id of widget to duplicate
         */
        duplicate(id: string): void;
        /**
         * Moves the widget inside the template to given position.
         * @param id Id of widget to move
         * @param newPosition New widget position
         */
        move(id: string, newPosition: number): void;
        /**
         * Registers widget display options for given type
         * @param entry Entry to register
         */
        register(type: string, entry: WidgetRegistryEntry): void;

        setTemplate(): Promise<void>

        updateTemplate(): Promise<void>

        getLayout(id: string): Promise<void>

        getWidgets(): Promise<void>

        getPrebuiltLoaders(): void;

        resetTemplate(): void;
    }
}
