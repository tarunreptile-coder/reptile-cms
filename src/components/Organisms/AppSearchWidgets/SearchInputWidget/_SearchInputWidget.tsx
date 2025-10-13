import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SearchInputWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'search-input'
    ) as Reptile.Service.Widget
);

const _SearchInputWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div className='rt-settings-pin-button'>
                <input />
            </div>
        );
    }
);

export default _SearchInputWidget;
