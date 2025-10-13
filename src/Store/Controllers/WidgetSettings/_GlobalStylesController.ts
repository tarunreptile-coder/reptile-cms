import { makeAutoObservable, observable } from "mobx";
import StyleBackgroundColorController from "./_StyleBackgroundColorController";
import StyleBorderColorController from "./_StyleBorderColorController";
import StyleBorderRadiusController from "./_StyleBorderRadiusController";
import StyleFontStyleController from "./_StyleFontStyleController";
import StyleFontSizeController from "./_StyleFontSizeController";
import StyleFontFamilyController from "./_StyleFontFamilyController";
import StyleColorController from "./_StyleColorController";
import StyleBorderWidthController from "./_StyleBorderWidthController";
import AdvancedGlobalStylesCssController from "./_AdvancedGlobalStylesCssController";
import StyleWidthController from "./_StyleWidthController";
import StyleHeightController from "./_StyleHeightController";
import StyleShadowBlurController from "./_StyleShadowBlurController";
import StyleShadowColorController from "./_StyleShadowColorController";
import StyleShadowSpreadController from "./_StyleShadowSpreadController";
import StyleMarginController from "./_StyleMarginController";
import StylePaddingController from "./_StylePaddingController";
import StyleShadowHorizontalController from "./_StyleShadowHorizontalController";
import StyleShadowVerticalController from "./_StyleShadowVerticalController";
import StyleTextAlignController from "./_StyleTextAlignController";

type IGlobalStylesController = Reptile.Controllers.IGlobalStylesController;
type IWidgetStyleProperties = Reptile.Models.IWidgetStyleProperties; // This should be for individual widget types

// Assuming these interfaces are defined elsewhere in your Reptile.Models namespace
type IGlobalStyles = Reptile.Models.IGlobalStyles;

export default class GlobalStylesController implements IGlobalStylesController {
  private readonly _domain: Reptile.Models.IDomain;

  private readonly _uiState: Reptile.Controllers.IUiState;

  private _styleProperties: IGlobalStyles; // Now holds the nested structure

  error?: string;

  constructor(
    uiState: Reptile.Controllers.IUiState,
    domain: Reptile.Models.IDomain,
    initialStyleProperties?: IGlobalStyles
  ) {
    makeAutoObservable<
      GlobalStylesController,
      "_domain" | "_uiState" | "_styleProperties"
    >(this, {
      _domain: false,
      _uiState: false,
      _styleProperties: false,
      dispose: false,
    });

    this._uiState = uiState;
    this._domain = domain;
    // Initialize _styleProperties as an observable object with nested observables
    this._styleProperties = observable(initialStyleProperties ?? {});
  }

  get globalStyles(): IGlobalStyles {
    return this._styleProperties;
  }

  set globalStyles(v: IGlobalStyles) {
    // Deeply update properties to maintain observability
    for (const sectionKey in v) {
      if (Object.prototype.hasOwnProperty.call(v, sectionKey)) {
        const section = sectionKey as keyof IGlobalStyles;
        if (!this._styleProperties[section]) {
          this._styleProperties[section] = observable({});
        }
        const currentSection = this._styleProperties[
          section
        ] as IWidgetStyleProperties;
        const newSection = v[section] as IWidgetStyleProperties;

        for (const propKey in newSection) {
          if (Object.prototype.hasOwnProperty.call(newSection, propKey)) {
            const prop = propKey as keyof IWidgetStyleProperties;
            if (currentSection[prop] !== newSection[prop]) {
              currentSection[prop] = newSection[prop];
            }
          }
        }
      }
    }
  }

  private camelToKebabCase(name: string): string {
    return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  }

  private objectToCssString(styleObject: IGlobalStyles): string {
    let cssString = "";
    for (const sectionKey in styleObject) {
      if (Object.hasOwnProperty.call(styleObject, sectionKey)) {
        const sectionStyles = styleObject[sectionKey as keyof IGlobalStyles];
        if (sectionStyles && Object.keys(sectionStyles).length > 0) {
          cssString += `.${sectionKey}-styles {\n`; // Assuming a class naming convention
          for (const key in sectionStyles) {
            if (Object.hasOwnProperty.call(sectionStyles, key)) {
              const cssProperty = this.camelToKebabCase(key);
              let cssValue = sectionStyles[key as keyof IWidgetStyleProperties];
              if (key === "fontFamily" && typeof cssValue === "string") {
                if (cssValue.startsWith("'") && cssValue.endsWith("'")) {
                  cssValue = cssValue.replace(/'/g, '"');
                } else if (!cssValue.includes(" ") && !cssValue.includes(",")) {
                  cssValue = `"${cssValue}"`;
                }
              } else if (
                typeof cssValue === "string" &&
                cssValue.startsWith("'") &&
                cssValue.endsWith("'")
              ) {
                cssValue = cssValue.replace(/'/g, '"');
              }
              cssString += `  ${cssProperty}: ${cssValue};\n`;
            }
          }
          cssString += "}\n\n";
        }
      }
    }
    return cssString;
  }

  get advancedCss(): Reptile.Controllers.IAdvancedGlobalStylesCssController {
    const cssFormattedString = this.objectToCssString(this._styleProperties);
    return new AdvancedGlobalStylesCssController(
      this._uiState,
      this._domain,
      cssFormattedString,
      (styles: IWidgetStyleProperties) => {
        this.globalStyles = styles as IGlobalStyles;
      }
    );
  }

  applyStylesToWidgets(): void {
    const templateId = this._uiState.navigation.templateId;
    this._domain.template.applyGlobalStylesToActiveTemplate(
      this._styleProperties, // Pass the entire nested structure
      templateId
    );
  }

  // --- General Styles ---
  get stylesBackgroundColor():
    | Reptile.Controllers.IColorPropertyController
    | undefined {
    return new StyleBackgroundColorController(
      this._uiState,
      this._domain,
      (this._styleProperties.general =
        this._styleProperties.general ?? observable({}))
    );
  }

  // --- Title Styles ---
  get title(): {
    stylesColor?: Reptile.Controllers.IColorPropertyController;
    stylesFontSize?: Reptile.Controllers.ISizePropertyController;
    stylesFontStyle?: Reptile.Controllers.IFontStylePropertyController;
    stylesFontFamily?: Reptile.Controllers.IFontFamilyPropertyController;
  } {
    this._styleProperties.title = this._styleProperties.title ?? observable({});
    return {
      stylesColor: new StyleColorController(
        this._uiState,
        this._domain,
        this._styleProperties.title
      ),
      stylesFontSize: new StyleFontSizeController(
        this._uiState,
        this._domain,
        this._styleProperties.title
      ),
      stylesFontStyle: new StyleFontStyleController(
        this._uiState,
        this._domain,
        this._styleProperties.title
      ),
      stylesFontFamily: new StyleFontFamilyController(
        this._uiState,
        this._domain,
        this._styleProperties.title
      ),
    };
  }

  // --- Text Styles ---
  get text(): {
    stylesColor?: Reptile.Controllers.IColorPropertyController;
    stylesFontSize?: Reptile.Controllers.ISizePropertyController;
    stylesFontStyle?: Reptile.Controllers.IFontStylePropertyController;
    stylesFontFamily?: Reptile.Controllers.IFontFamilyPropertyController;
  } {
    this._styleProperties.text = this._styleProperties.text ?? observable({});
    return {
      stylesColor: new StyleColorController(
        this._uiState,
        this._domain,
        this._styleProperties.text
      ),
      stylesFontSize: new StyleFontSizeController(
        this._uiState,
        this._domain,
        this._styleProperties.text
      ),
      stylesFontStyle: new StyleFontStyleController(
        this._uiState,
        this._domain,
        this._styleProperties.text
      ),
      stylesFontFamily: new StyleFontFamilyController(
        this._uiState,
        this._domain,
        this._styleProperties.text
      ),
    };
  }

  // --- Button Styles ---
  get button(): {
    stylesColor?: Reptile.Controllers.IColorPropertyController;
    stylesFontSize?: Reptile.Controllers.ISizePropertyController;
    stylesFontStyle?: Reptile.Controllers.IFontStylePropertyController;
    stylesFontFamily?: Reptile.Controllers.IFontFamilyPropertyController;
    stylesTextAlign?: Reptile.Controllers.IAlignmentPropertyController;
    stylesBackgroundColor?: Reptile.Controllers.IColorPropertyController;
    stylesWidth?: Reptile.Controllers.ISizePropertyController;
    stylesHeight?: Reptile.Controllers.ISizePropertyController;
    stylesMargin?: Reptile.Controllers.ISpacingPropertyController;
    stylesPadding?: Reptile.Controllers.ISpacingPropertyController;
    stylesBorderRadius?: Reptile.Controllers.ISliderPropertyController;
    stylesBorderWidth?: Reptile.Controllers.ISliderPropertyController;
    stylesBorderColor?: Reptile.Controllers.IColorPropertyController;
    stylesBoxShadowHorizontal?: Reptile.Controllers.ISliderPropertyController;
    stylesBoxShadowVertical?: Reptile.Controllers.ISliderPropertyController;
    stylesBoxShadowBlur?: Reptile.Controllers.ISliderPropertyController;
    stylesBoxShadowSpread?: Reptile.Controllers.ISliderPropertyController;
    stylesBoxShadowColor?: Reptile.Controllers.IColorPropertyController;
  } {
    this._styleProperties.button =
      this._styleProperties.button ?? observable({});
    return {
      stylesColor: new StyleColorController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesFontSize: new StyleFontSizeController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesFontStyle: new StyleFontStyleController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesFontFamily: new StyleFontFamilyController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesTextAlign: new StyleTextAlignController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBackgroundColor: new StyleBackgroundColorController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesWidth: new StyleWidthController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesHeight: new StyleHeightController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesMargin: new StyleMarginController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesPadding: new StylePaddingController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBorderRadius: new StyleBorderRadiusController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBorderWidth: new StyleBorderWidthController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBorderColor: new StyleBorderColorController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBoxShadowHorizontal: new StyleShadowHorizontalController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBoxShadowVertical: new StyleShadowVerticalController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBoxShadowBlur: new StyleShadowBlurController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBoxShadowSpread: new StyleShadowSpreadController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
      stylesBoxShadowColor: new StyleShadowColorController(
        this._uiState,
        this._domain,
        this._styleProperties.button
      ),
    };
  }

  // --- Image Styles ---
  get image(): {
    stylesBackgroundColor?: Reptile.Controllers.IColorPropertyController;
    stylesWidth?: Reptile.Controllers.ISizePropertyController;
    stylesHeight?: Reptile.Controllers.ISizePropertyController;
  } {
    this._styleProperties.image = this._styleProperties.image ?? observable({});
    return {
      stylesBackgroundColor: new StyleBackgroundColorController(
        this._uiState,
        this._domain,
        this._styleProperties.image
      ),
      stylesWidth: new StyleWidthController(
        this._uiState,
        this._domain,
        this._styleProperties.image
      ),
      stylesHeight: new StyleHeightController(
        this._uiState,
        this._domain,
        this._styleProperties.image
      ),
    };
  }

  async initialize(): Promise<void> {
    await Promise.resolve();
  }

  get deps(): readonly unknown[] {
    return [
      this._styleProperties, // Depend on the observable _styleProperties
    ];
  }

  dispose(): void {
    /* Do nothing */
  }
}
