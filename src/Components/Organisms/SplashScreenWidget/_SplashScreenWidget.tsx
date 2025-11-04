import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_SplashScreenWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(({ type }) => type === 'loading-widget') as Reptile.Service.Widget
);

const _SplashScreenWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }, {}) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div className='rt-splash-screen-widget'>
                <img src={widget.contents[0].properties.src} />
            </div>
        );
    }
);

export default _SplashScreenWidget;
