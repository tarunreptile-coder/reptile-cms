import React from 'react';
import { Button, Separator, Text } from '@Reptile/Components/Atoms';

import './_PaymentPlanCard.scss';
import { reactive } from '@Reptile/Framework';

const _PaymentPlan = reactive<Reptile.Props.PaymentPlanProps>(
    ({ price, toggle, listInfo, planInfo, planType }, { handlePayment }) => {
        return (
            <div className='rt-payment-plan'>
                <h2 className='plan-tier'>{planType}</h2>
                <h3 className='plan-price'>{price}</h3>
                <Text className={'plan-length'} size='small' color='light-gray' weight='regular'>
                    {!toggle ? 'Per Month' : 'Annually'}
                </Text>

                <button onClick={handlePayment} className={'plan-button'}>
                    Get Started
                </button>

                <p className='plan-info'>{planInfo}</p>

                <ul className='plan-column-list'>
                    {listInfo.map((e, i) => {
                        return <li key={i}>{e}</li>;
                    })}
                </ul>
                <div className='terms'>
                    <a
                        href='https://www.reptile.app/terms-and-conditions'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <Text size='extra-small' color='black' weight='regular'>
                            *Terms and conditions apply.
                        </Text>
                    </a>
                </div>
            </div>
        );
    }
);

export default _PaymentPlan;
