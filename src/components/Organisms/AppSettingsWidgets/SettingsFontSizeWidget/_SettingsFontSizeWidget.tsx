import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';
import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';

import './_SettingsFontSizeWidget.scss'

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'settings-font-size'
    ) as Reptile.Service.Widget
);

const _SettingsFontSizeWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {

        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div className='rt-settings-font-size-widget'>
                <label className='font-bold'>Article font size</label>
                <div className='flex-box-size'>
                    <button className='font-button-sm'>A</button>
                    <button className='font-button-md'>A</button>
                    <button className='font-button-lg'>A</button>
                    <button className='font-button-xl'>A</button>
                </div>
            </div>
        );
    }
);

export default _SettingsFontSizeWidget;
