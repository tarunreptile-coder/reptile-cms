import React from 'react';
import {
    Button,
    Input,
    SearchIcon,
    Tag,
    Text,
} from '@Reptile/Components/Atoms';

import './_AccountsHeader.scss';
import { reactive } from '@Reptile/Framework';

const _AccountsHeader = reactive<Reptile.Props.AccountsHeaderProps>(
    (
        { superUser, totalAccounts, subscriptionStatus, trialStatus },
        { onEmailSearch, onAddDisplay, onUpgradeModal }
    ) => {
        const subscription =
            subscriptionStatus?.isPaid === true
                ? subscriptionStatus.remainingUserQouta <= 0
                : !trialStatus;

        const handleClick = () => {
            if (!superUser && subscription) {
                onUpgradeModal();
            }

            if (superUser || !subscription) {
                onAddDisplay();
            }
        };

        return (
            <div className='rt-accounts-container'>
                <div className='header'>
                    <div className='title-container'>
                        <Text
                            className='title'
                            size={'h3'}
                            weight={'semibold'}
                            color={'black'}
                        >
                            Accounts
                        </Text>
                        <Tag label={totalAccounts.toString() ?? '0'} />
                    </div>
                    <Input
                        placeholder={'Search for account...'}
                        rightElement={<SearchIcon />}
                        onChange={onEmailSearch}
                    />
                    <Button color={'primary'} onClick={handleClick}>
                        Add Account
                    </Button>
                    <div className='mobile-scroll-text'>
                        Scroll right to view entire accounts section
                    </div>
                </div>
            </div>
        );
    }
);

export default _AccountsHeader;
