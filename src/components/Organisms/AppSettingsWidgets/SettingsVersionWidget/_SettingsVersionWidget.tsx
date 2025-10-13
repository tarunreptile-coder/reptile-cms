import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SettingsVersionWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'settings-version'
    ) as Reptile.Service.Widget
);

const _SettingsVersionWidget = reactive<Reptile.Props.WidgetProps>(
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
                className='rt-settings-version'
            >
                <p>{widget.contents[0].properties.label}</p>
            </div>
        );
    }
);

export default _SettingsVersionWidget;
