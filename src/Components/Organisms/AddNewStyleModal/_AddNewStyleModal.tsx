import React from 'react';
import { FolderIcon, Separator, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import {
    DropdownInput,
    ListItem,
    ModalInput,
    ModalTitle,
} from '@Reptile/Components/Molecules';

const _AddNewStyleModal = reactive<Reptile.Props.ModalThemeNewStyleProps>(
    (
        {
            name,
            styleType,
            styleTypeIndex,
            styleTypes,
            type,
            types,
            typeIndex,
        },
        {
            onCancelClick,
            onActionClick,
            onNameChange,
            handleStyleTypeChange,
            handleTypeChange,
        }
    ) => {
        return (
            <>
                <ModalTitle icon={<FolderIcon />} title='New Style' />

                <ModalContent>
                    <Text color={'black'}>Add a name</Text>
                    <ModalInput
                        userInput={() => name}
                        onNameChange={(e) => onNameChange(e.target.value)}
                    />

                    {/* <Text color={'black'}>Add a selector name</Text>
                    <ModalInput
                        userInput={() => selectorName}
                        onNameChange={onSelectorNameChange}
                    /> */}

                    <Text color={'black'}>Pick a style type</Text>
                    <DropdownInput
                        name='Style Type'
                        label={() => styleType}
                        value={() => styleType}
                        selectedIndex={() => styleTypeIndex}
                        onChange={handleStyleTypeChange}
                    >
                        {() =>
                            styleTypes &&
                            styleTypes.map((label, idx) => (
                                <ListItem key={idx} text={label} />
                            ))
                        }
                    </DropdownInput>
                    <Separator bottom={24} />
                    <Text color={'black'}>Pick a selector type</Text>
                    <DropdownInput
                        name='Type'
                        label={() => type}
                        value={() => type}
                        selectedIndex={() => typeIndex}
                        onChange={handleTypeChange}
                    >
                        {() =>
                            types &&
                            types.map((label, idx) => (
                                <ListItem key={idx} text={label} />
                            ))
                        }
                    </DropdownInput>
                </ModalContent>
                <Separator bottom={24} />
                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={
                        name.trim().length < 2 ||
                        typeof styleTypeIndex !== 'number' ||
                        typeof typeIndex !== 'number'
                    }
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _AddNewStyleModal;
