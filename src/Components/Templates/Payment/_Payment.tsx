import React from 'react';

import './_Payment.scss';

const _Payment = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.PaymentTemplateProps) => {
    return (
        <div className='rt-payments-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-payments-container'>
                <div className='rt-payments-container'>{content}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _Payment;
