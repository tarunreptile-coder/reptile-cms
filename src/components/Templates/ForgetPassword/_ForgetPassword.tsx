import React from 'react';

import './_ForgetPassword.scss';

const _ForgetPassword = ({
    leftContent,
    rightContent,
}: Reptile.Props.ForgetPasswordTemplateProps) => {
    return (
        <div className='rt-forget-password-template'>
            <div className='left-container'>{leftContent}</div>
            {rightContent}
        </div>
    );
};

export default _ForgetPassword;
