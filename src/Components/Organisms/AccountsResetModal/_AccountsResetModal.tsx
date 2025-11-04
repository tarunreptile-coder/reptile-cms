import React from 'react';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';
import { Separator, Text, UnlockIcon } from '@Reptile/Components/Atoms';
import { ModalTitle } from '@Reptile/Components/Molecules';

const _AccountsResetModal = reactive<Reptile.Props.AccountsResetModal>(
    ({ actionEnabled }, { onCancelClick, onActionClick }) => {
        const handleActionEnabled = () => {
            return false || actionEnabled === 'pending';
        };

        return (
            <>
                <ModalTitle icon={<UnlockIcon />} title='Password reset' />
                <Separator bottom={30} />
                <ModalContent>
                    <Text color={'black'}>
                        By clicking submit you will send a password rest link
                        for the user
                    </Text>
                </ModalContent>
                <Separator bottom={50} />

                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={handleActionEnabled}
                    actionName={'Send'}
                />
            </>
        );
    }
);

export default _AccountsResetModal;
