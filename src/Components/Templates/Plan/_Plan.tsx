import React from 'react';

import './_Plan.scss';

const _Plan = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.PaymentTemplateProps) => {
    return (
        <div className='rt-plan-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-plan-container'>
                <div className='rt-plan-container'>{content}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _Plan;
