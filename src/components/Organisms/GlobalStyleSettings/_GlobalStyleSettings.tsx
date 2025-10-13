import React from 'react';
import { Button, Text } from '@Reptile/Components/Atoms';
import {
    ColorProperty,
    DropdownInputProperty,
} from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_GlobalStyleSettings.scss';

const _GlobalStyleSettings = controlled<
    Reptile.Props.GlobalStyleProps,
    Reptile.Controllers.IGlobalStyleController
>(({ controller }) => {
    useInitController(controller);

    return (
        <>
            <div className='rt-global-style-settings'>
                <Text
                    className={'styles'}
                    color={'black'}
                    weight={'bold'}
                    size={'h1'}
                >
                    Global Styles
                </Text>
                <div className='select_flex_box'>
                    <DropdownInputProperty
                        controller={controller.screenSelect}
                    />
                </div>

                <div className='primary_color_content'>
                    <ColorProperty
                        className={'color-picker'}
                        controller={controller.color}
                    />
                </div>
                <div className='save-styles'>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => void controller.saveApp()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    ); 
});
export default _GlobalStyleSettings;
