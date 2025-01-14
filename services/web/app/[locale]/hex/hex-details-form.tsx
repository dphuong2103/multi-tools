"use client";
import TextAreaFormField from "@/components/form-fields/text-area-form-fields";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dictionary } from "@/lib/dictionary";
import { decodeHex, encodeHex } from "@/lib/hex";
import useDefaultFormValues from "@/lib/hooks/useDefaultFormValue";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import usePersistFormData from "@/lib/hooks/usePersistFormData";
import useSyncFormParams from "@/lib/hooks/useSyncFormParams";
import { isValidUrl } from "@/lib/url-lib";
import { createHexFormSchema, HexFormModel } from "@/models/hex-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface HexDetailsFormProps {
  dictionary: Dictionary;
}

const form_key = "hex-form-key";
const history_key = "hex-history-key";

const initialValues: HexFormModel = {
  operation: "decode",
  input: "",
};

const operations = ["encode", "decode"];

function HexDetailsForm({ dictionary }: HexDetailsFormProps) {
  const defaultFormValues = useDefaultFormValues<HexFormModel>(form_key, {
    operation: {
      initialValue: initialValues.operation,
      validationFn: (value) => operations.includes(value),
    },
    input: { initialValue: initialValues.input },
  });

  const form = useForm<HexFormModel>({
    resolver: zodResolver(createHexFormSchema(dictionary)),
    defaultValues: defaultFormValues,
  });

  const { watch } = form;

  usePersistFormData(form_key, { watch, excludes: ["input"] });
  useSyncFormParams({ watch: watch, excludes: ["input"] });

  const [output, setOutput] = useState("");
  const [history, setHistory] = useLocalStorage<
    {
      id: number;
      input: string;
      output: string;
    }[]
  >(history_key, []);

  const onValidSubmit = useCallback(
    (data: HexFormModel) => {
      const result =
        data.operation === "encode"
          ? encodeHex(data.input)
          : decodeHex(data.input);
      setOutput(result);

      const newHistory = history.length === 10 ? history.slice(0, -1) : history;

      setHistory([
        {
          id: new Date().getTime(),
          input: data.input,
          output: result,
        },
        ...newHistory,
      ]);
    },
    [setOutput, history, setHistory],
  );

  const onCopyClick = useCallback(() => {
    if (!output) return;
    try {
      navigator.clipboard.writeText(output);
      toast.success(dictionary.page.hex.toast.copy.success);
    } catch (error) {
      toast.error(dictionary.page.hex.toast.copy.error);
    }
  }, [
    output,
    dictionary.page.hex.toast.copy.success,
    dictionary.page.hex.toast.copy.error,
  ]);

  const onHistoryCopyClick = useCallback(
    (item: { input: string; output: string }) => {
      try {
        navigator.clipboard.writeText(item.output);
        toast.success(dictionary.page.hex.toast.copy.success);
      } catch (error) {
        toast.error(dictionary.page.hex.toast.copy.error);
      }
    },
    [
      dictionary.page.hex.toast.copy.success,
      dictionary.page.hex.toast.copy.error,
    ],
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit)}>
          <div className="flex flex-col gap-3">
            <TextAreaFormField
              control={form.control}
              name="input"
              className="my-prose w-full p-2 mt-2"
              placeholder="Enter text to encode/decode"
              rows={5}
            />
            <div className="w-full flex justify-between">
              <Controller
                control={form.control}
                name="operation"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encode">
                        {dictionary.page.hex.operations.encode}
                        <span className="sr-only">
                          {dictionary.page.hex.operations.encode}
                        </span>
                      </SelectItem>
                      <SelectItem value="decode">
                        {dictionary.page.hex.operations.decode}
                        <span className="sr-only">
                          {dictionary.page.hex.operations.decode}
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Button>{dictionary.page.hex.buttons.convert}</Button>
            </div>
            <div className="relative">
              <Textarea
                className="my-prose w-full p-2 resize-none"
                value={output}
                contentEditable={false}
                rows={5}
                readOnly={true}
                aria-label="output"
              />
              <Button
                className="absolute right-0 bottom-0 hidden md:inline-block"
                variant="ghost"
                type="button"
                onClick={onCopyClick}
              >
                <Copy />
                <span className="sr-only">copy</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {history.length > 0 && (
        <Card className=" bg-gray-500 text-white mt-2 flex flex-col gap-3">
          {history.map((item, index) => (
            <div key={item.id ?? index} className="flex items-center">
              <div>
                {index + 1}. <span className="text-sm">{item.input}</span> :{" "}
                {isValidUrl(item.output) ? (
                  <Link
                    target="_blank"
                    href={item.output}
                    className="text-blue-300 hover:underline"
                  >
                    {item.output}
                  </Link>
                ) : (
                  <span className="text-blue-300">{item.output}</span>
                )}
              </div>
              <Button
                className="hidden md:inline-block"
                variant="ghost"
                type="button"
                onClick={() => onHistoryCopyClick(item)}
              >
                <span className="sr-only">copy history</span>
                <Copy />
              </Button>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}

export default HexDetailsForm;
