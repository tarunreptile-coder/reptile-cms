import React from 'react';
import { TopItemWidgetIcon } from '@Reptile/Components/Atoms';
import Widget from '@Reptile/Store/Models/Template/_Widget';

const _useRegisterAppWidgets = (
    controller: Reptile.Controllers.IAppBuildController
) => {
    controller.defaultWidgets?.map(({ name, json, html, settings }) => {
        const type = name.toLowerCase().replace(/\s/g, '');

        controller.register(type, {
            name: type,
            icon: TopItemWidgetIcon as React.FunctionComponent<
                React.SVGProps<React.ReactSVGElement>
            >,
            widget: { json: new Widget(JSON.parse(json) as Reptile.Service.Widget), html: html },
            category: 'basic',
            settings: JSON.parse(settings) as Reptile.Controllers.WidgetSettingsLayout,
        });
    });
};

export default _useRegisterAppWidgets;
