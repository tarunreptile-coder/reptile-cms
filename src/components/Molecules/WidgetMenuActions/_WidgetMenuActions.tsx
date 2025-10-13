import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Button, Modal, Separator, Text, SettingsIcon, ErrorIcon } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';


import './_WidgetMenuActions.scss';
import { templateSteps } from '@Reptile/Constants/Constants';

const _WidgetMenuActions = controlled<
    Reptile.Props.WidgetMenuActionsProps,
    Reptile.Controllers.ITemplateActionsController
>(({ className, style, controller }) => {
    // const [run, setRun] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleSave = useCallback(() => {
        void controller.save();
        setShowModal(false)
    }, [controller]);

    const validateAndSave = () => {
        const errors = controller.validateTemplate();
        if(errors.length < 1) {
            setShowModal(true);
        } else {
            setShowErrorModal(true);
            setErrors(errors);
        }
    }

    // const handleModal = useCallback(() => {
    //     setRun(true);
    // }, [setRun]);

    // const handleJoyrideCallback = (data: CallBackProps) => {
    //     const { status } = data;
    //     const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    //     if (finishedStatuses.includes(status)) {
    //         setRun(false);
    //     }
    // };

    return (
        <div
            className={clsx('rt-widget-menu-actions', className)}
            style={style}
        >
            {/* <Button
                color='gray'
                variant='outlined'
                onClick={handleModal}
                iconPosition='right'
                disabled={() => run === true}
            >
                Show me around
            </Button> */}

            <Button
                className='save-template'
                variant='contained'
                color='primary'
                size='sm'
                onClick={validateAndSave}
                disabled={() => controller.loading}
            >
                Save
            </Button>

            {/* <Joyride
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                steps={templateSteps}
                run={run}
                styles={{
                    options: {
                        arrowColor: '#6610f2',
                        primaryColor: '#6610f2',
                        textColor: '#004a14',
                        zIndex: 1000,
                    },
                }}
            /> */}

            <Modal visible={showModal}>
                <ModalTitle icon={<SettingsIcon />} title={'Confirmation'} />
                <Separator bottom={30} />
                <ModalContent>
                    <Text color={'black'}>{'This action will save all your current changes to the template. Do you wish to proceed?'}</Text>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    onCancelClick={() => setShowModal(false)}
                    onActionClick={handleSave}
                    actionName="Proceed"
                />
            </Modal>

            <Modal visible={showErrorModal}>
                <ModalTitle icon={<ErrorIcon />} title={'Add Required Fields'} />
                <Separator bottom={30} />
                <ModalContent>
                    <ul>
                        {errors?.map((error, index) => (
                            <li key={index}><Text color={'black'}>{error}</Text></li>
                        ))}
                    </ul>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions onCancelClick={() => setShowErrorModal(false)}/>
            </Modal>
        </div>
    );
});

export default _WidgetMenuActions;
