import React from 'react';
import { CheckOutlined } from '@mui/icons-material';

import { Text } from '@Reptile/Components/Atoms';

import './_DropdownItem.scss';

type Props = {
    color: Reptile.Props.TextColorType;
    IconComponent: React.Component;
    onClick: () => void;
    children: React.ReactNode;
};

const _DropdownItem = (props: Props) => {
    const { color, IconComponent, onClick, children } = props;

    return (
        <div className='rt-dropdown-item' onClick={onClick}>
            <div className='icon-and-text'>
                {IconComponent && (
                    <Text color={color} className='center-icon'>
                        <IconComponent />
                    </Text>
                )}
                <Text color={color} size='medium'>
                    {children}
                </Text>
            </div>
            <CheckOutlined />
        </div>
    );
};

export default _DropdownItem;
