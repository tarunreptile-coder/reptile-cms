import React from 'react';
import { BillingHistoryTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
    BillingHistory,
    Header,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    BillingHistoryController,
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';

import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _BillingHistory = () => {
    const headerController = useController(CmsHeaderController);
    const billingHistoryController = useController(BillingHistoryController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <BillingHistoryTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={
                    <BillingHistory controller={billingHistoryController} />
                }
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.payment}
                    />
                }
            />
        </Page>
    );
};

export default _BillingHistory;
