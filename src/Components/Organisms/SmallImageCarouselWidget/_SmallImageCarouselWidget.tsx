import React, { useEffect } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetLinkedContentController } from '@Reptile/Store/Controllers';
import {
    WidgetImageSkeleton,
    WidgetNameSkeleton,
} from '@Reptile/Components/Atoms';

import './_SmallImageCarouselWidget.scss';
import { UTILS } from '~/Utils';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-article-carousel'
    ) as Reptile.Service.Widget
);

const _SmallImageCarouselWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const controller = useController(WidgetLinkedContentController);
        useInitController(controller, widget);

        useEffect(() => {
            controller.prevWidgetProperties = JSON.stringify(widget.properties);
        }, [widget, controller]);

        return (
            <Flipped flipId={widgetWithData?.id ?? 'preview'}>
                <div
                    className='rt-large-image-carousel-widget'
                    style={{
                        backgroundColor: widget.styles.backgroundColor,
                        backgroundImage: widget.styles.backgroundImage,
                        minHeight: widget.styles.minHeight,
                        padding: widget.styles.padding,
                    }}
                >
                    <div className='widget-title-container'>
                        {widget.contents[0].properties.isActive && (
                            <div
                                className='widget-label'
                                style={{
                                    backgroundColor:
                                        widget.contents[0].styles
                                            .backgroundColor,
                                    color: widget.contents[0].styles.color,
                                    fontSize:
                                        widget.contents[0].styles.fontSize,
                                    fontFamily:
                                        widget.contents[0].styles.fontFamily,
                                    margin: widget.contents[0].styles.margin,
                                    textDecoration:
                                        widget.contents[0].styles
                                            .textDecoration,
                                    fontStyle:
                                        widget.contents[0].styles.fontStyle,
                                    fontWeight:
                                        widget.contents[0].styles.fontWeight,
                                }}
                            >
                                <p>{widget.contents[0].properties.label}</p>
                            </div>
                        )}
                    </div>
                    <div className='widget-items-container'>
                        {controller.items.map((item, idx) => (
                            <div
                                key={idx}
                                className='widget-item-container'
                                style={{
                                    minHeight:
                                        widget.contents[1].styles.minHeight,
                                    margin: widget.contents[1].styles.margin,
                                    backgroundColor:
                                        widget.contents[1].styles
                                            .backgroundColor,
                                    borderRadius:
                                        widget.contents[1].styles.borderRadius,
                                    boxShadow:
                                        widget.contents[1].styles.boxShadow,
                                }}
                            >
                                <div
                                    className='widget-image'
                                    style={{
                                        height: widget.contents[2].styles
                                            .height,
                                        width: widget.contents[2].styles.width,
                                        margin: widget.contents[2].styles
                                            .margin,
                                        borderRadius:
                                            widget.contents[2].styles
                                                .borderRadius,
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
                                <div className='widget-text-container'>
                                    {widget.contents[3].properties.isActive && (
                                        <div
                                            className='widget-title'
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
                                                textAlign: widget.contents[3]
                                                    .styles.textAlign as 'left',
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Flipped>
        );
    }
);

export default _SmallImageCarouselWidget;
