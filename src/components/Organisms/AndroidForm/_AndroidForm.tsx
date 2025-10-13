import { reactive } from "@Reptile/Framework";
import React from "react";

import "./_AndroidForm.scss";
import {
  FileDrop,
  FileUploadProgress,
  FinishActions,
  InputField,
} from "@Reptile/Components/Molecules";
import { FinishSteps } from "..";
import { Card, Collapse, Text } from "@Reptile/Components/Atoms";
import { TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode, faFile } from "@fortawesome/free-solid-svg-icons";

const _AndroidForm = reactive<Reptile.Props.AndroidFormProps>(
  (
    {
      step,
      submit,
      android,
      isDisabled,
      existing,
      keyStoreFileUploadInfo,
      uploadedFiles,
    },
    {
      onAction,
      onBackClick,
      onAndroidChange,
      navigateToDocs,
      navigateToMail,
      handleFileDropped,
    }
  ) => {
    const renderFileIcon = (fileName: string) => {
      const ext = fileName?.split(".")?.pop()?.toLowerCase();

      switch (ext) {
        case "json":
          return <FontAwesomeIcon icon={faFileCode} color="#525252" />;
        case "jks":
        case "keystore":
          return <FontAwesomeIcon icon={faFile} color="#525252" />;
        default:
          return <FontAwesomeIcon icon={faFile} color="#525252" />;
      }
    };

    return (
      <Card className={"rt-android-card"}>
        {step === 3 && (
          <FinishSteps
            title={"Account and Name"}
            navigateToDocs={navigateToDocs}
            navigateToMail={navigateToMail}
          >
            <div className="input-container">
              <InputField
                label={"AndroidServiceAccount"}
                name={"androidServiceAccount"}
                value={android?.androidServiceAccount}
                onChange={onAndroidChange}
              />
              <InputField
                label={"AppIdentifier"}
                name={"appIdentifier"}
                value={android?.appIdentifier}
                onChange={onAndroidChange}
              />
            </div>
            <div className="input-container">
              <div style={{ width: "50%" }}>
                <Text
                  className="rt-input-field-label"
                  color="gray"
                  size="small"
                  weight="medium"
                  style={{ marginBottom: "6px" }}
                >
                  ServiceAccountJson
                </Text>
                <div className="upload-wrapper">
                  {android?.serviceAccountJsonBlobURL ? (
                    <>
                      <div
                        className="trash_icon"
                        onClick={() =>
                          handleFileDropped(null, "serviceAccountJsonBlobURL")
                        }
                      >
                        <div className="image-container">
                          <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 24 24"
                            fill="#000"
                            aria-hidden="true"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="uploaded-box">
                        {renderFileIcon(
                          uploadedFiles?.serviceAccountJsonBlobURL?.name
                        )}
                        <div className="file-name">
                          {uploadedFiles?.serviceAccountJsonBlobURL?.name}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FileDrop
                        className="file-drop-box"
                        allowedExtensions=".json,application/json"
                        onFileDropped={(file) =>
                          handleFileDropped(file, "serviceAccountJsonBlobURL")
                        }
                        hint="Json"
                      />
                      <TransitionGroup
                        className={clsx({
                          "rt-upload-cover-image-hidden":
                            !uploadedFiles.serviceAccountJsonBlobURL &&
                            !keyStoreFileUploadInfo,
                        })}
                      >
                        {!!keyStoreFileUploadInfo && (
                          <Collapse key="progress">
                            <FileUploadProgress
                              fileName={keyStoreFileUploadInfo.filename}
                              fileSizeInBytes={
                                keyStoreFileUploadInfo.sizeInBytes
                              }
                              uploadPercentage={keyStoreFileUploadInfo.progress}
                            />
                          </Collapse>
                        )}
                      </TransitionGroup>
                    </>
                  )}
                </div>
              </div>
            </div>
          </FinishSteps>
        )}
        {step === 4 && (
          <FinishSteps
            title={"API keys"}
            navigateToDocs={navigateToDocs}
            navigateToMail={navigateToMail}
          >
            <div className="input-container">
              <InputField
                label={"KeyAlias"}
                name={"keyAlias"}
                value={android?.keyAlias}
                onChange={onAndroidChange}
              />
              <InputField
                label={"KeyPassword"}
                name={"keyPassword"}
                type="password"
                value={android?.keyPassword}
                onChange={onAndroidChange}
              />
            </div>

            <div className="input-container">
              <div style={{ width: "50%" }}>
                <Text
                  className="rt-input-field-label"
                  color="gray"
                  size="small"
                  weight="medium"
                  style={{ marginBottom: "6px" }}
                >
                  KeyStoreFileName
                </Text>
                <div className="upload-wrapper">
                  {android?.keyStoreFileName ? (
                    <>
                      <div
                        className="trash_icon"
                        onClick={() =>
                          handleFileDropped(null, "keyStoreFileName")
                        }
                      >
                        <div className="image-container">
                          <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 24 24"
                            fill="#000"
                            aria-hidden="true"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="uploaded-box">
                        {renderFileIcon(uploadedFiles?.keyStoreFileName?.name)}
                        <div className="file-name">
                          {uploadedFiles?.keyStoreFileName?.name}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FileDrop
                        className="file-drop-box"
                        allowedExtensions=".keystore,.jks"
                        onFileDropped={(file) =>
                          handleFileDropped(file, "keyStoreFileName")
                        }
                        hint=".jsk or .keystore"
                      />
                      <TransitionGroup
                        className={clsx({
                          "rt-upload-cover-image-hidden":
                            !uploadedFiles.keyStoreFileName &&
                            !keyStoreFileUploadInfo,
                        })}
                      >
                        {!!keyStoreFileUploadInfo && (
                          <Collapse key="progress">
                            <FileUploadProgress
                              fileName={keyStoreFileUploadInfo.filename}
                              fileSizeInBytes={
                                keyStoreFileUploadInfo.sizeInBytes
                              }
                              uploadPercentage={keyStoreFileUploadInfo.progress}
                            />
                          </Collapse>
                        )}
                      </TransitionGroup>
                    </>
                  )}
                </div>
              </div>
              <InputField
                style={{ width: "50%" }}
                label={"KeyStorePassword"}
                name={"keyStorePassword"}
                type="password"
                value={android?.keyStorePassword}
                onChange={onAndroidChange}
              />
            </div>
          </FinishSteps>
        )}
        {step === 5 && (
          <FinishSteps
            title={"API keys"}
            navigateToDocs={navigateToDocs}
            navigateToMail={navigateToMail}
          >
            <div className="input-container">
              <InputField
                label={"APIKeyId"}
                name={"apiKeyId"}
                value={android?.apiKeyId}
                onChange={onAndroidChange}
              />
              <InputField
                label={"APIKey"}
                name={"apiKey"}
                value={android?.apiKey}
                onChange={onAndroidChange}
              />
            </div>

            <div className="input-container">
              <InputField
                label={"TeamId"}
                name={"teamId"}
                value={android?.teamId}
                onChange={onAndroidChange}
              />
              <InputField
                label={"TeamName"}
                name={"teamName"}
                value={android?.teamName}
                onChange={onAndroidChange}
              />
            </div>

            <div className="input-container">
              <InputField
                label={"IssuerId"}
                name={"issuerId"}
                value={android?.issuerId}
                onChange={onAndroidChange}
              />
              <InputField
                label={"AppSpecificId"}
                name={"appSpecificId"}
                value={android?.appSpecificId}
                onChange={onAndroidChange}
              />
            </div>
          </FinishSteps>
        )}
        <FinishActions
          submit={submit}
          handleActionClick={onAction}
          handleBackClick={onBackClick}
          isDisabled={isDisabled}
        />
      </Card>
    );
  }
);

export default _AndroidForm;
