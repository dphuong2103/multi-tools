"use client";
import React, {
  useCallback,
  useContext,
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
import { DictionaryProps } from "@/types/data-types";
import { format } from "sql-formatter";
import { useForm } from "react-hook-form";
import {
  SqlFormatterFormModel,
  sqlFormatterFormSchema,
  textCases,
} from "@/models/sql-formatter-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import TextInputFormField from "@/components/form-fields/text-input-form-field";
import SelectFormField from "@/components/form-fields/select-form-field";
import { sqlLanguages } from "@/constants/sql-languages";
import usePersistFormData from "@/lib/hooks/usePersistFormData";
import useSyncFormParams from "@/lib/hooks/useSyncFormParams";
import useDefaultFormValues from "@/lib/hooks/useDefaultFormValue";
import { BeforeUnloadContext } from "@/contexts/before-unload-provider";

type EditorType = Parameters<NonNullable<EditorProps["onMount"]>>[0];
const sql_formatter_key = "sql-formatter-form-key";
const initialValues = {
  dataTypeCase: "upper",
  functionCase: "upper",
  input: "",
  keywordCase: "upper",
  language: "sql",
  linesBetweenQueries: 1,
  tabWidth: 1,
} as SqlFormatterFormModel;

interface SqlFormatterProps extends DictionaryProps {}

function SqlFormatter({ dictionary }: SqlFormatterProps) {
  const { theme } = useTheme();
  const [result, setResult] = useState("");

  const defaultFormValues = useDefaultFormValues<SqlFormatterFormModel>(
    sql_formatter_key,
    {
      language: {
        initialValue: initialValues.language,
        validationFn: (value) => sqlLanguages.includes(value),
      },
      dataTypeCase: {
        initialValue: initialValues.dataTypeCase,
        validationFn: (value) => textCases.includes(value),
      },
      functionCase: {
        initialValue: initialValues.functionCase,
        validationFn: (value) => textCases.includes(value),
      },
      keywordCase: {
        initialValue: initialValues.keywordCase,
        validationFn: (value) => textCases.includes(value),
      },
      linesBetweenQueries: {
        initialValue: initialValues.linesBetweenQueries,
        validationFn: (value) => !isNaN(parseInt(value)),
      },
      tabWidth: {
        initialValue: initialValues.tabWidth,
        validationFn: (value) => !isNaN(parseInt(value)),
      },
      input: { initialValue: initialValues.input },
    },
  );

  const form = useForm<SqlFormatterFormModel>({
    resolver: zodResolver(sqlFormatterFormSchema),
    defaultValues: defaultFormValues,
  });

  const { watch } = form;

  usePersistFormData(sql_formatter_key, { watch, excludes: ["input"] });
  useSyncFormParams({ watch: watch, excludes: ["input"] });

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

    const minEditorWidth = 100;
    const maxEditorWidth = parentWidth - 100;
    const editorWidth = Math.max(
      minEditorWidth,
      Math.min(mouseX, maxEditorWidth),
    );

    editorContainerRef.current.style.width = `${editorWidth}px`;
    resultContainerRef.current.style.width = `${parentWidth - editorWidth - 5}px`;
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

  const onSaveClick = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "script.sql";
    anchor.click();
  }, [result]);

  const onValidSubmit = useCallback(
    (data: SqlFormatterFormModel) => {
      try {
        setResult(
          format(data.input, {
            language: data.language,
            tabWidth: data.tabWidth,
            keywordCase: data.keywordCase,
            linesBetweenQueries: data.linesBetweenQueries,
            dataTypeCase: data.dataTypeCase,
            functionCase: data.functionCase,
          }),
        );
      } catch (e) {
        toast.error(dictionary.page.sqlFormatter.toast.format.error);
      }
    },
    [dictionary.page.sqlFormatter.toast.format.error],
  );

  const handleEditorMount = useCallback(
    (editor: EditorType, monaco: Monaco) => {
      editorInstanceRef.current = editor;
    },
    [],
  );

  const handleEditorChange = useCallback(
    (onChange: (value?: any) => void, value?: string) => {
      onChange(value);
      value ? setShowPrompt(true) : setShowPrompt(false);
      console.log(value ? true : false);
    },
    [setShowPrompt],
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

  const textCaseOptions = useMemo(
    () => [
      {
        label: dictionary.page.sqlFormatter.textCases.uppercase,
        value: "upper",
      },
      {
        label: dictionary.page.sqlFormatter.textCases.lowercase,
        value: "lower",
      },
      {
        label: dictionary.page.sqlFormatter.textCases.preserve,
        value: "preserve",
      },
    ],
    [
      dictionary.page.sqlFormatter.textCases.uppercase,
      dictionary.page.sqlFormatter.textCases.lowercase,
      dictionary.page.sqlFormatter.textCases.preserve,
    ],
  );

  const sqlLanguageOptions = useMemo(
    () =>
      sqlLanguages.map((language) => ({
        value: language,
        label: dictionary.page.sqlFormatter.sqlLanguages[language],
      })),
    [dictionary.page.sqlFormatter.sqlLanguages],
  );

  const onUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".sql";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        form.setValue("input", result);
      };
      reader.readAsText(file);
    };
    input.click();
  }, [form]);

  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValidSubmit)}
          className="h-full w-full"
        >
          <div className="flex flex-col h-full w-full gap-2 p-2 ">
            <div className="flex gap-2 items-center">
              <Button variant="default" type="submit" className="text-white">
                {dictionary.page.sqlFormatter.buttons.format}
              </Button>
              <Button variant="secondary" onClick={onSaveClick} type="button">
                {dictionary.page.sqlFormatter.buttons.save}
              </Button>
              <Button
                variant="secondary"
                onClick={onCopyClick}
                className="hidden md:inline-block"
                type="button"
              >
                {dictionary.page.sqlFormatter.buttons.copy}
              </Button>
              <Button
                variant="secondary"
                onClick={onUploadClick}
                className="hidden md:inline-block"
                type="button"
              >
                {dictionary.page.sqlFormatter.buttons.upload}
              </Button>
            </div>

            <div className="flex gap-2 h-full flex-col md:flex-row w-full max-w-full">
              <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-3 pt-3 ">
                <SelectFormField
                  control={form.control}
                  name="language"
                  label={dictionary.page.sqlFormatter.fields.language.label}
                  options={sqlLanguageOptions}
                />
                <TextInputFormField
                  control={form.control}
                  name="tabWidth"
                  label={dictionary.page.sqlFormatter.fields.tabWidth.label}
                  type="number"
                />
                <TextInputFormField
                  control={form.control}
                  name="linesBetweenQueries"
                  label={
                    dictionary.page.sqlFormatter.fields.lineBetweenQueries.label
                  }
                  type="number"
                />
                <SelectFormField
                  control={form.control}
                  name="keywordCase"
                  label={dictionary.page.sqlFormatter.fields.keywordCase.label}
                  options={textCaseOptions}
                />
                <SelectFormField
                  control={form.control}
                  name="functionCase"
                  label={dictionary.page.sqlFormatter.fields.functionCase.label}
                  options={textCaseOptions}
                />
                <SelectFormField
                  control={form.control}
                  name="dataTypeCase"
                  label={dictionary.page.sqlFormatter.fields.dataTypeCase.label}
                  options={textCaseOptions}
                />
              </div>

              <div
                ref={editorParentRef}
                className="max-w-full w-full h-full flex overflow-hidden flex-col md:flex-row"
              >
                <div
                  ref={editorContainerRef}
                  className="h-3/5 md:h-full w-full md:w-2/4"
                >
                  <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                      <Editor
                        theme={theme === "dark" ? "vs-dark" : "light"}
                        onMount={handleEditorMount}
                        height="100%"
                        defaultLanguage="sql"
                        value={field.value}
                        onChange={(data: any) =>
                          handleEditorChange(field.onChange, data)
                        }
                        options={{
                          fontSize: 14,
                          minimap: { enabled: false },
                          contextmenu: false,
                          formatOnPaste: true,
                        }}
                      />
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "gutter h-0 md:w-3 md:h-full border bg-black cursor-ew-resize",
                    styles.gutter,
                  )}
                  onMouseDown={handleGutterMouseDown}
                ></div>

                <div
                  ref={resultContainerRef}
                  className="h-2/5 md:h-full w-full md:w-2/4"
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
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SqlFormatter;
