import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, HexColorInput, Menu } from '@Reptile/Components/Atoms';
import { ColorPicker } from '@Reptile/Components/Molecules';
import { useOutsideClick } from '@Reptile/Hooks';
import { HEX } from 'color-convert/conversions';
import * as convert from 'color-convert';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_DropdownColorPicker.scss';

const _DropdownColorPicker = reactive<Reptile.Props.DropdownColorPickerProps>(
    (
        { className, style, alpha, open },
        { color, onColorPick, onColorReset, onOpen, onClose }
    ) => {
        const hexInput = useRef<HTMLDivElement>(null);
        const menu = useRef<HTMLDivElement>(null);
        const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);

        useLayoutEffect(() => {
            setAnchor(hexInput.current);
        }, []);

        const handleShow = useCallback(() => {
            if (!open && onOpen) {
                onOpen();
            } else if (onClose) {
                onClose();
            }
        }, [onOpen, onClose, open]);

        const handleColorChange = useCallback(
            (color: HEX) => {
                if (onColorPick) {
                    const hsv = convert.hex.hsv.raw(color);
                    onColorPick(hsv, alpha);
                }
            },
            [onColorPick, alpha]
        );

        const handleClickOut = useCallback(() => {
            if (onClose) {
                onClose();
            }
        }, [onClose]);

        useOutsideClick([hexInput, menu], handleClickOut);

        return (
            <>
                <HexColorInput
                    ref={hexInput}
                    className={className}
                    style={style}
                    onClick={handleShow}
                    color={() => convert.hsv.hex(reactiveValue(color))}
                    alpha={alpha}
                    onColorChange={handleColorChange}
                />
                <Menu
                    ref={menu}
                    className='rt-dropdown-color-picker-menu'
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
                    distance={8}
                >
                    <ColorPicker
                        alpha={alpha}
                        color={color}
                        onColorPick={onColorPick}
                    />
                    <div className='button-container'>
                        <Button
                            onClick={() => onColorReset()}
                            className={'reset-color'}
                        >
                            Reset
                        </Button>
                    </div>
                </Menu>
            </>
        );
    }
);

export default _DropdownColorPicker;
