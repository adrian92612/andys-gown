import { z } from "zod";
import { Category } from "@prisma/client";

export const gownSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Name is required"),
  color: z.string().trim().min(1, "Color is required"),
  code: z.string().trim().min(1, "Code is required"),
  size: z.string().trim().min(1, "Size is required"),
  category: z.enum(Object.values(Category) as [string, ...string[]]),
  price: z.coerce.number().int().gt(0, "Price must be greater than 0"),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string().min(1, "Public Id is required"),
      })
    )
    .min(1, "At least one image is required"),
});

export type GownSchemaType = z.infer<typeof gownSchema>;
