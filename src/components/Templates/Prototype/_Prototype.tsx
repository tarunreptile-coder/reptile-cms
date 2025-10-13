import React from 'react';

import './_Prototype.scss';

const _Prototype = ({
    header,
    content,
    sideMenu,
    helpMenu,
}: Reptile.Props.PrototypeTemplateProps) => {
    return (
        <div className='rt-prototype-template'>
            <div className='rt-header-container'>{header}</div>

            <div className='rt-prototype-container'>
                <div className='rt-side-menu-container'>{sideMenu}</div>
                <div className='rt-prototype-content'>{content}</div>
                <div className='rt-help-sidebar'>{helpMenu}</div>
            </div>
        </div>
    );
};

export default _Prototype;
