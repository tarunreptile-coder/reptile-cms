declare namespace Reptile.Controllers {
    export interface INavigationController extends IController<[NavigationParams, import('react-router-dom').NavigateFunction]> {
        /**
         * Gets the id of currently navigated content entity.
         */
        readonly entityId?: string,
        /**
         * Gets the id of currently navigated article.
         */
        readonly articleId?: string,
        /**
         * Gets the id of currently navigated template.
         */
        readonly templateId?: string,
        /**
         * Navigates to given url.
         * Check React Router Dom useNavigate for more info.
         */
        readonly navigate: import('react-router-dom').NavigateFunction,
    }

    type NavigationParams = {
        entityId?: string,
        articleId?: string,
        templateId?: string,
    }
}
