import React from 'react';
import {
    NavigationSideMenu,
    SettingsSideMenu,
    TreeViewSideMenu,
} from '@Reptile/Components/Molecules';

import './_SideMenuLayout.scss';

const _SideMenuLayout = () => {
    return (
        <div className='rt-side-menu-layout'>
            <NavigationSideMenu />
            {/* <SettingsSideMenu />
            <TreeViewSideMenu /> */}
        </div>
    );
};

export default _SideMenuLayout;
