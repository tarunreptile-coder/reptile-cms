declare namespace Reptile.Controllers {
    export interface ILinkedContentController extends IController<[Reptile.Models.IWidget]> {
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
        /**
         * Gets the linked items or list of null if there is no linked items.
         */
        readonly items: Array<LinkedContentItem | null>,
    }

    type LinkedContentItem = {
        name: string,
        caption?: string,
        publishDate?: Date,
        image?: string,
    }
}
