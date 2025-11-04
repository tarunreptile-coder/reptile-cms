import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_ProgressCircle.scss'

const mapSizeToCircle = {
    xxs: {
        cx: '16',
        cy: '16',
        r: '12'
    },
    xs: {
        cx: '32',
        cy: '32',
        r: '26'
    },
    sm: {
        cx: '80',
        cy: '80',
        r: '64'
    },
    md: {
        cx: '90',
        cy: '90',
        r: '70'
    },
    lg: {
        cx: '120',
        cy: '120',
        r: '96'
    },
    xl: {
        cx: '140',
        cy: '140',
        r: '112'
    }
}

const _ProgressCircle = reactive<Reptile.Props.ProgressCircleProps>(({
    className,
    style,
    size,
    progress,
    variant,
}) => {
    return (
        <div
            className={clsx(
                'rt-progress-circle',
                `size-${size ?? 'xxs'}`,
                className,
            )}
            style={style}
        >
            <svg className={variant ?? 'indeterminate'}>
                <circle
                    className={clsx('track', `size-${size ?? 'xxs'}`)}
                    {...mapSizeToCircle[size ?? 'xxs']}
                />
                <circle
                    className={clsx('progress', `size-${size ?? 'xxs'}`, variant ?? 'indeterminate')}
                    style={{
                        strokeDashoffset: Math.PI * parseInt(mapSizeToCircle[size ?? 'xxs'].r) * 2 * (1 - Math.min(Math.max(0, progress ?? 0.25), 1)),
                    }}
                    {...mapSizeToCircle[size ?? 'xxs']}
                />
            </svg>
        </div>
    )
});

export default _ProgressCircle;
