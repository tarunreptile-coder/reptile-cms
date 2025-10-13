import React from 'react';
import './_AccountsFooter.scss';
import { reactive } from '@Reptile/Framework';

const _AccountsFooter = reactive<Reptile.Props.AccountsFooterProps>(({children},{}) => {
    return (
        <div className='rt-footer-container'>
            {children}
        </div>
    );
});

export default _AccountsFooter;
