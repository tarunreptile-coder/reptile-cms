import React from 'react';
import { reactive } from '@Reptile/Framework';
import { CheckIcon } from '@Reptile/Components/Atoms';

import './_ConfirmationSuccess.scss';

const _ConfirmationSuccess = reactive<Reptile.Props.ConfirmationSuccessProps>(
    ({ isPartner, isEmailVerified }, { navigateToLogin, bookAMeeting }) => {
        if (isPartner || isEmailVerified) {
            return (
                <div className='rt-account-confirmation'>
                    <div className='message-container'>
                        <div className='circle-check'>
                            <CheckIcon />
                        </div>
                        <div className='thanks-message'>
                            Account Confirmation Thanks For Verifying
                        </div>
                        <div className='info-message'>
                            Account Confirmation Partner Message First Row
                            <div>
                                <br></br>
                            </div>
                            <div>
                                Account Confirmation Partner Message Message
                                Second Row
                            </div>
                        </div>
                        <div
                            onClick={bookAMeeting}
                            className='book-a-meeting-button'
                        >
                            Book a Meeting
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='rt-account-confirmation'>
                <div className='message-container'>
                    <div className='circle-check'>
                        <CheckIcon />
                    </div>
                    <div className='thanks-message'>Thanks For Verifying</div>
                    <div className='info-message'>Account Active</div>
                    <div onClick={navigateToLogin} className='login-button'>
                        Login
                    </div>
                </div>
            </div>
        );
    }
);

export default _ConfirmationSuccess;
