import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { reactive } from '@Reptile/Framework';
import AppWidgets from '@Reptile/Assets/AppWidgets.json';
import { WidgetModel } from '@Reptile/Store/Models';
import { useController, useInitController } from '@Reptile/Hooks';
import { WidgetLinkedContentController } from '@Reptile/Store/Controllers';
import {
    WidgetCaptionSkeleton,
    WidgetImageSkeleton,
    WidgetNameSkeleton,
    WidgetPublishDateSkeleton,
} from '@Reptile/Components/Atoms';

import './_AdWidget.scss';

const defaultWidget = new WidgetModel(
    AppWidgets.find(({ type }) => type === 'ad') as Reptile.Service.Widget
);

const _AdWidget = reactive<Reptile.Props.WidgetProps>(
    ({ widget: widgetWithData }) => {
        const widget = widgetWithData ?? defaultWidget;
        const controller = useController(WidgetLinkedContentController);
        useInitController(controller, widget);

        return (
            <Flipped flipId={widgetWithData?.id ?? 'preview'}>
                <div className='rt-ad-widget'>
                    <div className='ad-image'>
                        <WidgetImageSkeleton
                            loading={() => controller.loading}
                        />
                        <span className='wad-title'>Ad</span>
                    </div>
                    <div className='ad-text-container'>
                        <WidgetNameSkeleton
                            loading={() => controller.loading}
                        />
                        <WidgetCaptionSkeleton
                            loading={() => controller.loading}
                        />
                        <WidgetCaptionSkeleton
                            loading={() => controller.loading}
                        />
                        <WidgetPublishDateSkeleton
                            loading={() => controller.loading}
                        />
                    </div>
                </div>
            </Flipped>
        );
    }
);

export default _AdWidget;
