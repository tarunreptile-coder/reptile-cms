import React from 'react';

import { Edit2Icon, Separator } from '@Reptile/Components/Atoms';

import { ModalInput, ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const _OrganizationEditModal =
    reactive<Reptile.Props.OrganizationEditModalProps>(
        (
            { name, title, actionEnabled },
            { onCancelClick, onSaveClick, onNameChange }
        ) => {
            const handleActionEnabled = () => {
                return actionEnabled === 'pending';
            };

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
                        actionEnabled={handleActionEnabled}
                        actionName={'Save'}
                    />
                </>
            );
        }
    );

export default _OrganizationEditModal;
