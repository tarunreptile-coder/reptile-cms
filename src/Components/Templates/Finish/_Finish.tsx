import React from 'react';

import './_Finish.scss';

const _Finish = ({
    header,
    content,
    sideMenu,
    helpMenu,
}: Reptile.Props.PrototypeTemplateProps) => {
    return (
        <div className='rt-finish-template'>
            <div className='rt-header-container'>{header}</div>

            <div className='rt-finish-container'>
                <div className='rt-side-menu-container'>{sideMenu}</div>
                <div className='rt-finish-content'>{content}</div>
                <div className='rt-help-sidebar'>{helpMenu}</div>
            </div>
        </div>
    );
};

export default _Finish;
