import React from 'react';
import clsx from 'clsx';
import { ClickableIcon, CheckIcon } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_Checkbox.scss';

const _Checkbox = reactive<Reptile.Props.CheckboxProps>(
    ({ className, style, active, size }, { onClick }) => {
        const handleClick = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (onClick) {
                    onClick(e, !active);
                }
            },
            [onClick, active]
        );

        return (
            <ClickableIcon
                icon={active ? <CheckIcon /> : null}
                style={style}
                onClick={handleClick}
                className={clsx(
                    'rt-checkbox',
                    className,
                    `rt-checkbox-${size ?? 'md'}`
                )}
            />
        );
    }
);

export default _Checkbox;
