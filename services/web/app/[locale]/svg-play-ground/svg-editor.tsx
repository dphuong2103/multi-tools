"use client";
import React, {
  use,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Editor, { EditorProps } from "@monaco-editor/react";
import styles from "./styles.module.scss";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DictionaryProps } from "@/types/data-types";
import { BeforeUnloadContext } from "@/contexts/before-unload-provider";

type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];

interface SvgEditorProps extends DictionaryProps {}

function SvgEditor({ dictionary }: SvgEditorProps) {
  const [svgCode, setSvgCode] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const { theme } = useTheme();

  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  const editorParentRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorType | null>(null);
  const { setShowPrompt } = useContext(BeforeUnloadContext);
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
      setShowPrompt(false);
      setSvgCode("");
      setImageSrc("");
      return;
    }
    setShowPrompt(true);
    setSvgCode(value);
    try {
      const encodedSvg = `data:image/svg+xml;base64,${btoa(value)}`;
      setImageSrc(encodedSvg);
    } catch (error) {
      console.error("Error encoding SVG", error);
    }
  }, [setShowPrompt]);

  const saveSvgToFile = useCallback(() => {
    const svgContent = editorInstanceRef.current?.getValue();
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "image.svg";
    anchor.click();
  }, []);

  const formatSvgCode = useCallback(() => {
    editorInstanceRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  const handleEditorMount = useCallback((editor: EditorType) => {
    editorInstanceRef.current = editor;
  }, []);

  const copySvgContent = useCallback(() => {
    const svgContent = editorInstanceRef.current?.getValue();
    if (!svgContent) return;
    try {
      navigator.clipboard.writeText(svgContent);
      toast.success(dictionary.page.svgPlayGround.toast.copy.success);
    } catch (err) {
      toast.error(dictionary.page.svgPlayGround.toast.copy.error);
    }
  }, [
    dictionary.page.svgPlayGround.toast.copy.error,
    dictionary.page.svgPlayGround.toast.copy.success,
  ]);

  const onUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".svg";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        editorInstanceRef.current?.setValue(content);
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

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
        <Button variant="secondary" onClick={saveSvgToFile}>
          {dictionary.page.svgPlayGround.buttons.save}
        </Button>
        <Button variant="secondary" onClick={formatSvgCode}>
          {dictionary.page.svgPlayGround.buttons.format}
        </Button>
        <Button
          variant="secondary"
          onClick={copySvgContent}
          className="hidden md:inline-block"
        >
          {dictionary.page.svgPlayGround.buttons.copy}
        </Button>
        <Button
          variant="secondary"
          onClick={onUploadClick}
          className="hidden md:inline-block"
        >
          {dictionary.page.svgPlayGround.buttons.upload}
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
            defaultLanguage="html"
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
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              className={cn(styles["svg-image"], "max-h-full")}
              alt="SVG Output"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SvgEditor;
