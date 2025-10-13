import React from 'react';

import { ContentTitle } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

const _ThemeTitle = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.IEditThemesController
>(({ controller }) => {
  useInitController(controller);

  return (
    <ContentTitle
      title={
        controller.theme?.name.replace(/-|Default Theme/g, '') ?? 'Edit Theme'
      }
    />
  );
});

export default _ThemeTitle;
