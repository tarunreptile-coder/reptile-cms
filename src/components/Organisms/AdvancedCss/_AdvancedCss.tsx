import React, { useCallback } from 'react';
import { Button, Modal, TextEditor } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { ModalTitle } from '@Reptile/Components/Molecules';

const _AdvancedCss = controlled<
    Reptile.Props.PublicationItemProps,
    Reptile.Controllers.IAdvancedCssController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleSaveClick = useCallback(() => {
        if (controller.css) {
          void controller.updateJsonStructure();
        }
    }, [controller]);

    const handleModalClick = useCallback(() => {
        controller.modal = !controller.modal;
    }, [controller]);

    return (
        <>
            <div className={className}>
                <Button color={'primary'} onClick={handleModalClick}>
                    Advanced CSS
                </Button>
            </div>

            <Modal visible={!!controller.modal}>
                <ModalTitle title='Advanced CSS' />
                <ModalContent style={{ width: '50vw' }}>
                    <TextEditor controller={controller} />
                </ModalContent>
                <ModalActions
                    onCancelClick={handleModalClick}
                    onActionClick={handleSaveClick}
                    actionEnabled={false}
                    actionName={'Save'}
                />
            </Modal>
        </>
    );
});

export default _AdvancedCss;
