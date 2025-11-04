import React from 'react';
import { Page } from '@Reptile/Components/Atoms';
import { ResetPasswordCard } from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import { ResetPasswordController } from '@Reptile/Store/Controllers';
import { ResetPasswordTemplate } from '@Reptile/Components/Templates';
import { ResetPasswordRedirect } from '@Reptile/Components/Molecules';

const _ResetPassword = () => {
    const resetPasswordController = useController(ResetPasswordController);

    return (
        <Page>
            <ResetPasswordTemplate
                leftContent={
                    <ResetPasswordRedirect
                        controller={resetPasswordController}
                    />
                }
                rightContent={
                    <ResetPasswordCard controller={resetPasswordController} />
                }
            />
        </Page>
    );
};

export default _ResetPassword;
