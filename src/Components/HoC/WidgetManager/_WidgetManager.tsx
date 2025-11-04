import React, { useEffect } from 'react';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

const _WidgetManager = controlled<React.PropsWithChildren, Reptile.Controllers.ITemplateBuilderController>(({
    children,
    controller,
}) => {
    useEffect(() => {
        // Register all available widgets

    }, [controller]);

    useInitController(controller);

    return (
        <>
            {children}
        </>
    )
});

export default _WidgetManager;
