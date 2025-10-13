import { Button, Modal, PlusIcon } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React, { useCallback, useEffect } from 'react';
import { ThemesManagerModal } from '@Reptile/Components/Organisms';

const _ThemesManager = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IThemesManagerController
>(({ controller, style, className }) => {
    useInitController(controller);

    useEffect(() => {
        void controller.getPublications();
    }, [controller]);

    const handleNameChange = useCallback(
        (newName: string) => {
            controller.name = newName;
        },
        [controller]
    );

    const handleSubmit = useCallback(() => {
        void controller.createTheme();
    }, [controller]);

    const handleModal = useCallback(() => {
        controller.onModalClick();
    }, [controller]);

    const handleChange = useCallback(
        (e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemIndex: number) => {
            controller.publicationIndex = itemIndex;
        },
        [controller]
    );

    return (
        <>
            <Button
                className={className}
                style={style}
                color='primary'
                icon={<PlusIcon />}
                iconPosition={'left'}
                disabled={
                    controller.publications && !controller.publications[0]
                }
                onClick={controller.onModalClick.bind(controller)}
            >
                Theme
            </Button>

            <Modal visible={controller.modalControl}>
                <ThemesManagerModal
                    publication={controller.publication}
                    publicationIndex={controller.publicationIndex}
                    publications={controller.publications}
                    name={controller.name}
                    actionEnabled={controller.status.status}
                    handleChange={handleChange}
                    onNameChange={handleNameChange}
                    onCancelClick={handleModal}
                    onActionClick={handleSubmit}
                />
            </Modal>
        </>
    );
});

export default _ThemesManager;
