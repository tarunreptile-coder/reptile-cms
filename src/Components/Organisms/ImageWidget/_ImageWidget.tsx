import React, { useState } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';

import './_ImageWidget.scss';

const defaultWidget = new WidgetModel(AppWidgets.find(({ type }) => type === 'app-image') as Reptile.Service.Widget);

const _ImageWidget = reactive<Reptile.Props.WidgetProps>(({
    widget: widgetWithData,
}) => {
    const widget = widgetWithData ?? defaultWidget;

    return (
        <Flipped flipId={widgetWithData?.id ?? 'preview'}>
            <div
                className="rt-image-widget"
                style={{
                    backgroundColor: widget.styles.backgroundColor,
                    minHeight: widget.styles.minHeight,
                    padding: widget.styles.padding,
                    width: widget.styles.width,
                }}
            >
                <div style={{
                    width: widget.contents[0].styles.width,
                    height: widget.contents[0].styles.height,
                    margin: widget.contents[0].styles.margin,
                    padding: widget.contents[0].styles.padding,
                }}>
                    <img src={widget.contents[0].properties.src} />
                </div >
            </div>
        </Flipped>
    );
});

export default _ImageWidget;
