import React from 'react';
import { PlusIcon } from '@Reptile/Components/Atoms';
import { DropdownButton } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

const _NewContentButton = reactive<Reptile.Props.NewContentButtonProps>(
    ({ style, className, children, disabled }, { title }) => {
        return (
            <DropdownButton
                className={className}
                style={style}
                color='primary'
                label={title}
                icon={<PlusIcon />}
                iconPosition='left'
                disabled={disabled}
            >
                {children}
            </DropdownButton>
        );
    }
);

export default _NewContentButton;
