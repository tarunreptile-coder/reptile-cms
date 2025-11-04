import React from 'react';
import clsx from 'clsx';
import {
    Button,
    CheckIcon,
    ErrorIcon,
    FeaturedIcon,
    FolderPlusIcon,
    ProgressCircle,
    Text,
    XIcon,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_ProjectCreateProgress.scss';

const _ProjectCreateProgress =
    reactive<Reptile.Props.ProjectCreateProgressProps>(
        ({ className, style, loading, error }, { onHide }) => {

            return (
                <div
                    className={clsx('rt-project-create-progress', className)}
                    style={style}
                >
                    <FeaturedIcon
                        icon={<FolderPlusIcon />}
                        size='lg'
                        type='light-circle-outline'
                        color='primary'
                    />
                    <Button
                        className='close-btn'
                        icon={<XIcon />}
                        color='gray'
                        variant='text'
                        size='sm'
                        onClick={onHide}
                    />
                    <div className='title'>
                        <Text color='dark-gray' size='large' weight='semibold'>
                            New Project
                        </Text>
                        <Text color='light-gray' weight='regular' size='small'>
                            You can close this window and continue working while
                            we finish creating your project.
                        </Text>
                    </div>
                    {loading ? (
                        <div className='progress-container'>
                            <ProgressCircle variant='indeterminate' size='md' />
                            <Text
                                color='light-gray'
                                size='medium'
                                weight='semibold'
                            >
                                Inserting content into your project...
                            </Text>
                            <Text
                                color='light-gray'
                                weight='regular'
                                size='small'
                            >
                                This should take about 30 seconds...
                            </Text>
                        </div>
                    ) : error !== 'error' ? (
                        <div className='progress-container'>
                            <div className='indicator-container'>
                                <ProgressCircle
                                    variant='determinate'
                                    progress={0}
                                    size='md'
                                />
                                <CheckIcon className='success-icon' />
                            </div>
                            <Text
                                color='light-gray'
                                size='medium'
                                weight='semibold'
                            >
                                The project has been created!
                            </Text>
                        </div>
                    ) : (
                        <div className='progress-container'>
                            <div className='indicator-container'>
                                <ErrorIcon className='error-icon' />
                            </div>
                            <Text
                                color='light-gray'
                                size='medium'
                                weight='semibold'
                            >
                                There was an error creating your project
                            </Text>
                        </div>
                    )}
                </div>
            );
        }
    );

export default _ProjectCreateProgress;
