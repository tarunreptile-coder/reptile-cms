import React from 'react';

import './_ResetPassword.scss';

const _ResetPassword = ({
    leftContent,
    rightContent,
}: Reptile.Props.ResetPasswordTemplateProps) => {
    return (
        <div className='rt-reset-password-template'>
            <div className='left-container'>{leftContent}</div>
            {rightContent}
        </div>
    );
};

export default _ResetPassword;
