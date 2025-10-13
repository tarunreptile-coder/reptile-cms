import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { GENERIC, ICONS } from '@Reptile/Assets';
import { reactive } from '@Reptile/Framework';

import 'react-loading-skeleton/dist/skeleton.css';
import './_ImageFolder.scss';

const _ImageFolder = reactive<Reptile.Props.ImageProps>(
    ({ className, style, form, height, src, width, loading }, { onClick }) => {
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
                };
                img.onerror = () => {
                    setError(true);
                    setLoaded(true);
                };
            } else {
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
                {loaded && !loading && (
                    <div
                        className={clsx(
                            'image-background',
                            `${form ?? 'rectangle'}-image`,
                            { loaded },
                            className
                        )}
                        style={{
                            backgroundImage: `url("${encodeURI(
                                GENERIC.FOLDER as string
                            )}")`,
                        }}
                    >
                        <img
                            className={clsx('image-element', {
                                visible: imgUrl !== ICONS.IMAGE_URL,
                            })}
                            src={imgUrl}
                            style={{
                                marginTop: '19px',
                                borderRadius: '5px',
                                height: '132px',
                                width: '219px',
                            }}
                        />
                    </div>
                )}

                {(!loaded || !!loading) && (
                    <Skeleton
                        height='100%'
                        width='100%'
                        circle={form === 'circle'}
                    />
                )}
            </div>
        );
    }
);

export default _ImageFolder;
