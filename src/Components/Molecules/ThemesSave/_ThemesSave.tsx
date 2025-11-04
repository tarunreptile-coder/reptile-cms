import React from 'react';
import { Button } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

const _ThemesSave = controlled<
    Reptile.Props.SizePropertyProps,
    Reptile.Controllers.IThemesSaveChangesController
>(({ style, className, controller }) => {
    useInitController(controller);

    const handleAction = () => {
        return controller.status === 'pending';
    };

    return (
        <div className={className} style={style}>
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                        void controller.saveChanges();
                }}
                disabled={handleAction}
            >
                Save Changes
            </Button>
        </div>
    );
});

export default _ThemesSave;
