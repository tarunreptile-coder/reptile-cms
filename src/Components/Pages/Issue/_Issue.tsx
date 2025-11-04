import React from 'react';
import { ContentTemplate } from '@Reptile/Components/Templates';
import {
    Breadcrumbs,
    DragAndDropButton,
    NavigationSideMenu,
} from '@Reptile/Components/Molecules';
import {
    ContentEntities,
    Header,
    HelpSettings,
    IssueItemAdd,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsBreadcrumbsController,
    CmsHeaderController,
    ContentEntitiesController,
    HelpSettingsController,
    IssueItemController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Issue = () => {
    const headerController = useController(CmsHeaderController);
    const breadcrumbsController = useController(CmsBreadcrumbsController);
    const contentEntitiesController = useController(ContentEntitiesController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    const issueItemController = useController(IssueItemController);

    return (
        <Page>
            <ContentTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                navbarMain={<Breadcrumbs controller={breadcrumbsController} />}
                navbarActions={
                    <>
                        <DragAndDropButton
                            controller={contentEntitiesController}
                        />
                        <IssueItemAdd
                            style={{ width: '140px' }}
                            controller={issueItemController}
                        />
                    </>
                }
                content={
                    <ContentEntities controller={contentEntitiesController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.issue}
                    />
                }
            />
        </Page>
    );
};

export default _Issue;
