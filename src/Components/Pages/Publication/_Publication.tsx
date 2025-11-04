import React from 'react';
import { ContentTemplate } from '@Reptile/Components/Templates';
import { Breadcrumbs, DragAndDropButton, NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
    ContentEntities,
    Header,
    HelpSettings,
    PublicationItemAdd,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsBreadcrumbsController,
    CmsHeaderController,
    ContentEntitiesController,
    HelpSettingsController,
    NavigationSideMenuController,
    PublicationItemController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Publication = () => {
    const headerController = useController(CmsHeaderController);
    const breadcrumbsController = useController(CmsBreadcrumbsController);
    const contentEntitiesController = useController(ContentEntitiesController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    const publicationItemController = useController(PublicationItemController);

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
                    <PublicationItemAdd
                        style={{ width: '140px' }}
                        controller={publicationItemController}
                    />
                    </>
                }
                content={
                    <ContentEntities controller={contentEntitiesController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.publication}
                    />
                }
            />
        </Page>
    );
};

export default _Publication;
