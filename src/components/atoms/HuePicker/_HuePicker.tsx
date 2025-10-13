import clsx from 'clsx';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Portal } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_HuePicker.scss';

const COLOR_POINTS = [
    { r: 240, g: 0, b: 0, stop: 0 },
    { r: 255, g: 0, b: 94, stop: 0.0469 },
    { r: 252, g: 0, b: 114, stop: 0.047 },
    { r: 234, g: 0, b: 250, stop: 0.0885 },
    { r: 224, g: 0, b: 251, stop: 0.0886 },
    { r: 154, g: 0, b: 255, stop: 0.1302 },
    { r: 49, g: 0, b: 255, stop: 0.1823 },
    { r: 45, g: 1, b: 255, stop: 0.1824 },
    { r: 6, g: 12, b: 255, stop: 0.2344 },
    { r: 4, g: 49, b: 255, stop: 0.2345 },
    { r: 0, g: 124, b: 255, stop: 0.2813 },
    { r: 0, g: 142, b: 255, stop: 0.3333 },
    { r: 34, g: 139, b: 222, stop: 0.3854 },
    { r: 0, g: 219, b: 255, stop: 0.4323 },
    { r: 0, g: 245, b: 255, stop: 0.4792 },
    { r: 0, g: 255, b: 181, stop: 0.5365 },
    { r: 0, g: 255, b: 104, stop: 0.5833 },
    { r: 0, g: 255, b: 34, stop: 0.6406 },
    { r: 42, g: 255, b: 0, stop: 0.6927 },
    { r: 172, g: 255, b: 0, stop: 0.7396 },
    { r: 240, g: 246, b: 0, stop: 0.7865 },
    { r: 255, g: 195, b: 0, stop: 0.8333 },
    { r: 255, g: 129, b: 0, stop: 0.8854 },
    { r: 255, g: 79, b: 0, stop: 0.9479 },
    { r: 255, g: 0, b: 0, stop: 1.0 },
];

const THUMB_RADIUS = 8;

const MAX_HUE_VALUE = 360;

const _HuePicker = reactive<Reptile.Props.HuePicker>(
    ({ style, className, hue }, { onHuePick }) => {
        const line = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const position = Math.min(Math.max(0, hue / MAX_HUE_VALUE), 1);

        const color = useMemo(() => {
            // Subtract position from one due to color points being rotated for 270deg
            const colorPosition = 1 - position;

            const idx = COLOR_POINTS.findIndex(
                (point) => point.stop >= colorPosition
            );
            if (idx === 0) {
                return {
                    r: COLOR_POINTS[0].r,
                    g: COLOR_POINTS[0].g,
                    b: COLOR_POINTS[0].b,
                };
            } else {
                const weight =
                    (colorPosition - COLOR_POINTS[idx - 1].stop) /
                    (COLOR_POINTS[idx].stop - COLOR_POINTS[idx - 1].stop);
                return {
                    r:
                        COLOR_POINTS[idx - 1].r * (1 - weight) +
                        COLOR_POINTS[idx].r * weight,
                    g:
                        COLOR_POINTS[idx - 1].g * (1 - weight) +
                        COLOR_POINTS[idx].g * weight,
                    b:
                        COLOR_POINTS[idx - 1].b * (1 - weight) +
                        COLOR_POINTS[idx].b * weight,
                };
            }
        }, [position]);

        const handleBarClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (onHuePick) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    // Min-Max -> Clamp values between [0, 1]
                    const newPosition = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    onHuePick(newPosition * MAX_HUE_VALUE);
                }
            },
            [onHuePick]
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
                if (onHuePick && isDragging) {
                    const rect =
                        line.current?.getBoundingClientRect() as DOMRect;
                    // Min-Max -> Clamp values between [0, 1]
                    const newPosition = Math.min(
                        1,
                        Math.max(0, (event.clientX - rect.left) / rect.width)
                    );
                    onHuePick(newPosition * MAX_HUE_VALUE);
                }
            },
            [onHuePick, isDragging]
        );

        const handleThumbDragEnd = useCallback(
            (event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragging(false);
            },
            []
        );

        return (
            <div className={clsx('rt-hue-picker', className)} style={style}>
                <div
                    ref={line}
                    className='rt-gradient-line'
                    style={{
                        background: `linear-gradient(270deg, ${COLOR_POINTS.map(
                            (point) =>
                                `rgb(${point.r}, ${point.g}, ${point.b}) ${
                                    point.stop * 100
                                }%`
                        ).join(', ')})`,
                    }}
                    onClick={handleBarClick}
                />
                <div
                    className='rt-picker-thumb'
                    style={{
                        left: `calc(${position * 100}% - ${THUMB_RADIUS}px)`,
                        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    }}
                    onMouseDown={handleThumbDragStart}
                />
                <Portal active={isDragging}>
                    <div
                        className={clsx('rt-hue-picker-thumb-drag-area')}
                        onMouseMove={handleThumbDrag}
                        onMouseUp={handleThumbDragEnd}
                        onMouseOut={handleThumbDragEnd}
                    />
                </Portal>
            </div>
        );
    }
);

export default _HuePicker;
