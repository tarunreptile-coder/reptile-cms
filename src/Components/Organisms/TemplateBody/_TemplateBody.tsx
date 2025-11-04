import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
    BarChartIcon,
    BatteryIcon,
    BookmarkIcon,
    Divider,
    DraggableItem,
    HelpCircleIcon,
    HomeIcon,
    Logo,
    SearchIcon,
    SettingsIcon,
    Text,
    WifiIcon,
} from '@Reptile/Components/Atoms';
import {
    useDragInArea,
    useDragOutsideArea,
    useDropInArea,
} from '@Reptile/Contexts';
import {
    useInitController,
    useRegisterWidgets,
    useWindowSize,
} from '@Reptile/Hooks';
import { Flipper } from 'react-flip-toolkit';
import { WidgetOverlay } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';

import './_TemplateBody.scss';

const DRAG_START_THRESHOLD = 10;

const _TemplateBody = controlled<
    Reptile.Props.TemplateBodyProps,
    Reptile.Controllers.ITemplateBuilderController
>(({ className, style, controller }) => {
    const root = useRef<HTMLDivElement>(null);
    const body = useRef<HTMLDivElement>(null);
    const [dropArea, setDropArea] = useState<DOMRect>(new DOMRect());
    const [WidgetPreview, setWidgetPreview] = useState<
        React.FunctionComponent | undefined
    >();
    const [newDropPosition, setNewDropPosition] = useState(-1);
    const size = useWindowSize();

    useInitController(controller);
    useRegisterWidgets(controller);

    useLayoutEffect(() => {
        // Calculate drop area on each window resize
        setDropArea(root.current?.getBoundingClientRect() as DOMRect);
    }, [size]);

    useDragInArea<Reptile.Props.WidgetItemContext | string>(
        dropArea,
        (position, widget) => {
            const scrollView = body.current?.children.item(0) as Element;
            const insertedWidgets = scrollView.children ?? [];

            // Find the position where to insert the widget
            let i = 0;
            let previewFound = false;
            for (; i < insertedWidgets.length; ++i) {
                const element = insertedWidgets.item(i);
                if (element) {
                    if (element.classList.contains('widget-preview')) {
                        previewFound = true;
                        continue;
                    }
                    const elementRect = element.getBoundingClientRect();
                    const threshold = elementRect.y + elementRect.height / 2;
                    if (position.y < threshold) {
                        break;
                    }
                }
            }

            // Scroll if necessary
            const pageHeight = document.documentElement.clientHeight;
            if (position.y < 240) {
                scrollView.children
                    .item(Math.min(i - 1, 0))
                    ?.scrollIntoView({ behavior: 'smooth' });
            } else if (pageHeight - position.y < 160) {
                scrollView.children
                    .item(i)
                    ?.scrollIntoView({ behavior: 'smooth' });
            }

            if (typeof widget === 'string') {
                // Handle the reorder case when dragging inserted widget
                controller.move(widget, i);
            } else {
                // Handle when dragging new widget
                setNewDropPosition(previewFound ? i - 1 : i);
                setWidgetPreview(widget.element);
            }
        },
        [controller]
    );

    useDragOutsideArea(
        dropArea,
        () => {
            setWidgetPreview(undefined);
            setNewDropPosition(-1);
        },
        []
    );

    useDropInArea<Reptile.Props.WidgetItemContext | string>(
        dropArea,
        (_, widget) => {
            if (typeof widget !== 'string') {
                // Add the new dragged widget if inside the body
                controller.add(widget.kind, newDropPosition);
                setNewDropPosition(-1);
                setWidgetPreview(undefined);
            }
        },
        [newDropPosition, controller]
    );

    const handleSelect = useCallback(
        (_: React.MouseEvent<HTMLDivElement>, selectId: string) => {
            void controller.select(selectId);
        },
        [controller]
    );

    const handleDuplicate = useCallback(
        (_: React.MouseEvent<HTMLLIElement>, dupId: string) => {
            controller.duplicate(dupId);
        },
        [controller]
    );

    const handleDelete = useCallback(
        (_: React.MouseEvent<HTMLLIElement>, delId: string) => {
            controller.remove(delId);
        },
        [controller]
    );

    return (
        <div
            ref={root}
            className={clsx('rt-template-body', className)}
            style={style}
        >
            <div ref={body} className={clsx('content')}>
                <Flipper
                    className='scrollable'
                    flipKey={`${controller.widgets
                        .map(({ id }) => id)
                        .join('-')}-${newDropPosition}`}
                >
                    {controller.widgets.map((widget, idx: number) => (
                        <React.Fragment key={widget.id}>
                            {newDropPosition === idx && !!WidgetPreview && (
                                <div className='widget-preview'>
                                    <WidgetPreview />
                                </div>
                            )}
                            <DraggableItem
                                context={widget.id}
                                threshold={DRAG_START_THRESHOLD}
                                // disabled={() => controller.mode !== 'drag'}
                            >
                                <WidgetOverlay
                                    id={widget.id}
                                    isTop={idx === 0}
                                    mode={() =>
                                        controller.mode !== 'edit'
                                            ? 'normal'
                                            : 'grid'
                                    }
                                    selected={() =>
                                        widget.id ===
                                        controller.activeWidget?.id
                                    }
                                    onSelect={handleSelect}
                                    onDuplicate={handleDuplicate}
                                    onDelete={handleDelete}
                                >
                                    {() => {
                                        const Widget = controller.registry.get(
                                            widget.type
                                        )?.widget;
                                        return Widget ? (
                                            <Widget widget={widget} />
                                        ) : null;
                                    }}
                                </WidgetOverlay>
                            </DraggableItem>
                        </React.Fragment>
                    ))}
                    {newDropPosition === controller.widgets.length &&
                        !!WidgetPreview && (
                            <div className='widget-preview'>
                                <WidgetPreview />
                            </div>
                        )}
                </Flipper>
            </div>
            <div className='bottom-bar'>
                <SettingsIcon />
                <HelpCircleIcon />
                <HomeIcon />
                <BookmarkIcon />
                <SearchIcon />
            </div>
        </div>
    );
});

export default _TemplateBody;
