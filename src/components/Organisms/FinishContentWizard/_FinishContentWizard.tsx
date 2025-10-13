import {
  AndroidForm,
  FinishQuestionsCard,
  HelpSettings,
  IOSForm,
} from "@Reptile/Components/Organisms";
import React, { useCallback, useEffect, useState } from "react";

import "./_FinishContentWizard.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabList, TabContext, TabPanel as MUITabPanel } from "@mui/lab";
import { controlled } from "@Reptile/Framework";
import { useInitController } from "@Reptile/Hooks";
import {
  Notification,
  PDFViewer,
  ProgressCircle,
  TabPanel,
  TabPanels,
} from "@Reptile/Components/Atoms";
import { FinishContactCard } from "@Reptile/Components/Molecules";

import "./_FinishContentWizard.scss";
import { MESSAGES } from "@Reptile/Constants/Constants";

type TabValues = "steps" | "video";

const ALLOWED_FORMATS_BY_FIELD: Record<
  string,
  { extensions: string[]; mimeTypes: string[] }
> = {
  serviceAccountJsonBlobURL: {
    extensions: [".json"],
    mimeTypes: ["application/json"],
  },
  keyStoreFileName: {
    extensions: [".keystore", ".jks"],
    mimeTypes: ["application/octet-stream"],
  },
};

const _FinishContentWizard = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.IFinishController
>(({ controller }) => {
  useInitController(controller);

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    keyStoreFileName: null,
    serviceAccountJsonBlobURL: null,
  });
  const [guideTab, setGuideTab] = useState<TabValues>("steps");
  const [loading, setLoading] = useState<Boolean>(true);

  const onSelectNew = useCallback(() => {
    controller.step = controller.step + 1;
  }, [controller]);

  const onSelectExisting = useCallback(() => {
    controller.existing = !controller.existing;
    // get data from API
    // detect type ios or android
    // set details in android or ios
  }, [controller]);

  const onActionClick = useCallback(() => {
    controller.onActionClick();
  }, [controller]);

  const onBackClick = useCallback(() => {
    controller.step = controller.step - 1;
    controller.submit = false;
  }, [controller]);

  const onSelectAndroid = useCallback(() => {
    controller.type = "android";
    controller.step = 3;
  }, [controller]);

  const onSelectIOS = useCallback(() => {
    controller.type = "IOS";
    controller.step = 3;
  }, [controller]);

  const handleAndroidChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      controller.android = { ...controller.android, [name]: value };
    },
    [controller]
  );

  const handleIOSChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      controller.IOS = { ...controller.IOS, [name]: value };
    },
    [controller]
  );

  const isValidFileType = (file: File, name: string) => {
    let isFileTypeValid = true;
    const allowed = ALLOWED_FORMATS_BY_FIELD[name];

    const fileName = file.name.toLowerCase();
    const fileType = file.type;

    const isValid =
      allowed.extensions.some((ext) => fileName.endsWith(ext)) ||
      allowed.mimeTypes.includes(fileType);

    if (!isValid) {
      const allowedList = [...allowed.extensions].join(", ");
      Notification.error({
        description: `${MESSAGES.ERROR_INVALID_FILE.message} Only ${allowedList} files are allowed.`,
      });
      isFileTypeValid = false;
    }

    return isFileTypeValid;
  };

  const handleFileDropped = useCallback(
    (file: File | null, name: string) => {
      if (file) {
        const isFileValid = isValidFileType(file, name);
        if (!isFileValid) {
          return;
        }
      }
      const event: any = {
        target: { name, value: file }, //? URL.createObjectURL(file) : file
      };
      handleAndroidChange(event);
      setFiles((prev) => ({ ...prev, [name]: file }));
    },
    [controller]
  );

  const onTabChange = (_event: React.SyntheticEvent, tabName: TabValues) => {
    setGuideTab(tabName);
  };

  useEffect(() => {
    setLoading(true);
  }, [controller.step, guideTab]);

  const getPDFUrl = (): string => {
    let PDFUrl = "";
    switch (true) {
      case controller?.type === "android" && controller.step === 3:
        PDFUrl = "/build/step3_to_fill_forms.pdf";
        break;
      case controller?.type === "android" && controller.step === 4:
        PDFUrl = "/build/step4_to_fill_forms.pdf";
        break;
      default:
        break;
    }
    return PDFUrl;
  };

  return (
    <div
      className={`rt-finish-content-wizard ${
        controller.step <= 2 ? "wizard-flex-box" : ""
      }`}
    >
      <TabPanels
        activeIndex={() => (controller.step <= 2 ? controller.step - 1 : 3 - 1)}
      >
        <TabPanel>
          {!controller.existing ? (
            <FinishQuestionsCard
              title={"Are you already a customer?"}
              button1={{
                name: "New",
                action: onSelectNew,
              }}
              button2={{
                name: "Existing",
                action: onSelectExisting,
              }}
            />
          ) : (
            <FinishContactCard onSelectExisting={onSelectExisting} />
          )}
        </TabPanel>

        <TabPanel>
          <FinishQuestionsCard
            title={"Pick your Operating system"}
            button1={{
              name: "Android",
              action: onSelectAndroid,
            }}
            button2={{ name: "IOS", action: onSelectIOS, disabled: true }}
            onBackClick={onBackClick}
          />
        </TabPanel>

        {controller.type === "android" && (
          <TabPanel>
            <AndroidForm
              step={controller.step}
              submit={controller.submit}
              onBackClick={onBackClick}
              onAction={onActionClick}
              keyStoreFileUploadInfo={controller.keyStoreFileUploadInfo}
              onAndroidChange={handleAndroidChange}
              android={controller.android}
              navigateToDocs={() => controller.navigateToDocs()}
              navigateToMail={() => {
                controller.navigateToMail();
              }}
              isDisabled={controller.isDisabled}
              existing={false}
              uploadedFiles={files}
              handleFileDropped={handleFileDropped}
            />
          </TabPanel>
        )}

        {controller.type === "IOS" && (
          <TabPanel>
            <IOSForm
              step={controller.step}
              submit={controller.submit}
              onBackClick={onBackClick}
              onAction={onActionClick}
              onIOSChange={handleIOSChange}
              IOS={controller.IOS}
              navigateToDocs={() => controller.navigateToDocs()}
              navigateToMail={() => {
                controller.navigateToMail();
              }}
              isDisabled={controller.isDisabled}
            />
          </TabPanel>
        )}
      </TabPanels>
      {!controller.isSubmitted &&
        !controller.existing &&
        controller.step > 2 && (
          <Box
            className="rt-card tabs-container"
            sx={{ width: "100%", typography: "body1" }}
          >
            <TabContext value={guideTab}>
              <div className="tabs_layout">
                <Box
                  className="tabs-panel"
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    className="tabs-list"
                    onChange={onTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Step By Step Guide"
                      value="steps"
                      className="steps-tab"
                    />
                    <Tab
                      label="Video Tutorial"
                      value="video"
                      className="video-tab"
                    />
                  </TabList>
                </Box>
              </div>
              <Box
                className="tabs-content-wrapper"
                sx={{ width: "100%", typography: "body1" }}
              >
                <div className="tabs-content">
                  <MUITabPanel value={guideTab} className="panel-content">
                    {guideTab === "steps" && (
                      <>
                        {/* {loading && (
                          <div className="progress-container">
                            <ProgressCircle variant="indeterminate" size="xs" />
                          </div>
                        )}
                        <iframe
                          className="iFrame"
                          src={`${getPDFUrl()}#toolbar=0&navpanes=0&transparent=0`}
                          width="100%"
                          style={{
                            backgroundColor: "#ffffff",
                            border: "none",
                            display: loading ? "none" : "block", // hide until loaded
                          }}
                          onLoad={() => setLoading(false)}
                        /> */}
                        <PDFViewer
                          url={getPDFUrl()}
                          customStyle={{
                            width: "100%",
                            height: "calc(100vh - 190px)",
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "scroll",
                            boxSizing: "border-box",
                            backgroundColor: "#f9f9f9",
                          }}
                        />
                      </>
                    )}
                    {guideTab === "video" && (
                      <h3>Video-{controller?.step} Tutorial</h3>
                    )}
                  </MUITabPanel>
                </div>
              </Box>
            </TabContext>
          </Box>
        )}
    </div>
  );
});

export default _FinishContentWizard;
