import React from 'react';
import { reactive } from '@Reptile/Framework';
import { EyeIcon, EyeSlashIcon } from '../Icons/_Icons';

import './_ShowHidePassword.scss';

const _ShowHidePassword = reactive<Reptile.Props.ShowHidePasswordProps>(
    ({ visibility }, { handleClick }) => {
        const text = visibility ? 'Hide' : 'Show';
        const icon = visibility ? <EyeSlashIcon /> : <EyeIcon />;

        return (
            <div className='rt-show-hide-password' onClick={handleClick}>
                {icon}
                <div>{text}</div>
            </div>
        );
    }
);

export default _ShowHidePassword;
