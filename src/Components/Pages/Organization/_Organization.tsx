import React from 'react';
import { ContentTemplate } from '@Reptile/Components/Templates';
import {
    ContentTitle,
    NavigationSideMenu,
} from '@Reptile/Components/Molecules';
import {
    ContentEntities,
    Header,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    ContentEntitiesController,
    HelpSettingsController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Organization = () => {
    const headerController = useController(CmsHeaderController);
    const contentEntitiesController = useController(ContentEntitiesController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page backgroundColor='white'>
            <ContentTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                navbarMain={<ContentTitle title='Organization' />}
                content={
                    <ContentEntities controller={contentEntitiesController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.organization}
                    />
                }
            />
        </Page>
    );
};

export default _Organization;
