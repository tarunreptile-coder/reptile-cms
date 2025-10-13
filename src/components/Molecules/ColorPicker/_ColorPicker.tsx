import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import convert from 'color-convert';
import { HuePicker, SaturationPicker } from '@Reptile/Components/Atoms';
import {
    LabeledHexColorInput,
    LabeledRgbColorInput,
} from '@Reptile/Components/Molecules';
import { HEX, RGB } from 'color-convert/conversions';
import { reactive } from '@Reptile/Framework';

import './_ColorPicker.scss';

const _ColorPicker = reactive<Reptile.Props.ColorPickerProps>(
    ({ className, style, color, alpha }, { onColorPick }) => {
        const [hue, saturation, value] = color;
        const hex = useMemo(() => convert.hsv.hex.raw(color), [color]);
        const rgb = useMemo(() => convert.hsv.rgb.raw(color), [color]);

        const handleSaturationChange = useCallback(
            (saturation: number, value: number) => {
                if (onColorPick) {
                    onColorPick([hue, saturation, value], alpha);
                }
            },
            [hue, onColorPick, alpha]
        );

        const handleHueChange = useCallback(
            (hue: number) => {
                if (onColorPick) {
                    onColorPick([hue, saturation, value], alpha);
                }
            },
            [onColorPick, saturation, value, alpha]
        );

        const handleHexColorChange = useCallback(
            (hex: HEX) => {
                if (onColorPick) {
                    onColorPick(convert.hex.hsv.raw(hex), alpha);
                }
            },
            [onColorPick, alpha]
        );

        const handleRgbColorChange = useCallback(
            (rgb: RGB) => {
                if (onColorPick) {
                    onColorPick(convert.rgb.hsv.raw(rgb), alpha);
                }
            },
            [onColorPick, alpha]
        );

        const handleAlphaChange = useCallback(
            (alpha: number) => {
                if (onColorPick) {
                    onColorPick(convert.rgb.hsv.raw(rgb), alpha);
                }
            },
            [onColorPick, rgb]
        );

        return (
            <div className={clsx('rt-color-picker', className)} style={style}>
                <SaturationPicker
                    className='saturation-picker'
                    hue={hue}
                    saturation={saturation}
                    value={value}
                    onPick={handleSaturationChange}
                />
                <HuePicker
                    className='hue-picker'
                    hue={hue}
                    onHuePick={handleHueChange}
                />
                <LabeledHexColorInput
                    color={hex}
                    alpha={alpha}
                    onColorChange={handleHexColorChange}
                />
                <LabeledRgbColorInput
                    color={rgb}
                    onColorChange={handleRgbColorChange}
                    alpha={alpha}
                    onAlphaChange={handleAlphaChange}
                />
            </div>
        );
    }
);

export default _ColorPicker;
