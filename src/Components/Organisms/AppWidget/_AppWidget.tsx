import { reactive } from '@Reptile/Framework';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetEditorController } from '@Reptile/Store/Controllers';
import React, { ReactNode } from 'react';

import './_AppWidget.scss';
import { TextEditor } from '..';
import ReactHtmlParser from 'react-html-parser';
import { Flipped } from 'react-flip-toolkit';

interface ComponentProps {
    className: string;
    children: CustomComponent[];
    style: string;
    src: string;
}

interface CustomComponent {
    props: ComponentProps;
    type: string;
}

const _AppWidget = reactive<Reptile.Props.AppWidgetProps>(
    ({ widgetData, widgetHTML }) => {
        const editorController = useController(WidgetEditorController);
        useInitController(editorController, widgetData);

        let html = widgetHTML;

        for (let i = 0; i < widgetData.contents.length; i++) {
            if (widgetData.contents[i].type === 'img') {
                const srcValue = widgetData.contents[i].properties.src ?? '';
                const placeholder = `{{src}}`;
                const replacement = srcValue ?? '';

                const startIndex = html.indexOf(placeholder);

                if (startIndex !== -1) {
                    html =
                        html.slice(0, startIndex) +
                        replacement +
                        html.slice(startIndex + placeholder.length);
                }
            }

            if (widgetData.contents[i].type === 'input') {
                const placeholderValue =
                    widgetData.contents[i].properties.label ?? '';
                const placeholder = `{{placeholder}}`;
                const replacement = placeholderValue ?? '';

                const startIndex = html.indexOf(placeholder);

                if (startIndex !== -1) {
                    html =
                        html.slice(0, startIndex) +
                        replacement +
                        html.slice(startIndex + placeholder.length);
                }
            }

            if (widgetData.type === "bookmark" && widgetData.contents[i].type === 'svg') {
                const bookmarkColor = widgetData.contents[i].styles?.backgroundColor;
                if(bookmarkColor) {
                    const valueToReplace = bookmarkColor ? `fill="${bookmarkColor}"` : '';
                    const wordToFind = `fill="none"`;
                    const bookmarkIndex = html.indexOf(wordToFind);
                    if (bookmarkIndex !== -1) {
                        html =
                            html.slice(0, bookmarkIndex) +
                            valueToReplace +
                            html.slice(bookmarkIndex + wordToFind.length);
                    }
                }
                
            }
        }

        html = html
            .replace('{{widget-container}}', 'style = {}')
            .replace('{{image-styles}}', 'style = {}')
            .replaceAll('href="{{link}}"', '')

        const component = ReactHtmlParser(html) as CustomComponent[];

        if (
            component[0].props.className.includes('replace-text') ||
            component[0].props.children[0]?.props?.className?.includes(
                'replace-text'
            )
        ) {
            const textClass =
                component[0].props.children[0]?.props?.className.replace(
                    'replace-text',
                    ''
                );

            component[0].props.children.shift();
            component[0].props.children.push(
                <TextEditor
                    className={textClass}
                    style={{}}
                    controller={editorController}
                    disabled={true}
                />
            );
        }

        if (component[0].props.className.includes('widget-container')) {
            Object.assign(
                component[0].props.style,
                Object.values(widgetData.styles)[0]
            );
        }

        let iteration = 0;

        function mapData(component: ComponentProps) {
            for (const item of component.children) {
                
                if (item.props?.style && widgetData.contents.length > 0) {
                    Object.assign(
                        item.props.style,
                        Object.values(widgetData.contents[iteration]?.styles ?? {})[0]
                    );
                }
                iteration++;

                if (item.props?.children && item.props?.children[0]?.props) {
                    mapData(item.props);
                }
            }
        }

        mapData(component[0].props);

        return (
            <Flipped flipId={widgetData?.id ?? 'preview'}>
                <div className='widget'>{component as ReactNode}</div>
            </Flipped>
        );
    }
);

export default _AppWidget;
