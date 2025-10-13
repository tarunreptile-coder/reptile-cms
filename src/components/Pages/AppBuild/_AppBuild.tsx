import React from 'react';
import { TemplateBuilderTemplate } from '@Reptile/Components/Templates';
import {
    AppTemplateBody,
    AppTemplateBuilderSidePanel,
    Header,
    HelpSettings,
    TreeView,
} from '@Reptile/Components/Organisms';
import { DragAndDropProvider } from '@Reptile/Contexts';
import { useController } from '@Reptile/Hooks';
import {
    AppBuildController,
    AppBuildTreeViewController,
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';

const _AppBuild = () => {
    const headerController = useController(CmsHeaderController);
    const helpSettingsController = useController(HelpSettingsController);
    const appBuildController = useController(AppBuildController);
    const appBuildTreeViewController = useController(AppBuildTreeViewController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );

    return (
        <Page>
            <DragAndDropProvider>
                <TemplateBuilderTemplate
                    header={<Header controller={headerController} />}
                    sideMenu={
                        <NavigationSideMenu
                            controller={navigationSideMenuController}
                        />
                    }
                    treeView={<TreeView controller={appBuildTreeViewController} />}
                    body={<AppTemplateBody controller={appBuildController} />}
                    sidePanel={
                        <AppTemplateBuilderSidePanel
                            controller={appBuildController}
                        />
                    }
                    helpMenu={
                        <HelpSettings
                            controller={helpSettingsController}
                            helpMenu={HELPMENU.appBuild}
                        />
                    }
                />
            </DragAndDropProvider>
        </Page>
    );
};

export default _AppBuild;
