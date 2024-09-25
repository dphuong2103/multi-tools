"use client";
import TextAreaFormField from '@/components/form-fields/text-area-form-fields';
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea';
import { decodeBase64, encodeBase64 } from '@/lib/base64';
import { Dictionary } from '@/lib/dictionary';
import { Base64FormModel, base64FormSchema } from '@/models/base64-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Base64DetailsFormProps {
    dictionary: Dictionary;
}

function Base64DetailsForm({ dictionary }: Base64DetailsFormProps) {
    const form = useForm<Base64FormModel>({
        resolver: zodResolver(base64FormSchema),
        defaultValues: {
            operation: 'encode',
            value: ""
        }
    });

    const [result, setResult] = useState("");

    const onValidSubmit = useCallback(
        (data: Base64FormModel) => {
            if (data.operation === "encode") {
                setResult(encodeBase64(data.value));

            } else {
                try {
                    setResult(decodeBase64(data.value))
                } catch (err) {
                    console.error("Err", err)
                    form.setError("value", {
                        message: "Invalid base 64 string"
                    })
                }
            }
        }, [setResult])

    const onCopyClick = useCallback(() => {
        if (!result) return;
        try {
            navigator.clipboard.writeText(result);
            toast.success("Copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy to clipboard");
        }
    }, [result]);

    const operation = form.watch("operation");

    return (
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
                            render={({ field }) => <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-[180px] ">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="encode">Encode</SelectItem>
                                    <SelectItem value="decode">Decode</SelectItem>
                                </SelectContent>
                            </Select>
                            }
                        />
                        <Button>{operation === "decode" ? "Decode" : "Encode"}</Button>
                    </div>
                    <div className="relative">
                        <Textarea
                            className="w-full p-2 resize-none"
                            value={result}
                            contentEditable={false}
                            rows={5}
                            readOnly={true}
                        />
                        <Button className="absolute right-0 bottom-0 hidden md:inline-block" variant="ghost" type="button" onClick={onCopyClick}>
                            <Copy />
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default Base64DetailsForm
