import React from 'react';

import './_MyAccountContent.scss';

const _MyAccountContent = ({
    children,
}: Reptile.Props.MyAccountContentProps) => {
    return <div className='rt-myaccount-container'>{children}</div>;
};

export default _MyAccountContent;
