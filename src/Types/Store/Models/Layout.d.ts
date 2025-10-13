declare namespace Reptile.Models {
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
    }

    export type WidgetCollection = {
        kind: string;
        name: string;
        friendlyName: string,
        icon: React.FunctionComponent<React.SVGProps<React.ReactSVGElement>>;
        widget: WidgetItem;
    };

    export type WidgetItem = {
        json: Reptile.Service.Widget;
        html: string;
    };
}
