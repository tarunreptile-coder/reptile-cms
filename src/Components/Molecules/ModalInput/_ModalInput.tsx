import React, { useCallback } from 'react';

import { Input, Separator } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

const _ModalInput = reactive<Reptile.Props.ModalInputProps>(
    ({ userInput, name }, { onNameChange }) => {
        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onNameChange) {
                    onNameChange(e);
                }
            },
            [onNameChange]
        );

        return (
            <div>
                <Separator bottom={2} />
                <Input
                    name={name}
                    onChange={handleInputChange}
                    value={userInput}
                />
                <Separator bottom={24} />
            </div>
        );
    }
);

export default _ModalInput;
