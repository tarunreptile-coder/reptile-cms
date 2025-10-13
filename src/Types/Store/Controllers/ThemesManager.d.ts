declare namespace Reptile.Controllers {
    export interface IThemesManagerController extends IController {
        modalControl: boolean;

        name: string;

        themes: Reptile.Models.IThemesStyling[];

        publication: string;

        publicationIndex?: number;

        publications?: Reptile.Models.IAllPublications[];
        
        status: Reptile.Models.State

        pageSize: number;

        pageNumber: number;

        totalPages: number;

        navigateToThemesEdit(id: string): void;

        onModalClick: () => void;

        getPublications(): Promise<void>;

        getAllThemes(): Promise<void>;

        createTheme(): Promise<void>;

        updatePage(page: number): Promise<void>
    }
}
