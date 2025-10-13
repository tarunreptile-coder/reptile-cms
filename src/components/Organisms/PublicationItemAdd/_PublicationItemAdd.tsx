import React, { useCallback } from "react";
import { FolderIcon, LayoutIcon, Modal } from "@Reptile/Components/Atoms";
import { ListItem, NewContentButton } from "@Reptile/Components/Molecules";
import { controlled } from "@Reptile/Framework";
import { useInitController } from "@Reptile/Hooks";

import { NewFolderModal } from "..";

const _PublicationItemAdd = controlled<
  Reptile.Props.PublicationItemProps,
  Reptile.Controllers.IPublicationItemController
>(({ className, style, controller }) => {
  useInitController(controller);

  const handleNameChange = useCallback(
    (newName: string) => {
      controller.name = newName;
    },
    [controller]
  );

  const handleIssueClose = useCallback(() => {
    controller.onClickIssue();
  }, [controller]);

  const handleIssueSubmit = useCallback(() => {
    void controller.createIssue();
  }, [controller]);

  return (
    <>
      <NewContentButton className={className} style={style} title="New item">
        <ListItem
          text="Issue"
          leftElement={<FolderIcon />}
          onClick={controller.onClickIssue.bind(controller)}
        />
      </NewContentButton>

      <Modal visible={() => !!controller.modalIssue}>
        <NewFolderModal
          onCancelClick={handleIssueClose}
          onSaveClick={handleIssueSubmit}
          onNameChange={handleNameChange}
          name={controller.name}
          displayImage={null}
          actionEnabled={undefined} // onFileDropped={(e) => {
          //     e;
          // }}
          // displayImage={''}
        />
      </Modal>
    </>
  );
});

export default _PublicationItemAdd;
