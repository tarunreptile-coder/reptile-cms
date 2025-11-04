import { Button, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_AccountBilling.scss';

const _AccountBilling = reactive<Reptile.Props.AccountBillingProps>(
    ({}, { editBoltOns, billingHistoryNavigate, sendEmail }) => {
        return (
            <div className='rt-account-billing'>
                <Text size='h2' color='black' weight='bold'>
                    Billing Information
                </Text>

                <div className='billing-container'>
                    <div className='info-container'>
                        <Text size='h3' color='black' weight='semibold'>
                            Subscription Plan
                        </Text>
                        <Text size='small' color='light-gray' weight='regular'>
                            Professional plan with projects and team members
                            €/month Renews every month Supports up to member (
                            currently active) Supports up to projects (
                            currently active) See billing history
                        </Text>

                        <Button onClick={() => billingHistoryNavigate()}>
                            See billing history
                        </Button>
                    </div>

                    {/* <div className='info-container'>
                        <Text size='h3' color='black' weight='semibold'>
                            Bolt on&apos;s
                        </Text>

                        <Text size='small' color='light-gray' weight='regular'>
                            10 project and 2 team members €12/month 2 Bolt
                            on&apos;s active
                        </Text>
                        <Button onClick={editBoltOns}>
                            Add or remove bolt on&apos;s
                        </Button>
                    </div> */}

                    <div className='info-container'>
                        <Text size='h3' color='black' weight='semibold'>
                            Need help with anything?
                        </Text>
                        <Text size='small' color='light-gray' weight='regular'>
                            Professional plan with projects and team members
                            €/month Renews every month Supports up to member (
                            currently active) Supports up to projects (
                            currently active) See billing history
                        </Text>
                        <Button onClick={() => sendEmail()}>
                            info@pagelizard.com
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

export default _AccountBilling;
