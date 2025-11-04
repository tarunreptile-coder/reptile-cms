import React from 'react';

import './_Login.scss';

const _Login = ({ image, loginForm }: Reptile.Props.LoginTemplateProps) => {
    return (
        <div className='rt-login-template'>
            <div className='page-art-container'>{image}</div>
            {loginForm}
        </div>
    );
};

export default _Login;
