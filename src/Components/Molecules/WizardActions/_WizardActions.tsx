import React from 'react';
import clsx from 'clsx';
import { Button } from '@Reptile/Components/Atoms';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_WizardActions.scss';

const _WizardActions = reactive<Reptile.Props.WizardActionsProps>(
    ({ className, style }, { stepKind, canGoNext, onBack, onNext }) => {
        return (
            <div className={clsx('rt-wizard-actions', className)} style={style}>
                <Button
                    className='rt-wizard-action'
                    color='gray'
                    variant='contained'
                    size='lg'
                    onClick={onBack}
                >
                    {() =>
                        reactiveValue(stepKind) === 'first' ? 'Cancel' : 'Back'
                    }
                </Button>
                <Button
                    className='rt-wizard-action'
                    color='primary'
                    variant='contained'
                    size='lg'
                    disabled={() => reactiveValue(canGoNext) === false}
                    onClick={onNext}
                >
                    {stepKind === 'last' ? 'Finish' : 'Next'}
                </Button>
            </div>
        );
    }
);

export default _WizardActions;
