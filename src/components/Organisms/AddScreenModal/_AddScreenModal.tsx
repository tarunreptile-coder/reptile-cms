import React from 'react';

import { Edit2Icon, Separator } from '@Reptile/Components/Atoms';

import { ModalInput, ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const _AddScreenModal =
    reactive<Reptile.Props.AddScreenModalProps>(
        (
            { name, title, actionEnabled },
            { onCancelClick, onSaveClick, onNameChange }
        ) => {

            return (
                <>
                    <ModalTitle icon={<Edit2Icon />} title={title} />

                    <ModalContent>
                        <ModalInput
                            userInput={name}
                            onNameChange={(e) => onNameChange(e.target.value)}
                        />
                    </ModalContent>
                    <Separator bottom={20} />

                    <ModalActions
                        onCancelClick={onCancelClick}
                        onActionClick={onSaveClick}
                        actionEnabled={actionEnabled}
                        actionName={'Save'}
                    />
                </>
            );
        }
    );

export default _AddScreenModal;
