import clsx from 'clsx';
import React, { useCallback, useRef } from 'react';
import { CSSTransition, TransitionStatus } from 'react-transition-group';
import { reactive } from '@Reptile/Framework';

import './_Collapse.scss';

const _Collapse = reactive<Reptile.Props.CollapseProps>(({
    style,
    className,
    children,
    in: inProp,
    mountOnEnter,
    unmountOnExit,
}) => {
    const root = useRef<HTMLDivElement>(null);

    const transitionStyles: { [key in TransitionStatus]: React.CSSProperties } = {
        entering: {
            opacity: 0,
        },
        entered: {
            opacity: 1,
        },
        exiting: {
            opacity: 0,
        },
        exited: {
            opacity: 0,
            pointerEvents: 'none',
        },
        unmounted: {
            opacity: 0,
        },
    };

    const handleEnter = useCallback((node: HTMLElement) => {
        if (root.current) {
            root.current.style.position = 'absolute';
            node.style.height = '0';
            node.style.overflow = '';
        }
    }, []);

    const handleEntering = useCallback((node: HTMLElement) => {
        if (root.current) {
            const size = root.current.clientHeight;
            root.current.style.position = '';
            node.style.height = `${size}px`;
        }
    }, []);

    const handleEntered = useCallback((node: HTMLElement) => {
        node.style.height = 'auto';
    }, []);

    const handleExit = useCallback((node: HTMLElement) => {
        if (root.current) {
            node.style.height = `${root.current.clientHeight}px`;
            node.style.overflow = 'hidden';
        }
    }, []);

    const handleExiting = useCallback((node: HTMLElement) => {
        node.style.height = '0px';
    }, []);

    return (
        <CSSTransition
            in={inProp}
            timeout={300}
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
        >
            {(state) => (
                <div
                    className={clsx('rt-collapse', className)}
                    style={{
                        ...transitionStyles[state],
                        ...style,
                    }}
                >
                    <div ref={root}>
                        {children}
                    </div>
                </div>
            )}
        </CSSTransition>
    );
});

export default _Collapse;
