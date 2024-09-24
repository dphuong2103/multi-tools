//Seperate the use client file to use metadata
"use client"
import React, { useCallback, useRef, useState } from 'react'
import Editor, { EditorProps, OnMount } from '@monaco-editor/react';
import styles from "./styles.module.scss";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];

function SvgEditor() {
  const [value, setValue] = useState("");
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState("");
  const editorRef = useRef<EditorType | null>(null);
  function handleEditorChange(value?: string) {
    if (!value) {
      setValue("");
      setImageSrc("");
      return;
    }
    setValue(value);
    try {
      const svgImgSrc = `data:image/svg+xml;base64,${btoa(value)}`
      setImageSrc(svgImgSrc);
    } catch (err) {
      console.log(err);
    }
  }

  function formatCode() {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  }

  const onMount = useCallback((editor: EditorType) => {
    editorRef.current = editor;
  }, [])

  function onSaveClick() {
    const svgText = editorRef.current?.getValue()
    if (!svgText) return;
    var blob = new Blob([svgText], { type: "text/plain" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "image.svg";
    a.click();
  }
  return (
    <div className="flex flex-col h-full w-full gap-2 p-2">
      <div className="flex gap-2 items-center">
        <span className="prose font-bold text-xl md:text-4xl mr-2">Online SVG Editor</span>
        <Button variant="secondary" onClick={onSaveClick}>Save</Button>
        <Button variant="secondary" onClick={formatCode}>Format</Button>
      </div>
      <div className="w-full flex gap-2 h-full flex-col md:flex-row">
        <div className="w-full md:w-3/4 h-3/5 md:h-full">
          <Editor
            theme={theme === "dark" ? "vs-dark" : ""}
            onMount={onMount}
            height="100%"
            defaultLanguage="html"
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: {
                enabled: false
              },
              contextmenu: false,
              formatOnPaste: true,

            }}
          />
        </div>
        <div className="h-0 md:w-3 md:h-full border border-bd bg-black">
        </div>
        <div className="flex items-center justify-center h-2/5 md:h-full">
          {
            imageSrc && <img
              src={imageSrc}
              className={cn(styles["svg-image"], "max-h-full")}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default SvgEditor
