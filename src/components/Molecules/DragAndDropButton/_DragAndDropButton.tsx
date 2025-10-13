import { Button } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React from 'react';

const _DragAndDropButton = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IContentEntitiesController
>(({ controller }) => {
    useInitController(controller);

    const handleClick = () => {
        controller.isDisabled = !controller.isDisabled;
    };

    return (
        <Button
        className="drag-and-drop-button"
            onClick={handleClick}
            color={'primary'}
            variant={controller.isDisabled ? 'contained' : 'outlined'}
        >
            {controller.isDisabled
                ? 'Enable drag and drop'
                : 'Disable drag and drop'}
        </Button>
    );
});

export default _DragAndDropButton;
