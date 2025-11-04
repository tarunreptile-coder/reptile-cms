import { Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_BillingHistoryContent.scss';

const _BillingHistoryContent =
    reactive<Reptile.Props.BillingHistoryContentProps>(
        (
            {
                amount,
                startDate,
                endDate,
                boltOnCount,
                clientsPerBoltOn,
                usersPerBoltOn,
                organizationName
            },
            {}
        ) => {
            return (
                <div className='rt-billing-history-content'>
                    <Text
                        className={'billing-title'}
                        color={'primary'}
                        weight={'bold'}
                        size={'h2'}
                    >
                        {organizationName}
                    </Text>

                    <div  className={'billing-price'}>
                    <Text color={'primary'} weight={'bold'} size={'h3'}>
                            Price:
                        </Text>
                        <Text
                            color={'black'}
                            weight={'bold'}
                            size={'medium'}
                        >
                            {` Subscription Price: ${amount}`}
                        </Text>
                    </div>

                    <div className='billing-dates'>
                        <Text color={'primary'} weight={'bold'} size={'h3'}>
                            Period:
                        </Text>
                        <Text color={'black'} weight={'bold'} size={'medium'}>
                            {`payment started: ${startDate.split('T')[0]}`}
                        </Text>
                        <Text color={'black'} weight={'bold'} size={'medium'}>
                            {`payment ends: ${endDate.split('T')[0]}`}
                        </Text>
                    </div>

                    <div className='billing-details'>
                        <Text color={'primary'} weight={'bold'} size={'h3'}>
                        Contains:
                        </Text>
                        <Text color={'black'} weight={'bold'} size={'medium'}>
                            {`Bolt on count: ${boltOnCount}`}
                        </Text>

                        <Text color={'black'} weight={'bold'} size={'medium'}>
                            {`Client per bolt on: ${clientsPerBoltOn}`}
                        </Text>

                        <Text color={'black'} weight={'bold'} size={'medium'}>
                            {`Users per bolt on: ${usersPerBoltOn}`}
                        </Text>
                    </div>
                </div>
            );
        }
    );

export default _BillingHistoryContent;
