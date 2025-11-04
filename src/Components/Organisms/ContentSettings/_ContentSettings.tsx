import clsx from 'clsx';
import React, { useCallback } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Collapse, Image, Text } from '@Reptile/Components/Atoms';
import {
    FileDrop,
    FileUploadProgress,
    InputField,
    TagsCollection,
    TextArea,
} from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ContentSettings.scss';

const _ContentSettings = controlled<
    Reptile.Props.ContentSettingsProps,
    Reptile.Controllers.IContentSettingsController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleFileNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            controller.documentName = event.target.value;
        },
        [controller]
    );

    const handleCaptionChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            controller.caption = event.target.value;
        },
        [controller]
    );

    const handleFileDropped = useCallback(
        (file: File | null) => {
            if (file) {
                void controller.updateCover(file);
            }
        },
        [controller]
    );

    return (
        <div className={clsx('rt-content-settings', className)} style={style}>
            <InputField
                label='Name of document'
                placeholder='Untitled...'
                type='text'
                value={() => controller.documentName}
                onChange={handleFileNameChange}
                disabled={() => controller.loading}
            />
            <Text color='gray' size='small' weight='medium'>
                Cover image
            </Text>
            <FileDrop
                disabled={() => controller.loading}
                onFileDropped={handleFileDropped}
                hint='PNG, JPG or GIF'
            />
            <TransitionGroup
                className={clsx({
                    'rt-upload-cover-image-hidden':
                        !controller.coverImage &&
                        !controller.coverImageUploadInfo,
                })}
            >
                {!!controller.coverImageUploadInfo && (
                    <Collapse key='progress'>
                        <FileUploadProgress
                            fileName={controller.coverImageUploadInfo.filename}
                            fileSizeInBytes={
                                controller.coverImageUploadInfo.sizeInBytes
                            }
                            uploadPercentage={
                                controller.coverImageUploadInfo.progress
                            }
                        />
                    </Collapse>
                )}
                {!!controller.coverImage &&
                    !controller.coverImageUploadInfo && (
                        <Collapse key='image'>
                            <Image
                                className='rt-img'
                                width='100%'
                                height={180}
                                src={() => controller.coverImage}
                            />
                        </Collapse>
                    )}
            </TransitionGroup>
            <TextArea
                label='Caption'
                placeholder='No caption...'
                value={() => controller.caption}
                onChange={handleCaptionChange}
                disabled={() => controller.loading}
            />
            <TagsCollection
                className='add-tag'
                editable
                disabled={() => controller.loading}
                tags={() => controller.tags}
                onTagAdd={controller.addTag.bind(controller)}
                onTagUpdate={controller.updateTag.bind(controller)}
                onTagRemove={controller.removeTag.bind(controller)}
            />
        </div>
    );
});

export default _ContentSettings;
