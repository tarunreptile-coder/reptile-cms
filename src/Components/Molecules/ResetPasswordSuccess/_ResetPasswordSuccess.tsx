import {
    Button,
    CheckIcon,
    FeaturedIcon,
    Separator,
    Text,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_ResetPasswordSuccess.scss';

const _ResetPasswordSuccess = reactive<Reptile.Props.ResetPasswordSuccessProps>(
    ({}, { navigateToLogin }) => {
        return (
            <div className='rt-reset-password-success-container'>
                <FeaturedIcon
                    size='lg'
                    type='light-circle-outline'
                    color='primary'
                    icon={<CheckIcon />}
                />
                <Text color={'black'} weight={'bold'} size={'extra-large'}>
                    Successful password reset!
                </Text>
                <Text color={'black'}>
                    You can now use your new password to log in to your account!
                </Text>
                <Button
                    onClick={() => navigateToLogin()}
                    variant={'contained'}
                    color={'primary'}
                >
                    Log In
                </Button>
                <Separator bottom={20} />
            </div>
        );
    }
);

export default _ResetPasswordSuccess;
