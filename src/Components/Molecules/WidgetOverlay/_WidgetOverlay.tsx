import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CopyIcon, SettingsIcon, Trash2Icon } from '@Reptile/Components/Atoms';
import { DropdownButton, ListItem } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

import './_WidgetOverlay.scss';

const COMPACT_SIZE_THRESHOLD = 52;

const _WidgetOverlay = reactive<Reptile.Props.WidgetOverlayProps>(
    (
        {
            className,
            style,
            id,
            disabled,
            isTop,
            children,
            mode,
            selected,
            isMaxHeight,
        },
        { onSelect, onDelete, onDuplicate }
    ) => {
        const contentRoot = useRef<HTMLDivElement>(null);
        const [contentSize, setContentSize] = useState<'compact' | 'normal'>(
            'normal'
        );
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const handleSelect = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (onSelect) {
                    onSelect(e, id);
                }
            },
            [id, onSelect]
        );

        const handleDuplicate = useCallback(
            (e: React.MouseEvent<HTMLLIElement>) => {
                if (onDuplicate) {
                    onDuplicate(e, id);
                }
            },
            [id, onDuplicate]
        );

        const handleDelete = useCallback(
            (e: React.MouseEvent<HTMLLIElement>) => {
                if (onDelete) {
                    onDelete(e, id);
                }
            },
            [id, onDelete]
        );

        const handleDropdownChange = useCallback((open: boolean) => {
            setDropdownOpen(open);
        }, []);

        useLayoutEffect(() => {
            const rect =
                contentRoot.current?.getBoundingClientRect() as DOMRect;
            if (rect.height < COMPACT_SIZE_THRESHOLD) {
                setContentSize('compact');
            } else {
                setContentSize('normal');
            }
        }, [children]);

        return (
            <div
                className={clsx(
                    'rt-widget-overlay',
                    { active: !disabled },
                    `${mode ?? 'normal'}-mode`,
                    { selected },
                    { 'show-setting': dropdownOpen },
                    { 'top-element': isTop },
                    { 'max-height': isMaxHeight },
                    className
                )}
                style={style}
            >
                <div
                    className={clsx(
                        'rt-widget-overlay-content',
                        { 'max-height': isMaxHeight },
                        className
                    )}
                >
                    <div
                        ref={contentRoot}
                        onClick={disabled ? undefined : handleSelect}
                        className={clsx(
                            { 'max-height': isMaxHeight },
                            className
                        )}
                    >
                        {children}
                    </div>
                    {onDelete && onDuplicate ? (
                        <DropdownButton
                            className={clsx('settings-button', contentSize)}
                            size='xs'
                            color='gray'
                            icon={<SettingsIcon />}
                            variant='contained'
                            open={dropdownOpen}
                            onChange={handleDropdownChange}
                        >
                            <ListItem
                                text='Duplicate'
                                leftElement={<CopyIcon />}
                                onClick={handleDuplicate}
                            />
                            <ListItem
                                text='Delete'
                                leftElement={<Trash2Icon />}
                                onClick={handleDelete}
                            />
                        </DropdownButton>
                    ) : null}
                </div>
            </div>
        );
    }
);

export default _WidgetOverlay;
