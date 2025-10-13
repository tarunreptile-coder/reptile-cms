import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';
import { FeaturedIcon, Text, UploadCloudIcon } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_FileDrop.scss';

const _FileDrop = reactive<Reptile.Props.FileDropProps>(
    ({ style, className, hint, disabled, allowedExtensions }, { onFileDropped }) => {
        const [isDragOver, setIsDragOver] = useState(false);
        const root = useRef(null);

        const handleDragEnter = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                    e.target === root.current &&
                    e.dataTransfer.items &&
                    e.dataTransfer.items.length !== 0
                ) {
                    setIsDragOver(true);
                }
            },
            []
        );

        const handleDragOver = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
            },
            []
        );

        const handleDragLeave = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();

                if (e.target === root.current) {
                    setIsDragOver(false);
                }
            },
            []
        );

        const handleDrop = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                if (!disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragOver(false);
                    if (onFileDropped && e.dataTransfer.items.length > 0) {
                        onFileDropped(e.dataTransfer.items[0].getAsFile());
                    }
                }
            },
            [onFileDropped, disabled]
        );

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onFileDropped && e.target.files?.length) {
                    onFileDropped(e.target.files[0]);
                }
            },
            [onFileDropped]
        );

        return (
            <div
                ref={root}
                className={clsx([
                    'rt-file-drop',
                    className,
                    { 'drag-over': isDragOver },
                ])}
                style={style}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                <FeaturedIcon
                    icon={<UploadCloudIcon />}
                    color='gray'
                    type='light-circle-outline'
                    size='md'
                />
                <div className='rt-upload-file-button'>
                    <input
                        id='contained-button-file'
                        type='file'
                        value=''
                        disabled={disabled}
                        accept={allowedExtensions}
                        onChange={handleInputChange}
                    />
                    <label htmlFor='contained-button-file'>
                        Click to upload
                    </label>
                    <Text
                        size='extra-small'
                        color='light-gray'
                        weight='regular'
                    >
                        {' or drag and drop'}
                    </Text>
                </div>
                {!!hint && (
                    <Text
                        size='extra-small'
                        color='light-gray'
                        weight='regular'
                    >
                        {hint}
                    </Text>
                )}
            </div>
        );
    }
);

export default _FileDrop;
