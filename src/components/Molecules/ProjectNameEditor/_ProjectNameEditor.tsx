import React, { useCallback } from 'react';
import clsx from 'clsx';
import {
    FeaturedIcon,
    FolderPlusIcon,
    Text,
    Input,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_ProjectNameEditor.scss';

const _ProjectNameEditor = reactive<Reptile.Props.ProjectNameEditorProps>(
    ({ className, style }, { name, onNameChange }) => {
        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onNameChange) {
                    onNameChange(e.target.value);
                }
            },
            [onNameChange]
        );

        return (
            <div
                className={clsx('rt-project-name-editor', className)}
                style={style}
            >
                <FeaturedIcon
                    icon={<FolderPlusIcon />}
                    size='lg'
                    type='light-circle-outline'
                    color='primary'
                />
                <div className='title'>
                    <Text color='dark-gray' size='large' weight='semibold'>
                        New Project
                    </Text>
                    <Text color='light-gray' weight='regular' size='small'>
                        Please enter the name of your project, maximum 128
                        characters.
                    </Text>
                </div>
                <Input
                    autoFocus
                    value={name}
                    placeholder='Project name'
                    type='text'
                    onChange={handleInputChange}
                />
            </div>
        );
    }
);

export default _ProjectNameEditor;
