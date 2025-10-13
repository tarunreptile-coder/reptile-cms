declare namespace Reptile.Service {
    export type GlobalStyles = {
        appDesign: {
            defaultStyles: DefaultStyles;
            screens: {
                type: string;
                name: string;
                settings: GlobalSettings;
            }[];
        };
        configuration: {
            name: string;
            logo: string;
        };
    }

    export type GlobalSettings = {
        
            general: Record<string, unknown>;
            styles: {
                logo?: string;
                primaryColor?: string;
                secondaryColor?: string;
            };
        
    }
}
