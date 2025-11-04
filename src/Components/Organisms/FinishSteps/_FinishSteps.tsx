import { Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_FinishSteps.scss';

const _FinishSteps = reactive<Reptile.Props.FinishStepsContentProps>(
    ({ title, children }, { navigateToDocs, navigateToMail }) => {
        return (
            <div className='rt-finish-steps-content'>
                <Text
                    className={'finish-steps-title'}
                    color={'black'}
                    size={'h1'}
                    weight={'bold'}
                >
                    {title}
                </Text>
                <div className='finish-steps-inputs'>{children}</div>
                {/* <div className='finish-steps-help'>
                    <div onClick={() => navigateToMail()}>Contact for help</div>
                    <div onClick={() => navigateToDocs()}>Docs</div>
                </div> */}
            </div>
        );
    }
);

export default _FinishSteps;
