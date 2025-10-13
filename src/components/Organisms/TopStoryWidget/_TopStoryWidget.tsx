import React, { useEffect } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import _ from 'lodash';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetLinkedContentController } from '@Reptile/Store/Controllers';
import {
    WidgetCaptionSkeleton,
    WidgetImageSkeleton,
    WidgetNameSkeleton,
    WidgetPublishDateSkeleton,
} from '@Reptile/Components/Atoms';

import './_TopStoryWidget.scss';
import { UTILS } from '~/Utils';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-top-story'
    ) as Reptile.Service.Widget
);

const _TopStoryWidget = reactive<Reptile.Props.WidgetProps>(
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
                    className='rt-top-story-widget'
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
                        {widget.contents[5].properties.isActive && (
                            <div
                                className='widget-button'
                                style={{
                                    textDecoration:
                                        widget.contents[5].styles
                                            .textDecoration,
                                    fontStyle:
                                        widget.contents[5].styles.fontStyle,
                                    fontWeight:
                                        widget.contents[5].styles.fontWeight,
                                    color: widget.contents[5].styles.color,
                                    fontSize:
                                        widget.contents[5].styles.fontSize,
                                    fontFamily:
                                        widget.contents[5].styles.fontFamily,
                                    padding: widget.contents[5].styles.padding,
                                    margin: widget.contents[5].styles.margin,
                                    width: widget.contents[5].styles.width,
                                    height: widget.contents[5].styles.height,
                                    lineHeight:
                                        widget.contents[5].styles.height,
                                    borderColor:
                                        widget.contents[5].styles.borderColor,
                                    backgroundColor:
                                        widget.contents[5].styles
                                            .backgroundColor,
                                    borderWidth:
                                        widget.contents[5].styles.borderWidth,
                                    borderRadius:
                                        widget.contents[5].styles.borderRadius,
                                    boxShadow:
                                        widget.contents[5].styles.boxShadow,
                                }}
                            >
                                <p>{widget.contents[5].properties.text}</p>
                            </div>
                        )}
                    </div>
                    <div
                        className='widget-image'
                        style={{
                            height: widget.contents[1].styles.height,
                            margin: widget.contents[1].styles.margin,
                            borderRadius:
                                widget.contents[1].styles.borderRadius,
                        }}
                    >
                        {!controller.loading && !!controller.items[0]?.image ? (
                            <img
                                src={
                                    UTILS.loadImage(
                                        controller.items[0].image
                                    ) ?? ''
                                }
                            />
                        ) : (
                            <WidgetImageSkeleton
                                loading={() => controller.loading}
                            />
                        )}
                    </div>
                    {widget.contents[2].properties.isActive && (
                        <div
                            className='widget-title'
                            style={{
                                backgroundColor:
                                    widget.contents[2].styles.backgroundColor,
                                color: widget.contents[2].styles.color,
                                fontSize: widget.contents[2].styles.fontSize,
                                fontFamily:
                                    widget.contents[2].styles.fontFamily,
                                padding: widget.contents[2].styles.padding,
                                textDecoration:
                                    widget.contents[2].styles.textDecoration,
                                fontStyle: widget.contents[2].styles.fontStyle,
                                fontWeight:
                                    widget.contents[2].styles.fontWeight,
                                textAlign: widget.contents[2].styles.textAlign,
                            }}
                        >
                            {!controller.loading && !!controller.items[0] ? (
                                controller.items[0].name
                            ) : (
                                <WidgetNameSkeleton
                                    loading={() => controller.loading}
                                />
                            )}
                        </div>
                    )}
                    {widget.contents[3].properties.isActive && (
                        <div
                            className='widget-caption'
                            style={{
                                backgroundColor:
                                    widget.contents[3].styles.backgroundColor,
                                color: widget.contents[3].styles.color,
                                fontSize: widget.contents[3].styles.fontSize,
                                fontFamily:
                                    widget.contents[3].styles.fontFamily,
                                padding: widget.contents[3].styles.padding,
                                textDecoration:
                                    widget.contents[3].styles.textDecoration,
                                fontStyle: widget.contents[3].styles.fontStyle,
                                fontWeight:
                                    widget.contents[3].styles.fontWeight,
                                textAlign: widget.contents[3].styles.textAlign,
                            }}
                        >
                            {!controller.loading && !!controller.items[0] ? (
                                controller.items[0].caption
                            ) : (
                                <WidgetCaptionSkeleton
                                    loading={() => controller.loading}
                                />
                            )}
                        </div>
                    )}
                    {widget.contents[4].properties.isActive && (
                        <div
                            className='widget-published-date'
                            style={{
                                backgroundColor:
                                    widget.contents[4].styles.backgroundColor,
                                color: widget.contents[4].styles.color,
                                fontSize: widget.contents[4].styles.fontSize,
                                fontFamily:
                                    widget.contents[4].styles.fontFamily,
                                padding: widget.contents[4].styles.padding,
                                textDecoration:
                                    widget.contents[4].styles.textDecoration,
                                fontStyle: widget.contents[4].styles.fontStyle,
                                fontWeight:
                                    widget.contents[4].styles.fontWeight,
                                textAlign: widget.contents[4].styles.textAlign,
                            }}
                        >
                            {!controller.loading && !!controller.items[0] ? (
                                controller.items[0].publishDate?.toDateString()
                            ) : (
                                <WidgetPublishDateSkeleton
                                    loading={() => controller.loading}
                                />
                            )}
                        </div>
                    )}
                </div>
            </Flipped>
        );
    }
);

export default _TopStoryWidget;
