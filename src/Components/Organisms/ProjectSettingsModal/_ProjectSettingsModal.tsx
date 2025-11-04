import React, { useEffect, useState } from "react";

import {
  FileDrop,
  ModalFileContent,
  ModalInput,
  ModalTitle,
} from "@Reptile/Components/Molecules";
import {
  Divider,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  SettingsIcon,
  Text,
  Card,
  Trash2Icon,
  Button,
  ClickableIcon,
  PlusIcon,
  Notification,
  ListIcon,
} from "@Reptile/Components/Atoms";
import {
  ContentStyles,
  ModalActions,
  ModalContent,
} from "@Reptile/Components/Organisms";
import { reactive } from "@Reptile/Framework";
import "./_ProjectSettingsModal.scss";
import clsx from "clsx";
import { MESSAGES } from "@Reptile/Constants/Constants";
import { UTILS } from "~/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const SETTINGS_TABS: ["settings", "fonts"] = ["settings", "fonts"];

const SETTINGS_INDEX = {
  settings: 0,
  fonts: 1,
};

const initialFont = {
  name: "",
  path: "",
  fontFile: null,
  license: "",
  relatedEntity: "",
};

const _ProjectSettingsModal = reactive<Reptile.Props.ModalFileSaveProps>(
  (
    {
      name,
      displayImage,
      fileUploadInfo,
      actionEnabled,
      editTheme,
      isPublisher,
      fonts,
      currentEntity,
    },
    {
      onCancelClick,
      onSaveClick,
      onFileDropped,
      onNameChange,
      handleDeleteFont,
      handleSaveFont,
    }
  ) => {
    const [tabSelected, setTabSelected] = useState<string>("settings");
    const [isNewFontAdd, setIsNewFontAdd] = useState<boolean>(false);
    const [font, setFont] = useState<any>({
      ...initialFont,
      relatedEntity: currentEntity?.id,
    });

    useEffect(() => {
      if (tabSelected === "fonts" && fonts && fonts.length > 0) {
        UTILS.loadFontsCssInHead(fonts);
      }
      setFont({ ...initialFont, relatedEntity: currentEntity?.id });
      setIsNewFontAdd(false);
    }, [tabSelected, fonts]);

    const handleActionEnabled = () => {
      return name.trim().length < 2 || actionEnabled === "pending";
    };

    const handleTabSelect = (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      idx: number
    ) => {
      setTabSelected(SETTINGS_TABS[idx]);
    };

    const handleFileUpload = (file: File | null) => {
      if (file) {
        const name = file?.name || "";
        const ext = name?.split(".").pop().toLowerCase();
        const allowed = ["ttf", "otf", "woff", "woff2"];

        if (!allowed.includes(ext)) {
          const allowedList = allowed.join(", ");
          Notification.error({
            description: `${MESSAGES.ERROR_INVALID_FILE.message} Only ${allowedList} files are allowed.`,
          });
          return;
        }
      }
      setFont({ ...font, fontFile: file });
    };

    const settingsComponent = () => {
      return (
        <>
          <Text
            style={{ marginTop: "20px" }}
            size="small"
            color="light-gray"
            weight="regular"
          >
            Edit the name of your project.
          </Text>
          <div>
            <Text size="small" color="dark-gray" weight="semibold">
              Cover Image
            </Text>
            {onFileDropped ? (
              <ModalFileContent
                onFileDropped={onFileDropped}
                displayImage={displayImage ?? ""}
                fileUploadInfo={fileUploadInfo}
              />
            ) : null}
          </div>
          <div>
            <Text size="small" color="dark-gray" weight="semibold">
              Name
            </Text>
            <ModalInput
              userInput={name}
              onNameChange={(e) => onNameChange(e.target.value)}
            />
          </div>
          {editTheme && <ContentStyles controller={editTheme} />}
        </>
      );
    };

    return (
      <>
        <div className="modal-wrapper">
          <ModalTitle icon={<SettingsIcon />} title="Project settings" />
          <ModalContent>
            {isPublisher && (
              <>
                <Tabs
                  selectedTabIndex={SETTINGS_INDEX[tabSelected]}
                  onSelect={handleTabSelect}
                  type="default"
                >
                  <Tab label="Settings" />
                  <Tab label="Fonts" />
                </Tabs>
                <Divider className="header-divider" />
                <TabPanels
                  className={clsx("rt-project-wizard")}
                  activeIndex={SETTINGS_INDEX[tabSelected]}
                >
                  <TabPanel className="wizard-step-container">
                    {settingsComponent()}
                  </TabPanel>
                  <TabPanel>
                    <div className="title-container">
                      <Text size="medium" color="dark-gray" weight="semibold">
                        Fonts
                      </Text>
                      {!isNewFontAdd && (
                        <Button
                          color="primary"
                          icon={<PlusIcon />}
                          iconPosition={"left"}
                          onClick={() => setIsNewFontAdd(true)}
                        >
                          New Font
                        </Button>
                      )}
                      {isNewFontAdd && (
                        <Button
                          color="primary"
                          icon={<ListIcon />}
                          iconPosition={"left"}
                          onClick={() => {
                            setIsNewFontAdd(false);
                            setFont({
                              ...initialFont,
                              relatedEntity: currentEntity?.id,
                            });
                          }}
                        >
                          Fonts List
                        </Button>
                      )}
                    </div>
                    {isNewFontAdd && (
                      <>
                        <Text size="small" color="dark-gray" weight="semibold">
                          Name
                        </Text>
                        <ModalInput
                          userInput={font.name}
                          onNameChange={(e) =>
                            setFont({ ...font, name: e.target.value })
                          }
                        />
                        <Text size="small" color="dark-gray" weight="semibold">
                          Font File
                        </Text>
                        <div className="upload-wrapper">
                          {font.fontFile && (
                            <>
                              <div
                                className="trash_icon"
                                onClick={() => handleFileUpload(null)}
                              >
                                <div className="image-container">
                                  <Trash2Icon />
                                </div>
                              </div>
                              <div className="uploaded-box">
                                <FontAwesomeIcon
                                  icon={faFile}
                                  color="#525252"
                                />
                                <div className="file-name">
                                  {font.fontFile?.name}
                                </div>
                              </div>
                            </>
                          )}
                          {!font.fontFile && (
                            <FileDrop
                              className="file-drop-box"
                              allowedExtensions=".ttf,.otf,.woff,.woff2"
                              onFileDropped={handleFileUpload}
                              hint="ttf, otf, woff or woff2"
                            />
                          )}
                        </div>
                        <Text size="small" color="dark-gray" weight="semibold">
                          License
                        </Text>
                        <ModalInput
                          userInput={font.license}
                          onNameChange={(e) =>
                            setFont({ ...font, license: e.target.value })
                          }
                        />
                      </>
                    )}
                    {!isNewFontAdd && (
                      <Card className="font-container">
                        {fonts &&
                          fonts?.length > 0 &&
                          fonts.map((font: Reptile.Models.Font) => {
                            return (
                              <div className="font-row" key={font.id}>
                                <Text
                                  style={{ fontFamily: font.name.name }}
                                  size="primary"
                                  color="black"
                                >
                                  {font.name.name}
                                </Text>
                                <ClickableIcon
                                  icon={<Trash2Icon />}
                                  onClick={() =>
                                    handleDeleteFont &&
                                    handleDeleteFont(font.id)
                                  }
                                />
                              </div>
                            );
                          })}
                      </Card>
                    )}
                  </TabPanel>
                </TabPanels>
              </>
            )}
            {!isPublisher && settingsComponent()}
          </ModalContent>
        </div>
        {(!isPublisher || (isPublisher && tabSelected === "settings")) && (
          <ModalActions
            onCancelClick={onCancelClick}
            onActionClick={onSaveClick}
            actionEnabled={handleActionEnabled}
            actionName={"Save"}
          />
        )}
        {isPublisher && tabSelected === "fonts" && (
          <>
            {isNewFontAdd && (
              <ModalActions
                onCancelClick={onCancelClick}
                onActionClick={() => handleSaveFont(font)}
                actionEnabled={!font.name || !font.fontFile}
                actionName={"Create Font"}
              />
            )}
            {!isNewFontAdd && <ModalActions onCancelClick={onCancelClick} />}
          </>
        )}
      </>
    );
  }
);

export default _ProjectSettingsModal;
