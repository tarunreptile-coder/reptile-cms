declare namespace Reptile.Controllers {
    export interface IAlignmentPropertyController extends IController {
        /**
         * Gets or sets the alignment of property.
         */
        alignment?: string;
    }

    export interface ICheckboxPropertyController extends IController {
        /**
         * Gets the checkbox label.
         */
        readonly label: string;
        /**
         * Gets or sets if the property is active.
         */
        active: boolean;
    }

    export interface IColorPropertyController extends IController {
        /**
         * Gets the color picker label.
         */
        readonly label: string;
        /**
         * Gets or sets alpha channel of color
         */
        alpha?: number;
        /**
         * Gets or sets the HSV values of color
         */
        color: import('color-convert/conversions').HSV;
    }

    export interface IDropdownPropertyController extends IController {
        /**
         * Gets the dropdown label.
         */
        readonly label: string;
        /**
         * Available dropdown options.
         */
        readonly options: string[];
        /**
         * Gets or sets the selected index.
         */
        selectedIndex?: number;
        /**
         * Gets the selected option.
         */
        readonly selectedOption?: string;
    }

    export interface IFileDropPropertyController extends IController {
        /**
         * Gets the file drop label.
         */
        readonly label: string;
        /**
         * Gets the upload progress.
         */
        readonly fileUploadInfo?: Reptile.Models.IAssetUpload;
        /**
         * Gets or sets the current image url.
         */
        imageUrl?: string;
        /**
         * Uploads given file.
         * @param file File to upload
         */
        uploadFile(file: File): Promise<void>;
        /**
         * Gets the upload error if it exists.
         */
        readonly error?: string;
    }

    export interface IFontFamilyPropertyController extends IController {
        /**
         * Gets the available fonts.
         */
        readonly fonts: Models.FontName[];
        /**
         * Gets the selected font
         */
        readonly font: string;
        /**
         * Gets or sets the index of selected font.
         */
        fontIndex?: number;
        /**
         * Gets the current property.
         */
        currentProperty?: string;
    }

    export interface IFontStylePropertyController extends IController {
        /**
         * Gets or sets if the font is bolded
         */
        bold: boolean;
        /**
         * Gets or sets if the font is in italic
         */
        italic: boolean;
        /**
         * Gets or sets if the font is underlined
         */
        underline: boolean;
        /**
         * Gets the current property
         */
        currentProperty?: string;
        /**
         * Gets the font weight
         */
        fontWeight?: string;
        /**
         * Gets the font style
         */
        fontStyle?: string;
        /**
         * Gets or sets if the font is underlined
         */
        textDecoration?: string;
    }

    export interface IImagePositionPropertyController extends IController {
        /**
         * Gets the available fonts.
         */
        readonly positions: { displayName: string; name: string }[];
        /**
         * Gets the selected font
         */
        readonly position: string;
        /**
         * Gets or sets the index of selected font.
         */
        positionIndex?: number;
    }

    export interface IInputPropertyController extends IController {
        /**
         * Gets the input label.
         */
        readonly label: string;
        /**
         * Gets the type of the input.
         */
        readonly type: string;
        /**
         * Gets or sets the input value.
         */
        value: string;

        placeholder?: string;
    }

    export interface IResetPropertyController extends IController {
        /**
         * Gets the input label.
         */
        readonly label: string;
        /**
         * Gets or sets the input value.
         */
        value?: string;
    }

    export interface ISizePropertyController extends IController {
        /**
         * Gets the size label.
         */
        readonly label: string;
        /**
         * Gets the available measures.
         */
        readonly measures: string[];
        /**
         * Gets the selected measure.
         */
        readonly measure: string;
        /**
         * Gets or sets the index of selected measure.
         */
        measureIndex?: number;
        /**
         * Gets or sets the size value.
         */
        size?: string;
    }

    export interface ISliderPropertyController extends IController {
        /**
         * Gets the slider label.
         */
        readonly label: string;
        /**
         * Gets the minimum possible value
         */
        readonly minValue: number;
        /**
         * Gets the maximum possible value
         */
        readonly maxValue: number;
        /**
         * Gets or sets the value
         */
        value: number;
    }

    export interface ISpacingPropertyController extends IController {
        /**
         * Gets the color picker label.
         */
        readonly label: string;
        /**
         * Gets or sets if advanced mode is on.
         */
        advanced: boolean;
        /**
         * Gets or sets the margin/padding value.
         */
        value:
            | number
            | {
                  top: number;
                  bottom: number;
                  left: number;
                  right: number;
              };
    }

    export interface ITogglePropertyController extends IController {
        /**
         * Gets the toggle label.
         */
        readonly label: string;
        /**
         * Gets or sets if the toggle is active.
         */
        active: boolean;
    }

    export interface IAdvancedGlobalStylesCssController extends IController {
        css?: string;

        updatedCss?: string;

        modal: boolean;

        updateJsonStructure(): Promise<void>;
    }

    export interface IGlobalStylesController extends IController {
        advancedCss: IAdvancedGlobalStylesCssController;
        applyStylesToWidgets(): void;

        // New section-specific style property accessors
        readonly stylesBackgroundColor?: IColorPropertyController; // For the 'general' background color

        readonly title: {
            stylesColor?: IColorPropertyController;
            stylesFontSize?: ISizePropertyController;
            stylesFontStyle?: IFontStylePropertyController;
            stylesFontFamily?: IFontFamilyPropertyController;
        };

        readonly text: {
            stylesColor?: IColorPropertyController;
            stylesFontSize?: ISizePropertyController;
            stylesFontStyle?: IFontStylePropertyController;
            stylesFontFamily?: IFontFamilyPropertyController;
        };

        readonly button: {
            stylesColor?: IColorPropertyController;
            stylesFontSize?: ISizePropertyController;
            stylesFontStyle?: IFontStylePropertyController;
            stylesFontFamily?: IFontFamilyPropertyController;
            stylesTextAlign?: IAlignmentPropertyController;
            stylesBackgroundColor?: IColorPropertyController;
            stylesWidth?: ISizePropertyController;
            stylesHeight?: ISizePropertyController;
            stylesMargin?: ISpacingPropertyController;
            stylesPadding?: ISpacingPropertyController;
            stylesBorderRadius?: ISliderPropertyController;
            stylesBorderWidth?: ISliderPropertyController;
            stylesBorderColor?: IColorPropertyController;
            stylesBoxShadowHorizontal?: ISliderPropertyController;
            stylesBoxShadowVertical?: ISliderPropertyController;
            stylesBoxShadowBlur?: ISliderPropertyController;
            stylesBoxShadowSpread?: ISliderPropertyController;
            stylesBoxShadowColor?: IColorPropertyController;
        };

        readonly image: {
            stylesBackgroundColor?: IColorPropertyController;
            stylesWidth?: ISizePropertyController;
            stylesHeight?: ISizePropertyController;
        };
    }

    export interface IWidgetSettingsController extends IController {
        /**
         * Gets the widgets id.
         */
        widgetId: string | undefined;

        isLocked: boolean | undefined;

        readonly globalStylesLayout: WidgetSettingsLayout | undefined;
        /**
         * Gets the settings layout of currently active widget.
         */
        readonly layout: WidgetSettingsLayout | undefined;
        /**
         * Gets the controllers to the subcomponents if this is a widget.
         * Otherwise returns an empty array.
         */
        readonly contents: IWidgetSettingsController[];

        globalWidgetStyles: IGlobalStylesController;

        updatedGlobalStyles: IGlobalStylesController;
        /**
         * Gets the controller for widget.contents.htmlBody property
         */
        readonly contentReset:
            | Reptile.Controllers.IResetPropertyController
            | undefined;
        /**
         * Gets the controller for widget.contents.htmlBody property
         */
        readonly editor:
            | Reptile.Controllers.ITextEditorController
            | undefined;
        /**
         * Gets the controller for widget.properties.isActive property
         */
        readonly generalIsActive?: ICheckboxPropertyController;
        /**
         * Gets the controller for widget.properties.clientId property
         */
        readonly generalClientId?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.ignoreSections property
         */
        readonly generalIgnoreSections?: ICheckboxPropertyController;
        /**
         * Gets the controller for widget.properties.showCover property
         */
        readonly generalShowCover?: ICheckboxPropertyController;
        /**
         * Gets the controller for widget.properties.label property
         */
        readonly generalLabel?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.radius property
         */
        readonly generalRadius?: ISliderPropertyController;
        /**
         * Gets the controller for widget.properties.skipArticles property
         */
        readonly generalSkipArticles?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.skipIssues property
         */
        readonly generalSkipIssues?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.skipSections property
         */
        readonly generalSkipSections?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.src property
         */
        readonly generalSrc?: IFileDropPropertyController;
        /**
         * Gets the controller for widget.properties.text property
         */
        readonly generalText?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.unitId property
         */
        readonly generalUnitId?: IInputPropertyController;
        /**
         * Gets the controller for widget.properties.video property
         */
        readonly generalIsVideo?: ICheckboxPropertyController;
        /**
         * Gets the controller for widget.properties.visibleItems property
         */
        readonly generalVisibleItems?: IInputPropertyController;
        /**
         * Gets the controller for widget.styles.backgroundColor property
         */
        readonly stylesBackgroundColor?: IColorPropertyController;
        /**
         * Gets the controller for widget.styles.backgroundImage property
         */
        readonly stylesBackgroundImage?: IFileDropPropertyController;
        /**
         * Gets the controller for widget.styles.borderColor property
         */
        readonly stylesBorderColor?: IColorPropertyController;
        /**
         * Gets the controller for widget.styles.borderRadius property
         */
        readonly stylesBorderRadius?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.borderWidth property
         */
        readonly stylesBorderWidth?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.color property
         */
        readonly stylesColor?: IColorPropertyController;
        /**
         * Gets the controller for widget.properties.isActive property
         */
        readonly stylesDisplay?: ICheckboxPropertyController;
        /**
         * Gets the controller for widget.styles.fontFamily property
         */
        readonly stylesFontFamily?: IFontFamilyPropertyController;
        /**
         * Gets the controller for widget.styles.fontSize property
         */
        readonly stylesFontSize?: ISizePropertyController;
        /**
         * Gets the controller for widget.styles.fontStyle,
         * widget.styles.fontWeight and widget.styles.textDecoration properties
         */
        readonly stylesFontStyle?: IFontStylePropertyController;
        /**
         * Gets the controller for widget.styles.height property
         */
        readonly stylesHeight?: ISizePropertyController;
        /**
         * Gets the controller for widget.styles.margin property
         */
        readonly stylesMargin?: ISpacingPropertyController;
        /**
         * Gets the controller for widget.styles.minHeight property
         */
        readonly stylesMinHeight?: ISizePropertyController;
        /**
         * Gets the controller for widget.styles.padding property
         */
        readonly stylesPadding?: ISpacingPropertyController;
        /**
         * Gets the controller for widget.styles.boxShadow[blurRadius] property
         */
        readonly stylesBoxShadowBlur?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.boxShadow[color] property
         */
        readonly stylesBoxShadowColor?: IColorPropertyController;
        /**
         * Gets the controller for widget.styles.boxShadow[horizontalLength] property
         */
        readonly stylesBoxShadowHorizontal?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.boxShadow[spreadRadius] property
         */
        readonly stylesBoxShadowSpread?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.boxShadow[verticalLength] property
         */
        readonly stylesBoxShadowVertical?: ISliderPropertyController;
        /**
         * Gets the controller for widget.styles.textAlign property
         */
        readonly stylesTextAlign?: IAlignmentPropertyController;
        /**
         * Gets the controller for widget.styles.width property
         */
        readonly stylesWidth?: ISizePropertyController;
        /**
         * Gets the controller for widget.styles.stylesFontSizeColor property
         */
        readonly stylesFontSizeColor?: IColorPropertyController;
        /**
         * Gets the controller for widget.styles.stylesFontSizeBackgroundColor property
         */
        readonly stylesFontSizeBackgroundColor?: IColorPropertyController;
    }
}
