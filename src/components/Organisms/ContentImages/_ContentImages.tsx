import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { TransitionGroup } from 'react-transition-group';
import { Collapse, Text } from '@Reptile/Components/Atoms';
import {
    FileDrop,
    FileUploadProgress,
    ImageGallery,
} from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ContentImages.scss';

const _ContentImages = controlled<
    Reptile.Props.ContentImagesProps,
    Reptile.Controllers.IContentImagesController
>(({ className, style, controller }) => {
    const [activeImage, setActiveImage] = useState(-1);

    useInitController(controller);

    const handleFileDropped = useCallback(
        (file: File | null) => {
            if (file) {
                void controller.addImage(file);
            }
        },
        [controller]
    );

    const handleDownloadImage = useCallback(
        (_: string, idx: number) => {
            controller.downloadImage(idx);
        },
        [controller]
    );

    const handleRemoveImage = useCallback(
        (_: string, idx: number) => {
            void controller.removeImage(idx);
        },
        [controller]
    );

    const handleInsertImage = useCallback(
        (_: string, caption: string, idx: number) => {
            controller.insertImage(idx, caption);
        },
        [controller]
    );

    return (
        <div className={clsx('rt-content-images', className)} style={style}>
            <Text color='gray' size='small' weight='medium'>
                Image gallery
            </Text>
            <FileDrop
                onFileDropped={handleFileDropped}
                hint='PNG, JPG or GIF'
                disabled={() => controller.loading}
            />
            <TransitionGroup
                className={clsx({
                    'rt-upload-image-hidden': !controller.imageUploadInfo,
                })}
            >
                {!!controller.imageUploadInfo && (
                    <Collapse key='progress'>
                        <FileUploadProgress
                            fileName={controller.imageUploadInfo.filename}
                            fileSizeInBytes={
                                controller.imageUploadInfo.sizeInBytes
                            }
                            uploadPercentage={
                                controller.imageUploadInfo.progress
                            }
                        />
                    </Collapse>
                )}
            </TransitionGroup>
            <ImageGallery
                activeIndex={activeImage}
                onActiveIndexChange={setActiveImage}
                onDownloadImage={handleDownloadImage}
                onInsertImage={handleInsertImage}
                onRemoveImage={handleRemoveImage}
                images={() => controller.images}
            />
        </div>
    );
});

export default _ContentImages;
