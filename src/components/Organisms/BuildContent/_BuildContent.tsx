import {
    BuildAppInfo,
    BuildAppSettings,
    BuildTable,
    ModalTitle,
    PrototypeMenu,
} from '@Reptile/Components/Molecules';
import React, { useCallback, useEffect, useState } from 'react';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_BuildContent.scss';
import { Modal, Separator, Text } from '@Reptile/Components/Atoms';
import { ModalActions, ModalContent, UpgradeAccountModal } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const _BuildContent = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IPrototypeController
>(({ controller }) => {
    useInitController(controller);

    const [modalType, setModalType] = useState<'buildProgress' | 'alert' | 'upgrade' | ''>('');
    const [alertMessages, setAlertMessages] = useState<string[]>([]);

    useEffect(() => {
        void controller.fetchPin();
    }, [controller]);

    useEffect(() => {
        void controller.getData();
        void controller.getSubscriptionData();
    }, [controller]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            controller.newAppName = event.target.value;
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

    const handleRemoveFile = useCallback(() => {
        void controller.removeImage();
    }, [controller]);

    const handleSave = useCallback(() => {
        if (controller.newAppName || controller.appName) {
            void controller.saveApp();
        }
    }, [controller]);

    const handleBuild = useCallback(() => {
        //check if build limit exceeds
        // get total project count from current subscription plan
        const totalBuildCount = controller.getDefaultProjectCount();
        const appList = controller.appList || [];
        const successfulBuilds = appList?.filter(build => 
            build.states.every(stageState => stageState === 'Completed')
        );
        // bypass super user roles to create builds, no check for limit exceeds
        if(!controller.superUser && successfulBuilds.length >= totalBuildCount) {
            setModalType('upgrade');
        } else {
            if(handleEnableBuild()) {
                setModalType('alert');
            } else {
                const hasQueued = controller?.app?.states?.includes('Queued');
                const hasFailed = controller?.app?.states?.includes('Failed');
                if ((!hasQueued || hasFailed) && (controller.newAppName || controller.appName)) {
                    void controller.buildAsync();
                } else {
                    setModalType('buildProgress');
                }
            }
        }
    }, [controller]);

    const handleEnableBuild = useCallback(() => {
        const isAppNameChanged = controller.newAppName?.trim() !== controller.appName?.trim();
        const isAppNameEmpty = !controller.newAppName?.trim();
        const isImageEmpty = !controller.newCoverImage?.trim();
        if (isAppNameChanged || isAppNameEmpty || isImageEmpty) {
            if (isAppNameChanged) {
                setAlertMessages([
                    'Please save updated App Name and App icon before creating a build.',
                ]);
            }
            if (isAppNameEmpty) {
                setAlertMessages(['App name cannot be empty.']);
            }
            if (isImageEmpty) {
                setAlertMessages(['Please upload App icon.']);
            }
            return true; // disable build
        }
        return false; // build can proceed
    }, [controller]);

    const handleClick = (id: number) => {
        controller.active = id;
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        controller.tabValue = newValue;
    };

    const getModalTitleText = () => {
        let title = '';
        switch (modalType) {
            case 'alert':
                title = 'Incomplete Sections';
                break;
            case 'buildProgress':
                title = 'Build in Progress';
                break;
            default:
                break;
        }
        return <Text color={'dark-gray'} size={'large'} weight={'bold'}>{title}</Text>;
    }

    return (
        <>
            <div className='rt-build-content'>
                <div className='build-prototype'>
                    <PrototypeMenu
                        app={controller.app}
                        newAppName={controller.newAppName}
                        newCoverImage={controller.newCoverImage}
                        pin={controller.pin}
                        coverImageUploadInfo={controller.coverImageUploadInfo}
                        status={controller.saveStatus}
                        tabValue={controller.tabValue}
                        onTabChange={handleChangeTab}
                        onFileDropped={handleFileDropped}
                        onRemoveFile={handleRemoveFile}
                        onSave={handleSave}
                        onBuild={handleBuild}
                        onChange={handleChange}
                        onEnableBuild={() => false}
                    />
                </div>
                {controller.tabValue === 'Build' && controller.appStatus && (
                    <>
                        <div className='build-progress'>
                            <BuildTable
                                active={controller.active}
                                appList={controller.appList}
                                steps={controller.steps}
                                onClick={handleClick}
                            />
                        </div>

                        <div className='build-settings'>
                            {controller.selectedApp &&
                                controller.appStatus.complete && (
                                    <BuildAppSettings
                                        selectedApp={controller.selectedApp}
                                    />
                                )}
                        </div>
                    </>
                )}
            </div>
            <Modal visible={['alert', 'buildProgress'].includes(modalType)} style={{zIndex:10}} onClose={() => setModalType('')}>
                <ModalTitle
                    title={getModalTitleText()}
                    inline={true}
                    {...(modalType === 'alert' && {
                        icon: <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: "20px" }} />,
                        iconColor: 'warning',
                    })}
                    {...(modalType === 'buildProgress' && {
                        icon: <FontAwesomeIcon icon={faCog} spin style={{ fontSize: "20px" }} />,
                    })}
                />
                <Separator bottom={30} />
                <ModalContent>
                    {modalType === 'buildProgress' && (
                        <Text color={'dark-gray'} weight={'bold'} size={'primary'}>{'Congratulations! Your app is now being built. You can follow its progress in the Build History section.'}</Text>
                    )}
                    {modalType === 'alert' && (
                        <>
                            <Text color="dark-gray" weight="regular" size="primary">
                                {'Some sections still need attention. Please complete all required sections before creating your app:'}
                            </Text>
                            <ul style={{ marginTop: "12px", paddingLeft: "20px", lineHeight: "1.6" }}>
                                {alertMessages.length > 0 ? (
                                    <>
                                        {alertMessages.map((error, index) => {
                                            return (
                                                <li key={index}>
                                                    <Text color="dark-gray" weight="regular" size="primary">
                                                        {error}
                                                    </Text>
                                                </li>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <li><Text color="dark-gray" weight="regular" size="primary">Content</Text></li>
                                        <li><Text color="dark-gray" weight="regular" size="primary">Design</Text></li>
                                        <li><Text color="dark-gray" weight="regular" size="primary">App Build</Text></li>
                                    </>
                                )}                                
                            </ul>
                        </>
                    )}
                </ModalContent>
                <Separator bottom={30} />
                <ModalActions
                    showCancelButton={false}
                    actionName="OK"
                    onActionClick={() => setModalType('')}
                />
            </Modal>

            <Modal style={{zIndex:10}} visible={modalType === 'upgrade'}>
                <UpgradeAccountModal
                    line1Text={'You’ve reached the build limit for your current plan.'}
                    line2Text={'Upgrade your subscription to unlock additional builds.'}
                    navigateToPlan={() => controller.navigateToPlan()}
                    onUpgradeModal={() => setModalType('')}
                />
            </Modal>
        </>
    );
});

export default _BuildContent;
