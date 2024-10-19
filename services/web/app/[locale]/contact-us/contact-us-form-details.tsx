"use client";

import TextAreaFormField from "@/components/form-fields/text-area-form-fields";
import TextInputFormField from "@/components/form-fields/text-input-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ContactUsFormModel,
  contactUsFormSchema,
} from "@/models/contact-us-form";
import { DictionaryProps } from "@/types/data-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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

  const { control, handleSubmit } = form;

  const onValidSubmit = useCallback((data: ContactUsFormModel) => {
    try {
      setIsLoading(true);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, []);

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
