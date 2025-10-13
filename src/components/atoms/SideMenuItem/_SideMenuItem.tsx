import React from 'react';
import clsx from 'clsx';

import { Text } from '@Reptile/Components/Atoms';

import './_SideMenuItem.scss';

type Props = {
    text: string;
    Icon: React.FunctionComponent;
    color:
        | 'primary'
        | 'black'
        | 'white'
        | 'light-gray'
        | 'gray'
        | 'dark-gray'
        | 'success'
        | 'warning'
        | 'light-error'
        | 'error';
    selected: boolean;
    onClick: () => void;
};

const _MenuItem = (props: Props) => {
    const { text, Icon, color, selected, onClick } = props;

    return (
        <div
            className={clsx('rt-side-menu-item', { selected })}
            onClick={onClick}
        >
            {Icon && (
                <Text className='item-icon' color={color}>
                    <Icon />
                </Text>
            )}
            <Text className='item-text' size='medium' color={color}>
                {text}
            </Text>
        </div>
    );
};

_MenuItem.defaultProps = {
    color: 'black',
};

export default _MenuItem;
