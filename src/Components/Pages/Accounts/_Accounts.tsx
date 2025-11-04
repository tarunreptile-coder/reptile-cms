import React from 'react';
import { AccountsTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
    Header,
    HelpSettings,
    TeamsContent,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
    TeamsController,
} from '@Reptile/Store/Controllers';

import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Accounts = () => {
    const headerController = useController(CmsHeaderController);
    const teamsController = useController(TeamsController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <AccountsTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={<TeamsContent controller={teamsController} />}
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.teams}
                    />
                }
            />
        </Page>
    );
};

export default _Accounts;
