"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Editor, { EditorProps } from '@monaco-editor/react';
import styles from "./styles.module.scss";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { DictionaryProps } from '@/types/data-types';

type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];

interface SvgEditorProps extends DictionaryProps { }

function SvgEditor({ dictionary }: SvgEditorProps) {
  const [svgCode, setSvgCode] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const { theme } = useTheme();

  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  const editorParentRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorType | null>(null);

  const isDraggingRef = useRef(false);

  const handleGutterDrag = useRef((event: MouseEvent) => {
    if (!editorContainerRef.current || !resultContainerRef.current || !editorParentRef.current) return;

    const parentWidth = editorParentRef.current.offsetWidth;
    const parentLeft = editorParentRef.current.getBoundingClientRect().left;

    const mouseX = event.clientX - parentLeft;

    const editorWidth = Math.max(0, Math.min(mouseX, parentWidth));

    editorContainerRef.current.style.width = `${editorWidth}px`;
    resultContainerRef.current.style.width = `${parentWidth - editorWidth}px`;
  });

  const handleGutterMouseDown = useCallback(() => {
    isDraggingRef.current = true;
    document.addEventListener("mousemove", handleGutterDrag.current);
    document.addEventListener("mouseup", handleGutterMouseUp);
  }, []);

  /** Handle the mouse up event to stop dragging */
  const handleGutterMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleGutterDrag.current);
    document.removeEventListener("mouseup", handleGutterMouseUp);
  }, []);

  const handleEditorChange = useCallback((value?: string) => {
    if (!value) {
      setSvgCode("");
      setImageSrc("");
      return;
    }
    setSvgCode(value);
    try {
      const encodedSvg = `data:image/svg+xml;base64,${btoa(value)}`;
      setImageSrc(encodedSvg);
    } catch (error) {
      console.error("Error encoding SVG", error);
    }
  }, []);

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
    editorInstanceRef.current?.getAction('editor.action.formatDocument')?.run();
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
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleGutterDrag.current);
      document.removeEventListener("mouseup", handleGutterMouseUp);
    };
  }, [handleGutterMouseUp]);

  return (
    <div className="flex flex-col h-full w-full gap-2 p-2">
      <div className="flex gap-2 items-center">
        <Button variant="secondary" onClick={saveSvgToFile}>{dictionary.page.svgPlayGround.buttons.save}</Button>
        <Button variant="secondary" onClick={formatSvgCode}>{dictionary.page.svgPlayGround.buttons.format}</Button>
        <Button variant="secondary" onClick={copySvgContent} className="hidden md:inline-block">{dictionary.page.svgPlayGround.buttons.copy}</Button>
      </div>
      <div className="w-full flex gap-2 h-full flex-col md:flex-row" ref={editorParentRef}>
        <div ref={editorContainerRef} className="h-3/5 md:h-full w-full md:w-3/4">
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
          className={cn("gutter h-0 md:w-3 md:h-full border bg-black cursor-ew-resize", styles.gutter)}
          onMouseDown={handleGutterMouseDown}
        />

        <div ref={resultContainerRef} className="flex items-center justify-center h-2/5 md:h-full w-full md:w-1/4 ">
          {imageSrc && (
            <img src={imageSrc} className={cn(styles["svg-image"], "max-h-full")} alt="SVG Output" />
          )}
        </div>
      </div>
    </div>
  );
}

export default SvgEditor;
