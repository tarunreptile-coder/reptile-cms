import React, { useState } from 'react';

import { ModalInput, ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { ErrorIcon, Separator, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

function cleanText(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/  +/g, ' ')
        .replace(/ /g, '-');
}

const _DeleteEntityModal = reactive<Reptile.Props.ModalDeleteProps>(
    ({ entityName, actionEnabled, isPublication }, { onCancelClick, onDeleteClick }) => {
        const [userInput, setUserInput] = useState('');

        const handleActionEnabled = () => {
            return (
                userInput !== cleanText(entityName) ||
                actionEnabled === 'pending'
            );
        };

        return (
            <>
                <ModalTitle icon={<ErrorIcon />} title='Warning!' />

                <ModalContent>
                    <Text size='small' color='light-gray' weight='regular'>
                        You are about to delete:
                    </Text>
                    <Separator bottom={20} />
                    <Text size='small' color='dark-gray' weight='bold'>
                        {entityName}
                    </Text>
                    <Separator bottom={20} />
                    <Text size='small' color='light-gray' weight='regular'>
                        Please be aware this cannot be undone and you will lose
                        all content associated with this entity.
                    </Text>
                    {isPublication && (
                        <>
                            <Separator bottom={20} />
                            <Text size='small' color="light-gray" weight='regular'>
                                Note: All themes linked to this publication will also be deleted.
                            </Text>
                        </>
                    )}
                    <Separator bottom={20} />
                    <Text size='small' color='dark-gray'>
                        {`Confirm by typing
          ${cleanText(entityName)}
          below`}
                    </Text>
                    <ModalInput
                        userInput={userInput}
                        onNameChange={(e) => setUserInput(e.target.value)}
                    />
                </ModalContent>

                <ModalActions
                    onCancelClick={onCancelClick}
                    onDeleteClick={onDeleteClick}
                    actionEnabled={handleActionEnabled}
                    onDelete={true}
                />
            </>
        );
    }
);

export default _DeleteEntityModal;
