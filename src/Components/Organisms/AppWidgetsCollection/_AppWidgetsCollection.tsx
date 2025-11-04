import React, { useCallback, useState } from 'react';
import { Text, Button, Collapse } from '@Reptile/Components/Atoms';
import clsx from 'clsx';
import { WidgetMenuItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';

import './_AppWidgetsCollection.scss';
import { WIDGETS } from '@Reptile/Constants/Constants';

const _AppWidgetsCollection = controlled<
    Reptile.Props.WidgetsCollectionProps,
    | Reptile.Controllers.ITemplateBuilderController
    | Reptile.Controllers.IAppBuildController
>(({ className, style, controller }) => {
    const [showAdvancedWidgets, setAdvancedWidgets] = useState(false);

    const handleClickShowMore = useCallback(() => {
        setAdvancedWidgets(true);
    }, []);

    return (
        <div className={clsx('rt-widgets-collection', className)} style={style}>
            <div className='widget-section'>
                <Text className='title' size='small' color='dark-gray'>
                    Base Elements
                </Text>
                <div className='widgets-container'>
                    {controller.basicCollection?.map(
                        ({ icon, kind, name, widget, friendlyName }) => {
                            if (
                                WIDGETS[controller.activePage]?.includes(name)
                            ) {
                                return (
                                    <WidgetMenuItem
                                        key={kind}
                                        name={friendlyName}
                                        Icon={icon}
                                        widget={widget}
                                        kind={kind}
                                    />
                                );
                            }
                            return;
                        }
                    )}
                </div>
            </div>
            {!showAdvancedWidgets && (
                <Button
                    variant='outlined'
                    color='gray'
                    onClick={handleClickShowMore}
                >
                    Show more
                </Button>
            )}
            <Collapse in={showAdvancedWidgets} mountOnEnter unmountOnExit>
                <div className='widget-section'>
                    <div className='widgets-container'>
                        {controller.advancedCollection.map(
                            ({ icon, kind, name, widget }) => (
                                <WidgetMenuItem
                                    key={kind}
                                    name={name}
                                    Icon={icon}
                                    widget={widget}
                                    kind={kind}
                                />
                            )
                        )}
                    </div>
                </div>
            </Collapse>
        </div>
    );
});

export default _AppWidgetsCollection;
