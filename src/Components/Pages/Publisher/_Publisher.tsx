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
    IntroProjectWizard,
    ProjectWizard,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    ContentEntitiesController,
    HelpSettingsController,
    NavigationSideMenuController,
    ProjectWizardController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Publisher = () => {
    const headerController = useController(CmsHeaderController);
    const contentEntitiesController = useController(ContentEntitiesController);
    const projectWizardController = useController(ProjectWizardController);
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
                navbarMain={<ContentTitle title='Projects' />}
                navbarActions={
                    <ProjectWizard
                        style={{ width: '160px' }}
                        controller={projectWizardController}
                    />
                }
                content={
                    <ContentEntities
                        controller={contentEntitiesController}
                        emptyElement={
                            <IntroProjectWizard
                                controller={projectWizardController}
                            />
                        }
                    />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.publisher}
                    />
                }
            />
        </Page>
    );
};

export default _Publisher;
