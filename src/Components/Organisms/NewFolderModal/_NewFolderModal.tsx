import React from 'react';

import { FolderIcon, Text } from '@Reptile/Components/Atoms';
import {
    ModalFileContent,
    ModalInput,
    ModalTitle,
} from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const _NewFolderModal = reactive<Reptile.Props.ModalFileSaveProps>(
    (
        { name, fileUploadInfo, displayImage },
        { onCancelClick, onSaveClick, onFileDropped, onNameChange }
    ) => {
        return (
            <>
                <ModalTitle icon={<FolderIcon />} title='New Folder' />

                <ModalContent>
                    {onFileDropped ? (
                        <>
                            <Text
                                size='small'
                                color='light-gray'
                                weight='regular'
                            >
                                Add a folder image and give it a name.
                            </Text>
                            <ModalFileContent
                                onFileDropped={onFileDropped}
                                displayImage={displayImage ?? ''}
                                fileUploadInfo={fileUploadInfo}
                            />{' '}
                        </>
                    ) : null}
                    <Text size='small' color='light-gray' weight='regular'>
                        Please enter the name of your folder, maximum 128
                        characters.
                    </Text>
                    <ModalInput userInput={name} onNameChange={(e) => onNameChange(e.target.value)} />
                </ModalContent>

                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onSaveClick}
                    actionEnabled={name.trim().length < 2}
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _NewFolderModal;
