import React from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_SettingsMenuTitle.scss';

const _SettingsMenuTitle = reactive<Reptile.Props.SettingsMenuTitleProps>(
    ({ className, style }) => {
        return (
            <div
                className={clsx(['rt-settings-title', className])}
                style={style}
            >
                <Text color='dark-gray' size='extra-large' weight='medium'>
                    Settings
                </Text>
                <Text color='light-gray' size='medium' weight='regular'>
                    Manage how your widget will display content.
                </Text>
            </div>
        );
    }
);

export default _SettingsMenuTitle;
