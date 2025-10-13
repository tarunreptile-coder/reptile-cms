import React, { useCallback } from 'react';
import { TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import { controlled } from '@Reptile/Framework';
import { Collapse, Notification, Text } from '@Reptile/Components/Atoms';
import {
    FileDrop,
    FileUploadProgress,
    InputField,
} from '@Reptile/Components/Molecules';
import { useInitController } from '@Reptile/Hooks';

import './_FileDropProperty.scss';

const _FileDropProperty = controlled<
    Reptile.Props.FileDropProperty,
    Reptile.Controllers.IFileDropPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleFileDropped = useCallback(
        (file: File | null) => {
            if (!file) {
                return;
            }
    
            const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];
            const isJsonFile = file.type === 'application/json';
            const isImageFile = allowedImageTypes.includes(file.type);
            const isLoadieType = controller?._type === 'loadie';
    
            // Check if the file is valid based on the upload type
            const isValidFile = isImageFile || (isJsonFile && isLoadieType);
                if (!isValidFile) {
                // Set an appropriate error message and return
                const errorMessage = 'Invalid file type. Please upload a PNG, JPG, ' + `${isLoadieType ? 'GIF, or Json file.' : 'or GIF file.'}`;
                Notification.error({description: errorMessage });
                return;
            }
    
            // If the file is valid, proceed with the upload
            void controller.uploadFile(file);;
        },
        [controller]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (controller.imageUrl) {
                controller.imageUrl = e.target.value;
            }

            if (controller.value !== undefined) {
                controller.value = e.target.value;
            }
        },
        [controller]
    );

    const displayValue = useCallback(() => {
        const currentValue = controller.imageUrl ?? controller.value;
        if (currentValue.startsWith('url("') && currentValue.endsWith('")')) {
            return currentValue.substring(5, currentValue.length - 2);
        }
        return currentValue;
    }, [controller?.value, controller?.imageUrl]);

    const isLoadie = controller?._type === 'loadie';
    const hintText = isLoadie ? 'PNG, JPG, GIF or JSON' : 'PNG, JPG, or GIF';

    return (
        <div className={clsx('rt-file-drop-property', className)} style={style}>
            <Text color='gray' size='small' weight='medium'>
                {() => controller.label}
            </Text>
            <FileDrop
                disabled={() => !!controller.fileUploadInfo}
                onFileDropped={handleFileDropped}
                hint={hintText}
            />
            <TransitionGroup
                className={clsx({
                    'rt-upload-image-hidden': !controller.fileUploadInfo,
                })}
            >
                {!!controller.fileUploadInfo && (
                    <Collapse key='progress'>
                        <FileUploadProgress
                            fileName={controller.fileUploadInfo.filename}
                            fileSizeInBytes={
                                controller.fileUploadInfo.sizeInBytes
                            }
                            uploadPercentage={
                                controller.fileUploadInfo.progress
                            }
                        />
                    </Collapse>
                )}
            </TransitionGroup>
            <InputField
                className={className}
                style={style}
                onChange={handleChange}
                label='URL'
                value={displayValue}
                type='url'
                disabled={() => !!controller.fileUploadInfo}
            />
        </div>
    );
});

export default _FileDropProperty;
