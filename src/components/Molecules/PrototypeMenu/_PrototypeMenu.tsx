import React from 'react';
import './_PrototypeMenu.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BuildSetting, Prototype } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const __PrototypeMenu = reactive<Reptile.Props.PrototypeMenu>(
    (
        { newAppName, newCoverImage, pin, status, coverImageUploadInfo, app, tabValue },
        {
            onFileDropped,
            onRemoveFile,
            onSave,
            onBuild,
            onChange,
            onEnableBuild,
            onTabChange
        }
    ) => {

        return (
            <>
                <div className='rt-prototype-menu'>
                    <Box
                        className='prototype-container'
                        sx={{ width: '100%', typography: 'body1' }}
                    >
                        <TabContext value={tabValue}>
                            <div className='tabs_layout'>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <TabList
                                        onChange={onTabChange}
                                        aria-label='lab API tabs example'
                                    >
                                        {/* Work Item - 1493: Hide Prototype tab */}
                                        {/* <Tab
                                            label='Prototype'
                                            value='Prototype'
                                            className='prototype_tab'
                                        /> */}
                                        <Tab
                                            label='Build'
                                            value='Build'
                                            className='build_tab'
                                        />
                                    </TabList>
                                </Box>
                            </div>
                            <div className='tabs_content'>
                                <TabPanel value='Prototype'>
                                    <Prototype pin={pin} />
                                </TabPanel>
                            </div>
                            <div className='tabs_content'>
                                <TabPanel value='Build'>
                                    <BuildSetting
                                        app={app}
                                        appName={newAppName}
                                        coverImage={newCoverImage}
                                        coverImageUploadInfo={
                                            coverImageUploadInfo
                                        }
                                        status={status?.status}
                                        onEnableBuild={onEnableBuild}
                                        handleChangeText={onChange}
                                        handleFileDropped={onFileDropped}
                                        removeImage={onRemoveFile}
                                        saveApp={onSave}
                                        createApp={onBuild}
                                    />
                                </TabPanel>
                            </div>
                        </TabContext>
                    </Box>
                </div>
            </>
        );
    }
);

export default __PrototypeMenu;
