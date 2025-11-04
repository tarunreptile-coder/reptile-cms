import React from 'react';
import { ContentTemplate } from '@Reptile/Components/Templates';
import {
    ContentTitle,
    NavigationSideMenu,
} from '@Reptile/Components/Molecules';
import {
    Header,
    ThemesManager,
    HelpSettings,
    ThemesManagerList,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
    ThemesManagerController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _ThemesManager = () => {
    const headerController = useController(CmsHeaderController);
    const themesManagerController = useController(ThemesManagerController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );

    const helpSettingsController = useController(HelpSettingsController);

    const NEW_PROJECT_BUTTON_OFFSET = 53; // 65px (Margin of Content title) - 12px (navbar actions offset - property right)

    return (
        <Page backgroundColor='white'>
            <ContentTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                navbarMain={<ContentTitle title='Themes' />}
                navbarActions={
                    <ThemesManager
                        controller={themesManagerController}
                        style={{ marginRight: NEW_PROJECT_BUTTON_OFFSET }}
                    />
                }
                content={
                    <ThemesManagerList controller={themesManagerController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.themes}
                    />
                }
            />
        </Page>
    );
};

export default _ThemesManager;
