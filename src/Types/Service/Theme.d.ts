declare namespace Reptile.Service {
    export type Theme = {
        id: string,
        name: string,
        isAdvanced: boolean,
        isActive: boolean,
        publisherContentEntityName: string,
        publisherContentEntityId: string,
        publicationContentEntityName: string,
        publicationContentEntityId: string,
        css: string,
        jsonStructure: string,
        createdBy: string,
        created: string,
    }

    export type ThemeJsonStructure = {
        id: string,
        name: string,
        type: 'text' | 'image',
        selectorType: string,
        selectorName: string,
        css: React.CSSProperties,
    }
}
