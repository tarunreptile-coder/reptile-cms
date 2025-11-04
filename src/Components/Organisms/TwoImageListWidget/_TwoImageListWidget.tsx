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

import './_TwoImageListWidget.scss';
import { UTILS } from '~/Utils';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-article-collection-two-items'
    ) as Reptile.Service.Widget
);

const _TwoImageListWidget = reactive<Reptile.Props.WidgetProps>(
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
                    className='rt-two-image-list-widget'
                    style={{
                        backgroundColor: widget.styles.backgroundColor,
                        backgroundImage: widget.styles.backgroundImage,
                        minHeight: widget.styles.minHeight,
                        padding: widget.styles.padding,
                    }}
                >
                    {_.chunk(controller.items, 2).map((row, idx) => (
                        <div key={idx} className='widget-row-container'>
                            {row.map((item, col) => (
                                <div
                                    key={`${idx}-${col}`}
                                    className='widget-item-container'
                                    style={{
                                        minHeight:
                                            widget.contents[0].styles.minHeight,
                                        margin: widget.contents[0].styles
                                            .margin,
                                        width: widget.contents[0].styles.width,
                                        backgroundColor:
                                            widget.contents[0].styles
                                                .backgroundColor,
                                        borderRadius:
                                            widget.contents[0].styles
                                                .borderRadius,
                                        boxShadow:
                                            widget.contents[0].styles.boxShadow,
                                    }}
                                >
                                    <div
                                        className='widget-image'
                                        style={{
                                            height: widget.contents[1].styles
                                                .height,
                                            margin: widget.contents[1].styles
                                                .margin,
                                            borderRadius:
                                                widget.contents[1].styles
                                                    .borderRadius,
                                        }}
                                    >
                                        {!controller.loading && !!item?.image ? (
                                            <img src={UTILS.loadImage(item.image)} />
                                        ) : (
                                            <WidgetImageSkeleton
                                                loading={() =>
                                                    controller.loading
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className='widget-text-container'>
                                        {widget.contents[2].properties
                                            .isActive && (
                                            <div
                                                className='widget-title'
                                                style={{
                                                    backgroundColor:
                                                        widget.contents[2]
                                                            .styles
                                                            .backgroundColor,
                                                    color: widget.contents[2]
                                                        .styles.color,
                                                    fontSize:
                                                        widget.contents[2]
                                                            .styles.fontSize,
                                                    fontFamily:
                                                        widget.contents[2]
                                                            .styles.fontFamily,
                                                    padding:
                                                        widget.contents[2]
                                                            .styles.padding,
                                                    textDecoration:
                                                        widget.contents[2]
                                                            .styles
                                                            .textDecoration,
                                                    fontStyle:
                                                        widget.contents[2]
                                                            .styles.fontStyle,
                                                    fontWeight:
                                                        widget.contents[2]
                                                            .styles.fontWeight,
                                                    textAlign: widget
                                                        .contents[2].styles
                                                        .textAlign as 'left',
                                                }}
                                            >
                                                {!controller.loading &&
                                                !!item ? (
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
                                        {widget.contents[3].properties
                                            .isActive && (
                                            <div
                                                className='widget-caption'
                                                style={{
                                                    backgroundColor:
                                                        widget.contents[3]
                                                            .styles
                                                            .backgroundColor,
                                                    color: widget.contents[3]
                                                        .styles.color,
                                                    fontSize:
                                                        widget.contents[3]
                                                            .styles.fontSize,
                                                    fontFamily:
                                                        widget.contents[3]
                                                            .styles.fontFamily,
                                                    padding:
                                                        widget.contents[3]
                                                            .styles.padding,
                                                    textDecoration:
                                                        widget.contents[3]
                                                            .styles
                                                            .textDecoration,
                                                    fontStyle:
                                                        widget.contents[3]
                                                            .styles.fontStyle,
                                                    fontWeight:
                                                        widget.contents[3]
                                                            .styles.fontWeight,
                                                    textAlign: widget
                                                        .contents[3].styles
                                                        .textAlign as 'left',
                                                }}
                                            >
                                                {!controller.loading &&
                                                !!item ? (
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
                                        {widget.contents[4].properties
                                            .isActive && (
                                            <div
                                                className='widget-published-date'
                                                style={{
                                                    backgroundColor:
                                                        widget.contents[4]
                                                            .styles
                                                            .backgroundColor,
                                                    color: widget.contents[4]
                                                        .styles.color,
                                                    fontSize:
                                                        widget.contents[4]
                                                            .styles.fontSize,
                                                    fontFamily:
                                                        widget.contents[4]
                                                            .styles.fontFamily,
                                                    padding:
                                                        widget.contents[4]
                                                            .styles.padding,
                                                    textDecoration:
                                                        widget.contents[4]
                                                            .styles
                                                            .textDecoration,
                                                    fontStyle:
                                                        widget.contents[4]
                                                            .styles.fontStyle,
                                                    fontWeight:
                                                        widget.contents[4]
                                                            .styles.fontWeight,
                                                    textAlign: widget
                                                        .contents[4].styles
                                                        .textAlign as 'left',
                                                }}
                                            >
                                                {!controller.loading &&
                                                !!item ? (
                                                    item.publishDate?.toDateString()
                                                ) : (
                                                    <WidgetPublishDateSkeleton
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
                    ))}
                </div>
            </Flipped>
        );
    }
);

export default _TwoImageListWidget;
