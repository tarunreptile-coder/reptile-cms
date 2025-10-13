import React from 'react';
import { Text } from '@Reptile/Components/Atoms';

import './_RegisterSuccessMessage.scss';

const _RegisterSuccessMessage = () => {
    return (
        <div className='rt-thank-you-step'>
            <span className='thanks-sign-up'>Thanks for signing up!</span>

            <Text color='black' weight='medium' size='h2'>
                You will receive an email shortly to verify your email address.
            </Text>
        </div>
    );
};

export default _RegisterSuccessMessage;
