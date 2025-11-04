import { Editor } from "tinymce";

declare namespace Reptile.Models {
    export interface ITemplatePreset extends IDisposable {
        widgets: IWidget[];

        widgetData?: Reptile.Service.Widget[];
        /**
         * Converts template preset to JSON string.
         */
        toJson(): string;
        /**
         * Adds widget to the template.
         * @param widgetType Kind of widget to create
         * @param idx Index at which the widget will be inserted
         */
        add(
            widgetType: string,
            idx: number,
            widgetResponse: (
                id: string
            ) => Promise<Reptile.Service.LayoutWidget>
        ): void;
        /**
         * Remove widget from the template.
         * @param id Id of widget to remove
         */
        remove(id: string): void;
        /**
         * Duplicates widget from the template.
         * @param id Id of widget to duplicate
         */
        duplicate(
            id: string,
            widgetResponse?: (
                id: string
            ) => Promise<Reptile.Service.LayoutWidget>
        ): void;
        /**
         * Moves the widget inside the template to given position.
         * @param id Id of widget to move
         * @param newPosition New widget position
         */
        move(id: string, newPosition: number): void;
    }

    interface IWidget {
        readonly id: string;
        readonly widgetId: string | undefined;
        readonly layoutId: string | undefined;
        readonly type: string;
        readonly className: string;
        readonly friendlyName: string;
        readonly allowedLinkedContentTypes?: number[];
        readonly contents: IWidgetComponent[];
        readonly properties: IWidgetGeneralProperties;
        readonly styles: IWidgetStyleProperties;
        readonly isLocked: boolean;

        /**
         * Converts widget to plain JSON object.
         */
        toJson(): Reptile.Service.Widget;
    }

    interface IWidgetComponent {
        readonly id: string;
        readonly type: string;
        readonly properties: IWidgetGeneralProperties;
        readonly styles: IWidgetStyleProperties;

        /**
         * Converts widget component to plain JSON object.
         */
        toJson(): Reptile.Service.WidgetComponent;
    }

    interface IWidgetGeneralProperties {
        action?: string,
        actions?: {Name: string, Code: string}[],
        radius?: string;
        tagQuery?: {
            selected: boolean;
            query: Array<{ tagId: string; operation: string }>;
        };
        htmlBody?: string;
        editor?: Editor;
        skipArticles?: number;
        label?: string;
        clientId?: string;
        unitId?: string;
        src?: string;
        text?: string;
        linkedTo?: string;
        link?:  string;
        isActive?: boolean;
        skipIssues?: number;
        skipSections?: number | string;
        visibleItems?: number;
        itemsPerRow?: number;
        isVideo?: boolean;
        ignoreSections?: boolean;
        showCover?: boolean;
        imagePosition?: string;
        themeColor?: null | 'base' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light' | 'inverse';
        fillMode?: null | 'solid' | 'outline' | 'flat' | 'link' | 'clear';
        size?: null | 'small' | 'medium' | 'large';
        chartType?: null | 'pie' | 'area' | 'bar' | 'column' | 'donut' | 'line' | 'candlestick'; 
        chartData?: any[];
        isTooltip: null | boolean;
        chartLegendPosition?: 'top' | 'bottom' | 'left' | 'right';
        chartLegendOrientation?: 'vertical' | 'horizontal';

        /**
         * Converts widget properties to plain JSON object.
         */
        toJson(): Reptile.Service.WidgetGeneralProperties;
    }

    interface IWidgetStyleProperties {
        backgroundImage?: string;
        backgroundColor?: string;
        minHeight?: string;
        color?: string;
        display?: string;
        flexDirection?: string;
        fontSize?: string;
        fontFamily?: string;
        margin?: string;
        padding?: string;
        width?: string;
        height?: string;
        borderColor?: string;
        borderRadius?: string;
        borderWidth?: string;
        boxShadow?: string;
        fontWeight?: string;
        fontStyle?: string;
        textDecoration?: string;
        textAlign?:
            | 'start'
            | 'end'
            | 'left'
            | 'right'
            | 'center'
            | 'justify'
            | 'match-parent';

        /**
         * Converts widget properties to plain JSON object.
         */
        toJson(): Reptile.Service.WidgetStyleProperties;
    }
}
