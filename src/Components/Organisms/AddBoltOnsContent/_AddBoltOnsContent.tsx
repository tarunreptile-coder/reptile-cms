import React from 'react';
import { AddBoltOnsForm } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

import './_AddBoltOnsContent.scss';
import { Text } from '@Reptile/Components/Atoms';

const _AddBoltOnsContent = reactive<Reptile.Props.AddBoltOnsContentProps>(
    (
        { boltOns, orgs, selectedOrg, orgIndex },
        { handleBoltOns, handlePaymentId, handleChange }
    ) => {
        return (
            <div className='rt-add-bolt-ons-content'>
                <Text
                    className={'title'}
                    size={'extra-large'}
                    weight={'bold'}
                    color={'black'}
                >
                    Add Bolt Ons
                </Text>
                <div className='flex-box'>
                    <AddBoltOnsForm
                        boltOns={boltOns}
                        orgs={orgs}
                        orgIndex={orgIndex}
                        selectedOrg={selectedOrg}
                        handleChange={handleChange}
                        handleBoltOns={handleBoltOns}
                        handlePaymentId={handlePaymentId}
                    />
                </div>
                <Text
                    className={'Terms'}
                    size={'extra-small'}
                    color={'light-gray'}
                    weight={'regular'}
                >
                    After your plan ends you will have to renew your
                    subscription. You can cancel your plan at any time.
                </Text>
            </div>
        );
    }
);

export default _AddBoltOnsContent;
