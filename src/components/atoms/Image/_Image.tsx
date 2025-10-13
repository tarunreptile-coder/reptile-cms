import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { ICONS } from '@Reptile/Assets';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css';
import './_Image.scss';


const _Image = reactive<Reptile.Props.ImageProps>(({
    className,
    style,
    form,
    height,
    src,
    width,
    loading,
}, {
    onClick,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>(ICONS.IMAGE_URL as string);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImgUrl(src);
                setLoaded(true);
            }
            img.onerror = () => {
                setError(true);
                setLoaded(true);
            }
        } else  {
            setLoaded(true);
        }

        return () => setLoaded(false);
    }, [src]);

    return (
        <div
            className={clsx('rt-image', { 'rt-pointer': !!onClick })}
            style={{ height, width, ...style }}
            onClick={onClick}
        >
            {loaded && !loading &&
                <div
                    className={clsx(
                        'image-background',
                        `${form ?? 'rectangle'}-image`,
                        { loaded },
                        { 'invalid-image': (error || !src) },
                        className,
                    )}
                    style={{
                        backgroundImage: `url("${encodeURI(imgUrl)}")`,
                    }}
                >
                    <img
                        className={clsx('image-element', { visible: imgUrl !== ICONS.IMAGE_URL })}
                        src={imgUrl}
                        style={{ height, width }} />
                </div>
            }

            {(!loaded || !!loading) &&
                <Skeleton
                    height='100%'
                    width='100%'
                    circle={form === 'circle'}
                />
            }
        </div>
    )
});

export default _Image;
