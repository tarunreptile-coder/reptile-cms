import React from 'react';
import { Image, Page } from '@Reptile/Components/Atoms';
import { LoginCard } from '@Reptile/Components/Organisms';
import { useController } from '@Reptile/Hooks';
import { LoginController } from '@Reptile/Store/Controllers';
import { LoginTemplate } from '@Reptile/Components/Templates';
import { CARTOONS } from '@Reptile/Assets';

const _Login = () => {
    const loginController = useController(LoginController);

    return (
        <Page>
            <LoginTemplate
                image={
                    <Image
                        src={CARTOONS.SVG_LOGIN_CARTOON as string}
                        width={'28vw'}
                    />
                }
                loginForm={<LoginCard controller={loginController} />}
            />
        </Page>
    );
};

export default _Login;
