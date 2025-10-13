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
    SectionItemAdd,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsBreadcrumbsController,
    CmsHeaderController,
    ContentEntitiesController,
    HelpSettingsController,
    NavigationSideMenuController,
    SectionItemController,
} from '@Reptile/Store/Controllers';
import { Button, Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Section = () => {
    const headerController = useController(CmsHeaderController);
    const breadcrumbsController = useController(CmsBreadcrumbsController);
    const contentEntitiesController = useController(ContentEntitiesController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    const sectionItemController = useController(SectionItemController);

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
                        <SectionItemAdd
                            style={{ width: '140px' }}
                            controller={sectionItemController}
                        />
                    </>
                }
                content={
                    <ContentEntities controller={contentEntitiesController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.section}
                    />
                }
            />
        </Page>
    );
};

export default _Section;
