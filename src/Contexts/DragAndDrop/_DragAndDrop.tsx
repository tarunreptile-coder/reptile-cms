import React, { useCallback, useContext, useEffect, useRef } from 'react';

type EventData<T> = { position: { x: number, y: number }, context: T };

export const DragAndDropContext = React.createContext<{
    onDrag: (position: { x: number, y: number }, context: unknown) => void,
    onDrop: (position: { x: number, y: number }, context: unknown) => void,
    dragEvent: EventTarget,
}>(undefined as never);

export const DragAndDropProvider = ({
    children,
}: React.PropsWithChildren) => {
    const dragEvent = useRef(new EventTarget());

    const onDrag = useCallback((position: { x: number, y: number }, context: unknown) => {
        dragEvent.current.dispatchEvent(new CustomEvent('drag', { detail: { position, context } }));
    }, []);

    const onDrop = useCallback((position: { x: number, y: number }, context: unknown) => {
        dragEvent.current.dispatchEvent(new CustomEvent('drop', { detail: { position, context } }));
    }, []);

    return (
        <DragAndDropContext.Provider value={{ dragEvent: dragEvent.current, onDrag, onDrop }}>
            {children}
        </DragAndDropContext.Provider>
    );
}

export const useDragReport = <T,>(): {
    onDrag: (position: { x: number, y: number }, context: T) => void,
    onDrop: (position: { x: number, y: number }, context: T) => void,
} => {
    const ctx = useContext(DragAndDropContext);
    return {
        onDrag: ctx.onDrag,
        onDrop: ctx.onDrop,
    };
}

export const useDragInArea = <T,>(
    area: DOMRect,
    callback: (position: { x: number, y: number }, context: T) => void,
    deps?: unknown[]
) => {
    const ctx = useContext(DragAndDropContext);

    useEffect(() => {
        const onDrag = (event: Event) => {
            const { position, context } = ((event as CustomEvent).detail as EventData<T>);
            if (position.x > area.left && position.x < area.right) {
                if (position.y > area.top && position.y < area.bottom) {
                    callback(position, context);
                }
            }
        }

        ctx.dragEvent.addEventListener('drag', onDrag);

        return () => ctx.dragEvent.removeEventListener('drag', onDrag);
    }, [...(deps ?? []), area]);
}

export const useDragOutsideArea = <T,>(
    area: DOMRect,
    callback: (position: { x: number, y: number }, context: T) => void,
    deps?: unknown[]
) => {
    const ctx = useContext(DragAndDropContext);

    useEffect(() => {
        const onDrag = (event: Event) => {
            const { position, context } = ((event as CustomEvent).detail as EventData<T>);
            if (position.x < area.left || position.x > area.right) {
                callback(position, context);
            }
            else if (position.y < area.top || position.y > area.bottom) {
                callback(position, context);
            }
        }

        ctx.dragEvent.addEventListener('drag', onDrag);

        return () => ctx.dragEvent.removeEventListener('drag', onDrag);
    }, [...(deps ?? []), area]);
}

export const useDropInArea = <T,>(
    area: DOMRect,
    callback: (position: { x: number, y: number }, context: T) => void,
    deps?: unknown[]
) => {
    const ctx = useContext(DragAndDropContext);

    useEffect(() => {
        const onDrop = (event: Event) => {
            const { position, context } = ((event as CustomEvent).detail as EventData<T>);
            if (position.x > area.left && position.x < area.right) {
                if (position.y > area.top && position.y < area.bottom) {
                    callback(position, context);
                }
            }
        }

        ctx.dragEvent.addEventListener('drop', onDrop);

        return () => ctx.dragEvent.removeEventListener('drop', onDrop);
    }, [...(deps ?? []), area]);
}
