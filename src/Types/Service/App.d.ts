declare namespace Reptile.Service {
    export type AppInstaller = {
        oS: string;
        packageName: string;
        versionName: string;
        versionCode: string;
        initializationStageState: string;
        configurationStageState: string;
        buildAndSignStageState: string;
        uploadStageState: string;
        deployStageState: string;
        startDateTime: Date;
        endDateTime?: Date | null;
        appInstallerUrl: string;
        states?: string[]
    };

    export type AppInstallerList = {
        oS: string;
        packageName: string;
        versionName: string;
        versionCode: string;
        initializationStageState: string;
        configurationStageState: string;
        buildAndSignStageState: string;
        uploadStageState: string;
        deployStageState: string;
        startDateTime: Date;
        endDateTime?: Date | null;
        appInstallerUrl: string;
        states?: string[]
    }[];
}
