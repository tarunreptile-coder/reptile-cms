import { CARTOONS } from '@Reptile/Assets';
import { Image, Text } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React from 'react';

import './_ForgetPasswordRedirect.scss';

const _ForgetPasswordRedirect = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IForgetPasswordController
>(({ controller }) => {
    useInitController(controller);

    return (
        <div className='rt-forget-password-redirect'>
            <Image
                src={CARTOONS.SVG_RESET_PASSWORD_CARTOON as string}
                width={'28vw'}
            />
            <div className='redirect-container'>
                <Text color={'black'} className={'forget-password-text'}>
                    Remember Password?
                </Text>
                <span
                    className='redirect'
                    onClick={() => controller.navigateToLoginPage()}
                >
                    Login
                </span>
            </div>
        </div>
    );
});

export default _ForgetPasswordRedirect;
