"use client";

import TextAreaFormField from "@/components/form-fields/text-area-form-fields";
import TextInputFormField from "@/components/form-fields/text-input-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createContactMessage } from "@/lib/apis/contact-us-api";
import { parseErrorMessage } from "@/lib/toast-message";
import {
  ContactUsFormModel,
  contactUsFormSchema,
} from "@/models/contact-us-form";
import { DictionaryProps } from "@/types/data-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: ContactUsFormModel = {
  name: "",
  email: "",
  message: "",
};

interface ContactUsFormDetailsProps extends DictionaryProps {}
function ContactUsFormDetails({ dictionary }: ContactUsFormDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ContactUsFormModel>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: defaultValues,
  });

  const { control, handleSubmit, setValue } = form;

  const onValidSubmit = useCallback(
    async (data: ContactUsFormModel) => {
      try {
        setIsLoading(true);
        await createContactMessage({
          email: data.email,
          message: data.message,
          name: data.name,
        });
        setValue("message", "");
        toast.success(dictionary.page.contactUs.toast.submit.success);
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(parseErrorMessage(e.response?.data.errors, "en"));
        } else {
          toast.error(dictionary.page.contactUs.toast.submit.error);
        }
        console.log("error", e);
      } finally {
        setIsLoading(false);
      }
    },
    [
      dictionary.page.contactUs.toast.submit.error,
      dictionary.page.contactUs.toast.submit.success,
      setValue,
    ],
  );

  const onClearClick = useCallback(() => {
    form.reset(defaultValues);
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-2 justify-between [&>*]:flex-1">
            <TextInputFormField
              control={control}
              name="name"
              label={dictionary.page.contactUs.fields.name.label}
            />
            <TextInputFormField
              control={control}
              name="email"
              label={dictionary.page.contactUs.fields.email.label}
            />
          </div>
          <TextAreaFormField
            control={control}
            name="message"
            label={dictionary.page.contactUs.fields.message.label}
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant={"destructive"}
              type="button"
              onClick={onClearClick}
            >
              {dictionary.page.contactUs.buttons.clear}
            </Button>
            <Button disabled={isLoading}>
              {dictionary.page.contactUs.buttons.send}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ContactUsFormDetails;
