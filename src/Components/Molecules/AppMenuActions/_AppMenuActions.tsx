import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Button } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_AppMenuActions.scss';

const _AppMenuActions = reactive<Reptile.Props.AppMenuActionsProps>(
    ({ style, className, disabled }, { onSave, onReset, onModalChange }) => {
        // const [run, setRun] = useState(false);

        const handleSave = useCallback(() => {
            void onSave();
        }, [onSave]);
       
        const handleReset = useCallback(() => {
            void onReset();
        }, [onReset]);

        const handleModalChange = useCallback(() => {
            onModalChange();
        }, [onModalChange]);

        return (
            <div
                className={clsx('rt-app-menu-actions', className)}
                style={style}
            >
                <Button
                    className='save-template'
                    variant='contained'
                    color='primary'
                    size='sm'
                    onClick={handleSave}
                    disabled={disabled}
                >
                    Save
                </Button>
                
                <Button
                    className='save-template'
                    variant="outlined"
                    color='primary'
                    size='sm'
                    onClick={handleReset}
                >
                    Reset
                </Button>

                {/* <Button
                    className='save-template'
                    variant='contained'
                    color='primary'
                    size='sm'
                    onClick={handleModalChange}
                >
                    Add Screen
                </Button> */}
            </div>
        );
    }
);

export default _AppMenuActions;
