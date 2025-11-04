import React from 'react';

import { Separator, Collapse, Image } from '@Reptile/Components/Atoms';

import { FileDrop, FileUploadProgress } from '@Reptile/Components/Molecules';
import { TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_ModalFileContent.scss';

const _ModalFileContent = reactive<Reptile.Props.ModalFileContentProps>(
    ({ displayImage, fileUploadInfo }, { onFileDropped }) => {
        return (
            <div>
                {onFileDropped && (
                    <>
                        {' '}
                        <Separator bottom={20} />
                        <FileDrop
                            onFileDropped={onFileDropped}
                            hint='PNG, JPG or GIF'
                        />
                        <TransitionGroup
                            className={clsx({
                                'rt-upload-cover-image-hidden':
                                    !displayImage && !fileUploadInfo,
                            })}
                        >
                            {!!fileUploadInfo && (
                                <Collapse key='progress'>
                                    <FileUploadProgress
                                        fileName={fileUploadInfo?.filename}
                                        fileSizeInBytes={
                                            fileUploadInfo?.sizeInBytes
                                        }
                                        uploadPercentage={
                                            fileUploadInfo?.progress
                                        }
                                    />
                                </Collapse>
                            )}
                            {!!displayImage && !fileUploadInfo && (
                                <Collapse key='image'>
                                    <Image
                                        className='rt-img'
                                        width='100%'
                                        height={180}
                                        src={() => displayImage}
                                    />
                                </Collapse>
                            )}
                        </TransitionGroup>
                    </>
                )}
            </div>
        );
    }
);

export default _ModalFileContent;
