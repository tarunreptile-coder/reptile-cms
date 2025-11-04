import React from 'react';

import './_AccountSettings.scss';

const _AccountSettings = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.AccountSettingsTemplateProps) => {
    return (
        <div className='rt-account-settings-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-accounts-container'>
                <div className='rt-accounts-container'>{content}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _AccountSettings;
