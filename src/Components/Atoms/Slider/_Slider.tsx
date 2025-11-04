import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { Portal, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_Slider.scss';

const THUMB_RADIUS = 8;

const _Slider = reactive<Reptile.Props.SliderProps>(
    ({ className, minValue, maxValue, value, style }, { onSliderPick }) => {
        const thumb = useRef<HTMLDivElement>(null);
        const line = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const position = Math.min(Math.max(minValue ?? 0, value / maxValue), 1);

        const handleBarClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (onSliderPick) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    // Min-Max -> Clamp values between [0, 1]
                    const newPosition = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    onSliderPick(Math.round(newPosition * maxValue));
                }
            },
            [onSliderPick, maxValue]
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
                if (onSliderPick && isDragging) {
                    const rect =
                        line.current?.getBoundingClientRect() as DOMRect;
                    // Min-Max -> Clamp values between [0, 1]
                    const newPosition = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    onSliderPick(Math.round(newPosition * maxValue));
                }
            },
            [onSliderPick, maxValue, isDragging]
        );

        const handleThumbDragEnd = useCallback(
            (event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragging(false);
            },
            []
        );

        return (
            <div className={clsx('rt-slider', className)} style={style}>
                <div
                    ref={line}
                    className='rt-slider-line'
                    onClick={handleBarClick}
                />
                <div
                    className='rt-selected-range'
                    style={{
                        width: `${position * 100}%`,
                    }}
                />
                <div
                    className='rt-slider-thumb-container'
                    ref={thumb}
                    style={{
                        left: `calc(${position * 100}% - ${
                            THUMB_RADIUS / 2
                        }px)`,
                    }}
                >
                    <div
                        className='rt-slider-thumb'
                        onMouseDown={handleThumbDragStart}
                    />
                    <Text
                        size='medium'
                        color='gray'
                        style={{
                            top: '32px',
                        }}
                    >
                        {value.toString()}
                    </Text>
                </div>
                <Portal active={isDragging}>
                    <div
                        className={clsx('rt-slider-thumb-drag-area')}
                        onMouseMove={handleThumbDrag}
                        onMouseUp={handleThumbDragEnd}
                        onMouseOut={handleThumbDragEnd}
                    />
                </Portal>
            </div>
        );
    }
);

export default _Slider;
