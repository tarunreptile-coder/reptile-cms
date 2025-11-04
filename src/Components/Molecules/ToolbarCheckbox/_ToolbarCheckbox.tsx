import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';
import { Button, Menu } from '@Reptile/Components/Atoms';
import ListItem from '@Reptile/Components/Molecules/ListItem/_ListItem';

import './_ToolbarCheckbox.scss';

const TOOLTIP_APPEAR_TIMEOUT = 600;

const _ToolbarCheckbox = reactive<Reptile.Props.ToolbarCheckboxProps>(
    ({ className, style, checked }, { icon, tooltip, onClick }) => {
        const button = useRef(null);
        const [tooltipAnchor, setTooltipAnchor] = useState(null);
        const [mouseOver, setMouseOver] = useState(false);
        const [showTooltip, setShowTooltip] = useState(false);

        useLayoutEffect(() => {
            setTooltipAnchor(button.current);
        }, []);

        useEffect(() => {
            if (mouseOver) {
                const timeout = setTimeout(() => {
                    setShowTooltip(true);
                }, TOOLTIP_APPEAR_TIMEOUT);
                return () => clearTimeout(timeout);
            } else {
                setShowTooltip(false);
            }
            return () => {
                /* Do nothing */
            };
        }, [mouseOver]);

        const handleClick = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                if (onClick) {
                    onClick(e, !checked);
                }
            },
            [onClick, checked]
        );

        const handleMouseEnter = useCallback(() => {
            setMouseOver(true);
        }, []);

        const handleMouseLeave = useCallback(() => {
            setMouseOver(false);
        }, []);

        return (
            <div
                className={clsx('rt-toolbox-checkbox', className)}
                style={style}
            >
                <Button
                    ref={button}
                    color={checked ? 'primary' : 'gray'}
                    icon={icon}
                    size='xs'
                    variant={checked ? 'outlined' : 'text'}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <Menu
                    className='rt-dropdown-toolbar-tooltip'
                    anchorEl={tooltipAnchor}
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'top',
                    }}
                    transformOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
                    }}
                    open={showTooltip}
                >
                    <ListItem size='lg' text={tooltip} />
                </Menu>
            </div>
        );
    }
);

export default _ToolbarCheckbox;
