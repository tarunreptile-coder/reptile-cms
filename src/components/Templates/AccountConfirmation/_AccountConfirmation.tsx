import React from 'react';

import './_AccountConfirmation.scss';

const _AccountConfirmationTemplate = ({
    accountConfirmation,
}: Reptile.Props.AccountConfirmationTemplateProps) => {
    return (
        <div className='rt-confirmation-page-container'>
            <div className='rt-confirmation-content-container'>
                <div className='rt-main-container'>{accountConfirmation}</div>
            </div>
        </div>
    );
};

export default _AccountConfirmationTemplate;
