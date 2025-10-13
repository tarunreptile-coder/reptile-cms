import React, { useCallback } from 'react';
import clsx from 'clsx';
import { controlled, reactive, reactiveValue } from '@Reptile/Framework';
import { Text, Toggle } from '@Reptile/Components/Atoms';
import { InputField } from '@Reptile/Components/Molecules';

import './_SpacingProperty.scss';

type SpacingValue = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};

type BasicOptionsType = {
    value: number;
    handleChange: (newValue: number) => void;
};

type AdvancedOptionsType = {
    value: SpacingValue;
    handleChange: (newValue: SpacingValue) => void;
};

const AdvancedOptions = reactive<AdvancedOptionsType>(
    ({}, { value, handleChange }) => {
        return (
            <>
                <InputField
                    label='Top'
                    value={() => reactiveValue(value).top.toString()}
                    onChange={(e) =>
                        handleChange({
                            ...reactiveValue(value),
                            top: Number.parseInt(e.target.value),
                        })
                    }
                    type='number'
                />
                <InputField
                    label='Bottom'
                    value={() => reactiveValue(value).bottom.toString()}
                    onChange={(e) =>
                        handleChange({
                            ...reactiveValue(value),
                            bottom: Number.parseInt(e.target.value),
                        })
                    }
                    type='number'
                />
                <InputField
                    label='Left'
                    value={() => reactiveValue(value).left.toString()}
                    onChange={(e) =>
                        handleChange({
                            ...reactiveValue(value),
                            left: Number.parseInt(e.target.value),
                        })
                    }
                    type='number'
                />
                <InputField
                    label='Right'
                    value={() => reactiveValue(value).right.toString()}
                    onChange={(e) =>
                        handleChange({
                            ...reactiveValue(value),
                            right: Number.parseInt(e.target.value),
                        })
                    }
                    type='number'
                />
            </>
        );
    }
);

const BasicOptions = reactive<BasicOptionsType>(
    ({}, { value, handleChange }) => {
        return (
            <InputField
                label='All sides'
                value={() => reactiveValue(value).toString()}
                onChange={(e) => handleChange(Number.parseInt(e.target.value))}
                type='number'
            />
        );
    }
);

const _SpacingProperty = controlled<
    Reptile.Props.SpacingPropertyProps,
    Reptile.Controllers.ISpacingPropertyController
>(({ style, className, controller }) => {
    const handleChange = useCallback(
        (newValue: number | SpacingValue) => {
            controller.value = newValue;
        },
        [controller]
    );

    const handleToggleChange = useCallback(() => {
        controller.advanced = !controller.advanced;
    }, [controller]);

    return (
        <div className={clsx('rt-spacing-property', className)} style={style}>
            <div className='rt-spacing-property-header'>
                <Text size='medium' color='black' weight='regular'>
                    {() =>
                        `${controller.label} (${
                            controller.advanced ? 'Advanced' : 'Basic'
                        })`
                    }
                </Text>
                <Toggle
                    active={() => controller.advanced}
                    onClick={handleToggleChange}
                    className='rt-options-toggle'
                />
            </div>
            {controller.advanced ? (
                <AdvancedOptions
                    value={() => controller.value as SpacingValue}
                    handleChange={handleChange}
                />
            ) : (
                <BasicOptions
                    value={() => controller.value as number}
                    handleChange={handleChange}
                />
            )}
        </div>
    );
});

export default _SpacingProperty;
