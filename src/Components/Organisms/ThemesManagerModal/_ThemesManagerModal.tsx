import { Separator, SettingsIcon, Text } from '@Reptile/Components/Atoms';
import {
    DropdownInput,
    ListItem,
    ModalInput,
    ModalTitle,
} from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import React from 'react';

const _ThemesManagerModal = reactive<Reptile.Props.ModalThemeSettingsProps>(
    (
        { name, publication, publicationIndex, publications, actionEnabled },
        { onCancelClick, onActionClick, onNameChange, handleChange }
    ) => {
        const handleEnabled = () => {
            return (
                name.trim().length < 2 ||
                !!!publication ||
                actionEnabled === 'pending'
            );
        };

        return (
            <>
                <ModalTitle icon={<SettingsIcon />} title='Create Theme' />
                <Separator bottom={20} />
                <ModalContent className='responsive-modal'>
                    <Text color={'black'}>Name your theme</Text>

                    <ModalInput
                        userInput={name}
                        onNameChange={(e) => onNameChange(e.target.value)}
                    />

                    <Text color={'black'}>Choose a project to assign your theme</Text>
                    <DropdownInput
                        name={'Publication'}
                        label={'Select Publication'}
                        value={() => publication}
                        selectedIndex={() => publicationIndex}
                        onChange={handleChange}
                    >
                        {() =>
                            publications &&
                            publications.map((publication) => (
                                <ListItem
                                    key={publication.id}
                                    text={publication.name}
                                />
                            ))
                        }
                    </DropdownInput>
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={handleEnabled}
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _ThemesManagerModal;
