import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_FinishActions.scss';
import { Button } from '@Reptile/Components/Atoms';

const _FinishActions = reactive<Reptile.Props.FinishActionsProps>(
    ({ submit, isDisabled }, { handleBackClick, handleActionClick }) => {
        return (
            <div className='rt-finish-actions'>
                <Button onClick={() => handleBackClick()}>Back</Button>

                {!submit && handleActionClick && (
                    <Button
                        color={'primary'}
                        onClick={() => handleActionClick()}
                    >
                        Next
                    </Button>
                )}

                {submit && handleActionClick && (
                    <Button
                        disabled={isDisabled}
                        color={'primary'}
                        onClick={() => handleActionClick()}
                    >
                        Submit
                    </Button>
                )}
            </div>
        );
    }
);

export default _FinishActions;
