import React from 'react';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';
import { Separator, Text, Trash2Icon } from '@Reptile/Components/Atoms';
import { ModalTitle } from '@Reptile/Components/Molecules';

const _AccountsDeleteModal = reactive<Reptile.Props.ModalThemeProps>(
    ({ actionEnabled }, { onCancelClick, onActionClick }) => {
        const handleActionEnabled = () => {
            return actionEnabled === 'pending';
        };

        return (
            <>
                <ModalTitle icon={<Trash2Icon />} title='Confirmation' />
                <Separator bottom={30} />
                <ModalContent>
                    <Text color={'black'}>
                        Are you sure you want to delete this User?
                    </Text>
                </ModalContent>
                <Separator bottom={50} />

                <ModalActions
                    onCancelClick={onCancelClick}
                    onDeleteClick={onActionClick}
                    actionEnabled={handleActionEnabled}
                    onDelete={true}
                />
            </>
        );
    }
);

export default _AccountsDeleteModal;
