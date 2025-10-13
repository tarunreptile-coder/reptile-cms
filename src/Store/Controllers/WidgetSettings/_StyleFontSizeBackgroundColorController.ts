import { HSV } from "color-convert/conversions";
import * as convert from "color-convert";
import { makeAutoObservable } from "mobx";

type IColorPropertyController = Reptile.Controllers.IColorPropertyController;

export default class StyleFontSizeBackgroundColorController
  implements IColorPropertyController
{
  private readonly _domain: Reptile.Models.IDomain;

  private readonly _uiState: Reptile.Controllers.IUiState;

  private _styleProperties: Reptile.Models.IWidgetStyleProperties;

  private _color: HSV;
  private _alpha?: number; // A new private property to store the alpha value (0-100)

  private _activeWidget: Reptile.Controllers.IActiveWidgetTracker;

  error?: string;

  constructor(
    uiState: Reptile.Controllers.IUiState,
    domain: Reptile.Models.IDomain,
    styleProperties: Reptile.Models.IWidgetStyleProperties,
    activeWidget: Reptile.Controllers.IActiveWidgetTracker
  ) {
    makeAutoObservable<
      StyleFontSizeBackgroundColorController,
      "_domain" | "_uiState" | "_styleProperties"
    >(this, {
      _domain: false,
      _uiState: false,
      _styleProperties: false,
      label: false,
      dispose: false,
    });

    this._uiState = uiState;
    this._domain = domain;
    this._styleProperties = styleProperties;
    this._activeWidget = activeWidget;
    this._color = convert.hex.hsv.raw(
      this._styleProperties.backgroundColor as string
    );
    // Initialize color and alpha from the initial background color string
    this.initializeColorAndAlpha();
  }

  private initializeColorAndAlpha(): void {
    const backgroundColor =
      (this._styleProperties.backgroundColor as string) || "#ffffff";

    if (backgroundColor === "transparent") {
      this._color = [0, 0, 100]; // Default to white for transparent
      this._alpha = 0;
    } else if (backgroundColor.startsWith("rgb")) {
      // Regex to match both rgba(r,g,b,a) and rgb(r g b / a) syntaxes
      const match = backgroundColor.match(
        /(\d+)\s*(\d+)\s*(\d+)\s*\/\s*(\d+)%|rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/
      );

      if (match) {
        let r, g, b, a;
        if (match[1] !== undefined) {
          // Matches rgb(r g b / a)
          [r, g, b, a] = [
            Number(match[1]),
            Number(match[2]),
            Number(match[3]),
            Number(match[4]) / 100,
          ];
        } else {
          // Matches rgba(r, g, b, a)
          [r, g, b, a] = [
            Number(match[5]),
            Number(match[6]),
            Number(match[7]),
            Number(match[8]),
          ];
        }

        this._color = convert.rgb.hsv.raw([r, g, b]);
        this._alpha = a * 100; // Store alpha as percentage
      } else {
        // Fallback for hex if regex fails
        this._color = convert.hex.hsv.raw(backgroundColor);
        this._alpha = 100;
      }
    } else if (backgroundColor.startsWith("#")) {
      // Handle hex colors with and without alpha
      if (backgroundColor.length === 9) {
        // #RRGGBBAA
        const hexColor = backgroundColor.substring(0, 7);
        const alphaHex = backgroundColor.substring(7, 9);
        this._color = convert.hex.hsv.raw(hexColor);
        this._alpha = Math.round((parseInt(alphaHex, 16) / 255) * 100);
      } else {
        // #RRGGBB
        this._color = convert.hex.hsv.raw(backgroundColor);
        this._alpha = 100;
      }
    } else {
      // Fallback for any other unexpected format
      this._color = [0, 0, 100];
      this._alpha = 100;
    }
  }

  get label(): string {
    return "Background color";
  }

  get alpha(): number {
    return this._alpha ?? 100;
  }

  set alpha(v: number) {
    const newAlpha = Math.max(0, Math.min(100, v));
    this._alpha = newAlpha;
    this.updateBackgroundColor();
  }

  get color(): HSV {
    return this._color;
  }

  set color(v: HSV) {
    this._color = v;
    this.updateBackgroundColor();
  }

  private updateBackgroundColor(): void {
    let updatedColor = "transparent";
    if (this._alpha === 0) {
      updatedColor = "transparent";
    } else {
      const [r, g, b] = convert.hsv.rgb.raw(this._color);
      // The alpha value is a percentage, so append '%' to the end.
      updatedColor = `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(
        b
      )} / ${this._alpha}%)`;
    }
    const fontSizeElements = this._activeWidget?.activeWidget.contents || [];
    fontSizeElements?.forEach((element, index) => {
      if (index > 2) {
        element.styles.backgroundColor = updatedColor;
      }
    });
  }

  async initialize(): Promise<void> {
    await Promise.resolve();
  }

  get deps(): readonly unknown[] {
    return [];
  }

  dispose(): void {
    /* Do nothing */
  }
}
