"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInputField } from "@/components/ui/FormInputField";
import {
  restrictWholeNumberInput,
  sanitizeWholeNumberOnBlur,
} from "@/lib/utils";
import { CreateGownSchemaType, gownSchema } from "@/lib/zod/gown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/lib/api";

type Props = {
  gownData?: CreateGownSchemaType;
};

export const AddGownForm = ({ gownData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<CreateGownSchemaType>({
    resolver: zodResolver(gownSchema),
    defaultValues: {
      id: gownData?.id ?? undefined,
      name: gownData?.name ?? "",
      color: gownData?.color ?? "",
      size: gownData?.size ?? "",
      price: gownData?.price ?? 0,
      images: gownData?.images ?? [],
    },
  });

  const images = form.watch("images") ?? [];

  const handleOnSubmit = async (values: CreateGownSchemaType) => {
    const res = await api.gown.createGown.post(values);
    if (res.status === 201) {
      // do something
      form.reset();
    }
  };

  const deletePhoto = async (publicId: string) => {
    try {
      setLoading(true);
      await api.cloudinary.deleteImage(publicId).delete();
      const newImages = images.filter((img) => img.publicId !== publicId);
      form.setValue("images", newImages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        {gownData?.id && (
          <FormInputField name="id" type="hidden" loading={loading} />
        )}
        <FormInputField name="name" label="Name" loading={loading} />
        <FormInputField name="color" label="Color" loading={loading} />
        <FormInputField name="size" label="Size" loading={loading} />
        <FormInputField
          name="price"
          label="Price"
          type="number"
          min={0}
          step={1}
          onKeyDown={restrictWholeNumberInput}
          onBlur={sanitizeWholeNumberOnBlur}
          loading={loading}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormMessage />
              <FormControl>
                <CldUploadWidget
                  uploadPreset="andys-gown-rental"
                  options={{
                    multiple: true,
                    maxFiles: 5,
                    sources: ["local", "url", "camera", "google_drive"],
                  }}
                  onSuccess={(result) => {
                    if (
                      result?.event === "success" &&
                      result.info &&
                      typeof result.info === "object"
                    ) {
                      const { secure_url, public_id } = result.info;
                      const image = {
                        url: secure_url,
                        publicId: public_id,
                      };
                      const prev = form.getValues("images") ?? [];
                      form.setValue("images", [...prev, image]);
                    }
                  }}
                >
                  {({ open, isLoading }) => (
                    <Button
                      type="button"
                      disabled={isLoading || loading}
                      onClick={() => open()}
                      className="mb-2"
                    >
                      Upload Image
                    </Button>
                  )}
                </CldUploadWidget>
              </FormControl>
              <div className="flex flex-wrap gap-2">
                {!!images.length &&
                  images.map((img, i) => (
                    <div key={img.url} className="relative flex h-32 w-24">
                      <Button
                        type="button"
                        onClick={() => deletePhoto(img.publicId)}
                        className="absolute top-0 right-0 z-10"
                        disabled={loading}
                      >
                        CLOSE
                      </Button>
                      <Image
                        src={img.url}
                        alt={`Preview ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
              </div>
            </FormItem>
          )}
        />

        <Button disabled={loading}>Submit</Button>
      </form>
    </Form>
  );
};
