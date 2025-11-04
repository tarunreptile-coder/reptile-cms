import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SettingsSupportWidget.scss';
import { TextEditor } from '../..';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'settings-support'
    ) as Reptile.Service.Widget
);

const _SettingsSupportWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const supportController = useController(WidgetEditorController);
        useInitController(supportController, widget);

        const featuresController = useController(WidgetEditorController);
        useInitController(featuresController, widget, true);

        return (
            <div className='rt-settings-support'>
                <button
                    style={{
                        color: widget.contents[0].styles.color,
                        fontSize: widget.contents[0].styles.fontSize,
                        fontFamily: widget.contents[0].styles.fontFamily,
                        margin: widget.contents[0].styles.margin,
                        padding: widget.contents[0].styles.padding,
                        margin: widget.contents[0].styles.margin,
                        width: widget.contents[0].styles.width,
                        height: widget.contents[0].styles.height,
                        borderColor: widget.contents[0].styles.borderColor,
                        backgroundColor:
                            widget.contents[0].styles.backgroundColor,
                        borderRadius: widget.contents[0].styles.borderRadius,
                        borderWidth: widget.contents[0].styles.borderWidth,
                        boxShadow: widget.contents[0].styles.boxShadow,
                        fontWeight: widget.contents[0].styles.fontWeight,
                        fontStyle: widget.contents[0].styles.fontStyle,
                        textDecoration:
                            widget.contents[0].styles.textDecoration,
                        textAlign: widget.styles.textAlign,
                        lineHeight: widget.contents[0].styles.height,
                        borderStyle: 'solid',
                    }}
                    className='support-button'
                >
                    <TextEditor controller={supportController} />
                </button>
                <button
                    style={{
                        color: widget.contents[1].styles.color,
                        fontSize: widget.contents[1].styles.fontSize,
                        fontFamily: widget.contents[1].styles.fontFamily,
                        margin: widget.contents[1].styles.margin,
                        padding: widget.contents[1].styles.padding,
                        margin: widget.contents[1].styles.margin,
                        width: widget.contents[1].styles.width,
                        height: widget.contents[1].styles.height,
                        borderColor: widget.contents[1].styles.borderColor,
                        backgroundColor:
                            widget.contents[1].styles.backgroundColor,
                        borderRadius: widget.contents[1].styles.borderRadius,
                        borderWidth: widget.contents[1].styles.borderWidth,
                        boxShadow: widget.contents[1].styles.boxShadow,
                        fontWeight: widget.contents[1].styles.fontWeight,
                        fontStyle: widget.contents[1].styles.fontStyle,
                        textDecoration:
                            widget.contents[1].styles.textDecoration,
                        textAlign: widget.styles.textAlign,
                        lineHeight: widget.contents[1].styles.height,
                        borderStyle: 'solid',
                    }}
                    className='features-button'
                >
                    <TextEditor controller={featuresController} />
                </button>
            </div>
        );
    }
);

export default _SettingsSupportWidget;
