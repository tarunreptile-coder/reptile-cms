import React from 'react';
import { PrototypeTemplate } from '@Reptile/Components/Templates';
import { NavigationSideMenu } from '@Reptile/Components/Molecules';
import {
  BuildContent,
  Header,
  HelpSettings,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import {
  CmsHeaderController,
  HelpSettingsController,
  NavigationSideMenuController,
  PrototypeController,
} from '@Reptile/Store/Controllers';
import { Page } from '@Reptile/Components/Atoms';
import { HELPMENU } from '@Reptile/Constants/helpMenu';

const _Prototype = () => {
  const headerController = useController(CmsHeaderController);
  const prototypeController = useController(PrototypeController);
  const navigationSideMenuController = useController(
    NavigationSideMenuController
  );
  const helpSettingsController = useController(HelpSettingsController);

  return (
    <Page>
      <PrototypeTemplate
        header={<Header controller={headerController} />}
        sideMenu={
          <NavigationSideMenu controller={navigationSideMenuController} />
        }
        content={<BuildContent controller={prototypeController} />}
        helpMenu={
          <HelpSettings
            controller={helpSettingsController}
            helpMenu={HELPMENU.prototype}
          />
        }
      />
    </Page>
  );
};

export default _Prototype;
