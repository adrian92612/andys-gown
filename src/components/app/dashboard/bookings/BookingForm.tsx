"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputField,
  SwitchField,
  TextareaField,
} from "@/components/ui/InputField";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import {
  cn,
  restrictWholeNumberInput,
  sanitizeWholeNumberOnBlur,
} from "@/lib/utils";
import { bookingSchema, BookingSchemaType } from "@/lib/zod/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, subDays } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  bookingData?: BookingSchemaType;
  gownList: {
    id: string;
    name: string;
  }[];
  bookingDates: {
    gownId: string;
    pickUpDate: Date;
    eventDate: Date;
    returnDate: Date;
  }[];
};

export const BookingForm = ({ bookingData, gownList, bookingDates }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const selectedGownId = searchParams.get("gown");
  const { refresh } = useRouter();
  const form = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      id: bookingData?.id ?? undefined,
      gownId: bookingData?.gownId ?? "",
      customerName: bookingData?.customerName ?? "",
      customerAddress: bookingData?.customerAddress ?? "",
      customerContactInfo: bookingData?.customerContactInfo ?? "",
      notes: bookingData?.notes ?? "",
      price: bookingData?.price ?? 800,
      isPricePaid: bookingData?.isPricePaid ?? false,
      downpayment: bookingData?.downpayment ?? 500,
      isDownpaymentPaid: bookingData?.isDownpaymentPaid ?? false,
      eventDate: bookingData?.eventDate ?? undefined,
    },
  });

  const handleOnSubmit = async (values: BookingSchemaType) => {
    try {
      setLoading(true);
      const apiCB = values.id
        ? api.booking.updateBooking(values.id).patch(values)
        : api.booking.createBooking.post(values);
      const res = await apiCB;

      if (res.status === 201 || res.status === 200) {
        refresh();
        toast.success(res.message);
        if (!bookingData) form.reset();
      }
    } catch (error) {
      const err = error as ErrorResponse;
      toast(err.error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGownId && selectedGownId !== "undefined") {
      form.setValue("gownId", selectedGownId);
    }
  }, [selectedGownId, form]);

  const gownId = form.watch("gownId");
  const isGownSelected = !!gownId;
  const disabledDates = bookingDates.filter((b) => b.gownId === gownId);
  const bookDates = disabledDates.map((b) => b.eventDate);

  return (
    <Form {...form}>
      <fieldset disabled={loading}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="max-w-3xl mx-auto space-y-2"
        >
          <InputField form={form} name="id" readOnly type="hidden" />
          <InputField form={form} name="customerName" label="Customer's Name" />
          <InputField
            form={form}
            name="customerAddress"
            label="Customer's Address"
          />
          <InputField
            form={form}
            name="customerContactInfo"
            label="Customer's Contact Info"
          />

          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="flex w-full gap-2">
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
              <SwitchField form={form} name="isPricePaid" label="Paid?" />
            </div>
            <div className="flex w-full gap-2">
              <InputField
                form={form}
                name="downpayment"
                label="Downpayment"
                type="number"
                min={0}
                step={1}
                onKeyDown={restrictWholeNumberInput}
                onBlur={sanitizeWholeNumberOnBlur}
              />
              <SwitchField form={form} name="isDownpaymentPaid" label="Paid?" />
            </div>
          </div>

          {selectedGownId && selectedGownId !== "undefined" ? (
            <>
              <InputField
                form={form}
                label="Gown"
                name="gownId"
                type="hidden"
              />
              <InputField
                form={form}
                name="gownId"
                readOnly
                value={
                  gownList.find((g) => g.id === selectedGownId)?.name ??
                  "Gown no longer exists"
                }
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="gownId"
              render={({ field }) => {
                const selectedGown = gownList.find((g) => g.id === field.value);

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-semibold">
                      Select a Gown
                    </FormLabel>
                    <Popover
                      open={isCommandOpen}
                      onOpenChange={setIsCommandOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between h-10 bg-white",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value === ""
                              ? "Select a gown"
                              : selectedGown?.name ?? "Gown no longer exists"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-full min-w-full max-w-full p-0"
                        style={{
                          minWidth: "var(--radix-popper-anchor-width)",
                        }}
                      >
                        <Command>
                          <CommandInput placeholder="Search gown..." />
                          <CommandEmpty>No gown found.</CommandEmpty>
                          <CommandGroup>
                            {gownList.map((gown) => (
                              <CommandItem
                                key={gown.id}
                                value={gown.name}
                                onSelect={() => {
                                  field.onChange(gown.id);
                                  form.setValue(
                                    "eventDate",
                                    null as unknown as Date
                                  );
                                  setIsCommandOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    gown.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {gown.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-semibold">Event Date</FormLabel>
                  <FormMessage />
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant={"outline"}
                          disabled={!isGownSelected}
                          className={cn(
                            "w-[280px] justify-start h-10 text-left font-normal bg-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) => {
                          const isPast = date < subDays(new Date(), 1);
                          const isOverlapped = disabledDates.some((b) => {
                            return (
                              date >= new Date(b.pickUpDate) &&
                              date <= new Date(b.returnDate)
                            );
                          });
                          return isPast || isOverlapped;
                        }}
                        modifiers={{
                          booked: bookDates,
                        }}
                        modifiersClassNames={{
                          booked:
                            "text-red-500 font-bold border-red-500 border",
                        }}
                        classNames={{
                          cell: "size-9",
                          head_cell:
                            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              );
            }}
          />

          <TextareaField
            form={form}
            name="notes"
            label="Notes"
            placeholder="Additional information here..."
            textAreaCN="border-dashboard-primary border rounded-xs bg-white"
          />

          <Button type="submit" className="w-full">
            {bookingData ? "Update" : "Submit"}
          </Button>
        </form>
      </fieldset>
    </Form>
  );
};
