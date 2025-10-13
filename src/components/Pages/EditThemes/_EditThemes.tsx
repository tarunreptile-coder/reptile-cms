import React from 'react';
import { ContentTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu, ThemeTitle } from '@Reptile/Components/Molecules';
import {
    EditThemesContent,
    Header,
    HelpSettings,
    ThemesActions,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    EditThemesController,
    HelpSettingsController,
    NavigationSideMenuController,
    ThemesActionsController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _EditThemes = () => {
    const headerController = useController(CmsHeaderController);
    const editThemesController = useController(EditThemesController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    const themesActionsController = useController(ThemesActionsController);

    return (
        <Page backgroundColor='white'>
            <ContentTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                navbarMain={<ThemeTitle controller={editThemesController} />}
                navbarActions={
                    <ThemesActions controller={themesActionsController} />
                }
                content={
                    <EditThemesContent controller={editThemesController} />
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

export default _EditThemes;
