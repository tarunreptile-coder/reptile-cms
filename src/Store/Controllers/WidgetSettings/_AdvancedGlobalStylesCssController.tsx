import React from "react";
import { Notification } from "@Reptile/Components/Atoms";
import { CssService } from "~/Services";
import { makeAutoObservable } from "mobx";

type IAdvancedGlobalStylesCssController =
  Reptile.Controllers.IAdvancedGlobalStylesCssController;

type SetGlobalStylesCallback = (styles: IWidgetStyleProperties) => void;

export default class AdvancedGlobalStylesCssController
  implements IAdvancedGlobalStylesCssController
{
  private readonly _domain: Reptile.Models.IDomain;

  private readonly _uiState: Reptile.Controllers.IUiState;

  private readonly _setGlobalStyles: SetGlobalStylesCallback;

  _css?: string;

  _stylesheetObject?: Reptile.Models.Stylesheet;

  _modal: boolean;

  _updatedCss?: string;

  constructor(
    uiState: Reptile.Controllers.IUiState,
    domain: Reptile.Models.IDomain,
    initialStyles?: string,
    setGlobalStyles: SetGlobalStylesCallback
  ) {
    makeAutoObservable<
      AdvancedGlobalStylesCssController,
      "_domain" | "_uiState" | "_setGlobalStyles"
    >(this, {
      _domain: false,
      _uiState: false,
      _setGlobalStyles: false,
      dispose: false,
    });

    this._uiState = uiState;
    this._domain = domain;
    this._css = initialStyles ?? "";
    this._modal = false;
    this._setGlobalStyles = setGlobalStyles;
  }

  get css() {
    return this._css;
  }

  get updatedCss() {
    return this._updatedCss;
  }

  set updatedCss(v) {
    this._updatedCss = v;
  }

  get modal() {
    return this._modal;
  }

  set modal(v) {
    this._modal = v;
  }

  async initialize(): Promise<void> {
    return await Promise.resolve();
  }

  private kebabToCamelCase(name: string): string {
    return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Parses a CSS string containing multiple named style blocks (e.g., .general-styles { ... })
   * and converts it into a nested IGlobalStyles object.
   * Also performs basic CSS validation.
   * @param cssText The CSS string to parse.
   * @returns An object containing errors and the parsed IGlobalStyles object.
   */
  private parseCssAndValidateToObject(cssText: string): {
    errors: { type: string; message: string }[];
    parsedObject: IGlobalStyles; // Now returns IGlobalStyles
  } {
    const errors: { type: string; message: string }[] = [];
    const resultObject: IGlobalStyles = {}; // Initialize as IGlobalStyles
    const blockRegex = /\.([a-zA-Z0-9_-]+)-styles\s*\{([^}]*)\}/g; // Regex to find .name-styles { ... } blocks
    let match;
    let lastIndex = 0;

    // Check for any text before the first block or between blocks that are not whitespace
    const firstBlockMatch = cssText.match(blockRegex);
    if (firstBlockMatch && firstBlockMatch.index > 0) {
      const leadingText = cssText.substring(0, firstBlockMatch.index).trim();
      if (leadingText) {
        errors.push({
          type: "Syntax Error",
          message: `Unexpected text before first style block: "${leadingText}"`,
        });
      }
    }

    while ((match = blockRegex.exec(cssText)) !== null) {
      const sectionNameKebab = match[1].trim(); // e.g., 'general', 'title', 'text'
      const sectionNameCamel = this.kebabToCamelCase(
        sectionNameKebab
      ) as keyof IGlobalStyles;
      const declarationsBlock = match[2].trim();
      const sectionStyles: IWidgetStyleProperties = {}; // Styles for this specific section

      const declarationRegex = /\s*([\w-]+)\s*:\s*([^;]+?)(;|$)/g;
      let declarationMatch;
      let lastDeclarationIndex = 0;

      // Define properties to be excluded from the output object
      const excludedBoxShadowProperties = [
        "boxShadowHorizontal",
        "boxShadowVertical",
        "boxShadowBlur",
        "boxShadowSpread",
        "boxShadowColor",
      ];

      while (
        (declarationMatch = declarationRegex.exec(declarationsBlock)) !== null
      ) {
        const propertyKebab = declarationMatch[1].trim();
        const valueRaw = declarationMatch[2].trim();
        if (declarationMatch.index > lastDeclarationIndex) {
          const unparsed = declarationsBlock
            .substring(lastDeclarationIndex, declarationMatch.index)
            .trim();
          if (unparsed) {
            errors.push({
              type: "Syntax Error",
              message: `Malformed declaration or unexpected text in .${sectionNameKebab}-styles: "${unparsed}"`,
            });
          }
        }
        lastDeclarationIndex = declarationRegex.lastIndex;

        const propertyCamel = this.kebabToCamelCase(
          propertyKebab
        ) as keyof IWidgetStyleProperties;
        let valueForObject: string | undefined = valueRaw;

        if (excludedBoxShadowProperties.includes(propertyCamel)) {
          continue; // Skip processing and adding these properties
        }

        // Basic CSS.supports validation
        if (typeof CSS !== "undefined" && CSS.supports) {
          if (!CSS.supports(propertyKebab, valueRaw)) {
            errors.push({
              type: "Property/Value Error",
              message: `Invalid property or value in .${sectionNameKebab}-styles: ${propertyKebab}: ${valueRaw}`,
            });
            continue;
          }
        }
        // Special handling for font-family quotes
        if (propertyCamel === "fontFamily") {
          if (valueForObject.startsWith('"') && valueForObject.endsWith('"')) {
            valueForObject = valueForObject.slice(1, -1);
          } else if (
            valueForObject.startsWith("'") &&
            valueForObject.endsWith("'")
          ) {
            valueForObject = valueForObject.slice(1, -1);
          }
          if (
            !valueForObject.includes(",") &&
            !valueForObject.includes(" ") &&
            ![
              "serif",
              "sans-serif",
              "monospace",
              "cursive",
              "fantasy",
            ].includes(valueForObject.toLowerCase())
          ) {
            valueForObject = `'${valueForObject}'`;
          }
        }

        (sectionStyles as any)[propertyCamel] = valueForObject;
      }

      if (lastDeclarationIndex < declarationsBlock.length) {
        const unparsed = declarationsBlock
          .substring(lastDeclarationIndex)
          .trim();
        if (unparsed) {
          errors.push({
            type: "Syntax Error",
            message: `Unparsed text at end or malformed declaration in .${sectionNameKebab}-styles: "${unparsed}"`,
          });
        }
      }

      // Assign the parsed section styles to the result object
      resultObject[sectionNameCamel] = sectionStyles;
      lastIndex = blockRegex.lastIndex;
    }

    if (lastIndex < cssText.length) {
      const unparsed = cssText.substring(lastIndex).trim();
      if (unparsed) {
        errors.push({
          type: "Syntax Error",
          message: `Unparsed text at end of CSS or malformed block structure: "${unparsed}"`,
        });
      }
    }
    return { errors, parsedObject: resultObject };
  }

  async updateJsonStructure() {
    if (this._updatedCss) {
      const { errors, parsedObject } = this.parseCssAndValidateToObject(
        this._updatedCss
      );
      if (!errors || errors.length === 0) {
        this._setGlobalStyles(parsedObject);
        this._css = this._updatedCss;
        this.modal = false;
        Notification.success({
          description: "Global CSS updated successfully!",
        });
      } else {
        const errorElements = [];
        errorElements.push(
          <p key="header">Please fix the following CSS issues:</p>
        );
        errorElements.push(
          <ul key="error-list" style={{ paddingLeft: "20px", margin: "0" }}>
            {errors.map((error, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                <strong>{error.type}:</strong> {error.message}
              </li>
            ))}
          </ul>
        );
        Notification.error({ description: errorElements, duration: 10000 });
      }
    } else {
      this.modal = false;
      Notification.success({
        description: "Global CSS updated successfully!",
      });
    }
  }

  get deps(): readonly unknown[] {
    return [];
  }

  dispose(): void {
    /* Do nothing */
  }
}
