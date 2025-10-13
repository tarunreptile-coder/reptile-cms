declare namespace Reptile.Service {
    export type TemplatePreset = TemplateInfo & {
        presetJsonTemplate: string,
        draftJsonTemplate: string | null,
    }

    export type TemplateInfo = {
        id: string,
        name: string,
        contentEntityType: number,
        isActive: boolean,
        publicationId: string,
        publisherId: string,
        publicationName: string,
        publisherName: string,
        streamTypeId: number
    }

    type WidgetStyleProperties = {
        backgroundImage?: string,
        backgroundColor?: string,
        minHeight?: string,
        color?: string,
        display?: string,
        flexDirection?: string;
        fontSize?: string,
        fontFamily?: string,
        margin?: string,
        padding?: string,
        width?: string,
        height?: string,
        borderColor?: string,
        borderRadius?: string,
        borderWidth?: string,
        boxShadow?: string,
        fontWeight?: string,
        fontStyle?: string,
        textDecoration?: string,
        textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent",
    }

    type WidgetGeneralProperties = {
        action?: string,
        actions?: {Name: string, Code: string}[],
        radius?: string,
        tagQuery?: {
            selected: boolean,
            query: Array<{ tagId: string, operation: string }>,
        },
        htmlBody?: string,
        skipArticles?: number,
        label?: string,
        clientId?: string,
        unitId?: string,
        src?: string,
        text?: string,
        linkedTo?: string,
        link?: string,
        isActive?: boolean,
        skipIssues?: number,
        skipSections?: number | string,
        visibleItems?: number,
        itemsPerRow?: number,
        isVideo?: boolean,
        ignoreSections?: boolean,
        showCover?: boolean,
        imagePosition?: string,
        themeColor?: null | 'base' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light' | 'inverse',
        fillMode?: null | 'solid' | 'outline' | 'flat' | 'link' | 'clear',
        size?: null | 'small' | 'medium' | 'large',
        chartType?: null | 'pie' | 'area' | 'bar' | 'column' | 'donut' | 'line' | 'candlestick', 
        chartData?: any[],
        isTooltip: null | boolean,
        chartLegendPosition?: 'top' | 'bottom' | 'left' | 'right',
        chartLegendOrientation?: 'vertical' | 'horizontal',
    }

    type WidgetComponent = {
        id: string,
        type: string,
        properties: {
            general: WidgetGeneralProperties,
            styles: WidgetStyleProperties,
        },
    }

    export type Widget = {
        id: string,
        widgetId?: string,
        layoutId?: string,
        isLocked?: boolean,
        type: string,
        contents: WidgetComponent[],
        className: string,
        properties: {
            general: WidgetGeneralProperties,
            styles: WidgetStyleProperties,
        },
        friendlyName: string,
        allowedLinkedContentTypes?: number[],
    }
}
