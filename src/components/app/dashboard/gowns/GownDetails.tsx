"use client";

import { cn, formatCategory, formatPrice, getGownStatus } from "@/lib/utils";
import { Gown, Prisma } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { BookingsTable } from "../bookings/BookingsTable";
import { PhotoSlider } from "react-photo-view";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { InfoField } from "@/components/global/InfoField";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DetailsFieldProps = {
  gownDetails: Gown;
  dates: {
    pickUpDate: Date;
    eventDate: Date;
    returnDate: Date;
  }[];
};

const DetailsField = ({ gownDetails, dates }: DetailsFieldProps) => {
  const { status, badgeColor } = getGownStatus(dates);
  return (
    <Card className="px-5 max-w-[500px] shadow-none lg:border-l border-dashboard-primary h-full rounded-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Information</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField
          label="Status"
          value={<Badge className={badgeColor}>{status}</Badge>}
        />
        <InfoField label="Name" value={gownDetails.name} />
        <InfoField label="Code" value={gownDetails.code} />
        <InfoField
          label="Category"
          value={formatCategory(gownDetails.category)}
        />
        <InfoField label="Color" value={gownDetails.color} />
        <InfoField label="Size" value={gownDetails.size} />
        <InfoField label="Price" value={formatPrice(gownDetails.price)} />
        <InfoField
          label="Added On"
          value={format(gownDetails.createdAt, "PPP")}
        />
        <InfoField
          label="Updated On"
          value={format(gownDetails.updatedAt, "PPP")}
        />
      </CardContent>
    </Card>
  );
};

type ImagesFieldProps = {
  urls: {
    url: string;
  }[];
};

const ImagesField = ({ urls }: ImagesFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const thumbnailsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const el = thumbnailsRef.current[currentPhoto];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentPhoto]);

  const adjustPhotoIndex = (n: number) => {
    const imagesLength = urls.length;
    setCurrentPhoto((prev) => {
      const nextIndex = (prev + n + imagesLength) % imagesLength;
      setIndex(nextIndex);
      return nextIndex;
    });
  };

  const openSlider = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

  return (
    <div className="px-5 py-2 h-[420px] w-[350px] sm:w-[500px] sm:h-[300px] md:w-[350px] md:h-[430px] xl:w-[500px] xl:h-[300px]  mx-auto border-dashboard-primary lg:border-r rounded-none">
      <PhotoSlider
        images={urls.map((u) => ({
          src: u.url,
          key: u.url,
        }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
        loop
      />

      <div className="flex flex-col sm:flex-row md:flex-col h-full xl:flex-row items-center overflow-hidden">
        <div className="flex flex-1 items-center justify-center gap-5">
          <Button variant="ghost" onClick={() => adjustPhotoIndex(-1)}>
            <FaBackwardStep />
          </Button>
          <div>
            <div
              className="flex relative aspect-[4/5] w-[200px] hover:cursor-pointer"
              onClick={() => openSlider(currentPhoto)}
            >
              <Image
                src={urls[currentPhoto].url}
                alt="Current Photo"
                fill
                className="object-cover shadow-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex justify-center">
              <span>
                {index + 1} of {urls.length}
              </span>
            </div>
          </div>
          <Button variant="ghost" onClick={() => adjustPhotoIndex(1)}>
            <FaForwardStep />
          </Button>
        </div>
        <div className="flex flex-row sm:flex-col md:flex-row xl:flex-col overflow-y-auto h-full w-full items-center gap-4 p-5">
          {!!urls.length ? (
            urls.map((u, i) => (
              <div
                key={i}
                ref={(el) => {
                  thumbnailsRef.current[i] = el;
                }}
                className={cn(
                  i === currentPhoto && "border-2 border-green-500",
                  "relative shrink-0 flex aspect-[4/5] w-[80px] xl:w-[100px] hover:cursor-pointer"
                )}
                onClick={() => openSlider(i)}
              >
                <Image
                  src={u.url}
                  alt={`Gown image ${i + 1}`}
                  fill
                  className="object-cover shadow-md shadow-gray-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground italic">No Images Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {
  gownData: Prisma.GownGetPayload<{
    include: {
      images: {
        select: { url: true };
      };
      bookings: true;
    };
  }>;
};

export const GownDetails = ({ gownData }: Props) => {
  const { bookings, images, ...gownDetails } = gownData;

  const dates = bookings.map((b) => ({
    pickUpDate: b.pickUpDate,
    eventDate: b.eventDate,
    returnDate: b.returnDate,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-xs border-dashboard-primary border">
        <section className="border border-b-dashboard-primaborder-dashboard-primary  lg:border-none">
          <ImagesField urls={images} />
        </section>
        <section className="w-full border border-t-dashboard-primaborder-dashboard-primary lg:border-none">
          <DetailsField gownDetails={gownDetails} dates={dates} />
        </section>
      </div>
      <section>
        <BookingsTable bookings={bookings} showGown={false} />
      </section>
    </div>
  );
};
