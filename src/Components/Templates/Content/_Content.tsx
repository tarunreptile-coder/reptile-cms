import React from 'react';

import './_Content.scss';

const _Content = ({
    header,
    content,
    navbarMain,
    navbarActions,
    sideMenu,
    helpMenu,
}: Reptile.Props.ContentTemplateProps) => {
    return (
        <div className='rt-content-template'>
            <div className='rt-header-container'>{header}</div>
            <div className='rt-side-menu-container'>{sideMenu}</div>
            <div className='rt-content-container'>
                <div className='rt-navbar-container theme-subheader-mobile content-mobile'>
                    {navbarMain}
                    <div className='rt-navbar-actions'>
                        <div className='rt-navbar-row'>{navbarActions}</div>
                    </div>
                </div>

                <div className='rt-content-entities-container content-mobile'>{content}</div>

                <div className='rt-help-sidebar'>{helpMenu}</div>
            </div>
        </div>
    );
};

export default _Content;
