import { Separator, SettingsIcon, Text } from '@Reptile/Components/Atoms';
import { ModalTitle } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import React from 'react';

const _ThemeSetModal = reactive<Reptile.Props.ModalThemeProps>(
    ({}, { onCancelClick, onActionClick }) => {
        return (
            <>
                <ModalTitle icon={<SettingsIcon />} title='Confirmation' />
                <Separator bottom={20} />
                <ModalContent className='responsive-input' style={{ width: '540px' }}>
                    <Text color={'black'}>
                        By settings this Theme as a default all the following
                        issues processed will be using it. Unless you change the
                        Theme form the Publish tab of the specific issue. Do you
                        wish to continue?
                    </Text>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={false}
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _ThemeSetModal;
