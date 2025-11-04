import React from 'react';

import { LayoutIcon, Separator, Text } from '@Reptile/Components/Atoms';

import { ModalInput, ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const _NewScreenModal = reactive<Reptile.Props.ModalSaveProps>(
    ({ name }, { onCancelClick, onSaveClick, onNameChange }) => {
        return (
            <>
                <ModalTitle icon={<LayoutIcon />} title='New Screen' />

                <ModalContent>
                    <Text size='small' color='light-gray' weight='regular'>
                        Give your screen a name.
                    </Text>
                    <Separator bottom={20} />
                    <Text size='small' color='light-gray' weight='regular'>
                        Name
                    </Text>
                    <ModalInput
                        userInput={name}
                        onNameChange={(e) => onNameChange(e.target.value)}
                    />
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

export default _NewScreenModal;
