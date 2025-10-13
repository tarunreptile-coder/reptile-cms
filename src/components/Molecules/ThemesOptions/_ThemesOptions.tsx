import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React, { useCallback, useEffect } from 'react';
import { DropdownButton } from '@Reptile/Components/Molecules';
import { Button } from 'reactstrap';
import { Modal } from '@Reptile/Components/Atoms';
import {
    DeleteThemeModal,
    ThemeSetModal,
    ThemeSettingsModal,
} from '@Reptile/Components/Organisms';

const _ThemesOptions = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IThemesOptionsController
>(({ controller }) => {
    useInitController(controller);

    useEffect(() => {
        void controller.getPublications();
        void controller.getThemes();
    }, []);

    const handleNameChange = useCallback(
        (newName: string) => {
            if (controller) controller.name = newName;
        },
        [controller]
    );

    const handleModalSettings = useCallback(() => {
        controller.modalSettings = !controller.modalSettings;
    }, [controller]);

    const handleModalDelete = useCallback(() => {
        controller.modalDelete = !controller.modalDelete;
    }, [controller]);

    const handleModalSet = useCallback(() => {
        controller.modalSet = !controller.modalSet;
    }, [controller]);

    const handleClickDelete = useCallback(() => {
        void controller.deleteTheme();
    }, [controller]);

    const handleSetDefault = useCallback(() => {
        controller.setToDefault();
    }, [controller]);

    const handleSaveSettings = useCallback(() => {
        void controller.saveSettings();
    }, [controller]);

    const handleChange = useCallback(
        (e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemIndex: number) => {
            controller.publicationIndex = itemIndex;
        },
        [controller]
    );

    return (
        <>
            <DropdownButton color={'primary'} label={'Settings'}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>                    
                    <Button onClick={handleModalSettings}>Rename</Button>
                    <Button
                        onClick={handleModalDelete}
                    >
                        Delete
                    </Button>
                </div>
            </DropdownButton>

            <Modal visible={() => !!controller.modalSettings}>
                <ThemeSettingsModal
                    publication={controller.publication}
                    publicationIndex={controller.publicationIndex}
                    publications={controller.publications}
                    name={controller.name}
                    actionEnabled={controller.status}
                    handleChange={handleChange}
                    onNameChange={handleNameChange}
                    onCancelClick={handleModalSettings}
                    onActionClick={handleSaveSettings}
                />
            </Modal>

            <Modal visible={() => !!controller.modalDelete}>
                <DeleteThemeModal
                    onCancelClick={handleModalDelete}
                    onActionClick={handleClickDelete}
                    actionEnabled={controller.status}
                    isActive={controller.theme?.isActive || false}
                    publicationName={controller?.theme?.publicationContentEntityName}
                    publicationId={controller.theme?.publicationContentEntityId}
                />
            </Modal>

            <Modal visible={() => !!controller.modalSet}>
                <ThemeSetModal
                    onCancelClick={handleModalSet}
                    onActionClick={handleSetDefault}
                    actionEnabled={controller.status}
                />
            </Modal>
        </>
    );
});
export default _ThemesOptions;
