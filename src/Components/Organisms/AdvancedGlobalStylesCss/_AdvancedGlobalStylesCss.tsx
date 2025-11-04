import React, { useCallback } from "react";
import { Button, Modal, TextEditor } from "@Reptile/Components/Atoms";
import { controlled } from "@Reptile/Framework";
import { useInitController } from "@Reptile/Hooks";
import { ModalActions, ModalContent } from "@Reptile/Components/Organisms";
import { ModalTitle } from "@Reptile/Components/Molecules";

const _AdvancedGlobalStylesCss = controlled<
  Reptile.Props.PublicationItemProps,
  Reptile.Controllers.IAdvancedGlobalStylesCssController
>(({ className, style, controller }) => {
  useInitController(controller);

  const handleSaveClick = useCallback(() => {
    if (controller.css) {
      void controller.updateJsonStructure();
    }
  }, [controller]);

  const handleModalClick = useCallback(() => {
    controller.modal = !controller.modal;
  }, [controller]);

  return (
    <>
      <Button
        style={{
          width: "50%",
          backgroundColor: "#fff",
          borderColor: "#6941c6",
          color: "#6941c6",
        }}
        variant="outlined"
        color="primary"
        size="sm"
        onClick={handleModalClick}
      >
        Advanced CSS
      </Button>

      <Modal visible={!!controller.modal}>
        <ModalTitle title="Advanced CSS" />
        <ModalContent style={{ width: "50vw" }}>
          <TextEditor controller={controller} />
        </ModalContent>
        <ModalActions
          onCancelClick={handleModalClick}
          onActionClick={handleSaveClick}
          actionEnabled={false}
          actionName={"Save"}
        />
      </Modal>
    </>
  );
});

export default _AdvancedGlobalStylesCss;
