import React from 'react';
import { Button, Separator, Text, Toggle } from '@Reptile/Components/Atoms';

import './_PaymentOptions.scss';
import { reactive } from '@Reptile/Framework';

const _PaymentOptions = reactive<Reptile.Props.PaymentOptionsProps>(
    ({ toggle }, { handleToggle, handleGBP, handleEUR, handleUSD }) => {
        return (
            <div className='rt-payment-options'>
                <div className='toggle'>
                    <Text
                        className={'plan-length'}
                        size='small'
                        color='light-gray'
                        weight='regular'
                    >
                        Monthly
                    </Text>
                    <Toggle onClick={handleToggle} active={toggle} />
                    <Text
                        className={'plan-length'}
                        size='small'
                        color='light-gray'
                        weight='regular'
                    >
                        Annually
                    </Text>
                </div>
                <div className='currency'>
                    <Button onClick={handleGBP}>
                        <Text size='large' color='black' weight='bold'>
                            £
                        </Text>
                    </Button>

                    <Button onClick={handleEUR}>
                        <Text size='large' color='black' weight='bold'>
                            €
                        </Text>
                    </Button>

                    <Button onClick={handleUSD}>
                        <Text size='large' color='black' weight='bold'>
                            $
                        </Text>
                    </Button>
                </div>
            </div>
        );
    }
);

export default _PaymentOptions;
