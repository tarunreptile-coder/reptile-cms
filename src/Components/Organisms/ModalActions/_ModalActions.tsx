import React from "react";

import { Button, Trash2Icon } from "@Reptile/Components/Atoms";

import "./_ModalActions.scss";
import { reactive } from "@Reptile/Framework";

const _ModalActions = reactive<Reptile.Props.ModalActionsProps>(
  (
    { actionEnabled, actionName, onDelete, showCancelButton = true, actionButtonColor = "primary" },
    { onCancelClick, onActionClick, onDeleteClick }
  ) => {
    return (
      <div className="rt-button-container">
        {showCancelButton && (
          <Button color="gray" onClick={onCancelClick}>
            Cancel
          </Button>
        )}        
        {onActionClick && (
          <Button
            variant="contained"
            color={actionButtonColor}
            onClick={onActionClick}
            disabled={actionEnabled}
          >
            {actionName}
          </Button>
        )}

        {onDelete && (
          <Button
            variant="contained"
            icon={<Trash2Icon />}
            color="error"
            onClick={onDeleteClick}
            disabled={actionEnabled}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
);
export default _ModalActions;
