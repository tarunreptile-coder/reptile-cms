import clsx from 'clsx';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Collapse, Image } from '@Reptile/Components/Atoms';
import { FileDrop, FileUploadProgress } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import Info from '@material-ui/icons/Info';
import { Button } from '@Reptile/Components/Atoms';
import './_BuildSetting.scss';

const _BuildSetting = reactive<Reptile.Props.BuildSettingProps>(
    (
        { appName, coverImage, coverImageUploadInfo, status },
        {
            handleChangeText,
            handleFileDropped,
            removeImage,
            saveApp,
            createApp,
            onEnableBuild,
        }
    ) => {
        return (
            <div className='rt-build-setting'>
                <div className='share_box_title'>
                    <h1>Build Settings</h1>
                    <p>
                        Before you can create your app and submit to the app
                        stores, you need to finalise some settings. Please chose
                        your app name and upload your icon.
                    </p>
                </div>
                <div className='app_content'>
                    <div className='text_box_content'>
                        <label>App Name</label>
                        <div className='text_boxWith_Icon'>
                            <input
                                className='tab_text'
                                type='text'
                                id='message'
                                name='message'
                                onChange={handleChangeText}
                                value={appName ?? ''}
                                autoComplete='off'
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='file_upload_layout'>
                    {coverImage && (
                        <div className='trash_icon' onClick={removeImage}>
                            <div className='image-container'>
                                <svg
                                    className='MuiSvgIcon-root'
                                    focusable='false'
                                    viewBox='0 0 24 24'
                                    fill='#000'
                                    aria-hidden='true'
                                >
                                    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'></path>
                                </svg>
                            </div>
                        </div>
                    )}
                    {coverImage ? (
                        <Image className='' src={coverImage} />
                    ) : (
                        <FileDrop
                            // disabled={() => loading}
                            onFileDropped={handleFileDropped}
                            hint='PNG, JPG or GIF'
                        />
                    )}
                    <TransitionGroup
                        className={clsx({
                            'rt-upload-cover-image-hidden':
                                !coverImage && !coverImageUploadInfo,
                        })}
                    >
                        {!!coverImageUploadInfo && (
                            <Collapse key='progress'>
                                <FileUploadProgress
                                    fileName={coverImageUploadInfo.filename}
                                    fileSizeInBytes={
                                        coverImageUploadInfo.sizeInBytes
                                    }
                                    uploadPercentage={
                                        coverImageUploadInfo.progress
                                    }
                                />
                            </Collapse>
                        )}
                    </TransitionGroup>
                </div>
                <div className='build-actions'>
                    <div className='main_btn'>
                        <Button
                            color='primary'
                            variant='contained'
                            size={'md'}
                            className='defaultThemeBtn themePrimaryBtn'
                            onClick={createApp}
                            disabled={onEnableBuild()}
                        >
                            Create app!
                        </Button>

                        <Button
                            color='gray'
                            variant='contained'
                            className='defaultThemeBtn themePrimaryBtn'
                            disabled={status === 'pending'}
                            onClick={saveApp}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

export default _BuildSetting;
