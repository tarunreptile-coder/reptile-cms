import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';
import { NavigationManager } from '@Reptile/Components/HoC';

import './_Page.scss';

const _Page = reactive<Reptile.Props.PageProps>(
    ({ className, style, children, backgroundColor }) => {    
        return (
            <NavigationManager>
                <div
                    className={clsx(
                        'rt-page',
                        `background-${backgroundColor ?? 'default'}`,
                        className
                    )}
                    style={style}
                >
                    {children}
                </div>
            </NavigationManager>
        );
    }
);

export default _Page;
