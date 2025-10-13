import React from 'react';
import { ThemesOptions, ThemesSave } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import { AdvancedCss, CreateNewStyle } from '@Reptile/Components/Organisms';

import './_ThemesActions.scss';

const _ThemesActions = controlled<
    Reptile.Props.PublicationItemProps,
    Reptile.Controllers.IThemesActionsController
>(({ controller }) => {
    useInitController(controller);

    return (
        <div className='rt-themes-actions'>
            <ThemesSave controller={controller.saveChanges} />
            <CreateNewStyle controller={controller.addNewStyle} />
            <AdvancedCss controller={controller.advancedCss} />
            <ThemesOptions controller={controller.options} />
        </div>
    );
});

export default _ThemesActions;
