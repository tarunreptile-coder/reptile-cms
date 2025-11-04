import React from 'react';
import clsx from 'clsx';
import { Flipper } from 'react-flip-toolkit';
import { InsertableImage } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

import './_ImageGallery.scss';

const _ImageGallery = reactive<Reptile.Props.ImageGallery>(
    (
        { className, images, activeIndex },
        {
            size,
            onActiveIndexChange,
            onInsertImage,
            onDownloadImage,
            onRemoveImage,
        }
    ) => {
        return (
            <Flipper
                className={clsx('rt-image-gallery', className)}
                flipKey={`size-${images?.length ?? 0}-active-${
                    activeIndex ?? 0
                }`}
                decisionData={activeIndex}
                staggerConfig={{
                    default: {
                        speed: 1,
                    },
                }}
            >
                {(images ?? [])
                    .map((image, idx) => (
                        <InsertableImage
                            key={image}
                            image={image}
                            active={activeIndex === idx}
                            size={size}
                            onSelect={() => {
                                if (onActiveIndexChange) {
                                    onActiveIndexChange(
                                        activeIndex === idx ? -1 : idx
                                    );
                                }
                            }}
                            onInsertImage={(img, caption) => {
                                if (onInsertImage) {
                                    onInsertImage(img, caption, idx);
                                }
                            }}
                            onDownloadImage={(img) => {
                                if (onDownloadImage) {
                                    onDownloadImage(img, idx);
                                }
                            }}
                            onRemoveImage={(img) => {
                                if (onRemoveImage) {
                                    onRemoveImage(img, idx);
                                }
                            }}
                        />
                    ))
                    .reverse()}
            </Flipper>
        );
    }
);

export default _ImageGallery;
