import { z } from "zod";

export const bookingSchema = z.object({
  id: z.string().optional(),
  gownId: z.string().min(1, "Gown is required"),
  customerName: z.string().trim().min(1, "Customer Name is required"),
  customerAddress: z.string().trim().min(1, "Customer Address is required"),
  customerContactInfo: z
    .string()
    .trim()
    .min(1, "Customer Contact Info is required"),
  notes: z.string().optional(),
  price: z.coerce.number().int().gt(0, "Price must be greater than 0"),
  isPricePaid: z.boolean(),
  downpayment: z.coerce.number().int(),
  isDownpaymentPaid: z.boolean(),
  eventDate: z.coerce
    .date({
      required_error: "Event Date is required",
      invalid_type_error: "Invalid date",
    })
    .refine((date) => date > new Date(), {
      message: "Event Date must be in the future",
    }),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
