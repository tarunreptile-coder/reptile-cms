declare namespace Reptile.Controllers {
    export interface ITextEditorController extends IController {
        /**
         * Gets or sets the value of the editor.
         */
        value: string,
        /**
         * Gets which mode the editor should use.
         * * content - full sized editor with toolbar as header
         * * rich-text - inline text editor with floating toolbar
         */
        readonly mode: 'content' | 'rich-text',
        /**
         * Gets if the controller is in the loading state.
         */
        readonly loading: boolean,
        /**
         * Gets if there were loading errors.
         */
        readonly error?: string,
        /**
         * Available fonts in format displayName1=name1;displayName2=name2;...
         */
        readonly fonts: string;
        /**
         * Content styles in css format.
         */
        readonly styles: string;

        readonly theme: any;

        readonly rawFonts: any;
        /**
         * Sets the reference to the TinyMCE editor.
         * @param editor Editor to set
         */
        initEditor(editor: import('tinymce').Editor): void,
        /**
         * Inserts the image with given caption.
         * @param img Image url to insert
         * @param caption Caption to insert below the image
         */
        insertImage(img: string, caption: string): void,
        /**
         * Apply given style to current selection.
         * @param styleRule Style rule to apply
         */
        applyStyle(styleRule: Reptile.Models.Rule): void,
    }
}
