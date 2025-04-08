"use client";

import { capitalizeFirst, cn } from "@/lib/utils";
import { Gown, Prisma } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { BookingsTable } from "../bookings/BookingsTable";
import { PhotoSlider } from "react-photo-view";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";

type DetailsFieldProps = {
  gownDetails: Gown;
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

const DetailsField = ({ gownDetails }: DetailsFieldProps) => {
  const detailsArr = Object.entries(gownDetails);
  return (
    <div>
      {!!detailsArr.length &&
        detailsArr
          .filter(([k]) => !EXCLUDED_FIELDS.includes(k))
          .map(([k, v], i) => (
            <div key={i} className="flex items-center gap-2 text-lg">
              <span className="font-semibold">{getLabel(k)}:</span>
              <span>{getValue(v)}</span>
            </div>
          ))}
    </div>
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
    <div className="p-5 h-[450px] rounded-md bg-slate-100">
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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section>
          <ImagesField urls={images} />
        </section>
        <section className="w-full">
          <h2 className="text-2xl font-bold">Gown Details</h2>
          <DetailsField gownDetails={gownDetails} />
        </section>
      </div>
      <section>
        <h2 className="text-2xl font-bold">Related Bookings</h2>
        <BookingsTable bookings={bookings} showGown={false} />
      </section>
    </div>
  );
};
