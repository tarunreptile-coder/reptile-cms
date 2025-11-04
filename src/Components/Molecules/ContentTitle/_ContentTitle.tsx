import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';
import { Text } from '@Reptile/Components/Atoms';

import './_ContentTitle.scss';

const _ContentTitle = reactive<Reptile.Props.ContentTitleProps>(
    ({ style, className }, { title }) => {
        return (
            <div className={clsx('rt-content-title', className)} style={style}>
                <Text color='black' size='h2' weight='bold'>
                    {title}
                </Text>
            </div>
        );
    }
);

export default _ContentTitle;
