import React, { useState } from "react";
import { controlled } from "@Reptile/Framework";
import { Button, PropertyGroup } from "@Reptile/Components/Atoms";
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
import { AdvancedGlobalStylesCss } from "..";

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

const GlobalStylesPropertyGenerator = controlled<
  Reptile.Props.WidgetPropertyGeneratorProps,
  Reptile.Controllers.IWidgetSettingsController
>(({ controller, isFromAppBuild }) => {
  useInitController(controller);

  const [currentIdx, setCurrentIdx] = useState<number | undefined>(0);

  const handleIndexClick = (idx: number) => {
    setCurrentIdx(idx);
  };

  const handleApplyGlobalStyles = () => {
    controller.globalWidgetStyles.applyStylesToWidgets();
  };

  return (
    <>
      {controller.globalStylesLayout &&
        Object.entries(controller.globalStylesLayout).map(
          ([label, children], i) => {
            return (
              <PropertyGroup
                key={label}
                label={label}
                idx={i - 1}
                onIndexClick={handleIndexClick}
                currentIdx={currentIdx}
                isActive={i - 1 === currentIdx ? true : false}
              >
                {children.map((el, index) => {
                  // Regex to capture both the section (e.g., 'general', 'title')
                  // and the property within that section (e.g., 'stylesBackgroundColor')
                  const match =
                    /widget\.globalWidgetStyles\.(?<section>\w+)\.(?<prop>\w+)/.exec(
                      el.data
                    );
                  const PropertyElement =
                    Properties[el.type as keyof typeof Properties];
                  if (match) {
                    const { section, prop } = match.groups as {
                      section: keyof Reptile.Controllers.IGlobalStylesController;
                      prop: string; // The specific style property, e.g., 'stylesBackgroundColor'
                    };
                    let elementController: any;
                    // Dynamically access the nested controller
                    // For "General" section, the stylesBackgroundColor is directly under globalWidgetStyles
                    if (section === "general") {
                      elementController = (
                        controller.globalWidgetStyles as any
                      )[prop];
                    } else {
                      // For other sections (title, text, button, image), access the nested style object
                      const sectionController = (
                        controller.globalWidgetStyles as any
                      )[section];
                      if (sectionController && sectionController[prop]) {
                        elementController = sectionController[prop];
                      }
                    }
                    if (elementController) {
                      return (
                        <PropertyElement
                          style={{ paddingBottom: "5px" }}
                          key={`${label}-${el.type}-${index}`}
                          controller={elementController as never}
                        />
                      );
                    }
                  }
                  return null;
                })}
              </PropertyGroup>
            );
          }
        )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <AdvancedGlobalStylesCss
          controller={controller.globalWidgetStyles.advancedCss}
        />
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
          onClick={handleApplyGlobalStyles}
        >
          Preview
        </Button>
      </div>
    </>
  );
});

export default GlobalStylesPropertyGenerator;
