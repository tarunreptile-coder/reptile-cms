import React, { useRef, useState } from 'react';

import { useOutsideClick } from '~/Hooks';

import { Button, Card, Text } from '@Reptile/Components/Atoms';

import './_Dropdown.scss';

type Props = {
    CustomComponent: React.Component;
    IconComponent: React.Component;
    children: React.ReactNode;
    containerStyles: React.CSSProperties;
    optionsWidth: string;
    text: string;
    textColor: Reptile.Props.TextColorType;
};

const _Dropdown = (props: Props) => {
    const {
        CustomComponent,
        IconComponent,
        children,
        containerStyles,
        optionsWidth,
        text,
        textColor,
    } = props;

    const ref = useRef(null);
    useOutsideClick(ref, () => setVisible(false));

    const [visible, setVisible] = useState(false);

    const DropdownMenu = ({ onClick }) => {
        if (CustomComponent) {
            return <CustomComponent onClick={onClick} />;
        }

        return (
            <Button className='icon-and-text' color='primary' onClick={onClick}>
                {IconComponent && (
                    <Text color={textColor} className='center-icon'>
                        <IconComponent />
                    </Text>
                )}
                <Text color={textColor} size='small'>
                    {text}
                </Text>
            </Button>
        );
    };

    return (
        <div className='rt-dropdown' ref={ref}>
            <DropdownMenu onClick={() => setVisible(!visible)} />

            {visible && (
                <Card
                    className='options-menu'
                    style={{ width: optionsWidth, ...containerStyles }}
                >
                    {children}
                </Card>
            )}
        </div>
    );
};

export default _Dropdown;
