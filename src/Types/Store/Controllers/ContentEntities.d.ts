declare namespace Reptile.Controllers {
    export interface IContentEntitiesController extends IController {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean;
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string;
        /**
         * Gets the currently navigated content entities.
         */
        readonly entities: Models.IContentEntity[];
        /**
         * Gets the entity that was selected for deletion.
         */
        readonly entityToDelete?: Models.IContentEntity;
        /**
         * Gets the entity that was selected for configuration.
         */
        readonly entityToConfigure?: Models.IContentEntity;
        /**
         * Gets the current content id.
         */
        readonly currentContentId?: string;

        readonly fonts?: Reptile.Models.Font[];
        /**
         * Gets the content by page.
         */
        pageNumber: number;
        /**
         * Gets the set number of content.
         */
        readonly pageSize: number;
        /**
         * Gets the content length.
         */
        readonly contentLength?: number;
        /**
         * Gets the amount of pages.
         */
        totalPages: number;
        /**
         * Sets drag and drop to true or false.
         */
        isDisabled: boolean;
        /**
         * Change theme values.
         */
        readonly editTheme:
            | Reptile.Controllers.IContentStylesController
            | undefined;
        /**
         * Selects the given entity.
         * @param id Id of the entity to select.
         */
        selectEntity(id: string): void;
        /**
         * Selects the given entity for deletion.
         * @param id Id of entity to select for deletion
         */
        deleteEntity(id?: string): void;
        /**
         * Selects the given entity for configuration.
         * @param id Id of entity to select for configuration
         */
        configureEntity(id?: string): void;

        moreContent(): Promise<void>;

        lessContent(): Promise<void>;

        fetchContent(): Promise<void>;
        
        fetchFonts(id: string): Promise<void>;
        
        deleteFont(id: string): Promise<void>;
        
        saveFont(fontData: Reptile.Service.Font): Promise<void>;

        swapFlatPlan(
            flatPlanId: string | null,
            entityId: string,
            newPosition: number,
            oldPosition: number
        ): Promise<void>;
    }
}
