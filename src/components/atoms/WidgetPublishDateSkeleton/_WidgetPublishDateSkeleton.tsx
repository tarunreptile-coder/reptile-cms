import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css'
import './_WidgetPublishDateSkeleton.scss';

const _WidgetPublishDateSkeleton = reactive<Reptile.Props.WidgetSkeletonProps>(({
    loading,
    count,
}) => {
    return (
        <Skeleton
            containerClassName="rt-widget-publish-date-skeleton"
            baseColor="#E8ECF2"
            highlightColor="#F5F7FB"
            width="50%"
            enableAnimation={loading}
            count={count}
        />
    )
});


export default _WidgetPublishDateSkeleton;
