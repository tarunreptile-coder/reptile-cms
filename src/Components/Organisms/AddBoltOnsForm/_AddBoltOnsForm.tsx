import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from '@stripe/react-stripe-js';
import React from 'react';
import {
    DropdownInput,
    InputField,
    ListItem,
} from '@Reptile/Components/Molecules';
import { Button, Text } from '@Reptile/Components/Atoms';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_AddBoltOnsForm.scss';

const _AddBoltOnsForm = reactive<Reptile.Props.PaymentFormProps>(
    (
        { boltOns, orgs, orgIndex, selectedOrg },
        { handleBoltOns, handlePaymentId, handleChange }
    ) => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async () => {
            if (!stripe || !elements) {
                return;
            }

            const cardNumberElement = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement = elements.getElement(CardCvcElement);

            if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
                return;
            }

            const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
            });

            handlePaymentId(paymentMethod?.id);
        };

        return (
            <div className='rt-add-bolt-ons-form'>
                <div className='payment-form-container'>
                    <div>
                        <Text size='small' color='light-gray' weight='regular'>
                            Card number
                        </Text>
                        <CardNumberElement className='number' />
                    </div>

                    <div className='expiration-cvc'>
                        <div className='expiry-container'>
                            <Text
                                size='small'
                                color='light-gray'
                                weight='regular'
                            >
                                Expiry date
                            </Text>
                            <CardExpiryElement className='expiry' />
                        </div>
                        <div className='cvc-container'>
                            <Text
                                size='small'
                                color='light-gray'
                                weight='regular'
                            >
                                CVC/CVV
                            </Text>
                            <CardCvcElement
                                className='cvc'
                                options={{ placeholder: '3 digits' }}
                            />
                        </div>
                    </div>

                    <div className='select-org'>
                        <Text>Select Org</Text>

                        <DropdownInput
                            name='org-dropdown'
                            label={'Select Organisation'}
                            value={() => selectedOrg ?? ''}
                            selectedIndex={() => orgIndex}
                            onChange={handleChange}
                        >
                            {() =>
                                orgs &&
                                orgs.map((org) => (
                                    <ListItem
                                        key={org.value}
                                        text={org.label}
                                    />
                                ))
                            }
                        </DropdownInput>
                    </div>

                    <div className='bolt-ons'>
                        <div className='add'>
                            <Text
                                size='small'
                                color='light-gray'
                                weight='regular'
                            >
                                Add bolt on&apos;s
                            </Text>
                        </div>

                        <InputField
                            value={() => reactiveValue(boltOns ?? 0).toString()}
                            onChange={(e) =>
                                handleBoltOns(Number.parseInt(e.target.value))
                            }
                            type='number'
                        />
                    </div>

                    <Button
                        className={'submit'}
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => void handleSubmit()}
                        disabled={
                            boltOns && boltOns !== 0 && selectedOrg
                                ? false
                                : true
                        }
                    >
                        Add Bolt On&apos;s
                    </Button>
                </div>
            </div>
        );
    }
);

export default _AddBoltOnsForm;
