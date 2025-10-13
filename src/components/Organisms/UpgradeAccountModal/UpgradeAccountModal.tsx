import React from 'react';
import { Separator, Text, ZapIcon } from '@Reptile/Components/Atoms';
import { ModalTitle } from '@Reptile/Components/Molecules';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';

const UpgradeAccountModal = reactive<Reptile.Props.UpgradeAccountModalProps>(
    ({line1Text, line2Text}, { onUpgradeModal, navigateToPlan }) => {
        return (
            <>
                <ModalTitle inline={true} icon={<ZapIcon />} title='Upgrade Now' />
                <Separator bottom={20} />
                <ModalContent className='responsive-modal'>
                    <Text size={'medium'} weight={'bold'} color={'black'}>
                        {line1Text ? line1Text : 'You have reached your project limit'}
                    </Text>
                    <Separator bottom={20} />
                    <Text color={'dark-gray'}>
                        {line2Text ? line2Text : 'If you wish to create more projects, upgrade now!'}
                    </Text>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    actionName={'Upgrade Now'}
                    onActionClick={() => navigateToPlan()}
                    onCancelClick={() => onUpgradeModal()}
                />
            </>
        );
    }
);

export default UpgradeAccountModal;
