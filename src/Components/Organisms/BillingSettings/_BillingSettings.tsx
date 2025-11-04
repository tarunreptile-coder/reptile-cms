import React from 'react';

import { reactive } from '@Reptile/Framework';
import { Button, Image, Separator, Text } from '@Reptile/Components/Atoms';

import './_BillingSettings.scss';

const _BillingSettings = reactive<Reptile.Props.BillingSettingsProps>(
    ({ avatarUrl }, {}) => {
        return (
            <div className='rt-billing-settings'>
                <Text size='h1' color='black' weight='bold'>
                    Current Plan
                </Text>
                <div className='info-container'>
                    <div className='reptile-accounts'>
                        <div>
                            <Text size='h2' color='black' weight='bold'>
                                Reptile Account
                            </Text>
                            <Text size='small' color='black' weight='regular'>
                                Annual plan, paid monthly
                            </Text>
                        </div>
                        <Image
                            src={() => avatarUrl}
                            form='circle'
                            height={50}
                            width={50}
                            // loading={() => controller.loading}
                        />
                    </div>
                    <Separator bottom={20} />
                    <Text size='small' color='light-gray' weight='regular'>
                        Next payment is scheduled for Mar, 24th 2023
                    </Text>
                    <Separator bottom={20} />
                    <Button>Manage Plan</Button>
                </div>
            </div>
        );
    }
);

export default _BillingSettings;
