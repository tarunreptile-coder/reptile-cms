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

import './_LargeImageCarouselWidget.scss';
import { UTILS } from '~/Utils';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-article-carousel-simple'
    ) as Reptile.Service.Widget
);

const _LargeImageCarouselWidget = reactive<Reptile.Props.WidgetProps>(
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
                        backgroundImage: `url("${
                            widget.styles.backgroundImage ?? ''
                        }")`,
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
                                    fontWeight:
                                        widget.contents[0].styles.fontWeight,
                                    fontStyle:
                                        widget.contents[0].styles.fontStyle,
                                    textDecoration:
                                        widget.contents[0].styles
                                            .textDecoration,
                                    margin: widget.contents[0].styles.margin,
                                }}
                            >
                                <p>{widget.contents[0].properties.label}</p>
                            </div>
                        )}
                        {widget.contents[1].properties.isActive && (
                            <div
                                className='widget-button'
                                style={{
                                    color: widget.contents[1].styles.color,
                                    fontSize:
                                        widget.contents[1].styles.fontSize,
                                    fontFamily:
                                        widget.contents[1].styles.fontFamily,
                                    margin: widget.contents[1].styles.margin,
                                    padding: widget.contents[1].styles.padding,
                                    width: widget.contents[1].styles.width,
                                    height: widget.contents[1].styles.height,
                                    lineHeight:
                                        widget.contents[1].styles.height,
                                    borderColor:
                                        widget.contents[1].styles.borderColor,
                                    backgroundColor:
                                        widget.contents[1].styles
                                            .backgroundColor,
                                    borderRadius:
                                        widget.contents[1].styles.borderRadius,
                                    borderWidth:
                                        widget.contents[1].styles.borderWidth,
                                    boxShadow:
                                        widget.contents[1].styles.boxShadow,
                                    fontWeight:
                                        widget.contents[1].styles.fontWeight,
                                    fontStyle:
                                        widget.contents[1].styles.fontStyle,
                                    textDecoration:
                                        widget.contents[1].styles
                                            .textDecoration,
                                }}
                            >
                                <p>{widget.contents[1].properties.text}</p>
                            </div>
                        )}
                    </div>
                    <div className='widget-items-container'>
                        {controller.items.map((item, idx) => (
                            <div
                                key={idx}
                                className='widget-item-container'
                                style={{
                                    margin: widget.contents[2].styles.margin,
                                    minHeight:
                                        widget.contents[2].styles.minHeight,
                                    backgroundColor:
                                        widget.contents[2].styles
                                            .backgroundColor,
                                    borderRadius:
                                        widget.contents[2].styles.borderRadius,
                                    boxShadow:
                                        widget.contents[2].styles.boxShadow,
                                }}
                            >
                                <div
                                    className='widget-image'
                                    style={{
                                        height: widget.contents[3].styles
                                            .height,
                                        margin: widget.contents[3].styles
                                            .margin,
                                        borderRadius:
                                            widget.contents[3].styles
                                                .borderRadius,
                                    }}
                                >
                                    {!controller.loading && !!item?.image ? (
                                        <img
                                            src={UTILS.loadImage(item.image)}
                                        />
                                    ) : (
                                        <WidgetImageSkeleton
                                            loading={() => controller.loading}
                                        />
                                    )}
                                </div>
                                <div className='widget-text-container'>
                                    {widget.contents[4].properties.isActive && (
                                        <div
                                            className='widget-title'
                                            style={{
                                                fontSize:
                                                    widget.contents[4].styles
                                                        .fontSize,
                                                fontFamily:
                                                    widget.contents[4].styles
                                                        .fontFamily,
                                                color: widget.contents[4].styles
                                                    .color,
                                                backgroundColor:
                                                    widget.contents[4].styles
                                                        .backgroundColor,
                                                textAlign: widget.contents[4]
                                                    .styles.textAlign as 'left',
                                                fontWeight:
                                                    widget.contents[4].styles
                                                        .fontWeight,
                                                fontStyle:
                                                    widget.contents[4].styles
                                                        .fontStyle,
                                                textDecoration:
                                                    widget.contents[4].styles
                                                        .textDecoration,
                                                padding:
                                                    widget.contents[4].styles
                                                        .padding,
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
                                    {widget.contents[5].properties.isActive && (
                                        <div
                                            className='widget-title'
                                            style={{
                                                fontSize:
                                                    widget.contents[5].styles
                                                        .fontSize,
                                                fontFamily:
                                                    widget.contents[5].styles
                                                        .fontFamily,
                                                color: widget.contents[5].styles
                                                    .color,
                                                backgroundColor:
                                                    widget.contents[5].styles
                                                        .backgroundColor,
                                                textAlign: widget.contents[5]
                                                    .styles.textAlign as 'left',
                                                fontWeight:
                                                    widget.contents[5].styles
                                                        .fontWeight,
                                                fontStyle:
                                                    widget.contents[5].styles
                                                        .fontStyle,
                                                textDecoration:
                                                    widget.contents[5].styles
                                                        .textDecoration,
                                                padding:
                                                    widget.contents[5].styles
                                                        .padding,
                                            }}
                                        >
                                            {!controller.loading && !!item ? (
                                                item.caption
                                            ) : (
                                                <WidgetCaptionSkeleton
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

export default _LargeImageCarouselWidget;
