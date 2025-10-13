import React from 'react';

import './_Register.scss';

const _Register = ({
  header,
  registerDescription,
  registerCard,
}: Reptile.Props.RegisterTemplateProps) => {
  return (
    <div className='rt-register-template'>
      <div className='rt-header-container'>
        <div>{header}</div>
      </div>
      <div className='rt-register-content-container'>
        <div className='rt-main-container'>
          {registerDescription}
          {registerCard}
        </div>
      </div>
    </div>
  );
};

export default _Register;
