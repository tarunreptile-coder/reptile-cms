import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMceEditor } from "tinymce";
import clsx from "clsx";
import { controlled } from "@Reptile/Framework";

import "./_TextEditor.scss";
import "./_EditorUI.css";
import "./_EditorContent.css";
import "./_InlineEditor.css";
import { ProgressCircle } from "@Reptile/Components/Atoms";
import { useInitController } from "@Reptile/Hooks";
import { FONTS_URL, FONTS_URL2 } from "@Reptile/Constants/Constants";
import { UTILS } from "~/Utils";
import { runInAction } from "mobx";

const _TextEditor = controlled<
  Reptile.Props.TextEditorProps,
  Reptile.Controllers.ITextEditorController
>(({ className, style, controller, mode, isTemplateEditor, disabled }) => {
  useInitController(controller);
  const editorMode = mode ? mode : controller.mode;

  const defaultFontsForEditor =
    "Arial,Helvatica=arial,helvetica,sans-serif;Andada Pro='Andada Pro',serif; Archiva=Archiva,sans-serif; EB Garamond='EB Garamond',serif; Epilogue=Epilogue,sans-serif; Inter=Inter,sans-serif; 'JetBrains Mono'='JetBrains Mono',monospace; Lato=Lato,sans-serif; Lora=Lora,serif; Merriweather=Merriweather,serif; Montserrat=Montserrat,sans-serif; Nunito=Nunito,sans-serif; 'Open Sans'='Open Sans',sans-serif; Oswald=Oswald,sans-serif; 'Playfair Display'='Playfair Display',serif; Poppins=Poppins,sans-serif; Raleway=Raleway,sans-serif; Roboto=Roboto,sans-serif; Sora=Sora,sans-serif; 'Source Serif Pro'='Source Serif Pro',serif; 'Work Sans'='Work Sans',sans-serif;";
  const richTextToolbar = [
    `undo redo | fontselect fontsizeselect | bold italic underline strikethrough`,
    `alignleft aligncenter alignright | bullist numlist outdent indent | forecolor backcolor | link unlink | preview`,
  ];

  const [editorSize, setEditorSize] =
    useState<Reptile.Props.TextEditorSize>("full");
  const [fontsForEditor, setFontsForEditor] = useState(defaultFontsForEditor);
  const [currentTheme, setCurrentTheme] = useState(controller?.theme);

  const toolbarOptions = {
    content: isTemplateEditor
      ? richTextToolbar
      : "undo redo fontselect bold italic underline strikethrough link preview code devicePreview",
    "rich-text": richTextToolbar,
  }[editorMode ?? "content"];

  useEffect(() => {
    const fonts =
      controller?.rawFonts
        ?.map(({ name }: any) => `${name.displayName}=${name.name}`)
        .join(";") ?? "";
    setFontsForEditor(fonts);
  }, [controller?.rawFonts]);

  const handleInitialize = useCallback(
    (_: unknown, editor: TinyMceEditor) => {
      controller.initEditor(editor);
    },
    [controller]
  );

  const handleEditorChange = useCallback(
    // (v: string) => {
    //   controller.value = v;
    // },
    (v: string) =>
      runInAction(() => {
        controller.value = v;
      }),
    [controller]
  );

  useEffect(() => {
    setCurrentTheme(controller?.theme);
  }, [controller?.theme]);

  const currentStyles = controller?.theme?.css;
  const rawFonts = controller?.rawFonts;
  const fontsDropdown =
    rawFonts
      ?.map(({ name }: any) => `${name.displayName}=${name.name}`)
      .join(";") ?? defaultFontsForEditor;
  const htmlBody = UTILS.normalizeImageSrcInEditor(controller.value);
  return (
    <div
      className={clsx("rt-text-editor", editorSize, className)}
      style={style}
    >
      {controller.loading ? (
        <div className="progress-container">
          <ProgressCircle
            variant="indeterminate"
            size={() => (editorMode === "content" ? "md" : "xxs")}
          />
        </div>
      ) : (
        <Editor
          apiKey="zibkic0vmjf7st4rre43xgbxe0muongvt8akd0ukjhqk5qq1"
          plugins={["link", "preview", "code"]}
          disabled={controller.loading || disabled}
          value={htmlBody}
          onEditorChange={handleEditorChange}
          onInit={handleInitialize}
          init={{
            inline: editorMode === "rich-text",
            height:
              (editorMode ?? "content") === "content" ? "100%" : undefined,
            menubar: false,
            branding: false,
            toolbar: toolbarOptions,
            font_formats: fontsDropdown, //fontsForEditor,
            content_style: `
              @import url('https://fonts.googleapis.com/css2?family=Andada+Pro&family=Archiva&family=EB+Garamond&family=Epilogue&family=Inter&family=JetBrains+Mono&family=Lato&family=Lora&family=Merriweather&family=Montserrat&family=Nunito&family=Open+Sans&family=Oswald&family=Playfair+Display&family=Poppins&family=Raleway&family=Roboto&family=Sora&family=Source+Serif+Pro&family=Work+Sans&display=swap');
              body {
                font-family: Arial, Helvetica, sans-serif;
              }${currentStyles || ""}
            `,
            skin_url: "/Scripts/tinymce/skins/ui/oxide",
              // editorMode === "content"
              //   ? "/Scripts/tinymce/skins/ui/oxide" //"./_InlineEditor.css"
              //   : "", // "./_EditorUI.css"
            content_css: [
              // "/Scripts/tinymce/skins/customskins/_EditorUI.css",
              // "./_EditorContent.css",
              "/Scripts/editor/custom-tag-styles.css",
              FONTS_URL,
              FONTS_URL2,
            ],
            statusbar: false,
            setup: (editor) => {
              let editorSizeState = editorSize;
              editor.ui.registry.addMenuButton("devicePreview", {
                text: "Device Preview",
                fetch: (callback) => {
                  callback([
                    {
                      type: "togglemenuitem",
                      text: "Full",
                      onAction: () => {
                        setEditorSize("full");
                        editorSizeState = "full";
                      },
                      onSetup: (api) => {
                        api.setActive(editorSizeState == "full");
                      },
                    },
                    {
                      type: "togglemenuitem",
                      text: "Tablet",
                      onAction: () => {
                        setEditorSize("tablet");
                        editorSizeState = "tablet";
                      },
                      onSetup: (api) => {
                        api.setActive(editorSizeState == "tablet");
                      },
                    },
                    {
                      type: "togglemenuitem",
                      text: "Mobile",
                      onAction: () => {
                        setEditorSize("mobile");
                        editorSizeState = "mobile";
                      },
                      onSetup: (api) => {
                        api.setActive(editorSizeState == "mobile");
                      },
                    },
                  ]);
                },
              });
              editor.on("init", function (e) {
                let editor = e.target;
                // Remove all <style> tags inside <head>
                const head = editor.dom.select("head")[0];
                const existingStyles = editor.dom.select("style", head);
                existingStyles.forEach((styleEl: any) =>
                  editor.dom.remove(styleEl)
                );
                // Add new styles from current theme and styles
                let css = [
                  UTILS.loadFontsCss(rawFonts) || "",
                  currentStyles || "",
                ].join(" ");
                let style = UTILS.createStyleElement(css);
                editor.dom.add(editor.dom.select("head")[0], style);
              });
            },
          }}
        />
      )}
    </div>
  );
});

_TextEditor.displayName = "TextEditor";

export default _TextEditor;
