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
import { InputField } from "@/components/ui/InputField";
import {
  restrictWholeNumberInput,
  sanitizeWholeNumberOnBlur,
} from "@/lib/utils";
import { GownSchemaType, gownSchema } from "@/lib/zod/gown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorResponse } from "@/lib/api/types";
import { TiDeleteOutline } from "react-icons/ti";

type Props = {
  gownData?: GownSchemaType;
};

export const GownForm = ({ gownData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<GownSchemaType>({
    resolver: zodResolver(gownSchema),
    defaultValues: {
      id: gownData?.id ?? undefined,
      name: gownData?.name ?? "",
      color: gownData?.color ?? "",
      code: gownData?.code ?? "",
      price: gownData?.price ?? 800,
      images: gownData?.images ?? [],
    },
  });

  const { refresh } = useRouter();

  const images = form.watch("images") ?? [];

  const handleOnSubmit = async (values: GownSchemaType) => {
    try {
      setLoading(true);
      const apiCB = values.id
        ? api.gown.updateGown(values.id).patch(values)
        : api.gown.createGown.post(values);
      const res = await apiCB;
      if (res.status === 201 || res.status == 200) {
        refresh();
        toast.success(res.message);
        if (!values.id) form.reset();
      }
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (publicId: string) => {
    try {
      setLoading(true);
      await api.cloudinary.deleteImage(publicId).delete();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <fieldset disabled={loading}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="max-w-3xl mx-auto space-y-2"
        >
          <InputField form={form} name="id" readOnly type="hidden" />
          <InputField form={form} name="name" label="Name" />
          <InputField form={form} name="code" label="Code" />
          <InputField form={form} name="color" label="Color" />
          <InputField
            form={form}
            name="price"
            label="Price"
            type="number"
            min={0}
            step={1}
            onKeyDown={restrictWholeNumberInput}
            onBlur={sanitizeWholeNumberOnBlur}
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
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
                    }
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
                <div className="flex flex-wrap gap-5 h-32  bg-white rounded-xs">
                  {!!images.length ? (
                    images.map((img, i) => (
                      <div key={img.url} className="relative flex h-32 w-24">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => deletePhoto(img.publicId)}
                          className="absolute p-0 top-0 right-0 z-10 size-5"
                          disabled={loading}
                        >
                          <TiDeleteOutline className="size-5" />
                        </Button>
                        <Image
                          src={img.url}
                          alt={`Preview ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full grid place-items-center ">
                      <span>No Images Uploaded</span>
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {gownData ? "Update" : "Submit"}
          </Button>
        </form>
      </fieldset>
    </Form>
  );
};
