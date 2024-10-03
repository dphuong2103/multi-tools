"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Editor, { EditorProps, Monaco } from "@monaco-editor/react";
import styles from "./styles.module.scss";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DictionaryProps, ProgrammingLanguage } from "@/types/data-types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mapProgrammingLanguageToExtension,
  programmingLanguageBootstrapCode,
  programmingLanguages,
} from "@/constants/programming-languages";
import { executeCode } from "@/lib/apis/code-editor-api";
import { Loader2, Play } from "lucide-react";
import axios from "axios";
type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];

interface CodeEditorProps extends DictionaryProps { }

function CodeEditor({ dictionary }: CodeEditorProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>("javascript");
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const { theme } = useTheme();
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const monacoInstanceRef = useRef<Monaco | null>(null);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  const editorParentRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorType | null>(null);
  const abortControllerRef = useRef<null | AbortController>(null);
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

  // const handleEditorChange = useCallback((value?: string) => {
  //   if (!value) {
  //     setInput("");
  //     return;
  //   }
  //   setInput(value);
  // }, []);

  const onSaveClick = useCallback(() => {
    const sourceCode = editorInstanceRef.current?.getValue();
    if (!sourceCode) return;
    const blob = new Blob([sourceCode], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `script.${mapProgrammingLanguageToExtension[selectedLanguage]}`;
    anchor.click();
  }, [selectedLanguage]);

  const onRunClick = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const sourceCode = editorInstanceRef.current?.getValue();
    if (!sourceCode) return;
    setOutput([]);
    setError([]);
    try {
      setIsLoading(true);
      const { run: executionResult } = await executeCode(
        selectedLanguage,
        sourceCode,
        abortControllerRef.current,
      );
      if (!!executionResult.stderr) {
        setOutput([]);
        console.log("error", executionResult.stderr.split("\n"));
        setError(executionResult.stderr.split("\n"));
      } else {
        setOutput(executionResult.output.split("\n"));
        setError([]);
      }
    } catch (error) {
      console.log(error);
      if (axios.isCancel(error)) {
        return;
      }
      toast.error(dictionary.page.codeEditor.toast.runCode.error);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedLanguage,
    setIsLoading,
    dictionary.page.codeEditor.toast.runCode.error,
  ]);

  const onFormatClick = useCallback(() => {
    if (!editorInstanceRef.current) return;
    editorInstanceRef.current.getAction("editor.action.formatDocument")?.run();
  }, []);

  const handleEditorMount = useCallback(
    (editor: EditorType, _monaco: Monaco) => {
      editorInstanceRef.current = editor;
      // monacoInstanceRef.current = monaco;
    },
    [],
  );

  const onCopyClick = useCallback(() => {
    const sourceCode = editorInstanceRef.current?.getValue();
    if (!sourceCode) return;
    try {
      navigator.clipboard.writeText(sourceCode);
      toast.success(dictionary.page.codeEditor.toast.copy.success);
    } catch (err) {
      toast.error(dictionary.page.codeEditor.toast.copy.error);
    }
  }, [
    dictionary.page.codeEditor.toast.copy.error,
    dictionary.page.codeEditor.toast.copy.success,
  ]);

  const onTemplateClick = useCallback(() => {
    if (!editorInstanceRef.current) return;
    editorInstanceRef.current.setValue(
      programmingLanguageBootstrapCode[selectedLanguage],
    );
  }, [selectedLanguage]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.removeEventListener("mousemove", handleGutterDrag.current);
      document.removeEventListener("mouseup", handleGutterMouseUp);
    };
  }, [handleGutterMouseUp]);

  const showFormatButton = useMemo(() => {
    return (
      selectedLanguage === "javascript" || selectedLanguage === "typescript"
    );
  }, [selectedLanguage]);

  useEffect(() => {
    const controller = abortControllerRef.current;
    return () => {
      controller?.abort();
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-2 p-2">
      <div className="flex gap-2 items-center">
        <Select
          value={selectedLanguage}
          onValueChange={(e) => setSelectedLanguage(e as ProgrammingLanguage)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {programmingLanguages.map((language) => (
                <SelectItem value={language} key={language}>
                  {dictionary.page.codeEditor.programmingLanguages[language]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="default" onClick={onRunClick}>
          <Play width={20} height={20} className="text-white" />
        </Button>
        <Button variant="secondary" onClick={onSaveClick}>
          {dictionary.page.codeEditor.buttons.save}
        </Button>
        <Button
          variant="secondary"
          onClick={onFormatClick}
          className={cn({ hidden: !showFormatButton })}
        >
          {dictionary.page.codeEditor.buttons.format}
        </Button>
        <Button
          variant="secondary"
          onClick={onCopyClick}
          className="hidden md:inline-block"
        >
          {dictionary.page.codeEditor.buttons.copy}
        </Button>
        <Button
          variant="secondary"
          onClick={onTemplateClick}
          className="hidden md:inline-block"
        >
          {dictionary.page.codeEditor.buttons.template}
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
            language={selectedLanguage}
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
          className="flex flex-col items-center justify-center h-2/5 md:h-full w-full md:w-2/4 "
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {error.length > 0
            ? error.map((line, i) => <span key={i}>{line}</span>)
            : output.map((line, i) => <span key={i}>{line}</span>)}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
