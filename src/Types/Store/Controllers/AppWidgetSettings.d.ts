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
         * Gets or sets the current image url.
         */
        value?: string;
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

    export interface IAppWidgetSettingsController extends IController {
        /**
         * Gets the controller for widget.styles.backgroundColor property
         */
        readonly stylesBackgroundColor?: IColorPropertyController;
    }
}
