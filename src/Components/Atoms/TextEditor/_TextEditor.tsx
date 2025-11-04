// import { Editor } from '@tinymce/tinymce-react';
import Editor from '@monaco-editor/react';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React from 'react';

const _TextEditor = controlled<
Reptile.Props.BaseProps,
Reptile.Controllers.IAdvancedCssController
>(({controller}) => {
    useInitController(controller);

    return (
        <Editor
            value={controller.css}
            height={'500px'}
            onChange={(v) => controller.updatedCss = v}
            // onMount={handleEditorDidMount}
            options={{
                wordWrap: 'on',
                automaticLayout: true,
                autoClosingBrackets: true,
                autoClosingQuotes: true,
                autoIndent: true,
                formatOnPaste: true,
                formatOnType: true,
                formatDocument: true,
                hover: {
                    delay: 1000,
                },
            }}
        />
    );
});

export default _TextEditor;
