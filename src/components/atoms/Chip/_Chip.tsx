import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { XIcon } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_Chip.scss';

const INPUT_TEXT_PADDING = 4;

const _Chip = reactive<Reptile.Props.ChipProps>(
    (
        { className, style, disabled, editable, value },
        { onChange, onClose, onEmptyBlur }
    ) => {
        const hiddenText = useRef<HTMLDivElement>(null);
        const [privateValue, setPrivateValue] = useState(value ?? '');
        const [textWidth, setTextWidth] = useState(0);

        useEffect(() => {
            setPrivateValue(value ?? '');
        }, [value]);

        useEffect(() => {
            setTextWidth(hiddenText.current?.offsetWidth ?? 0);
        }, [privateValue]);

        const handleInputChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (onChange) {
                    onChange(event);
                } else {
                    setPrivateValue(event.target.value);
                }
            },
            [onChange]
        );

        const handleInputBlur = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                if (onEmptyBlur && !privateValue) {
                    onEmptyBlur(event);
                }
            },
            [onEmptyBlur, privateValue]
        );

        return (
            <div className={clsx('rt-chip', className)} style={style}>
                <div
                    ref={hiddenText}
                    className={clsx('text', 'text-width-calc')}
                >
                    {privateValue}
                </div>
                <input
                    style={{
                        width:
                            textWidth === 0
                                ? '1ch'
                                : `${textWidth + INPUT_TEXT_PADDING}px`,
                    }}
                    autoFocus={editable && !value}
                    className='text'
                    disabled={!editable || disabled}
                    value={privateValue}
                    onChange={handleInputChange}
                    type='text'
                    onBlur={handleInputBlur}
                />
                <button className='close-button' onClick={onClose}>
                    <XIcon />
                </button>
            </div>
        );
    }
);

export default _Chip;
