import React from 'react';
import { PaymentForm, PaymentInfo } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

import './_PaymentContent.scss';
import { Text } from '@Reptile/Components/Atoms';

const _PaymentContent = reactive<Reptile.Props.PaymentContentProps>(
    (
        { selectedPlan, boltOns, orgs, selectedOrg, orgIndex, subscriptionStatus },
        { handleBoltOns, handlePaymentId, handleChange }
    ) => {
        return (
            <div className='rt-payment-content'>
                <Text
                    className={'title'}
                    size={'extra-large'}
                    weight={'bold'}
                    color={'black'}
                >
                   Pay Securely by Card
                </Text>
                <div className='flex-box'>
                    <PaymentInfo selectedPlan={selectedPlan} />
                    <PaymentForm
                        boltOns={boltOns}
                        orgs={orgs}
                        orgIndex={orgIndex}
                        selectedOrg={selectedOrg}
                        subscriptionStatus={subscriptionStatus}
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
                  After your plan ends, you will need to renew your subscription. We will email you when your subscription is nearing its end. You can cancel your plan at any time.
                </Text>
            </div>
        );
    }
);

export default _PaymentContent;
