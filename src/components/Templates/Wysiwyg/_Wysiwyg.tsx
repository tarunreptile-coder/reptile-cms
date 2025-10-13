import React, { useCallback, useState } from 'react';
import {
    Divider,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
} from '@Reptile/Components/Atoms';

import './_Wysiwyg.scss';

const _Wysiwyg = ({
    header,
    navigationBar,
    content,
    sidebarTitle,
    sidebarTabs,
    sidebarActions,
    treeView,
    helpMenu,
}: Reptile.Props.WysiwygTemplateProps) => {
    const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

    const handleSettingsTabSelect = useCallback(
        (_: React.MouseEvent<HTMLButtonElement>, idx: number) => {
            setSelectedSettingsTab(idx);
        },
        []
    );

    return (
        <div className='rt-wysiwyg-template'>
            <div className='rt-header-container'>{header}</div>

            <div className='rt-treeview-container'>{treeView}</div>
            <div className='rt-content-editor-container'>
                <div className='rt-navbar-container'>{navigationBar}</div>
                <div className='rt-editor-container'>{content}</div>
            </div>
            <div className='rt-sidebar-container'>
                {sidebarTitle}
                <Tabs
                    selectedTabIndex={selectedSettingsTab}
                    onSelect={handleSettingsTabSelect}
                >
                    {sidebarTabs.map((tab) => (
                        <Tab key={tab.title} label={tab.title} />
                    ))}
                </Tabs>
                <TabPanels activeIndex={selectedSettingsTab}>
                    {sidebarTabs.map((tab) => (
                        <TabPanel key={tab.title}>{tab.element}</TabPanel>
                    ))}
                </TabPanels>
                <Divider className='settings-divider' />

                <div className='settings-actions'>{sidebarActions}</div>
            </div>
            <div className='rt-help-sidebar'>{helpMenu}</div>
        </div>
    );
};

export default _Wysiwyg;
