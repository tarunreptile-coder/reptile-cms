import React from 'react';
import { Divider } from '@Reptile/Components/Atoms';

import './_TemplateBuilder.scss';

const _TemplateBuilder = ({
    header,
    sideMenu,
    treeView,
    body,
    sidePanel,
    helpMenu,
}: Reptile.Props.TemplateBuilderTemplateProps) => {
    return (
        <div className='rt-template-builder-container template-builder-page'>
            <div className='rt-header-container'>
                {header}
                <Divider />
            </div>
            <div className='rt_template_panel'>
            <div className='rt-side-menu-container hide-on-design'>{sideMenu}</div>
                <div className='rt-side-container'>
                    <Divider type='vertical' />
                    <div className='rt-treeview-container'>{treeView}</div>
                </div>

                <div className='rt-template-container'>{body}</div>

                <div className='rt-widget-sidebar'>{sidePanel}</div>

                <div className='rt-help-sidebar'>{helpMenu}</div>
            </div>
        </div>
    );
};

export default _TemplateBuilder;
