import React from 'react';
import clsx from 'clsx';
import {
    DraggableItem,
    MoreVerticalIcon,
    Text,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_WidgetMenuItem.scss';

const _WidgetMenuItem = reactive<Reptile.Props.WidgetMenuItemProps>(
    ({ className, style, kind }, { widget, name, Icon }) => {

        return (
            <DraggableItem
                context={{
                    element: widget,
                    kind,
                }}
            >
                <div
                    className={clsx('rt-widget-menu-item', className)}
                    style={style}
                >
                    <Icon className='image' width={64.43} height={57.7} />
                    <Text size='small' color='light-gray' weight='regular'>
                        {name}
                    </Text>
                    <div className='drag-handle'>
                        <MoreVerticalIcon />
                        <MoreVerticalIcon />
                    </div>
                </div>
            </DraggableItem>
        );
    }
);

export default _WidgetMenuItem;
