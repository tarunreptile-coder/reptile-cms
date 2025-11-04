import React from 'react';
import { PaymentTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import { Header, HelpSettings, Payment } from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    HelpSettingsController,
    NavigationSideMenuController,
    PaymentController,
} from '@Reptile/Store/Controllers';

import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Payment = () => {
    const headerController = useController(CmsHeaderController);
    const paymentController = useController(PaymentController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <PaymentTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={<Payment controller={paymentController} />}
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

export default _Payment;
