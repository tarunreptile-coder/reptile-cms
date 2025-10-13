import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import { useOutsideClick, useWindowSize } from '@Reptile/Hooks';
import { Portal } from '@Reptile/Components/Atoms';
import { reactiveForwardRef } from '@Reptile/Framework';

import './_Menu.scss';

const DEFAULT_ANCHOR_ORIGIN = {
    vertical: 'top',
    horizontal: 'left',
};

const DEFAULT_TRANSFORM_ORIGIN = {
    vertical: 'top',
    horizontal: 'left',
};

const MARGIN_TO_EDGES = 16;

const _Menu = reactiveForwardRef<HTMLDivElement, Reptile.Props.MenuProps>(
    (
        {
            className,
            style,
            anchorEl,
            anchorOrigin,
            transformOrigin,
            distance,
            children,
            open,
            maxHeight,
            maxWidth,
        },
        { onClose },
        ref
    ) => {
        const root = useRef<HTMLDivElement>(null);
        const content = useRef<HTMLUListElement>(null);
        const [show, setShow] = useState(!!open);
        const [closed, setClosed] = useState(!open);

        // Handle change of open state:
        //  - Set show to open
        //  - If open is true set closed to false
        //  - If open is false change closed to true after the transition to ensure that the animation is finished
        useEffect(() => {
            setShow(!!open);
            if (!!open) {
                setClosed(false);
            }
        }, [open]);
        const handleTransitionEnd = useCallback(() => {
            if (!open) {
                setClosed(true);
            }
        }, [open]);

        const handleClose = useCallback(() => {
            if (onClose && open) {
                onClose();
            }
        }, [onClose, open]);

        useOutsideClick(root, handleClose);

        useImperativeHandle(ref, () => root.current as HTMLDivElement);

        const { width, height } = useWindowSize();

        useEffect(() => {
            if (anchorEl && root.current && content.current) {
                const anchorRect = anchorEl.getBoundingClientRect();
                const menuRect = root.current.getBoundingClientRect();

                // Find x position
                const positionX = {
                    left: anchorRect.left - (distance ?? 0),
                    center: (anchorRect.left + anchorRect.right) / 2,
                    right: anchorRect.right + (distance ?? 0),
                }[(anchorOrigin ?? DEFAULT_ANCHOR_ORIGIN).horizontal] as number;
                const offsetX = {
                    left: 0,
                    center: -menuRect.width / 2,
                    right: -menuRect.width,
                }[
                    (transformOrigin ?? DEFAULT_TRANSFORM_ORIGIN).horizontal
                ] as number;
                // Snap to window bounds
                let x = positionX + offsetX;
                if (x + menuRect.width + MARGIN_TO_EDGES >= width) {
                    x = width - menuRect.width - MARGIN_TO_EDGES;
                }
                x = Math.max(MARGIN_TO_EDGES, x);

                // Find y position
                const positionY = {
                    top: anchorRect.top - (distance ?? 0),
                    center: (anchorRect.top + anchorRect.bottom) / 2,
                    bottom: anchorRect.bottom + (distance ?? 0),
                }[(anchorOrigin ?? DEFAULT_ANCHOR_ORIGIN).vertical] as number;
                const offsetY = {
                    top: 0,
                    center: -menuRect.height / 2,
                    bottom: -menuRect.height,
                }[
                    (transformOrigin ?? DEFAULT_TRANSFORM_ORIGIN).vertical
                ] as number;
                // Snap to window bounds
                let y = positionY + offsetY;
                if (y + menuRect.height + MARGIN_TO_EDGES >= height) {
                    y = height - menuRect.height - MARGIN_TO_EDGES;
                }
                y = Math.max(MARGIN_TO_EDGES, y);

                root.current.style.left = `${x}px`;
                root.current.style.top = `${y}px`;
                content.current.style.maxWidth = `${Math.min(
                    maxWidth ?? Number.MAX_VALUE,
                    width - 2 * MARGIN_TO_EDGES
                )}px`;
                content.current.style.maxHeight = `${Math.min(
                    maxHeight ?? Number.MAX_VALUE,
                    height - 2 * MARGIN_TO_EDGES
                )}px`;
            }
        }, [
            anchorEl,
            anchorOrigin,
            transformOrigin,
            distance,
            maxHeight,
            maxWidth,
            show,
            width,
            height,
        ]);

        const slideDirection = useMemo(() => {
            let pos;
            if (
                (transformOrigin ?? DEFAULT_TRANSFORM_ORIGIN).horizontal ===
                    'right' &&
                (anchorOrigin ?? DEFAULT_ANCHOR_ORIGIN).horizontal === 'left'
            ) {
                pos = 'left';
            } else if (
                (transformOrigin ?? DEFAULT_TRANSFORM_ORIGIN).horizontal ===
                    'left' &&
                (anchorOrigin ?? DEFAULT_ANCHOR_ORIGIN).horizontal === 'right'
            ) {
                pos = 'right';
            } else {
                pos =
                    (transformOrigin ?? DEFAULT_TRANSFORM_ORIGIN).vertical ===
                    'bottom'
                        ? 'top'
                        : 'bottom';
            }
            return pos;
        }, [transformOrigin, anchorOrigin]);

        return (
            <Portal className='rt-menu-root' active={open || !closed}>
                <div
                    ref={root}
                    className={clsx(
                        'rt-menu',
                        { open: show },
                        slideDirection,
                        className
                    )}
                    style={{
                        ...style,
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <ul ref={content} className='rt-menu-content'>
                        {children}
                    </ul>
                </div>
            </Portal>
        );
    }
);

export default _Menu;
