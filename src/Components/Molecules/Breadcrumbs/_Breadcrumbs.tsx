import React from 'react';
import clsx from 'clsx';
import { Button, ChevronRightIcon } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_Breadcrumbs.scss';

const _Breadcrumbs = controlled<
    Reptile.Props.BreadcrumbsProps,
    Reptile.Controllers.IBreadcrumbsController
>(({ className, style, controller }) => {
    useInitController(controller);

    return (
        <div
            className={clsx(
                'rt-breadcrumbs',
                { empty: !controller.paths.length },
                className
            )}
            style={style}
        >
            {controller.paths.map((p, idx, arr) => (
                <React.Fragment key={idx}>
                    {!!idx && <ChevronRightIcon />}
                    <Button
                        disabled={() => controller.loading}
                        color={idx === arr.length - 1 ? 'primary' : 'gray'}
                        variant='link'
                        onClick={() => {
                            void controller.navigateTo(idx);
                        }}
                    >
                        {p}
                    </Button>
                </React.Fragment>
            ))}
        </div>
    );
});

export default _Breadcrumbs;
