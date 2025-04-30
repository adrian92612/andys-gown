"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PhotoSlider } from "react-photo-view";

type Props = {
  images: Prisma.ImageGetPayload<{
    select: {
      id: true;
      url: true;
    };
  }>[];
};

export const ImageGallery = ({ images }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);
  const thumbnailsRef = useRef<Array<HTMLDivElement | null>>([]);

  const totalImages = images.length;

  const adjustPhotoIndex = (n: number) => {
    setCurrentPhoto((prev) => {
      const nextIndex = (prev + n + totalImages) % totalImages;
      setIndex(nextIndex);
      return nextIndex;
    });
  };

  const openSlider = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

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

  return (
    <div>
      <PhotoSlider
        images={images.map((u) => ({
          src: u.url,
          key: u.url,
        }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
        loop
      />
      <div className="w-2/3 mx-auto relative aspect-[4/5] mb-5 ">
        <Image
          src={images[currentPhoto].url}
          alt="Gown image"
          fill
          className="object-cover hover:cursor-pointer"
          onClick={() => openSlider(currentPhoto)}
        />
        <Button
          variant="secondary"
          onClick={() => adjustPhotoIndex(-1)}
          className="px-1 py-0 h-8 absolute top-1/2 -translate-y-1/2 -left-12"
        >
          <ChevronLeft className="size-8" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => adjustPhotoIndex(1)}
          className="px-1 py-0 h-8 absolute top-1/2 -translate-y-1/2 -right-12"
        >
          <ChevronRight className="size-8" />
        </Button>
      </div>
      <div className="text-center">
        {currentPhoto + 1} of {totalImages}
      </div>
      <div className="w-full max-w-[90vw] sm:w-2/3 h-fit mx-auto flex items-center gap-4 overflow-x-auto px-4 scroll-smooth snap-x">
        {!!images.length &&
          images.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => {
                thumbnailsRef.current[i] = el;
              }}
              className={cn(
                "relative w-[80px] aspect-[4/5] shrink-0 snap-start hover:cursor-pointer",
                i === currentPhoto && "border-2 border-site-primary"
              )}
              onClick={() => openSlider(i)}
            >
              <Image
                src={images[i].url}
                alt={`Gown image - ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
