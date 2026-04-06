"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

import { cn } from "@/lib/utils";

type VehicleGalleryProps = {
  title: string;
  images: string[];
  tags: string[];
};

export function VehicleGallery({ title, images, tags }: VehicleGalleryProps) {
  const gallery = images.length ? images : ["/placeholder.svg"];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const activeIndex = Math.max(gallery.indexOf(activeImage), 0);

  function goToImage(nextIndex: number) {
    const boundedIndex = (nextIndex + gallery.length) % gallery.length;
    setActiveImage(gallery[boundedIndex]);
  }

  return (
    <div className="max-w-full space-y-5 overflow-hidden">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#120e0b] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="relative aspect-[16/10] min-h-[380px] lg:min-h-[520px] xl:min-h-[620px]">
          <Image
            src={activeImage}
            alt=""
            aria-hidden
            fill
            className="scale-105 object-cover object-center blur-2xl opacity-25"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/35" />
          <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-black/15">
              <Image src={activeImage} alt={title} fill className="object-contain object-center" priority unoptimized />
            </div>
          </div>

          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <Images className="h-3.5 w-3.5 text-amber-200" />
            {activeIndex + 1}/{gallery.length}
          </div>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goToImage(activeIndex - 1)}
                className="absolute left-6 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/90 backdrop-blur transition hover:bg-black/60"
                aria-label="Onceki gorsel"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goToImage(activeIndex + 1)}
                className="absolute right-6 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/90 backdrop-blur transition hover:bg-black/60"
                aria-label="Sonraki gorsel"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

        <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/85 backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto pb-2">
        <div className="inline-grid grid-flow-col grid-rows-2 gap-3 md:gap-4">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={cn(
                "relative h-24 w-28 overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5 transition sm:h-28 sm:w-36 md:h-28 md:w-40",
                activeImage === image && "ring-2 ring-amber-200/80",
              )}
            >
              <Image src={image} alt={`${title} ${index + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
