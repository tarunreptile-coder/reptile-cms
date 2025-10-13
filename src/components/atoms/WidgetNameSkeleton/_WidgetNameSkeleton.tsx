import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css'
import './_WidgetNameSkeleton.scss';

const _WidgetNameSkeleton = reactive<Reptile.Props.WidgetSkeletonProps>(({
    loading,
    count,
}) => {
    return (
        <Skeleton
            containerClassName="rt-widget-name-skeleton"
            baseColor="#E8ECF2"
            highlightColor="#F5F7FB"
            enableAnimation={loading}
            count={count}
        />
    )
});


export default _WidgetNameSkeleton;
