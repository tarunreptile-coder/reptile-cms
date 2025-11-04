import React from 'react';
import { Page } from '@Reptile/Components/Atoms';
import { ForgetPasswordCard } from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import { ForgetPasswordController } from '@Reptile/Store/Controllers';
import { ForgetPasswordTemplate } from '@Reptile/Components/Templates';
import { ForgetPasswordRedirect } from '@Reptile/Components/Molecules';

const _ForgetPassword = () => {
    const forgetPasswordController = useController(ForgetPasswordController);

    return (
        <Page>
            <ForgetPasswordTemplate
                leftContent={
                    <ForgetPasswordRedirect
                        controller={forgetPasswordController}
                    />
                }
                rightContent={
                    <ForgetPasswordCard controller={forgetPasswordController} />
                }
            />
        </Page>
    );
};

export default _ForgetPassword;
