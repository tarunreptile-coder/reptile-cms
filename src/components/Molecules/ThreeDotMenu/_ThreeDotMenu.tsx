import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';
import { MoreVerticalIcon, Text } from '@Reptile/Components/Atoms';
import { DropdownButton } from '@Reptile/Components/Molecules';

import './_ThreeDotMenu.scss';

const _ThreeDotMenu = reactive<Reptile.Props.ThreeDotMenuProps>(
    (
        { style, className },
        { children, disabled, offset, dropDirection, title, open, onChange }
    ) => {
        return (
            <div className={clsx('rt-three-dot-menu', className)} style={style}>
                <DropdownButton
                    variant='link'
                    color='gray'
                    open={open}
                    onChange={onChange}
                    disabled={disabled}
                    icon={<MoreVerticalIcon />}
                    size='xs'
                    dropDirection={dropDirection}
                    offset={offset}
                >
                    {children}
                </DropdownButton>
                <Text
                    className='three-dot-menu-title'
                    weight='bold'
                    color='black'
                    size='medium'
                    maxLength={25}
                >
                    {title}
                </Text>
            </div>
        );
    }
);

export default _ThreeDotMenu;
