import React, { useCallback, useEffect } from 'react';
import {
    ConfirmationFail,
    ConfirmationSuccess,
} from '@Reptile/Components/Molecules';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import { ProgressCircle } from '@Reptile/Components/Atoms';
import './_AccountConfirmation.scss';

const _AccountConfirmation = controlled<
    Reptile.Props.AccountConfirmationProps,
    Reptile.Controllers.IAccountConfirmationController
>(({ controller }) => {
    useInitController(controller);

    const location = useLocation();

    const { userId, code, isPartner, isEmailVerified } = queryString.parse(
        location.search
    );

    useEffect(() => {
        void controller.confirmAccount(
            userId,
            code,
            isPartner,
            isEmailVerified
        );
    }, [isPartner, isEmailVerified, controller, userId, code]);

    const navigateToLogin = useCallback(() => {
        controller.navigateToLogin();
    }, [controller]);

    const navigateTobookAMeeting = useCallback(() => {
        controller.navigateTobookAMeeting();
    }, [controller]);

    return (
        <div className='rt-account-confirmation'>
            {controller.status.status === 'initial' ||
            controller.status.status === 'pending' ? (
                <ProgressCircle
                    className={'confirmation-loading'}
                    variant='indeterminate'
                    size='md'
                />
            ) : controller.verified || controller.emailVerified ? (
                <ConfirmationSuccess
                    isPartner={() => controller.partner}
                    isEmailVerified={() => controller.emailVerified}
                    navigateToLogin={navigateToLogin}
                    bookAMeeting={navigateTobookAMeeting}
                />
            ) : (
                <ConfirmationFail />
            )}
        </div>
    );
});

export default _AccountConfirmation;
