import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { TextEditor } from '@Reptile/Components/Organisms';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';

const defaultWidget = new WidgetModel(
    AppWidgets.find(
        ({ type }) => type === 'app-rich-text'
    ) as Reptile.Service.Widget
);

const _RichTextWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widget);

        return (
            <Flipped flipId={widgetWithData?.id ?? 'preview'}>
                <div
                    className='rt-rich-text-widget'
                    style={{
                        backgroundColor: widget?.styles?.backgroundColor,
                        minHeight: widget?.styles?.minHeight,
                        padding: widget?.styles?.padding,
                    }}
                >
                    <TextEditor controller={editorController} disabled={true} />
                </div>
            </Flipped>
        );
    }
);

export default _RichTextWidget;
