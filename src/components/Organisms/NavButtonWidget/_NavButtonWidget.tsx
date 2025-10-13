import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';

import './_NavButtonWidget.scss';

const defaultWidget = new WidgetModel(AppWidgets.find(({ type }) => type === 'nav-button') as Reptile.Service.Widget);

const NavButtonWidget = reactive<Reptile.Props.WidgetProps>(({
    widget: widgetWithData,
}) => {
    const widget = widgetWithData ?? defaultWidget;

    return (
        <Flipped flipId={widgetWithData?.id ?? 'preview'}>
            <div className="rt-button-widget">
                <div style={{
                    color: widget.contents[0].styles.color,
                    fontSize: widget.contents[0].styles.fontSize,
                    fontFamily: widget.contents[0].styles.fontFamily,
                    margin: widget.contents[0].styles.margin,
                    padding: widget.contents[0].styles.padding,
                    width: widget.contents[0].styles.width,
                    height: widget.contents[0].styles.height,
                    borderColor: widget.contents[0].styles.borderColor,
                    backgroundColor: widget.contents[0].styles.backgroundColor,
                    borderRadius: widget.contents[0].styles.borderRadius,
                    borderWidth: widget.contents[0].styles.borderWidth,
                    boxShadow: widget.contents[0].styles.boxShadow,
                    fontWeight: widget.contents[0].styles.fontWeight,
                    fontStyle: widget.contents[0].styles.fontStyle,
                    textDecoration: widget.contents[0].styles.textDecoration,
                    textAlign: widget.styles.textAlign as 'left' | 'right' | 'center' | undefined,
                    lineHeight: widget.contents[0].styles.height,
                }}>
                    <p>{widget.contents[0].properties.text}</p>
                </div>
            </div>
        </Flipped>
    );
});

export default NavButtonWidget;
