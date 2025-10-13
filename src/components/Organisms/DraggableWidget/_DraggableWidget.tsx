import { DraggableItem } from '@Reptile/Components/Atoms';
import { WidgetOverlay } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import React from 'react';
import { AppWidget } from '@Reptile/Components/Organisms';
import Lottie from "react-lottie-player";

const DRAG_START_THRESHOLD = 10;

const _DraggableWidget = reactive<Reptile.Props.DraggableWidgetsProps>(
    (
        {
            widget,
            widgets,
            mode,
            registry,
            activeWidget,
            idx,
            disabled,
            style,
            className,
        },
        { onSelect, onDuplicate, onDelete }
    ) => {
        return (
            <DraggableItem
                context={widget.id}
                threshold={DRAG_START_THRESHOLD}
                disabled={() => disabled} //mode !== 'drag' ||
                isMaxHeight={
                    widget.type === 'splashicon' || widget.type === 'loadie'
                }
                style={style}
            >
                <WidgetOverlay
                    id={widget.id}
                    isTop={idx === 0 || widget.type === 'thumbnav'}
                    isMaxHeight={
                        widget.type === 'splashicon' || widget.type === 'loadie'
                    }
                    mode={() => (mode !== 'edit' ? 'normal' : 'grid')}
                    selected={() => widget.id === activeWidget?.id}
                    onSelect={onSelect}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                >
                    {() => {
                        const html = widgets?.find(
                            (e) =>
                                e.name.toLowerCase().replace(/\s/g, '') ===
                                widget.type
                        )?.html;

                        if (!html || !widget) {
                            return;
                        }

                        if(widget.type === 'loadie') {
                            const bgImage = widget.styles.backgroundImage;
                            const bgColor = widget.styles.backgroundColor;
                            // Regex to extract URL inside url("...") or url('...')
                            const match = bgImage.match(/url\((["']?)(.*?)\1\)/);
                            if (match && match[2].endsWith('.json')) {
                                const loaderUrl = match[2];
                                return (
                                    <Lottie
                                        loop
                                        play
                                        path={loaderUrl}
                                        style={{ width: "100%", height: "100%", backgroundColor: bgColor }}
                                    />
                                );
                            }
                        }

                        return (
                            <AppWidget widgetData={widget} widgetHTML={html} />
                        );
                    }}
                </WidgetOverlay>
            </DraggableItem>
        );
    }
);

export default _DraggableWidget;
