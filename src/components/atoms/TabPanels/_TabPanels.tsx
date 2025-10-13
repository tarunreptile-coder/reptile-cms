import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { reactive } from '@Reptile/Framework';

import './_TabPanels.scss';

const _TabPanels = reactive<Reptile.Props.TabPanelsProps>(({
    children,
    activeIndex,
    style,
    className,
}) => {
    const root = useRef<HTMLDivElement>(null);
    const slideInDirection = useRef('slide-left');
    const slideOutDirection = useRef('slide-right');
    const [transitionIndex, setTransitionIndex] = useState(activeIndex);

    useEffect(() => {
        setTransitionIndex((i) => {
            if (i > activeIndex) {
                slideInDirection.current = 'slide-left';
                slideOutDirection.current = 'slide-right';
                return activeIndex;
            } else if (i < activeIndex) {
                slideInDirection.current = 'slide-right';
                slideOutDirection.current = 'slide-left';
                return activeIndex;
            }
            return i;
        });
    }, [activeIndex]);

    const handleAnimationEnter = useCallback(() => {
        if (root.current) {
            root.current.style.overflow = 'hidden';
        }
    }, []);

    const handleAnimationFinish = useCallback(() => {
        if (root.current) {
            root.current.style.overflow = '';
        }
    }, []);

    return (
        <div
            ref={root}
            style={style}
            className={clsx(['rt-tab-panels', className])}
        >
            <TransitionGroup
                component={null}
                childFactory={(child) => {
                    const idx = Number.parseInt((child.key as string).slice(2));
                    if (idx === transitionIndex) {
                        return React.cloneElement(child, {
                            classNames: slideInDirection.current,
                        });
                    }
                    else {
                        return React.cloneElement(child, {
                            classNames: slideOutDirection.current,
                            className: 'move-out'
                        });
                    }
                }}
            >
                {React.Children.toArray(children).map((child, idx) => (
                    idx === transitionIndex && (
                        <CSSTransition
                            key={idx}
                            timeout={200}
                            onEnter={handleAnimationEnter}
                            onExited={handleAnimationFinish}
                        >
                            {child}
                        </CSSTransition>
                    )
                ))}
            </TransitionGroup>
        </div>
    );
});

export default _TabPanels;
