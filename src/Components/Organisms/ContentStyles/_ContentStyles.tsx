import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import {
    AlertTriangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ClickableIcon,
    DropletIcon,
    Edit2Icon,
    FeaturedIcon,
    List,
    Menu,
    ProgressCircle,
    ZapIcon,
} from '@Reptile/Components/Atoms';
import { ListItem, Tooltip } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController, useOutsideClick } from '@Reptile/Hooks';

import './_ContentStyles.scss';

const _ContentStyles = controlled<
    Reptile.Props.ContentStylesProps,
    Reptile.Controllers.IContentStylesController
>(({ className, style, controller }) => {
    useInitController(controller);
    const menuRef = useRef<HTMLDivElement>(null);
    const [headerRef, setHeaderRef] = useState<HTMLLIElement | null>(null);
    const [selectTheme, setSelectTheme] = useState(false);

    useOutsideClick(menuRef, () => {
        setSelectTheme(false);
    });

    const handleSelectThemeClick = useCallback(() => {
        setSelectTheme(true);
        void controller.fetchThemes();
    }, [controller]);

    const handleSelectThemeFinishClick = useCallback(() => {
        setSelectTheme(false);
    }, []);

    return (
        <div className={clsx('rt-content-styles', className)} style={style}>
            <List>
                <ListItem
                    ref={setHeaderRef}
                    className='header-item'
                    text='Theme'
                    supportingText={() =>
                        controller.loading
                            ? 'Loading...'
                            : controller.theme?.name ?? 'No theme selected'
                    }
                    size='lg'
                    leftElement={
                        <FeaturedIcon
                            icon={<ZapIcon />}
                            color='primary'
                            size='sm'
                            type='light-circle-outline'
                        />
                    }
                    header
                    rightElement={
                        <ClickableIcon
                            disabled={() => controller.loading}
                            icon={<ChevronDownIcon />}
                            onClick={handleSelectThemeClick}
                        />
                    }
                />
                {!controller.hideStyles &&
                    (controller.theme?.rules ?? [])
                        .filter(({ name }) => !!name)
                        .map((s, idx) => (
                            <ListItem
                                key={idx}
                                text={s.name}
                                size='lg'
                                rightElement={
                                    <Tooltip title='Apply'>
                                        <ClickableIcon
                                            disabled={() => controller.loading}
                                            icon={<DropletIcon />}
                                            onClick={() => {
                                                controller.applyStyle(s);
                                            }}
                                        />
                                    </Tooltip>
                                }
                            />
                        ))}
                {!controller.hideStyles && !controller.theme?.rules?.length && (
                    <ListItem
                        text={() =>
                            controller.loading
                                ? 'Loading...'
                                : 'No styles available'
                        }
                        supportingText={() =>
                            controller.loading
                                ? undefined
                                : 'Click edit button to add styles'
                        }
                        size='sm'
                        header
                        rightElement={() =>
                            controller.loading ? (
                                <ProgressCircle
                                    variant='indeterminate'
                                    size='xxs'
                                />
                            ) : (
                                <AlertTriangleIcon />
                            )
                        }
                    />
                )}
            </List>
            <Menu
                ref={menuRef}
                className='select-theme-menu'
                anchorEl={headerRef}
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
                transformOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
                open={selectTheme}
                maxHeight={500}
            >
                <ListItem
                    className='header-item'
                    text='Select theme'
                    supportingText={() =>
                        controller.loading
                            ? 'Loading...'
                            : controller.theme?.name ?? 'No theme selected'
                    }
                    size='lg'
                    leftElement={
                        <FeaturedIcon
                            icon={<ZapIcon />}
                            color='primary'
                            size='sm'
                            type='light-circle-outline'
                        />
                    }
                    header
                    rightElement={
                        <ClickableIcon
                            disabled={() => controller.loading}
                            icon={<ChevronUpIcon />}
                            onClick={handleSelectThemeFinishClick}
                        />
                    }
                />
                {controller.loading ? (
                    <ListItem
                        leftElement={
                            <ProgressCircle
                                size='xxs'
                                variant='indeterminate'
                            />
                        }
                        style={{
                            width: headerRef?.clientWidth,
                            overflowX: 'hidden',
                        }}
                    />
                ) : (
                    controller.themes.map((theme) => (
                        <ListItem
                            key={theme.id}
                            text={theme.name}
                            style={{
                                width: headerRef?.clientWidth,
                                overflowX: 'hidden',
                            }}
                            size='lg'
                            rightElement={
                                <Tooltip title='Edit Theme'>
                                    <ClickableIcon
                                        disabled={() => controller.loading}
                                        icon={<Edit2Icon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            controller.requestEditTheme(
                                                theme.id
                                            );
                                        }}
                                    />
                                </Tooltip>
                            }
                            onClick={() => {
                                void controller.fetchThemes(theme.id),
                                    handleSelectThemeFinishClick();
                            }}
                        />
                    ))
                )}
            </Menu>
        </div>
    );
});

export default _ContentStyles;
