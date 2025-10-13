import React from 'react';
import clsx from 'clsx';
import { StatusLight, Text } from '@Reptile/Components/Atoms';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_PublishStatus.scss';

const PublishStatusColorMap: {
    [key in Reptile.Props.PublishStatusKind]: Reptile.Props.StatusLightColorType;
} = {
    live: 'green',
    unpublished: 'red',
};

const _PublishStatus = reactive<Reptile.Props.PublishStatusProps>(
    ({ style, className }, { status }) => {
        return (
            <div className={clsx('rt-publish-status', className)} style={style}>
                <StatusLight
                    status={() => PublishStatusColorMap[reactiveValue(status)]}
                />
                <Text color='light-gray' size='extra-small' weight='regular'>
                    {() =>
                        reactiveValue(status) === 'live'
                            ? 'Live'
                            : 'Unpublished'
                    }
                </Text>
            </div>
        );
    }
);

export default _PublishStatus;
