import clsx from 'clsx';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import * as convert from 'color-convert';
import { Portal } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_SaturationPicker.scss';

const THUMB_RADIUS = 8;

const MAX_SATURATION_VALUE = 100;
const MAX_VALUE_VALUE = 100;

const _SaturationPicker = reactive<Reptile.Props.SaturationPickerProps>(
    ({ style, className, hue, saturation, value }, { onPick }) => {
        const area = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const positionX = Math.min(
            Math.max(0, saturation / MAX_SATURATION_VALUE),
            1
        );
        const positionY = 1 - Math.min(Math.max(0, value / MAX_VALUE_VALUE), 1);

        const handleBarClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (onPick) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    // Min-Max -> Clamp values between [0, 1]
                    const newPositionX = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    const newPositionY =
                        1 -
                        Math.min(
                            1,
                            Math.max(
                                0,
                                (event.clientY - rect.top) / rect.height
                            )
                        );
                    onPick(
                        newPositionX * MAX_SATURATION_VALUE,
                        newPositionY * MAX_VALUE_VALUE
                    );
                }
            },
            [onPick]
        );

        const handleThumbDragStart = useCallback(
            (event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragging(true);
            },
            []
        );

        const handleThumbDrag = useCallback(
            (event: React.DragEvent<HTMLDivElement>) => {
                if (onPick && isDragging) {
                    const rect =
                        area.current?.getBoundingClientRect() as DOMRect;
                    // Min-Max -> Clamp values between [0, 1]
                    const newPositionX = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    const newPositionY =
                        1 -
                        Math.min(
                            1,
                            Math.max(
                                0,
                                (event.clientY - rect.top) / rect.height
                            )
                        );
                    onPick(
                        newPositionX * MAX_SATURATION_VALUE,
                        newPositionY * MAX_VALUE_VALUE
                    );
                }
            },
            [onPick, isDragging]
        );

        const handleThumbDragEnd = useCallback(
            (event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragging(false);
            },
            []
        );

        return (
            <div
                className={clsx('rt-saturation-picker', className)}
                style={style}
            >
                <div
                    ref={area}
                    className='rt-color-layer'
                    style={{
                        background: `rgb(${convert.hsv
                            .rgb([hue, 100, 100])
                            .join(',')})`,
                    }}
                    onClick={handleBarClick}
                />
                <div className='rt-opacity-layer-right' />
                <div className='rt-opacity-layer-top' />
                <div
                    className='rt-picker-thumb'
                    style={{
                        top: `calc(${positionY * 100}% - ${THUMB_RADIUS}px)`,
                        left: `calc(${positionX * 100}% - ${THUMB_RADIUS}px)`,
                        background: `rgb(${convert.hsv
                            .rgb([hue, saturation, value])
                            .join(',')})`,
                    }}
                    onMouseDown={handleThumbDragStart}
                />
                <Portal active={isDragging}>
                    <div
                        className={clsx('rt-saturation-picker-thumb-drag-area')}
                        onMouseMove={handleThumbDrag}
                        onMouseUp={handleThumbDragEnd}
                        onMouseOut={handleThumbDragEnd}
                    />
                </Portal>
            </div>
        );
    }
);

export default _SaturationPicker;
