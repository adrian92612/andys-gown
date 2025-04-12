"use client";

import { capitalizeFirst, cn, getGownStatus } from "@/lib/utils";
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

const EXCLUDED_FIELDS = ["id"];
const labelMap = {
  createdAt: "Added On",
  updatedAt: "Last Updated",
};

const getLabel = (key: string) => {
  return (labelMap as Record<string, string>)[key] ?? capitalizeFirst(key);
};

const getValue = (v: unknown) => {
  return v instanceof Date
    ? format(v, "MMMM d, yyyy h:mm a")
    : v === null
    ? "-"
    : String(v);
};

const DetailsField = ({ gownDetails, dates }: DetailsFieldProps) => {
  const detailsArr = Object.entries(gownDetails);
  const { status, badgeColor } = getGownStatus(dates);
  return (
    <Card className="px-5 max-w-[500px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Gown Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InfoField
          label="Status"
          value={<Badge className={badgeColor}>{status}</Badge>}
        />
        {!!detailsArr.length &&
          detailsArr
            .filter(([k]) => !EXCLUDED_FIELDS.includes(k))
            .map(([k, v], i) => (
              <InfoField key={i} label={getLabel(k)} value={getValue(v)} />
            ))}
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
      return nextIndex;
    });
  };

  const openSlider = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

  return (
    <div className="p-5 h-[420px] w-[350px] sm:w-[500px] sm:h-[300px] md:w-[350px] md:h-[430px] xl:w-[500px] xl:h-[300px]  rounded-md mx-auto bg-slate-100">
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
          <div
            className="flex relative aspect-[4/5] w-[200px] hover:cursor-pointer"
            onClick={() => openSlider(currentPhoto)}
          >
            <Image
              src={urls[currentPhoto].url}
              alt="Current Photo"
              fill
              className="object-cover shadow-md shadow-gray-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          <ImagesField urls={images} />
        </section>
        <section className="w-full">
          <DetailsField gownDetails={gownDetails} dates={dates} />
        </section>
      </div>
      <section>
        <BookingsTable bookings={bookings} showGown={false} />
      </section>
    </div>
  );
};
