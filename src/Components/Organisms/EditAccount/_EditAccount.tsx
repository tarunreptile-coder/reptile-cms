import { Button, Input, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React, { useCallback } from 'react';

import './_EditAccount.scss';

const _EditAccount = reactive<Reptile.Props.EditAccount>(
    (
        { firstName, lastName, username, email, actionEnabled },
        {
            editDetails,
            onFirstNameChange,
            onLastNameChange,
            onUsernameChange,
            onEmailChange,
        }
    ) => {
        const handleFirstNameChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onFirstNameChange) {
                    onFirstNameChange(e.target.value);
                }
            },
            [onFirstNameChange]
        );

        const handleLastNameChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onLastNameChange) {
                    onLastNameChange(e.target.value);
                }
            },
            [onLastNameChange]
        );

        const handleUsernameChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onUsernameChange) {
                    onUsernameChange(e.target.value);
                }
            },
            [onUsernameChange]
        );

        const handleEmailChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onEmailChange) {
                    onEmailChange(e.target.value);
                }
            },
            [onEmailChange]
        );

        const handleAction = () => {
            return actionEnabled === 'pending';
        };

        return (
            <div className='rt-edit-account'>
                <div className='edit-header'>
                    <Text size='h2' color='black' weight='bold'>
                        Account Info
                    </Text>
                    <Button
                        disabled={handleAction}
                        onClick={editDetails}
                        className={'save-button'}
                    >
                        Save changes
                    </Button>
                </div>
                <div className='edit-container'>
                    <div className='input-container1'>
                        <Text size='small' color='light-gray' weight='regular'>
                            First Name
                        </Text>
                        <Input
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <Text size='small' color='light-gray' weight='regular'>
                            Username
                        </Text>
                        <Input
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className='input-container2'>
                        <Text size='small' color='light-gray' weight='regular'>
                            Last Name
                        </Text>
                        <Input
                            value={lastName}
                            onChange={handleLastNameChange}
                        />

                        <Text size='small' color='light-gray' weight='regular'>
                            Email
                        </Text>
                        <Input value={email} onChange={handleEmailChange} />
                    </div>
                </div>
            </div>
        );
    }
);

export default _EditAccount;
