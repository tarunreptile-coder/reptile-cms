import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import {
    useDragInArea,
    useDragOutsideArea,
    useDropInArea,
} from '@Reptile/Contexts';
import { useInitController, useWindowSize } from '@Reptile/Hooks';
import { Flipper } from 'react-flip-toolkit';
import { controlled } from '@Reptile/Framework';

import './_AppTemplateBody.scss';
import { AppWidget, DraggableWidget } from '..';
import { useParams } from 'react-router-dom';
import { TopItemWidgetIcon } from '@Reptile/Components/Atoms';
import Widget from '@Reptile/Store/Models/Template/_Widget';

const _AppTemplateBody = controlled<
    Reptile.Props.TemplateBodyProps,
    Reptile.Controllers.IAppBuildController
>(({ className, style, controller }) => {
    const root = useRef<HTMLDivElement>(null);
    const body = useRef<HTMLDivElement>(null);
    const [dropArea, setDropArea] = useState<DOMRect>(new DOMRect());
    const [WidgetPreview, setWidgetPreview] = useState<{
        json: Reptile.Framework.Reactive<Reptile.Models.IWidget>;
        html: string;
    }>();
    const [newDropPosition, setNewDropPosition] = useState(-1);
    const size = useWindowSize();

    useInitController(controller);

    useLayoutEffect(() => {
        // Calculate drop area on each window resize
        setDropArea(root.current?.getBoundingClientRect() as DOMRect);
    }, [size]);

    const { entityId } = useParams();

    useEffect(() => {
        controller.mode = 'drag';
        if (entityId) {
            void controller.getLayout(entityId);
        }
    }, [controller, controller.activePage, entityId]);

    useEffect(() => {
        if (!controller.defaultWidgets) {
            void (async () => {
                await controller.getWidgets();
            })();
        }

        controller.defaultWidgets?.map(({ name, json, html, settings }) => {
            const type = name.toLowerCase().replace(/\s/g, '');

            controller.register(type, {
                name: type,
                friendlyName: name,
                icon: TopItemWidgetIcon as React.FunctionComponent<
                    React.SVGProps<React.ReactSVGElement>
                >,
                widget: {
                    json: new Widget(
                        JSON.parse(json) as Reptile.Service.Widget
                    ),
                    html: html,
                },
                category: 'basic',
                settings: JSON.parse(
                    settings
                ) as Reptile.Controllers.WidgetSettingsLayout,
            });
        });
    }, [controller, controller.defaultWidgets]);

    useDragInArea<{
        element: {
            json: Reptile.Framework.Reactive<Reptile.Models.IWidget>;
            html: string;
        };
    }>(
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

    useEffect(() => {
        if (
            controller.widgets.length >= 1 &&
            (controller.layouts
                ?.filter((e) => e.name === 'General')[0]
                .layouts.find((e) => e.name === controller.activePage)?.name ||
                controller.activePage === 'Splash')
        ) {
            void controller.select(controller.widgets[0].id);
        }
    }, [controller, controller.widgets]);

    return (
        <div
            ref={root}
            className={clsx('rt-template-body', className)}
            style={style}
        >
            <div ref={body} className={clsx('content')}>
                <Flipper
                    className={clsx(
                        'scrollable',
                        controller.activePage === 'Main Layout' && 'main-layout'
                    )}
                    flipKey={`${controller.widgets
                        .map(({ id }) => id)
                        .join('-')}-${newDropPosition}`}
                >
                    {controller.widgets.map((widget, idx: number) => {
                        return (
                            <React.Fragment key={widget.id}>
                                {newDropPosition === idx && !!WidgetPreview && (
                                    <div className='widget-preview'>
                                        <AppWidget
                                            widgetData={WidgetPreview.json}
                                            widgetHTML={WidgetPreview.html}
                                        />
                                    </div>
                                )}
                                <DraggableWidget
                                    widget={widget}
                                    widgets={controller.defaultWidgets}
                                    mode={controller.mode}
                                    registry={controller.registry}
                                    idx={idx}
                                    activeWidget={controller.activeWidget}
                                    disabled={
                                        !(
                                            controller.layouts
                                                ?.filter(
                                                    (e) => e.name === 'General'
                                                )[0]
                                                .layouts.find(
                                                    (e) =>
                                                        e.name ===
                                                        controller.activePage
                                                )?.name ||
                                            controller.activePage === 'Splash'
                                        ) && false
                                    }
                                    onSelect={handleSelect}
                                    onDuplicate={
                                        !(
                                            controller.layouts
                                                ?.filter(
                                                    (e) => e.name === 'General'
                                                )[0]
                                                .layouts.find(
                                                    (e) =>
                                                        e.name ===
                                                        controller.activePage
                                                )?.name ||
                                            controller.activePage === 'Splash'
                                        )
                                            ? handleDuplicate
                                            : undefined
                                    }
                                    onDelete={
                                        !(
                                            controller.layouts
                                                ?.filter(
                                                    (e) => e.name === 'General'
                                                )[0]
                                                .layouts.find(
                                                    (e) =>
                                                        e.name ===
                                                        controller.activePage
                                                )?.name ||
                                            controller.activePage === 'Splash'
                                        )
                                            ? handleDelete
                                            : undefined
                                    }
                                />
                            </React.Fragment>
                        );
                    })}
                    {newDropPosition === controller.widgets.length &&
                        !!WidgetPreview && (
                            <div className='widget-preview'>
                                <AppWidget
                                    widgetData={WidgetPreview.json}
                                    widgetHTML={WidgetPreview.html}
                                />
                            </div>
                        )}
                </Flipper>
            </div>
        </div>
    );
});

export default _AppTemplateBody;
