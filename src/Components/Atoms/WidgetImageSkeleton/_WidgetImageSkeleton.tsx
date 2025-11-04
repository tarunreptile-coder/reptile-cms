import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css'
import './_WidgetImageSkeleton.scss';

const _WidgetImageSkeleton = reactive<Reptile.Props.WidgetSkeletonProps>(({
    loading,
    count,
}) => {
    return (
        <Skeleton
            containerClassName="rt-widget-image-skeleton"
            baseColor="#E8ECF2"
            highlightColor="#F5F7FB"
            borderRadius="20px"
            height="100%"
            enableAnimation={loading}
            count={count}
        />
    )
});


export default _WidgetImageSkeleton;
