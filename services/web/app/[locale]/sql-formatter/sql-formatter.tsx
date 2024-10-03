"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor, { EditorProps, Monaco } from "@monaco-editor/react";
import styles from "./styles.module.scss";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DictionaryProps } from "@/types/data-types";
import { format } from "sql-formatter";
type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];

interface SqlFormatterProps extends DictionaryProps {}

function SqlFormatter({ dictionary }: SqlFormatterProps) {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState("");
  const { theme } = useTheme();

  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  const editorParentRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorType | null>(null);

  const isDraggingRef = useRef(false);

  const handleGutterDrag = useRef((event: MouseEvent) => {
    if (
      !editorContainerRef.current ||
      !resultContainerRef.current ||
      !editorParentRef.current
    )
      return;

    const parentWidth = editorParentRef.current.offsetWidth;
    const parentLeft = editorParentRef.current.getBoundingClientRect().left;

    const mouseX = event.clientX - parentLeft;

    const editorWidth = Math.max(0, Math.min(mouseX, parentWidth));

    editorContainerRef.current.style.width = `${editorWidth}px`;
    resultContainerRef.current.style.width = `${parentWidth - editorWidth}px`;
  });

  const handleGutterMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleGutterDrag.current);
    document.removeEventListener("mouseup", handleGutterMouseUp);
  }, []);

  const handleGutterMouseDown = useCallback(() => {
    isDraggingRef.current = true;
    document.addEventListener("mousemove", handleGutterDrag.current);
    document.addEventListener("mouseup", handleGutterMouseUp);
  }, [handleGutterMouseUp]);

  const handleEditorChange = useCallback((value?: string) => {
    if (!value) {
      setInput("");
      return;
    }
    setInput(value);
  }, []);

  const onSaveClick = useCallback(() => {
    if (!result) return;

    const blob = new Blob([result], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "script.sql";
    anchor.click();
  }, [result]);

  const onFormatClick = useCallback(() => {
    if (!editorInstanceRef.current) return;
    const input = editorInstanceRef.current.getValue();
    if (!input) {
      setResult("");
      return;
    }
    setResult(
      format(input, {
        language: "sql",
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      }),
    );
  }, []);

  const handleEditorMount = useCallback(
    (editor: EditorType, monaco: Monaco) => {
      editorInstanceRef.current = editor;
    },
    [],
  );

  const onCopyClick = useCallback(() => {
    if (!result) return;
    try {
      navigator.clipboard.writeText(result);
      toast.success(dictionary.page.sqlFormatter.toast.copy.success);
    } catch (err) {
      toast.error(dictionary.page.sqlFormatter.toast.copy.error);
    }
  }, [
    dictionary.page.sqlFormatter.toast.copy.error,
    dictionary.page.sqlFormatter.toast.copy.success,
    result,
  ]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.removeEventListener("mousemove", handleGutterDrag.current);
      document.removeEventListener("mouseup", handleGutterMouseUp);
    };
  }, [handleGutterMouseUp]);

  return (
    <div className="flex flex-col h-full w-full gap-2 p-2">
      <div className="flex gap-2 items-center">
        <Button variant="secondary" onClick={onSaveClick}>
          {dictionary.page.sqlFormatter.buttons.save}
        </Button>
        <Button variant="secondary" onClick={onFormatClick}>
          {dictionary.page.sqlFormatter.buttons.format}
        </Button>
        <Button
          variant="secondary"
          onClick={onCopyClick}
          className="hidden md:inline-block"
        >
          {dictionary.page.sqlFormatter.buttons.copy}
        </Button>
      </div>

      <div
        className="w-full flex gap-2 h-full flex-col md:flex-row"
        ref={editorParentRef}
      >
        <div
          ref={editorContainerRef}
          className="h-3/5 md:h-full w-full md:w-2/4"
        >
          <Editor
            theme={theme === "dark" ? "vs-dark" : "light"}
            onMount={handleEditorMount}
            height="100%"
            defaultLanguage="sql"
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              contextmenu: false,
              formatOnPaste: true,
            }}
          />
        </div>

        <div
          className={cn(
            "gutter h-0 md:w-3 md:h-full border bg-black cursor-ew-resize",
            styles.gutter,
          )}
          onMouseDown={handleGutterMouseDown}
        />

        <div
          ref={resultContainerRef}
          className="flex items-center justify-center h-2/5 md:h-full w-full md:w-2/4 "
        >
          <Editor
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={result}
            height="100%"
            defaultLanguage="sql"
            className="hide-cursor-monaco-editor"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              contextmenu: false,
              formatOnPaste: true,
              readOnly: true,
              hideCursorInOverviewRuler: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SqlFormatter;
