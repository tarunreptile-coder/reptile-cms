import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css'
import './_WidgetCaptionSkeleton.scss';

const _WidgetCaptionSkeleton = reactive<Reptile.Props.WidgetSkeletonProps>(({
    loading,
    count,
}) => {
    return (
        <Skeleton
            containerClassName="rt-widget-caption-skeleton"
            baseColor="#E8ECF2"
            highlightColor="#F5F7FB"
            width="80%"
            enableAnimation={loading}
            count={count}
        />
    )
});


export default _WidgetCaptionSkeleton;
