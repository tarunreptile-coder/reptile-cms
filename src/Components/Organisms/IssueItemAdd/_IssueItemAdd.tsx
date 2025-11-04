import React, { useCallback } from 'react';
import { FolderIcon, LayoutIcon, Modal } from '@Reptile/Components/Atoms';
import { ListItem, NewContentButton } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import { NewFolderModal, NewScreenModal } from '..';

const _IssueItemAdd = controlled<
    Reptile.Props.PublicationItemProps,
    Reptile.Controllers.IIssueItemController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleNameChange = useCallback(
        (newName: string) => {
            controller.name = newName;
        },
        [controller]
    );

    const handleArticleClose = useCallback(() => {
        controller.onClickArticle();
    }, [controller]);

    const handleArticleSubmit = useCallback(() => {
        void controller.createArticle();
    }, [controller]);

    const handleSectionClose = useCallback(() => {
        controller.onClickSection();
    }, [controller]);

    const handleSectionSubmit = useCallback(() => {
        void controller.createSection();
    }, [controller]);

    return (
        <>
            <NewContentButton
                className={className}
                style={style}
                title='New item'
            >
                <ListItem
                    text='Article'
                    leftElement={<LayoutIcon />}
                    onClick={controller.onClickArticle.bind(controller)}
                />
                <ListItem
                    text='Section'
                    leftElement={<FolderIcon />}
                    onClick={controller.onClickSection.bind(controller)}
                />
            </NewContentButton>

            <Modal visible={() => !!controller.modalSection}>
                <NewFolderModal
                    onCancelClick={handleSectionClose}
                    onSaveClick={handleSectionSubmit}
                    onNameChange={handleNameChange}
                    name={controller.name}
                    // onFileDropped={(e) => {
                    //     e;
                    // }}
                    // displayImage={''}
                />
            </Modal>

            <Modal visible={() => !!controller.modalArticle}>
                <NewScreenModal
                    onCancelClick={handleArticleClose}
                    onSaveClick={handleArticleSubmit}
                    onNameChange={handleNameChange}
                    name={controller.name}
                />
            </Modal>
        </>
    );
});

export default _IssueItemAdd;
