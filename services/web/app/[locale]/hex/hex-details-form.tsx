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
import { decodeHex, encodeHex, isValidUrl } from "@/lib/hex";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { createHexFormSchema, HexFormModel } from "@/models/hex-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface HexDetailsFormProps {
  dictionary: Dictionary;
}

function HexDetailsForm({ dictionary }: HexDetailsFormProps) {
  const form = useForm<HexFormModel>({
    resolver: zodResolver(createHexFormSchema(dictionary)),
    defaultValues: {
      operation: "encode",
      value: "",
    },
  });
  const {
    formState: { isSubmitSuccessful },
    reset,
  } = form;

  const [output, setOutput] = useState("");
  const [hexHistory, setHexHistory] = useLocalStorage<
    {
      input: string;
      output: string;
    }[]
  >(`hex-history`, []);

  const onValidSubmit = useCallback(
    (data: HexFormModel) => {
      const result =
        data.operation === "encode"
          ? encodeHex(data.value)
          : decodeHex(data.value);
      setOutput(result);
      if (hexHistory.length === 10) {
        hexHistory.pop();
      }
      setHexHistory([
        {
          input: data.value,
          output: result,
        },
        ...hexHistory,
      ]);
    },
    [setOutput, hexHistory, setHexHistory],
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({}, { keepValues: true });
    }
  }, [isSubmitSuccessful, reset]);

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
              name="value"
              className="w-full p-2 mt-2 prose"
              placeholder="Enter text to encode/decode"
              rows={5}
            />
            <div className="w-full flex justify-between">
              <Controller
                control={form.control}
                name="operation"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px] ">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encode">
                        {dictionary.page.hex.operations.encode}
                      </SelectItem>
                      <SelectItem value="decode">
                        {dictionary.page.hex.operations.decode}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Button disabled={!form.formState.isDirty}>
                {dictionary.page.hex.buttons.convert}
              </Button>
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
      {hexHistory.length > 0 && (
        <Card className="prose bg-gray-500 text-white mt-2 flex flex-col gap-3">
          {hexHistory.map((item, index) => (
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

export default HexDetailsForm;
