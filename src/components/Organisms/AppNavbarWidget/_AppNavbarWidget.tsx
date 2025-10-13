import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_AppNavbarWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'navbar'
    ) as Reptile.Service.Widget
);

const _AppNavbarWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }, {}) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div className='rt-app-template-nav'>
                <a className='nav-link'>🏠</a>

                <a className='nav-link'>⚙️</a>

                <a className='nav-link'>❓</a>

                <a className='nav-link'>🔍</a>
            </div>
        );
    }
);

export default _AppNavbarWidget;
