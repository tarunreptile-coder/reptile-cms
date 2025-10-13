import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SettingsPinButton.scss';
import { TextEditor } from '../..';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'settings-pin-button'
    ) as Reptile.Service.Widget
);

const _SettingsPinButton = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div
                style={{
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
                    textAlign: widget.styles.textAlign,
                    lineHeight: widget.contents[0].styles.height,
                    borderStyle: "solid"
                }}
                className='rt-settings-pin-button'
            >
                <TextEditor controller={editorController} />
            </div>
        );
    }
);

export default _SettingsPinButton;
