import React from 'react';
import { AddBoltOnsTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
    AddBoltOns,
    Header,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
    PaymentController,
} from '@Reptile/Store/Controllers';

import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _AddBoltOns = () => {
    const headerController = useController(CmsHeaderController);
    const paymentController = useController(PaymentController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <AddBoltOnsTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={<AddBoltOns controller={paymentController} />}
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

export default _AddBoltOns;
