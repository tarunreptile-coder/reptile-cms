declare namespace Reptile.Controllers {
    export interface ITreeViewController extends IController {
        /**
         * Initializes the controller.
         */
        initialize(): Promise<void>;
        /**
         * Array of expanded nodes' ids.
         */
        expandedNodes: string[];
        /**
         * Checks if treeview is minimised.
         */
        isActive?: boolean;
        /**
         * Opens and closes sidemenu.
         */
        minimise?: () => void;
        /**
         * Expands the given node in the tree view.
         * @param id Id of node to expand
         */
        expand(id: string): Promise<void>;
        /**
         * Collapses the given node in the tree view.
         * @param id Id of node to collapse
         */
        collapse(id: string): void;
        /**
         * Collapses all expanded nodes in the tree view.
         */
        collapse(): void;
        /**
         * Selects node with given id.
         * @param id Id of node that is selected
         */
        select(id: string): void;
        /**
         * Returns node props used for rendering.
         * @param id Id of node which props will be retrieved
         */
        getNodeProps(id: string): Reptile.Props.TreeNode;
        /**
         * Returns children ids of node with given id.
         * @param id Id of node which children will be retrieved
         */
        getChildrenIds(id: string): string[];
        /**
         * Returns root items ids of the treeview.
         */
        getChildrenIds(): string[];
        /**
         * Handler for click event.
         * @param id Id of node which is clicked
         */
        click(id: string): void;
        /**
         * Returns true if node is expanded.
         * @param id Id of node which is checked
         */
        isExpanded(id: string): boolean;
    }
}
