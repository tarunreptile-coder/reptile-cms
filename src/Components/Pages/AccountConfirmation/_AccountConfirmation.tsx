import React from 'react';
import { Page } from '@Reptile/Components/Atoms';
import { AccountConfirmation } from '@Reptile/Components/Organisms';
import { AccountConfirmationTemplate } from '@Reptile/Components/Templates';
import { useController } from '@Reptile/Hooks';
import { AccountConfirmationController } from '@Reptile/Store/Controllers';

const _Register = () => {
    const accountConfirmationController = useController(
        AccountConfirmationController
    );

    return (
        <Page>
            <AccountConfirmationTemplate
                accountConfirmation={
                    <AccountConfirmation
                        controller={accountConfirmationController}
                    />
                }
            />
        </Page>
    );
};

export default _Register;
