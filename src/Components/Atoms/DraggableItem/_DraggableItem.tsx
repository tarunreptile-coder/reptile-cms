import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { Portal } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import { useDragReport } from '@Reptile/Contexts';

import './_DraggableItem.scss';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const _DraggableItem = reactive<Reptile.Props.DraggableItemProps<unknown>>(
    ({
        className,
        style,
        children,
        disabled,
        context,
        threshold,
        isMaxHeight,
    }) => {
        const root = useRef<HTMLDivElement>(null);
        const node = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [shouldUnmountPortal, setShouldUnmountPortal] = useState(true);
        const [isHolding, setIsHolding] = useState(false);
        const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
        const [rootPosition, setRootPosition] = useState({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        });

        useEffect(() => {
            if (isDragging) {
                root?.current?.classList.add('dragging');
                setShouldUnmountPortal(false);
            } else {
                root?.current?.classList.remove('dragging');
            }
        }, [isDragging]);

        useEffect(() => {
            if (isDragging) {
              document.body.style.userSelect = "none";
            } else {
              document.body.style.userSelect = "";
            }
        }, [isDragging]);

        const { onDrag, onDrop } = useDragReport();

        const handleThumbDragStart = useCallback(
            (event: React.PointerEvent<HTMLDivElement>) => {
                setInitialPosition({ x: event.clientX, y: event.clientY });
                const rootRect =
                    root.current?.getBoundingClientRect() as DOMRect;
                setRootPosition({
                    left: rootRect.left,
                    top: rootRect.top,
                    width: rootRect.width,
                    height: rootRect.height,
                });
                setIsHolding(true);
                setIsDragging(threshold === undefined);
            },
            [threshold]
        );

        const handleThumbDragThresholdStart = useCallback(
            (event: React.PointerEvent<HTMLDivElement>) => {
                event.preventDefault();
                const deltaX = Math.abs(event.clientX - initialPosition.x);
                const deltaY = Math.abs(event.clientY - initialPosition.y);

                if (
                    !isDragging &&
                    isHolding &&
                    !!threshold &&
                    deltaX + deltaY > threshold
                ) {
                    setIsDragging(true);
                }
            },
            [isDragging, isHolding, initialPosition, threshold]
        );

        const handleThumbDragThresholdEnd = useCallback(() => {
            setIsHolding(false);
        }, []);

        const handleThumbDrag = useCallback(
            (event: React.PointerEvent<HTMLDivElement>) => {
                if (isDragging && node.current) {
                    const deltaX = event.clientX - initialPosition.x;
                    const deltaY = event.clientY - initialPosition.y;
                    node.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    onDrag({ x: event.clientX, y: event.clientY }, context);
                }
            },
            [isDragging, initialPosition, onDrag, context]
        );

        const handleThumbDragEnd = useCallback(
            (event: React.PointerEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragging(false);
                setIsHolding(false);
                if (node.current && root.current) {
                    const rootRect = root.current.getBoundingClientRect();
                    node.current.style.transition = 'transform 200ms';
                    node.current.style.transform = `translate(${
                        rootRect.left - rootPosition.left
                    }px, ${rootRect.top - rootPosition.top}px)`;
                }
                onDrop({ x: event.clientX, y: event.clientY }, context);
            },
            [onDrop, context, rootPosition]
        );

        const handleDropAnimationExit = useCallback(() => {
            root?.current?.classList.remove('dragging');
            setShouldUnmountPortal(true);
        }, []);

        return (
            <>
                <Portal
                    className={`rt-drag-area-root ${isDragging ? 'dragging' : ''}`}
                    active={isDragging || !shouldUnmountPortal}
                >
                    <div
                        className={clsx('rt-drag-area', { active: isDragging })}
                        onPointerMove={handleThumbDrag}
                        onPointerUp={handleThumbDragEnd}
                    >
                        <CSSTransition
                            in={isDragging}
                            mountOnEnter
                            unmountOnExit
                            timeout={200}
                            classNames={'rt-dragging-item'}
                            onExited={handleDropAnimationExit}
                        >
                            <div
                                ref={node}
                                className={clsx('rt-dragging-item', className)}
                                style={{
                                    ...style,
                                    ...rootPosition,
                                }}
                                onPointerDown={handleThumbDragStart}
                            >
                                {children}
                            </div>
                        </CSSTransition>
                    </div>
                </Portal>
                <div
                    ref={root}
                    className={clsx(
                        'rt-draggable-item',
                        { active: !disabled },
                        { 'max-height': isMaxHeight },
                        className
                    )}
                    style={style}
                    onPointerDown={!disabled ? handleThumbDragStart : undefined}
                    onPointerMove={
                        !disabled ? handleThumbDragThresholdStart : undefined
                    }
                    onPointerUp={
                        !disabled ? handleThumbDragThresholdEnd : undefined
                    }
                    onPointerLeave={
                        !disabled ? handleThumbDragThresholdEnd : undefined
                    }
                >
                    {children}
                </div>
            </>
        );
    }
) as <T>(
    props: Reptile.Framework.ReactiveProps<Reptile.Props.DraggableItemProps<T>>
) => React.ReactElement;

export default _DraggableItem;
