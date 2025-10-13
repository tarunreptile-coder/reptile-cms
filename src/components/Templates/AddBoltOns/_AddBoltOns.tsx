import React from 'react';

import './_AddBoltOns.scss';

const _AddBoltOns = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.AddBoltOnsTemplateProps) => {
    return (
        <div className='rt-add-bolt-ons-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-add-bolt-ons-container'>
                <div className='rt-add-bolt-ons-container'>{content}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _AddBoltOns;
