import React from 'react';
import { FinishTemplate } from '@Reptile/Components/Templates';
import {
    Header,
    FinishContentWizard,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
    CmsHeaderController,
    FinishController,
    HelpSettingsController,
    NavigationSideMenuController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Finish = () => {
    const headerController = useController(CmsHeaderController);
    const navigationSideMenuController = useController(
        NavigationSideMenuController
    );

    const finishController = useController(FinishController);
    const helpSettingsController = useController(HelpSettingsController);

    return (
        <Page>
            <FinishTemplate
                header={<Header controller={headerController} />}
                sideMenu={
                    <NavigationSideMenu
                        controller={navigationSideMenuController}
                    />
                }
                content={<FinishContentWizard controller={finishController} />}
                helpMenu={
                    <HelpSettings
                        controller={helpSettingsController}
                        helpMenu={HELPMENU.finish}
                    />
                }
            />
        </Page>
    );
};

export default _Finish;
