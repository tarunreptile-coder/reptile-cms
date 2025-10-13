import React from 'react';
import clsx from 'clsx';
import { reactiveForwardRef } from '@Reptile/Framework';

import './_Input.scss';

const _Input = reactiveForwardRef<HTMLDivElement, Reptile.Props.InputProps>(
    (
        {
            className,
            style,
            autoFocus,
            defaultValue,
            name,
            placeholder,
            type,
            value,
            editable,
            disabled,
            leftElement,
            rightElement,
        },
        { onChange, onClick },
        ref
    ) => {
        return (
            <div
                className={clsx([
                    'rt-input',
                    { disabled },
                    { 'left-item': !!leftElement },
                    { 'right-item': !!rightElement },
                    className,
                ])}
                style={style}
                onClick={onClick}
                ref={ref}
            >
                {leftElement}
                <input
                    style={
                        value === 'auto' ? { padding: '10px 0px' } : undefined
                    }
                    autoFocus={autoFocus}
                    defaultValue={defaultValue}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    disabled={!(editable ?? true) || !!disabled}
                />
                {rightElement}
            </div>
        );
    }
);

export default _Input;
