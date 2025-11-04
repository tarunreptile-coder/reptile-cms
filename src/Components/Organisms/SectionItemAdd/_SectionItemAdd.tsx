import React, { useCallback } from 'react';
import { LayoutIcon, Modal } from '@Reptile/Components/Atoms';
import { ListItem, NewContentButton } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import { NewScreenModal } from '..';

const _SectionItemAdd = controlled<
    Reptile.Props.PublicationItemProps,
    Reptile.Controllers.ISectionItemController
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
            </NewContentButton>

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

export default _SectionItemAdd;
