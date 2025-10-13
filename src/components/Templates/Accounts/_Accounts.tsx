import React from 'react';

import './_Accounts.scss';

const _Accounts = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.AccountTemplateProps) => {
    return (
        <div className='rt-accounts-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-accounts-container'>
                <div className='rt-accounts-container'>{content}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _Accounts;
