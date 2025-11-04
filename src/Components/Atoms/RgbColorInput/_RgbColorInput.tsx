import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_RgbColorInput.scss';

const _RgbColorInput = reactive<Reptile.Props.RgbColorInputProps>(({
    className,
    style,
    color,
    alpha,
}, {
    onColorChange,
    onAlphaChange,
}) => {
    const [red, green, blue] = color;
    const [internalRed, setInternalRed] = useState(red);
    const [internalGreen, setInternalGreen] = useState(green);
    const [internalBlue, setInternalBlue] = useState(blue);
    const [internalAlpha, setInternalAlpha] = useState(alpha);

    const handleRedComponentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newRed = Number.parseInt(e.target.value);
        setInternalRed(Number.isNaN(newRed) ? 0 : Math.max(Math.min(255, newRed), 0));
    }, []);

    const handleGreenComponentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newGreen = Number.parseInt(e.target.value);
        setInternalGreen(Number.isNaN(newGreen) ? 0 : Math.max(Math.min(255, newGreen), 0));
    }, []);

    const handleBlueComponentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newBlue = Number.parseInt(e.target.value);
        setInternalBlue(Number.isNaN(newBlue) ? 0 : Math.max(Math.min(255, newBlue), 0));
    }, []);

    const handleAlphaComponentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newAlpha = Number.parseInt(e.target.value);
        setInternalAlpha(Number.isNaN(newAlpha) ? 0 : Math.max(Math.min(100, newAlpha), 0));
    }, []);

    const handleColorFocusChange = useCallback(() => {
        if (onColorChange) {
            onColorChange([internalRed, internalGreen, internalBlue]);
        }
    }, [onColorChange, internalRed, internalGreen, internalBlue]);

    const handleColorAlphaChange = useCallback(() => {
        if (onAlphaChange) {
            onAlphaChange(internalAlpha ?? 100);
        }
    }, [onAlphaChange, internalAlpha]);

    useEffect(() => {
        setInternalRed(red);
        setInternalGreen(green);
        setInternalBlue(blue);
        setInternalAlpha(alpha);
    }, [red, green, blue, alpha]);

    return (
        <div className={clsx('rt-rgb-color-input', className)} style={style}>
            <input
                value={internalRed.toFixed(0)}
                onChange={handleRedComponentChange}
                maxLength={3}
                type="number"
                onSubmit={handleColorFocusChange}
                onBlur={handleColorFocusChange}
                max={255}
                min={0}
            />
            <input
                value={internalGreen.toFixed(0)}
                onChange={handleGreenComponentChange}
                maxLength={3}
                type="number"
                onSubmit={handleColorFocusChange}
                onBlur={handleColorFocusChange}
                max={255}
                min={0}
            />
            <input
                value={internalBlue.toFixed(0)}
                onChange={handleBlueComponentChange}
                maxLength={3}
                type="number"
                onSubmit={handleColorFocusChange}
                onBlur={handleColorFocusChange}
                max={255}
                min={0}
            />
            {internalAlpha !== undefined && (
                <span className={clsx('percentage', {
                    'one-char': internalAlpha.toFixed(0).length === 1,
                    'two-char': internalAlpha.toFixed(0).length === 2,
                    'three-char': internalAlpha.toFixed(0).length === 3,
                })}>
                    <input
                        value={internalAlpha.toFixed(0)}
                        onChange={handleAlphaComponentChange}
                        maxLength={3}
                        type="number"
                        accept=''
                        onSubmit={handleColorAlphaChange}
                        onBlur={handleColorAlphaChange}
                        max={100}
                        min={0}
                    />
                </span>
            )}
        </div>
    );
});

export default _RgbColorInput;
