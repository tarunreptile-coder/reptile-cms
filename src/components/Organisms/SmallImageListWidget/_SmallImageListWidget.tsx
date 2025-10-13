import React, { useEffect } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetLinkedContentController } from '@Reptile/Store/Controllers';
import {
    WidgetCaptionSkeleton,
    WidgetImageSkeleton,
    WidgetNameSkeleton,
} from '@Reptile/Components/Atoms';

import './_SmallImageListWidget.scss';
import { UTILS } from '~/Utils';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-article-collection-column'
    ) as Reptile.Service.Widget
);

type HTMLProps = {
    item: Reptile.Controllers.LinkedContentItem | null;
};

const _SmallImageListWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const controller = useController(WidgetLinkedContentController);
        useInitController(controller, widget);

        useEffect(() => {
            controller.prevWidgetProperties = JSON.stringify(widget.properties);
        }, [widget, controller]);

        const ImageHTML = ({ item }: HTMLProps) => {
            return (
                <div
                    className='widget-image'
                    style={{
                        width: widget.contents[1].styles.width,
                        height: widget.contents[1].styles.height,
                        margin: widget.contents[1].styles.margin,
                        borderRadius: widget.contents[1].styles.borderRadius,
                    }}
                >
                    {!controller.loading && !!item?.image ? (
                        <img src={UTILS.loadImage(item.image)} />
                    ) : (
                        <WidgetImageSkeleton
                            loading={() => controller.loading}
                        />
                    )}
                </div>
            );
        };

        return (
            <Flipped flipId={widgetWithData?.id ?? 'preview'}>
                <div
                    className='rt-small-image-list-widget'
                    style={{
                        backgroundColor: widget.styles.backgroundColor,
                        backgroundImage: widget.styles.backgroundImage,
                        minHeight: widget.styles.minHeight,
                        padding: widget.styles.padding,
                    }}
                >
                    {controller.items.map((item, idx) => (
                        <div
                            key={idx}
                            className='widget-item-container'
                            style={{
                                minHeight: widget.contents[0].styles.minHeight,
                                margin: widget.contents[0].styles.margin,
                                backgroundColor:
                                    widget.contents[0].styles.backgroundColor,
                                borderRadius:
                                    widget.contents[0].styles.borderRadius,
                                boxShadow: widget.contents[0].styles.boxShadow,
                            }}
                        >
                            {widget.properties.imagePosition === 'BEFORE' ||
                            (widget.properties.imagePosition === 'ALTERNATE' &&
                                idx % 2 === 0) ? (
                                <ImageHTML item={item} />
                            ) : null}

                            <div className='widget-text-container'>
                                {widget.contents[2].properties.isActive && (
                                    <div
                                        className='widget-title'
                                        style={{
                                            backgroundColor:
                                                widget.contents[2].styles
                                                    .backgroundColor,
                                            color: widget.contents[2].styles
                                                .color,
                                            fontSize:
                                                widget.contents[2].styles
                                                    .fontSize,
                                            fontFamily:
                                                widget.contents[2].styles
                                                    .fontFamily,
                                            padding:
                                                widget.contents[2].styles
                                                    .padding,
                                            textDecoration:
                                                widget.contents[2].styles
                                                    .textDecoration,
                                            fontStyle:
                                                widget.contents[2].styles
                                                    .fontStyle,
                                            fontWeight:
                                                widget.contents[2].styles
                                                    .fontWeight,
                                            textAlign: widget.contents[2].styles
                                                .textAlign as 'left',
                                        }}
                                    >
                                        {!controller.loading && !!item ? (
                                            item.name
                                        ) : (
                                            <WidgetNameSkeleton
                                                loading={() =>
                                                    controller.loading
                                                }
                                            />
                                        )}
                                    </div>
                                )}
                                {widget.contents[3].properties.isActive && (
                                    <div
                                        className='widget-caption'
                                        style={{
                                            backgroundColor:
                                                widget.contents[3].styles
                                                    .backgroundColor,
                                            color: widget.contents[3].styles
                                                .color,
                                            fontSize:
                                                widget.contents[3].styles
                                                    .fontSize,
                                            fontFamily:
                                                widget.contents[3].styles
                                                    .fontFamily,
                                            padding:
                                                widget.contents[3].styles
                                                    .padding,
                                            textDecoration:
                                                widget.contents[3].styles
                                                    .textDecoration,
                                            fontStyle:
                                                widget.contents[3].styles
                                                    .fontStyle,
                                            fontWeight:
                                                widget.contents[3].styles
                                                    .fontWeight,
                                            textAlign: widget.contents[3].styles
                                                .textAlign as 'left',
                                        }}
                                    >
                                        {!controller.loading && !!item ? (
                                            item.caption
                                        ) : (
                                            <WidgetCaptionSkeleton
                                                count={2}
                                                loading={() =>
                                                    controller.loading
                                                }
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {widget.properties.imagePosition == 'AFTER' ||
                            (widget.properties.imagePosition === 'ALTERNATE' &&
                                idx % 2 !== 0) ? (
                                <ImageHTML item={item} />
                            ) : null}
                        </div>
                    ))}
                </div>
            </Flipped>
        );
    }
);

export default _SmallImageListWidget;
