import clsx from 'clsx';
import React, { useCallback } from 'react';
import {
    Button,
    PenToolIcon,
    HomeIcon,
    ListIcon,
    RocketIcon,
    SettingsIcon,
} from '@Reptile/Components/Atoms';

import './_SidebarNavigation.scss';

const _SidebarNavigation = ({
    style,
    className,
    selected,
    onClick,
}: Reptile.Props.SidebarNavigationProps) => {
    const handleHomeClick = useCallback(() => {
        if (onClick) {
            onClick('home');
        }
    }, [onClick]);

    const handleSetupClick = useCallback(() => {
        if (onClick) {
            onClick('setup');
        }
    }, [onClick]);

    const handleLaunchClick = useCallback(() => {
        if (onClick) {
            onClick('launch');
        }
    }, [onClick]);

    return (
        <div style={style} className={clsx('rt-sidebar-navigation', className)}>
            {selected === 'home' ? (
                <Button
                    icon={<PenToolIcon />}
                    variant='outlined'
                    color='primary'
                />
            ) : (
                <Button
                    icon={<HomeIcon />}
                    variant='link'
                    onClick={handleHomeClick}
                />
            )}
            {selected === 'setup' ? (
                <Button
                    icon={<ListIcon />}
                    variant='outlined'
                    color='primary'
                />
            ) : (
                <Button
                    icon={<ListIcon />}
                    variant='link'
                    onClick={handleSetupClick}
                />
            )}
            <div className='button-spacing' />
            {selected === 'launch' ? (
                <Button
                    icon={<SettingsIcon />}
                    variant='outlined'
                    color='primary'
                />
            ) : (
                <Button
                    icon={<RocketIcon />}
                    variant='link'
                    onClick={handleLaunchClick}
                />
            )}
        </div>
    );
};

export default _SidebarNavigation;
