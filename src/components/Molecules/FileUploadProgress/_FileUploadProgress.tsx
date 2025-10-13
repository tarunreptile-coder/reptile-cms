import React from 'react';
import clsx from 'clsx';
import {
    FeaturedIcon,
    FileIcon,
    ProgressCircle,
    Text,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_FileUploadProgress.scss';

function formatSize(sizeInBytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let unitIdx = 0;

    let convertedSize = sizeInBytes;

    while (convertedSize >= 1024 && unitIdx < units.length) {
        convertedSize = convertedSize / 1024;
        unitIdx++;
    }

    return `${convertedSize.toFixed(0)} ${units[unitIdx]}`;
}

const _FileUploadProgress = reactive<Reptile.Props.FileUploadProgressProps>(
    ({ className, style, fileName, fileSizeInBytes, uploadPercentage }) => {
        return (
            <div
                className={clsx('rt-file-upload-progress', className)}
                style={style}
            >
                <div
                    className='progress'
                    style={{ width: `${uploadPercentage}%` }}
                />
                <FeaturedIcon
                    className='icon'
                    icon={<FileIcon />}
                    color='primary'
                    size='sm'
                    type='light-circle-outline'
                />
                <div className='text-container'>
                    <Text size='small' color='gray' weight='medium'>
                        {fileName}
                    </Text>
                    <Text size='small' color='light-gray' weight='regular'>
                        {`${formatSize(
                            fileSizeInBytes
                        )} - ${uploadPercentage}% uploaded`}
                    </Text>
                </div>
                <ProgressCircle className='indicator' />
            </div>
        );
    }
);

export default _FileUploadProgress;
