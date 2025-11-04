import React from 'react';

import './_BuildAppInfo.scss';
import { reactive } from '@Reptile/Framework';
import { ErrorIcon, ProgressCircle, Text } from '@Reptile/Components/Atoms';
import { BuildAppSettings } from '..';

const _BuildAppInfo = reactive<Reptile.Props.BuildAppError>(
    ({ appStatus, selectedApp }, {}) => {
        const { error, pending, complete } = appStatus;

        return (
            <div className='rt-build-app-info'>
                {error ? (
                    <div className='build-app-error'>
                        <Text color={'warning'} weight={'bold'} size={'h1'}>
                            There was an error building your app!
                        </Text>
                        <ErrorIcon className='error-icon' />
                    </div>
                ) : null}

                {pending ? (
                    <div className='build-app-pending'>
                        <Text color={'black'} weight={'bold'} size={'h1'}>
                            Please be patient while your app is being built!
                        </Text>

                        <ProgressCircle
                            className={'confirmation-loading'}
                            variant='indeterminate'
                            size='sm'
                        />
                    </div>
                ) : null}

                {complete ? (
                    <BuildAppSettings selectedApp={selectedApp} />
                ) : null}
            </div>
        );
    }
);

export default _BuildAppInfo;
