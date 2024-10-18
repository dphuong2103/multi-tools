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
import { decodeBase64, encodeBase64 } from "@/lib/base64";
import { Dictionary } from "@/lib/dictionary";
import useDefaultFormValues from "@/lib/hooks/useDefaultFormValue";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import usePersistFormData from "@/lib/hooks/usePersistFormData";
import useSyncFormParams from "@/lib/hooks/useSyncFormParams";
import { isValidUrl } from "@/lib/url-lib";
import {
  Base64FormModel,
  createBase64FormSchema,
  operations,
} from "@/models/base64-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Base64DetailsFormProps {
  dictionary: Dictionary;
}
const initialValues: Base64FormModel = {
  operation: "decode",
  input: "",
};

const form_key = "base64-form-key";
const history_key = "base64-history-key";

function Base64DetailsForm({ dictionary }: Base64DetailsFormProps) {
  const defaultFormValues = useDefaultFormValues<Base64FormModel>(form_key, {
    operation: {
      initialValue: initialValues.operation,
      validationFn: (value) => operations.includes(value),
    },
    input: { initialValue: initialValues.input },
  });

  const form = useForm<Base64FormModel>({
    resolver: zodResolver(createBase64FormSchema(dictionary)),
    defaultValues: defaultFormValues,
  });
  const { watch } = form;

  usePersistFormData(form_key, { watch, excludes: ["input"] });
  useSyncFormParams({ watch: watch, excludes: ["input"] });

  const [output, setOutput] = useState("");
  const [history, setHistory] = useLocalStorage<
    {
      input: string;
      output: string;
    }[]
  >(history_key, []);

  const onValidSubmit = useCallback(
    (data: Base64FormModel) => {
      const result =
        data.operation === "encode"
          ? encodeBase64(data.input)
          : decodeBase64(data.input);
      setOutput(result);
      const newHistory = history.length === 10 ? history.slice(0, -1) : history;
      setHistory([
        {
          input: data.input,
          output: result,
        },
        ...newHistory,
      ]);
    },
    [history, setHistory, setOutput],
  );

  const onCopyClick = useCallback(() => {
    if (!output) return;
    try {
      navigator.clipboard.writeText(output);
      toast.success(dictionary.page.base64.toast.copy.success);
    } catch (error) {
      toast.error(dictionary.page.base64.toast.copy.error);
    }
  }, [
    output,
    dictionary.page.base64.toast.copy.success,
    dictionary.page.base64.toast.copy.error,
  ]);

  const onHistoryCopyClick = useCallback(
    (item: { input: string; output: string }) => {
      try {
        navigator.clipboard.writeText(item.output);
        toast.success(dictionary.page.base64.toast.copy.success);
      } catch (error) {
        toast.error(dictionary.page.base64.toast.copy.error);
      }
    },
    [
      dictionary.page.base64.toast.copy.success,
      dictionary.page.base64.toast.copy.error,
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
                        {dictionary.page.base64.operations.encode}
                      </SelectItem>
                      <SelectItem value="decode">
                        {dictionary.page.base64.operations.decode}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Button>{dictionary.page.base64.buttons.convert}</Button>
            </div>
            <div className="relative">
              <Textarea
                className="w-full p-2 resize-none"
                value={output}
                contentEditable={false}
                rows={5}
                readOnly={true}
              />
              <Button
                className="absolute right-0 bottom-0 hidden md:inline-block"
                variant="ghost"
                type="button"
                onClick={onCopyClick}
              >
                <Copy />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {history.length > 0 && (
        <Card className=" bg-gray-500 text-white mt-2 flex flex-col gap-3">
          {history.map((item, index) => (
            <div key={index} className="flex items-center">
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
                <Copy />
              </Button>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}

export default Base64DetailsForm;
