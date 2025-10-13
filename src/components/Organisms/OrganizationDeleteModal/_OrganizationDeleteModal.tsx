import React from 'react';

import { Separator, Text, Trash2Icon } from '@Reptile/Components/Atoms';

import { ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const _OrganizationDeleteModal =
    reactive<Reptile.Props.OrganizationDeleteModalProps>(
        ({actionEnabled}, { onCancelClick, onSaveClick }) => {

            const handleActionEnabled = () => {
                return actionEnabled === 'pending';
            };

            return (
                <>
                    <ModalTitle
                        icon={<Trash2Icon />}
                        title='Delete Organization'
                    />

                    <ModalContent>
                        <Text color='dark-gray' size='large' weight='semibold'>
                            Are you sure?
                        </Text>
                        <Text size='small' color='light-gray' weight='regular'>
                            Please be aware this cannot be undone and you will
                            lose all the content associated with this account.
                        </Text>
                    </ModalContent>
                    <Separator bottom={20} />

                    <ModalActions
                        onCancelClick={onCancelClick}
                        onDeleteClick={onSaveClick}
                        actionEnabled={handleActionEnabled}
                        onDelete={true}
                    />
                </>
            );
        }
    );

export default _OrganizationDeleteModal;
