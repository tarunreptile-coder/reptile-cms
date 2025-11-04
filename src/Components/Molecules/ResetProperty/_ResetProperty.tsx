import React from 'react';
import clsx from 'clsx';
import { Text, Button } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ResetProperty.scss';

const _ResetProperty = controlled<
    Reptile.Props.SizePropertyProps,
    Reptile.Controllers.IResetPropertyController
>(({ style, className, controller }) => {
    useInitController(controller);

    const handleClick = React.useCallback(() => {
        controller.value = undefined
    }, [controller]);

    return (
        <div className={clsx('rt-reset-property', className)} style={style}>
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
          
            <Button onClick={handleClick}>Reset</Button>

        </div>
    );
});

export default _ResetProperty;
