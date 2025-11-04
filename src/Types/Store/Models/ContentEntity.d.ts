declare namespace Reptile.Models {
    type ContentEntityState = {
        children: State;
        parent: State;
        save: State;
        delete: State;
        setCover: State;
    };

    export interface IBoilerplate extends IDisposable {
        /**
         * Gets the boilerplate id.
         */
        readonly id: string;
        /**
         * Gets the boilerplate name.
         */
        readonly name: string;
        /**
         * Gets the boilerplate image url.
         */
        readonly imageUrl: string | null;
        /**
         * Gets the boilerplate url.
         */
        readonly url: string;
        /**
         * Gets the project type for which the boilerplate is designed.
         */
        readonly type: 'WEB' | 'APP';
    }

    interface IContentEntity extends IDisposable {
        // Content entity properties
        readonly id: string;
        readonly imageUrl: string | null;
        readonly isDeleted: boolean;
        readonly hidden: boolean;
        readonly parent?: IContentEntity;
        readonly updated: Date;
        readonly created: Date;
        readonly contentEntityType: Service.ContentEntityType;
        name: string;
        order: number;
        contentLength?: number;

        /**
         * Gets the current action state.
         */
        readonly state: ContentEntityState;
        /**
         * Gets the upload progress of the cover image.
         */
        readonly coverUploadProgress?: IAssetUpload;
        /**
         * Gets the children of the content entity.
         */
        readonly children: IContentEntity[];
        /**
         * Uploads given image to the server and sets the cover of the entity.
         * @param file Image to upload
         */
        setCover(file: File): Promise<void>;
        /**
         * Fetches the children.
         */
        fetchChildren(
            id: string,
            contentType?: number,
            pageNumber?: number,
            pageSize?: number
        ): Promise<void>;
        /**
         * Fetches the parent of the entity.
         */
        fetchParent(): Promise<void>;
        /**
         * Deletes the entity.
         */
        delete(): Promise<void>;
        /**
         * Saves the changes to the entity on the server.
         */
        save(): Promise<void>;
        /**
         * Updates the entity with given data.
         * @param data Data to update the entity
         */
        update(data: Reptile.Service.ContentEntity): void;
        /**
         * Fetches the entity from the server and updates the properties.
         */
        refresh(): Promise<void>;
    }

    type PublisherState = ContentEntityState & {
        font: State;
    };

    export interface IPublisher extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 1;
            readonly entityTypeName: 'Publisher';
        };
        readonly expiryDate: Date | null;
        readonly mainUserId: string;
        readonly customerId: string | null;
        readonly organizationId: string | null;

        /**
         * Gets the current action state.
         */
        readonly state: PublisherState;

        /**
         * Gets associated publisher fonts.
         */
        readonly fonts?: Models.Font[];

        /**
         * Fetches the publishers fonts.
         */
        fetchFonts(): Promise<void>;
    }

    type IPublicationState = ContentEntityState & {
        font: State;
    };

    export interface IPublication extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 2;
            readonly entityTypeName: 'Publication';
        };
        readonly widgetLayoutId: string | null;
        readonly projectType: null | 1 | 2;
        readonly fonts?: Reptile.Models.Font[];
        /**
         * Gets the current action state.
         */
        readonly state: IPublicationState;

        fetchFonts(): Promise<void>;
    }

    interface ContentEntityType {
        entityTypeId: number;
        entityTypeName: string;
    }

    export interface IAllPublications {
        id: string;
        parentId: string;
        name: string;
        contentEntityType: ContentEntityType;
    }

    type IssueState = ContentEntityState & {
        theme: State;
        publication: State;
    };

    export interface IIssue extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 3;
            readonly entityTypeName: 'Issue';
        };
        readonly appIsPublished: null | boolean;
        readonly webIsPublished: null | boolean;
        readonly appPublicationDate: null | Date;
        readonly webPublicationDate: null | Date;
        readonly appEmbargoDate: null | Date;
        readonly webEmbargoDate: null | Date;
        readonly summary: null | string;
        readonly issueType: number;
        readonly primaryContentType: number;
        /**
         * Gets the current action state.
         */
        readonly state: IssueState;
        /**
         * Gets issue theme as defined in attributes.
         */
        theme?: ITheme;
        /**
         * Gets the publication that the issue is belonging to.
         */
        readonly publication?: IPublication;
        /**
         * Fetches the issue theme.
         */
        fetchTheme(): Promise<void>;
        /**
         * Fetches the publication that the issue is belonging to.
         */
        fetchPublication(): Promise<void>;
        /**
         * Fetches all articles within given issues (including the articles in sections).
         * @param skip Number of articles to skip before returning first result
         * @param take Number of articles to include in result
         *
         * @returns Array of fetched article ids
         */
        fetchArticles(skip: number, take: number): Promise<string[]>;
    }

    export interface ISection extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 4;
            readonly entityTypeName: 'Section';
        };
        readonly firstChild?: IContentEntity;
    }

    type ArticleState = ContentEntityState & {
        images: State;
        publishing: State;
        issue: State;
    };

    export interface IArticle extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 5;
            readonly entityTypeName: 'Article';
        };
        readonly originalHtmlBody: null | string;
        readonly publishDate: null | Date;
        readonly tagQueryParameter: null | string;
        htmlBody: null | string;
        summary: null | string;
        /**
         * Gets the current action state.
         */
        readonly state: ArticleState;
        /**
         * Gets the upload progress of the library image.
         */
        readonly imageUploadProgress?: IAssetUpload;
        /**
         * Gets the images of the content entity.
         */
        readonly images: IImage[];
        /**
         * Gets the issue that the article is belonging to.
         */
        readonly issue?: IIssue;
        /**
         * Fetches the issue that the article is belonging to.
         */
        fetchIssue(): Promise<void>;
        /**
         * Fetches the images.
         */
        fetchImages(): Promise<void>;
        /**
         * Uploads and adds image to article library.
         * @param file Image to add
         */
        addImage(file: File): Promise<void>;
        /**
         * Publish the entity.
         */
        publish(): Promise<void>;
        /**
         * Unpublish the entity.
         */
        unpublish(): Promise<void>;
    }

    type BuilderSettingState = ContentEntityState & {
        images: State;
        publishing: State;
        issue: State;
    };

    export interface IImage extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 7;
            readonly entityTypeName: 'Image';
        };
    }

    type TemplateState = ContentEntityState & {
        publication: State;
        publishing: State;
    };

    export interface ITemplate extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 8;
            readonly entityTypeName: 'Template';
        };
        /**
         * Gets the current action state.
         */
        readonly state: TemplateState;
        /**
         * Template for web view.
         */
        webTemplate: ITemplatePreset;
        /**
         * Template for app view.
         */
        appTemplate: ITemplatePreset;

        masterStyle?: IGlobalStyle | null;

        setMasterStyle?: (newStyles: Reptile.Models.IGlobalStyles) => void;
        /**
         * Gets the publication that the template is belonging to.
         */
        readonly publication?: IPublication;
        /**
         * Fetches the publication that the template is belonging to.
         */
        fetchPublication(): Promise<void>;
        /**
         * Publish the entity.
         */
        publish(): Promise<void>;
        /**
         * Unpublish the entity.
         */
        unpublish(): Promise<void>;
    }

    export interface IAppTemplate extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 9;
            readonly entityTypeName: 'AppTemplate';
        };
        /**
         * Gets the current action state.
         */
        readonly state: TemplateState;
        /**
         * Template for app view.
         */
        appTemplate: ITemplatePreset;
        /**
         * Gets the publication that the template is belonging to.
         */
        readonly publication?: IPublication;
        /**
         * Fetches the publication that the template is belonging to.
         */
        fetchPublication(): Promise<void>;
        /**
         * Publish the entity.
         */
        publish(): Promise<void>;
        /**
         * Unpublish the entity.
         */
        unpublish(): Promise<void>;
    }

    export interface IPrototype extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 9;
            readonly entityTypeName: 'Prototype';
        };
        /**
         * Fetches the pin that the article is belonging to.
         */
        fetchPin(): Promise<void>;
    }
    export interface IBuildSetting extends IContentEntity {
        readonly contentEntityType: {
            readonly entityTypeId: 10;
            readonly entityTypeName: 'BuildSetting';
        };
        /**
         * Save the apps that the template is belonging to.
         */
        // saveApp(): Promise<void>;
    }

}
