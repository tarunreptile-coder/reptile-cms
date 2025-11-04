import React, { useCallback, useEffect, useState } from "react";
import { controlled } from "@Reptile/Framework";
import { Checkbox, PropertyGroup, Text } from "@Reptile/Components/Atoms";
import {
  AlignmentProperty,
  CheckboxProperty,
  ColorProperty,
  DropdownInputProperty,
  FileDropProperty,
  FontFamilyProperty,
  FontStyleProperty,
  ImagePositionProperty,
  InputProperty,
  MenuAlignmentProperty,
  ResetProperty,
  SizeProperty,
  SliderProperty,
  SpacingProperty,
  ToggleProperty,
} from "@Reptile/Components/Molecules";
import { useInitController } from "@Reptile/Hooks";
import SelectWidgetPng from "~/../public/img/select_widget.png";
import WidgetPropertiesPng from "~/../public/img/widget_properties.png";
import { TextEditor } from "..";

const Properties = {
  AlignmentProperty,
  CheckboxProperty,
  ColorProperty,
  DropdownInputProperty,
  FileDropProperty,
  FontFamilyProperty,
  FontStyleProperty,
  ImagePositionProperty,
  InputProperty,
  MenuAlignmentProperty,
  ResetProperty,
  SizeProperty,
  SliderProperty,
  SpacingProperty,
  ToggleProperty,
};

const _WidgetPropertyGenerator = controlled<
  Reptile.Props.WidgetPropertyGeneratorProps,
  Reptile.Controllers.IWidgetSettingsController
>(({ controller, isFromAppBuild }) => {
  useInitController(controller);

  const [currentIdx, setCurrentIdx] = useState<number | undefined>();

  useEffect(() => {
    setCurrentIdx(0);
  }, [controller.widgetId]);

  const handleIndexClick = (idx: number) => {
    setCurrentIdx(idx);
  };

  const handleLockWidgetClick = useCallback(() => {
    controller.isLocked = !controller.isLocked;
  }, [controller]);

  // console.log(isFromAppBuild, controller.layout);
  return (
    <>
      {controller.layout ? (
        <>
          {!isFromAppBuild && (
            <div className={"rt-checkbox-property"}>
              <Checkbox
                active={controller.isLocked}
                onClick={handleLockWidgetClick}
              />
              <Text size="medium" color="light-gray">
                Lock Widget
              </Text>
            </div>
          )}
          {Object.entries(controller.layout).map(([label, children], i) => {
            return (
              <PropertyGroup
                key={label}
                label={label}
                idx={i}
                onIndexClick={handleIndexClick}
                currentIdx={currentIdx}
                isActive={i === currentIdx ? true : false}
              >
                {children.map((el, index) => {
                  if (el.type === "TextEditor") {
                    const textEditor = controller.editor;
                    return (
                      textEditor && (
                        <TextEditor
                          style={{ paddingBottom: "5px", height: "350px" }}
                          key={`${label}-${el.type}-${index}`}
                          controller={textEditor}
                          mode="content"
                          className="editor-class"
                          isTemplateEditor={true}
                        />
                      )
                    );
                  } else {
                    const match =
                      /widget\.(?:contents\[(?<contentsIdx>\d+)\]\.){0,1}(?<prop>\w+)/.exec(
                        el.data
                      );
                    const PropertyElement =
                      Properties[el.type as keyof typeof Properties];

                    if (match) {
                      const { contentsIdx, prop } = match.groups as {
                        contentsIdx?: string;
                        prop: keyof Reptile.Controllers.IWidgetSettingsController;
                      };

                      const elementController = contentsIdx
                        ? controller.contents[Number.parseInt(contentsIdx)][
                            prop
                          ]
                        : controller[prop];

                      return (
                        <PropertyElement
                          style={{ paddingBottom: "5px" }}
                          key={`${label}-${el.type}-${index}`}
                          controller={elementController as never}
                        />
                      );
                    }
                    return null;
                  }
                })}
              </PropertyGroup>
            );
          })}
        </>
      ) : (
        <>
          <Text color="black" size="h3" weight="medium">
            Style your widget
          </Text>
          <Text
            color="light-gray"
            size="medium"
            weight="medium"
            style={{ fontStyle: "italic" }}
          >
            • Select desired widget to modify
          </Text>
          <img src={SelectWidgetPng as string} />
          <Text
            color="light-gray"
            size="medium"
            weight="medium"
            style={{ fontStyle: "italic" }}
          >
            • Update properties to style your widget
          </Text>
          <img src={WidgetPropertiesPng as string} />
        </>
      )}
    </>
  );
});

export default _WidgetPropertyGenerator;
