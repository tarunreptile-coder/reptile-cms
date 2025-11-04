import React from 'react';
import { Page } from '@Reptile/Components/Atoms';
import { RegisterTemplate } from '@Reptile/Components/Templates';
import { LOGOS } from '@Reptile/Assets';
import {
    RegisterCard,
    RegisterDescription,
} from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import { RegistrationController } from '@Reptile/Store/Controllers';

const _Register = () => {
    const registerController = useController(RegistrationController);

    return (
        <Page>
            <RegisterTemplate
                header={<LOGOS.SVG_MAIN_LOGO />}
                registerCard={<RegisterCard controller={registerController} />}
                registerDescription={<RegisterDescription />}
            />
        </Page>
    );
};

export default _Register;
