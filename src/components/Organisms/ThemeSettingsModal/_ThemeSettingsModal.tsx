import { Separator, SettingsIcon, Edit2Icon, Text } from '@Reptile/Components/Atoms';
import {
    DropdownInput,
    ListItem,
    ModalInput,
    ModalTitle,
} from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import React from 'react';

const _ThemeSettingsModal = reactive<Reptile.Props.ModalThemeSettingsProps>(
    (
        { name, publication, publicationIndex, publications, actionEnabled },
        { onCancelClick, onActionClick, onNameChange, handleChange }
    ) => {
        const handleAction = () => {
            return name.trim().length < 2 || actionEnabled === 'pending';
        };

        return (
            <>
                <ModalTitle icon={<Edit2Icon />} title='Rename Theme' />
                <Separator bottom={20} />
                <ModalContent  className=' responsive-content responsive-input' >
                    <Text color={'black'}>
                        Change the theme name below. Save your
                        changes to apply them, or close the to exit without
                        saving.
                    </Text>

                    <ModalInput
                        userInput={name}
                        onNameChange={(e) => onNameChange(e.target.value)}
                    />

                    {/* <Text color={'black'}>Choose a publication</Text>
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
                                    key={publication._data.id}
                                    text={publication._data.name}
                                />
                            ))
                        }
                    </DropdownInput> */}
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={handleAction}
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _ThemeSettingsModal;
