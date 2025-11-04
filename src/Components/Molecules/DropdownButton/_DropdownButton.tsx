import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import { Button, Menu } from '@Reptile/Components/Atoms';
import { useOutsideClick } from '@Reptile/Hooks';
import { reactive } from '@Reptile/Framework';

import './_DropdownButton.scss';

const safeNegative = (num?: number) => (num ? -num : undefined);

const _DropdownButton = reactive<Reptile.Props.DropdownButtonProps>(
    (
        { className, label, children, dropDirection, offset },
        {
            open,
            style,
            color,
            disabled,
            icon,
            iconPosition,
            size,
            variant,
            onChange,
            onClick,
            onMouseEnter,
            onMouseLeave,
        }
    ) => {
        const menu = useRef<HTMLDivElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [internalOpen, setInternalOpen] = useState(false);
        const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

        useLayoutEffect(() => {
            setAnchor(buttonRef.current);
        }, []);

        const handleClickIn = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                setInternalOpen((o) => !o);
                if (onClick) {
                    onClick(e);
                }
            },
            [onClick]
        );

        const handleClickOut = useCallback(() => {
            setInternalOpen(false);
        }, []);

        useOutsideClick([buttonRef, menu], handleClickOut);

        const items = useMemo(
            () =>
                React.Children.toArray(children).map((item, index) =>
                    React.cloneElement(item as React.ReactElement, {
                        key: index,
                        onClick: (e: React.MouseEvent<HTMLLIElement>) => {
                            setInternalOpen(false);
                            const onItemClick = (
                                item as React.ReactElement<Reptile.Props.ListItemProps>
                            ).props.onClick;
                            if (onItemClick) {
                                onItemClick(e);
                            }
                        },
                        size: 'lg',
                    })
                ),
            [children]
        );

        useEffect(() => {
            if (onChange) {
                onChange(internalOpen);
            }
        }, [onChange, internalOpen]);

        return (
            <>
                <Button
                    ref={buttonRef}
                    className={clsx('rt-dropdown-button', className)}
                    onClick={handleClickIn}
                    style={style}
                    color={color}
                    disabled={disabled}
                    icon={icon}
                    iconPosition={iconPosition}
                    size={size}
                    variant={variant}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {label}
                </Button>
                <Menu
                    ref={menu}
                    className={clsx('rt-dropdown-button-menu')}
                    style={{
                        marginBottom:
                            dropDirection === 'up'
                                ? undefined
                                : safeNegative(offset),
                        marginTop:
                            dropDirection === 'up'
                                ? safeNegative(offset)
                                : undefined,
                    }}
                    anchorEl={anchor}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: dropDirection === 'up' ? 'top' : 'bottom',
                    }}
                    transformOrigin={{
                        horizontal: 'left',
                        vertical: dropDirection === 'up' ? 'bottom' : 'top',
                    }}
                    open={open === undefined ? internalOpen : open}
                >
                    {items}
                </Menu>
            </>
        );
    }
);

export default _DropdownButton;
