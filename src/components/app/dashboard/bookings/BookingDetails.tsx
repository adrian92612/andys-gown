import { InfoField } from "@/components/global/InfoField";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { route } from "@/lib/routes";
import { formatPrice, getBookingStatus } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

type CustomerInfoProps = {
  name: string;
  address: string;
  contactInfo: string;
};

const CustomerInfo = ({ name, address, contactInfo }: CustomerInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Customer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField label="Name" value={name} />
        <InfoField label="Address" value={address} />
        <InfoField label="Contact Info" value={contactInfo} />
      </CardContent>
    </Card>
  );
};

type GownInfoProps = {
  gown: Prisma.GownGetPayload<{
    include: { images: { select: { url: true } } };
  }> | null;
};

const GownInfo = ({ gown }: GownInfoProps) => {
  if (!gown) return <div className="text-red-500 italic">Gown was deleted</div>;

  const { id, name, code, color } = gown;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Gown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField label="Name" value={name} />
        <InfoField label="Code" value={code} />
        <InfoField label="Color" value={color} />
        <Link
          href={route.gownDetails(id)}
          target="_blank"
          className="underline"
        >
          View Complete Details
        </Link>
      </CardContent>
    </Card>
  );
};

type DatesInfoProps = {
  pickUpDate: Date;
  eventDate: Date;
  returnDate: Date;
};

const DatesInfo = ({ pickUpDate, eventDate, returnDate }: DatesInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField label="Pick Up On" value={format(pickUpDate, "PPP")} />
        <InfoField label="Event On" value={format(eventDate, "PPP")} />
        <InfoField label="Return On" value={format(returnDate, "PPP")} />
      </CardContent>
    </Card>
  );
};

type AdditionalInfoProps = {
  createdAt: Date;
  updatedAt: Date;
  eventDate: Date;
  notes: string;
};

const AdditionalInfo = ({
  createdAt,
  updatedAt,
  eventDate,
  notes,
}: AdditionalInfoProps) => {
  const { status, badgeColor } = getBookingStatus(eventDate);
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Additional
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField
          label="Booking Status"
          value={<Badge className={badgeColor}>{status}</Badge>}
        />
        <InfoField
          label="Added On"
          value={format(createdAt, "MMM dd, yyyy h:mm a")}
        />
        <InfoField
          label="Updated On"
          value={format(updatedAt, "MMM dd, yyyy h:mm a")}
        />
        <div className="flex items-start gap-2">
          <InfoField label="Notes" value="" />
          <div className="bg-gray-50 border-gray-200 border-1 w-full min-h-16 rounded-sm py-2 px-4">
            {notes || "—"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  booking: Prisma.BookingGetPayload<{
    include: {
      gown: {
        include: {
          images: {
            select: { url: true };
          };
        };
      };
    };
  }>;
};

type PaymentInfoProps = {
  downpayment: number;
  isDownpaymentPaid: boolean;
  price: number;
  isPricePaid: boolean;
};

const PaymentInfo = ({
  downpayment,
  isDownpaymentPaid,
  price,
  isPricePaid,
}: PaymentInfoProps) => {
  const isPaid = (b: boolean) => (b ? "Paid" : "Unpaid");
  const getVariant = (b: boolean) => (b ? "success" : "destructive");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-between items-center gap-2">
          <InfoField label="Downpayment" value={formatPrice(downpayment)} />
          <Badge className="w-16" variant={getVariant(isDownpaymentPaid)}>
            {isPaid(isDownpaymentPaid)}
          </Badge>
        </div>
        <div className="flex justify-between items-center gap-2">
          <InfoField label="Price" value={formatPrice(price)} />
          <Badge className="w-16" variant={getVariant(isPricePaid)}>
            {isPaid(isPricePaid)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export const BookingDetails = ({ booking }: Props) => {
  const { gown, ...data } = booking;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <CustomerInfo
        name={data.customerName}
        address={data.customerAddress}
        contactInfo={data.customerContactInfo}
      />
      <GownInfo gown={gown} />
      <DatesInfo
        pickUpDate={data.pickUpDate}
        eventDate={data.eventDate}
        returnDate={data.returnDate}
      />

      <PaymentInfo
        downpayment={data.downpayment}
        isDownpaymentPaid={data.isDownpaymentPaid}
        price={data.price}
        isPricePaid={data.isPricePaid}
      />
      <AdditionalInfo
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
        notes={data.notes ?? ""}
        eventDate={booking.eventDate}
      />
    </div>
  );
};
