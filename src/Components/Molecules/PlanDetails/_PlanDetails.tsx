import React from 'react';
import { Text } from '@Reptile/Components/Atoms';

import './_PlanDetails.scss';
import { FEATURES } from '@Reptile/Constants/Constants';

const _PlanDetails = () => {
    return (
        <div className='rt-plan-details'>
            <Text
                color={'black'}
                weight={'bold'}
                size={'extra-large'}
                className='title'
            >
                Enjoy these features on all of the above plans
            </Text>
            <div className='features-container'>
                {FEATURES.map((e, i) => {
                    return (
                        <div className='features' key={i}>
                            <img src={e.icon} />
                            <Text
                                color={'black'}
                                size={'medium'}
                                weight={'semibold'}
                            >
                                {e.header}
                            </Text>
                            <Text
                                color={'black'}
                                size={'small'}
                                weight={'regular'}
                            >
                                {e.about}
                            </Text>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default _PlanDetails;
