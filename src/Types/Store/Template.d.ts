declare namespace Reptile.Store {
    type WidgetPropertiesStyles = {
        backgroundImage?: string,
        backgroundColor?: string,
        minHeight?: string,
        color?: string,
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
        textAlign?: string,
    }

    type WidgetPropertiesGeneral = {
        radius?: string,
        tagQuery?: {
            selected: boolean,
            query: Array<{ tagId: string, operation: string }>,
            htmlBody?: string,
        },
        skipArticles?: number,
        label?: string,
        clientId?: string,
        unitId?: string,
        src?: string,
        text?: string,
        linkedTo?: string,
        isActive?: boolean,
        skipIssues?: number,
        skipSections?: number,
        visibleItems?: number,
        itemsPerRow?: number,
        isVideo?: boolean,
        ignoreSections?: boolean,
        showCover?: boolean,
    };

    type WidgetComponent = {
        id: string,
        type: string,
        properties: {
            general: WidgetPropertiesGeneral,
            styles: WidgetPropertiesStyles,
        },
    };

    export type Widget = {
        id: string,
        type: string,
        contents: WidgetComponent[],
        className: string,
        properties: {
            general: WidgetPropertiesGeneral,
            styles: WidgetPropertiesStyles,
        },
        friendlyName: string,
        allowedLinkedContentTypes: number[],
    };
}
