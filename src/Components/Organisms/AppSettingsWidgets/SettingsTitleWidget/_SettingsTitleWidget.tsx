import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SettingsTitleWidget.scss';
import { TextEditor } from '../..';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'settings-title'
    ) as Reptile.Service.Widget
);

const _SettingsTitleWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div
                style={{
                    backgroundColor: widget.styles.backgroundColor,
                    backgroundImage: widget.styles.backgroundImage,
                    minHeight: widget.styles.minHeight,
                    padding: widget.styles.padding,
                }}
                className='rt-settings-title'
            >
                <div
                    className='widget-label'
                    style={{
                        backgroundColor:
                            widget.contents[0].styles.backgroundColor,
                        color: widget.contents[0].styles.color,
                        fontSize: widget.contents[0].styles.fontSize,
                        fontFamily: widget.contents[0].styles.fontFamily,
                        margin: widget.contents[0].styles.margin,
                        textDecoration:
                            widget.contents[0].styles.textDecoration,
                        fontStyle: widget.contents[0].styles.fontStyle,
                        fontWeight: widget.contents[0].styles.fontWeight,
                    }}
                >
                    <TextEditor controller={editorController} />
                </div>
            </div>
        );
    }
);

export default _SettingsTitleWidget;
