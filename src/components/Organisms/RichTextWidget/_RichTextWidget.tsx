import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { TextEditor } from '@Reptile/Components/Organisms';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';

// 🧩 Helper utilities
const getWidgetContent = (widget?: WidgetModel) => widget?.contents?.[0] ?? null;

const getWidgetStyles = (widget?: WidgetModel): Record<string, any> => {
    if (!widget) return {};
    const contentStyles =
        widget.contents?.[0]?.styles ??
        widget.contents?.[0]?.properties?.styles;
    const widgetStyles =
        widget.properties?.styles ?? widget.properties?.general ?? widget.styles;
    return { ...widgetStyles, ...contentStyles };
};

const getWidgetHtml = (widget?: WidgetModel): string => {
    return (
        widget?.contents?.[0]?.properties?.general?.htmlBody ??
        widget?.properties?.general?.htmlBody ??
        ''
    );
};

// 🧠 Default widget (fallback)
const defaultWidget = new WidgetModel(
    AppWidgets.find(({ type }) => type === 'app-rich-text') as Reptile.Service.Widget
);

const _RichTextWidget = reactive<Reptile.Props.WidgetProps>(({ widget: widgetWithData }) => {
    const widget = widgetWithData ?? defaultWidget;
    const editorController = useController(WidgetEditorController);
    useInitController(editorController, widget);

    const styles = getWidgetStyles(widget);
    const htmlContent = getWidgetHtml(widget);

    return (
        <Flipped flipId={widgetWithData?.id ?? 'preview'}>
            <div
                className='rt-rich-text-widget'
                style={{
                    backgroundColor: styles.backgroundColor ?? 'transparent',
                    minHeight: styles.minHeight ?? 'auto',
                    padding: styles.padding ?? '0px',
                    textAlign: styles.textAlign ?? 'left',
                    width: styles.width ?? '100%',
                }}
            >
                {htmlContent ? (
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                ) : (
                    <TextEditor controller={editorController} disabled={true} />
                )}
            </div>
        </Flipped>
    );
});

export default _RichTextWidget;
