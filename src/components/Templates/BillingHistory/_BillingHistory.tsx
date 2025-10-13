import React from 'react';

import './_BillingHistory.scss';

const _BillingHistory = ({
    header,
    content,
    sideMenu,
    helpMenu
}: Reptile.Props.BillingHistoryTemplateProps) => {
    return (
        <div className='rt-billing-history-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>

                <div className='rt-billing-history-container'>{content}</div>

            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _BillingHistory;
