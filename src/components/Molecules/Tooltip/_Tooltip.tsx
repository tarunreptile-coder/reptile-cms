import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import { Menu } from '@Reptile/Components/Atoms';
import { ListItem } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';

import './_Tooltip.scss';

const TOOLTIP_APPEAR_TIMEOUT = 600;

const _Tooltip = reactive<Reptile.Props.TooltipProps>(
    ({ className, style, children }, { title }) => {
        const root = useRef<HTMLDivElement>(null);
        const [tooltipAnchor, setTooltipAnchor] =
            useState<HTMLDivElement | null>(null);
        const [mouseOver, setMouseOver] = useState(false);
        const [showTooltip, setShowTooltip] = useState(false);

        useLayoutEffect(() => {
            setTooltipAnchor(root.current);
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
        const handleMouseEnter = useCallback(() => {
            setMouseOver(true);
        }, []);

        const handleMouseLeave = useCallback(() => {
            setMouseOver(false);
        }, []);

        return (
            <>
                <div
                    ref={root}
                    className={clsx(className)}
                    style={style}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </div>
                <Menu
                    style={{ pointerEvents: 'none' }}
                    anchorEl={tooltipAnchor}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom',
                    }}
                    transformOrigin={{
                        horizontal: 'center',
                        vertical: 'top',
                    }}
                    distance={4}
                    open={showTooltip}
                >
                    <ListItem size='lg' text={title} />
                </Menu>
            </>
        );
    }
);

export default _Tooltip;
