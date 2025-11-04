declare namespace Reptile.Controllers {
    export interface IThemesActionsController extends IController {
        addNewStyle: IAddNewStyleController;

        saveChanges: IThemesSaveChangesController;

        advancedCss: IAdvancedCssController;

        options: IThemesOptionsController;
    }

    export interface IThemesSaveChangesController extends IController {
        css?: string;

        status?: 'initial' | 'pending' | 'done' | 'error';

        saveChanges(): Promise<void>;

        getTheme(id: string): Promise<void>;
    }

    export interface IAddNewStyleController extends IController {
        name: string;

        selectorName: string;

        styleType: string;

        styleTypes: string[];

        styleTypeIndex?: number;

        type: string;

        types: string[];

        typeIndex?: number;

        modal: boolean;

        updateJsonStructure(): void;
    }

    export interface IAdvancedCssController extends IController {
        css?: string;

        updatedCss?: string;

        modal: boolean;

        updateJsonStructure(): Promise<void>;
    }

    export interface IThemesOptionsController extends IController {
        modalDelete: boolean;

        modalSettings: boolean;

        modalSet: boolean;

        name: string;

        theme?: Reptile.Models.ITheme;

        themes?: Reptile.Models.IThemesStyling[];

        publication: string;

        publicationIndex?: number;

        publications?: Reptile.Models.IAllPublications[];

        status?: 'initial' | 'pending' | 'done' | 'error';

        getPublications(): Promise<void>;

        saveSettings(): void;

        setToDefault(): void;

        getThemes(): Promise<void>;

        deleteTheme(): Promise<void>;
    }
}
