import React from 'react';
import { Text, Collapse } from '@Reptile/Components/Atoms';
import clsx from 'clsx';
import { WidgetMenuItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';

import './_WidgetsCollection.scss';

const _WidgetsCollection = controlled<
    Reptile.Props.WidgetsCollectionProps,
    | Reptile.Controllers.ITemplateBuilderController
    | Reptile.Controllers.IAppBuildController
>(({ className, style, controller }) => {
  
    return (
        <div className={clsx('rt-widgets-collection', className)} style={style}>
             <div className='widget-section'>
                <Text className='title' size='small' color='dark-gray'>
                    Dynamic Widgets
                </Text>
                <div className='widgets-container'>
                    {controller.advancedCollection
                        .filter(widget => [
                            'telerik-pie-chart',
                            'telerik-button',
                            'app-top-story', 
                            'app-article-collection-column', 
                            'app-article-collection', 
                            'app-article-collection-two-items', 
                            'app-article-carousel', 
                            'app-section-carousel', 
                            'app-article-carousel-simple',
                        ].includes(widget.kind))
                        .map(({ icon, kind, name, widget }) => (
                            <WidgetMenuItem
                                key={kind}
                                name={name}
                                Icon={icon}
                                widget={widget}
                                kind={kind}
                            />
                        ))}
                        
                </div>
            </div>
            <div className='widget-section'>
                <Text className='title' size='small' color='dark-gray'>
                    Static Widgets
                </Text>
                <div className='widgets-container'>
                    {controller.basicCollection
                        .filter(widget => ['app-rich-text', 'app-button', 'nav-button', 'url-button', 'app-image'].includes(widget.kind))
                        .map(({ icon, kind, name, widget }) => (
                            <WidgetMenuItem
                                key={kind}
                                name={name}
                                Icon={icon}
                                widget={widget}
                                kind={kind}
                            />
                        ))}
                </div>
            </div>          
        </div>
    );
});

export default _WidgetsCollection;

