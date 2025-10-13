import React from 'react';
import { AccountSettingsTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
    AccountSettings,
    Header,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    AccountSettingsController,
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';

import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _AccountSettings = () => {
    const headerController = useController(CmsHeaderController);
    const accountSettingsController = useController(AccountSettingsController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <AccountSettingsTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={
                    <AccountSettings controller={accountSettingsController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.accountSettings}
                    />
                }
            />
        </Page>
    );
};

export default _AccountSettings;
