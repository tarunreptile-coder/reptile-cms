declare namespace Reptile.Service {
    export type Layout = {
        id: string;
        name: string;
        layouts: LayoutItem[];
    };

    export type LayoutItem = {
        id: string;
        name: string;
    };

    export type Template = {
        id?: string;
        publicationId: string;
        publisherId: string;
        name: string;
        templateJson: string;
        published: boolean;
        widgets: LayoutWidget[];
    };

    export interface Screens {
        id: string;
        name: string;
        json: string;
        widgets: LayoutWidget[];
    }

    export interface LayoutWidget {
        id: string;
        name: string;
        html: string;
        json: string;
        widgetId: string;
        settings: string;
    }

    export interface Loader {
        name: string;
        path: string;
    }
}
