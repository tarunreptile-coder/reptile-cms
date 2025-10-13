import React, { useState } from 'react';
import { TemplateBuilderTemplate } from '@Reptile/Components/Templates';
import {
    Header,
    HelpSettings,
    TemplateBody,
    TemplateBuilderSidePanel,
    TreeView,
} from '@Reptile/Components/Organisms';
import { DragAndDropProvider, useUiState } from '@Reptile/Contexts';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
    TemplateBuilderController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';

const _Template = () => {
    const headerController = useController(CmsHeaderController);
    const treeViewController = useUiState().treeView;
    const templateBuilderController = useController(TemplateBuilderController);
    const helpSettingsController = useController(HelpSettingsController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );

    const [selectedSideBarButton, setSelectedSideBarButton] = useState<
        'home' | 'setup' | 'launch'
    >('home');

    const onSideBarClick = (selectedButton: 'home' | 'setup' | 'launch') => {
        setSelectedSideBarButton(selectedButton);
    };

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
                    treeView={<TreeView controller={treeViewController} />}
                    body={
                        <TemplateBody controller={templateBuilderController} />
                    }
                    sidePanel={
                        <TemplateBuilderSidePanel
                            controller={templateBuilderController}
                        />
                    }
                    helpMenu={
                        <HelpSettings
                            controller={helpSettingsController}
                            helpMenu={HELPMENU.template}
                        />
                    }
                />
            </DragAndDropProvider>
        </Page>
    );
};

export default _Template;
