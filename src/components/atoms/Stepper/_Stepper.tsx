import { reactive } from '@Reptile/Framework';

import React, { useCallback, useEffect, useState } from 'react';

import './_Stepper.scss';
import { CheckIcon, RefreshIcon, XIcon } from '../Icons/_Icons';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';

const _Stepper = reactive<Reptile.Props.StepperProps>(
    ({ activeStates, steps }, {}) => {
        const [width, setWidth] = useState<string>();

        const progress = useCallback(
            (stepNum: number) => {
                if (activeStates.length > 1 && stepNum <= 5) {
                    const p = Math.min(
                        (stepNum / (activeStates.length - 1)) * 100,
                        100
                    );
                    setWidth(`${p}%`);
                }
            },
            [activeStates.length]
        );

        useEffect(() => {
            const completed = activeStates.filter((state) => {
                return state === 'Completed' ? state : null;
            }).length;

            progress(completed);
        }, [progress, activeStates]);

        const stateIcons: { [key: string]: React.ReactNode } = {
            Completed: <CheckIcon />,
            Failed: <XIcon />,
            Inprogress: <RefreshIcon style={{ width: '70%' }} />,
        };

        return (
            <div className={'stepperDiv'}>
                {activeStates.length > 1 && (
                    <div className={`${'progressBarDiv'} `}>
                        <div className={'progressBarContainer'}>
                            <div className={'stepper-progress'}>
                                <div
                                    className={'percent'}
                                    style={{ width: `${width ? width : 0}` }}
                                ></div>
                            </div>
                            <div className={'steps'}>
                                {activeStates.map((state, id) => {
                                    return state ? (
                                        <Tooltip key={id} title={steps[id]}>
                                            <div
                                                key={id}
                                                className={clsx(
                                                    'step',
                                                    state === 'Completed' &&
                                                        'completed',
                                                    state === 'Queued' &&
                                                        'queued',
                                                    state === 'Inprogress' &&
                                                        'inprogress',
                                                    state === 'Failed' &&
                                                        'failed'
                                                )}
                                            >
                                                {stateIcons[state]}
                                            </div>
                                        </Tooltip>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export default _Stepper;
