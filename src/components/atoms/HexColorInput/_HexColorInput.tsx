import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import * as converter from 'color-convert';
import { Text } from '@Reptile/Components/Atoms';
import { reactiveForwardRef } from '@Reptile/Framework';

import './_HexColorInput.scss';

const _HexColorInput = reactiveForwardRef<
    HTMLDivElement,
    Reptile.Props.HexColorInputProps
>(({ className, style, color, alpha }, { onColorChange, onClick }, ref) => {
    const [value, setValue] = useState(color);

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        []
    );

    const handleFocusChange = useCallback(() => {
        if (onColorChange) {
            onColorChange(value);
        }
    }, [onColorChange, value]);

    useEffect(() => {
        setValue(color);
    }, [color]);

    return (
        <div
            ref={ref}
            className={clsx('rt-hex-color-input', className)}
            style={style}
        >
            <div className={clsx('checkerboard', { clickable: !!onClick })}>
                <div
                    className='color'
                    style={{
                        backgroundColor: `rgba(${converter.hex
                            .rgb(color)
                            .join(',')},${(alpha ?? 100) / 100})`,
                    }}
                    onClick={onClick}
                />
            </div>
            <Text
                color='light-gray'
                weight='regular'
                size='large'
                style={{ backgroundColor: color }}
                inline
            >
                #
            </Text>
            <input
                value={value}
                onChange={handleValueChange}
                maxLength={6}
                type='text'
                onSubmit={handleFocusChange}
                onBlur={handleFocusChange}
            />
        </div>
    );
});

export default _HexColorInput;
