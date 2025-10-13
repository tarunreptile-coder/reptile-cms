import React, { useCallback } from 'react';
import clsx from 'clsx';
import { controlled } from '@Reptile/Framework';
import { Button } from '@Reptile/Components/Atoms';
import { useInitController } from '@Reptile/Hooks';

import './_ContentActions.scss';

const _ContentActions = controlled<
    Reptile.Props.ContentActionsProps,
    Reptile.Controllers.IContentActionsController
>(({ style, className, controller }) => {
    useInitController(controller);

    const handleOnSave = useCallback(() => {
        void controller.save();
    }, [controller]);

    return (
        <div className={clsx('rt-content-actions', className)} style={style}>
            <Button
                className='save-article'
                color='gray'
                variant='contained'
                disabled={() => controller.loading}
                onClick={handleOnSave}
            >
                Save
            </Button>

        </div>
    );
});

export default _ContentActions;
