import React from 'react';
import { XIcon } from '@Reptile/Components/Atoms';

import './_ConfirmationFail.scss';

const _ConfirmationFail = () => {
  return (
    <div className="rt-account-confirmation">
      <div className="message-container">
        <div className="circle-cross">
          <XIcon />
        </div>
        <div className="thanks-message">Email Verification Failed</div>
        <div className='info-message'>Contact Support</div>
       {/*<div className="login-button">Contact Support</div>*/} 
      </div>
    </div>
  );
};

export default _ConfirmationFail;
