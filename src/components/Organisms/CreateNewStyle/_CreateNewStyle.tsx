import React, { useCallback } from 'react';
import { Button, Modal } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import { AddNewStyleModal } from '@Reptile/Components/Organisms';

const _CreateNewStyle = controlled<
    Reptile.Props.PublicationItemProps,
    Reptile.Controllers.IAddNewStyleController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleNameChange = useCallback(
        (newName: string) => {
            controller.name = newName;
        },
        [controller]
    );

    const handleSelectorNameChange = useCallback(
        (newName: string) => {
            controller.selectorName = newName;
        },
        [controller]
    );

    const handleStyleTypeChange = useCallback(
        (e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemIndex: number) => {
            controller.styleTypeIndex = itemIndex;
        },
        [controller]
    );

    const handleTypeChange = useCallback(
        (e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemIndex: number) => {
            controller.typeIndex = itemIndex;
        },
        [controller]
    );

    const handleModalClick = useCallback(() => {
        controller.modal = !controller.modal;
    }, [controller]);

    const handleActionClick = useCallback(() => {
        controller.updateJsonStructure();
        controller.modal = !controller.modal;
    }, [controller]);

    return (
        <>
            <div className={className} style={style}>
                <Button color={'primary'} onClick={handleModalClick}>
                    Add New Style
                </Button>
            </div>

            <Modal visible={!!controller.modal}>
                <AddNewStyleModal
                    name={controller.name}
                    selectorName={controller.selectorName}
                    styleType={controller.styleType}
                    styleTypeIndex={controller.styleTypeIndex}
                    styleTypes={controller.styleTypes}
                    type={controller.type}
                    typeIndex={controller.typeIndex}
                    types={controller.types}
                    handleStyleTypeChange={handleStyleTypeChange}
                    handleTypeChange={handleTypeChange}
                    onNameChange={handleNameChange}
                    onSelectorNameChange={handleSelectorNameChange}
                    onCancelClick={handleModalClick}
                    onActionClick={handleActionClick}
                />
            </Modal>
        </>
    );
});

export default _CreateNewStyle;
