import React, { useEffect } from 'react';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_GlobalStyle.scss';
import {
    GlobalStyleSettings,
    HelpSettings,
} from '@Reptile/Components/Organisms';
import { GlobalStyleDisplay } from '@Reptile/Components/Molecules';

const _GlobalStyle = controlled<
    Reptile.Props.GlobalStyleProps,
    Reptile.Controllers.IGlobalStyleController
>(({ controller }) => {
    useInitController(controller);

    useEffect(() => {
        void controller.getData();
    }, [controller]);

    useEffect(() => {
        controller.color.colorString = undefined;
    }, [controller, controller.screenSelect.selectedOption]);

    return (
        <div className='rt-global-styles'>
            <GlobalStyleSettings controller={controller} />
            <GlobalStyleDisplay controller={controller} />
              
        </div>
    );
});

export default _GlobalStyle;
