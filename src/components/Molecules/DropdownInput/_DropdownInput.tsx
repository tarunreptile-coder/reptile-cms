import clsx from 'clsx';
import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    CheckIcon,
    ChevronDownIcon,
    Input,
    Menu,
} from '@Reptile/Components/Atoms';
import { useOutsideClick } from '@Reptile/Hooks';
import { reactive } from '@Reptile/Framework';

import './_DropdownInput.scss';

const _DropdownInput = reactive<Reptile.Props.DropdownInputProps>(
    (
        { className, style, selectedIndex, disabled, children },
        { value, name, label, leftElement, onChange }
    ) => {
        const inputRef = useRef<HTMLDivElement>(null);
        const menu = useRef<HTMLDivElement>(null);
        const [open, setOpen] = useState(false);
        const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
        const [width, setWidth] = useState(100);

        useLayoutEffect(() => {
            setAnchor(inputRef.current);
            setWidth(inputRef.current?.offsetWidth ?? 0);
        }, []);

        const handleClickIn = useCallback(() => {
            setOpen((o) => (disabled ? o : !o));
        }, [disabled]);

        const handleClickOut = useCallback(() => {
            setOpen(false);
        }, []);

        useOutsideClick([inputRef, menu], handleClickOut);

        const items = useMemo(
            () =>
                React.Children.toArray(children).map((item, index) =>
                    React.cloneElement(item as React.ReactElement, {
                        key: index,
                        className: clsx({ selected: index === selectedIndex }),
                        onClick: (e: React.MouseEvent<HTMLLIElement>) => {
                            setOpen(false);
                            if (onChange) {
                                onChange(e, index);
                            }
                        },
                        rightElement:
                            index === selectedIndex ? <CheckIcon /> : undefined,
                        size: 'lg',
                    })
                ),
            [children, selectedIndex, onChange]
        );

        return (
            <div className={clsx('rt-dropdown-input', { open }, className)}>
                <Input
                    ref={inputRef}
                    style={style}
                    name={name}
                    editable={false}
                    placeholder={label}
                    value={value}
                    onChange={() => {
                        /* Do nothing. Select will handle the change */
                    }}
                    leftElement={leftElement}
                    rightElement={
                        <ChevronDownIcon
                            className={clsx('rt-icon', 'rt-dropdown-icon')}
                        />
                    }
                    onClick={handleClickIn}
                    disabled={disabled}
                />
                <Menu
                    ref={menu}
                    style={{ width }}
                    className={clsx('rt-dropdown-input-menu')}
                    anchorEl={anchor}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
                    }}
                    transformOrigin={{
                        horizontal: 'left',
                        vertical: 'top',
                    }}
                    open={open}
                >
                    {items}
                </Menu>
            </div>
        );
    }
);

export default _DropdownInput;
