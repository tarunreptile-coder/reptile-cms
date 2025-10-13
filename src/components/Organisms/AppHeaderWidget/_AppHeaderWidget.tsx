import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import { WidgetModel } from '@Reptile/Store/Models';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import React from 'react';

import './_AppHeaderWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'header'
    ) as Reptile.Service.Widget
);

const _AppHeaderWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }, {}) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <div className='rt-app-template-header'>
                <img className='header-img' src={widget.contents[0].properties.src} />
                <div className='header'>
                    <div className='header-top'>
                        <h1 className='app-name'>{widget.contents[0].properties.text}</h1>
                        <button className='menu-toggle' title='Navigation menu'>
                            <span>
                                <svg
                                    className='menu-icon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

export default _AppHeaderWidget;
