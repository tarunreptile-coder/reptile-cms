import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';

import './_ButtonWidget.scss';

const defaultWidget = new WidgetModel(AppWidgets.find(({ type }) => type === 'app-button') as Reptile.Service.Widget);

const ButtonWidget = reactive<Reptile.Props.WidgetProps>(({ widget: widgetWithData }) => {
    const widget = widgetWithData ?? defaultWidget;

    // For buttons, contents may not exist
    const content = widget.contents?.[0] ?? null;

    // Use styles from content if available, otherwise fallback to widget.properties.general
    const styles = content?.styles ?? widget.properties?.general ?? {};

    return (
        <Flipped flipId={widgetWithData?.id ?? 'preview'}>
            <div className="rt-button-widget">
                <div style={{
                    color: styles.color,
                    fontSize: styles.fontSize,
                    fontFamily: styles.fontFamily,
                    margin: styles.margin,
                    padding: styles.padding,
                    width: styles.width,
                    height: styles.height,
                    borderColor: styles.borderColor,
                    backgroundColor: styles.backgroundColor,
                    borderRadius: styles.borderRadius,
                    borderWidth: styles.borderWidth,
                    boxShadow: styles.boxShadow,
                    fontWeight: styles.fontWeight,
                    fontStyle: styles.fontStyle,
                    textDecoration: styles.textDecoration,
                    textAlign: styles.textAlign as 'left' | 'center' | 'right' | undefined,
                    lineHeight: styles.lineHeight,
                }}>
                    <p>{content?.properties?.text ?? widget.friendlyName}</p>
                </div>
            </div>
        </Flipped>
    );
});


export default ButtonWidget;
