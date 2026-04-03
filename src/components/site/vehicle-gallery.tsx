"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type VehicleGalleryProps = {
  title: string;
  images: string[];
  tags: string[];
};

export function VehicleGallery({ title, images, tags }: VehicleGalleryProps) {
  const gallery = images.length ? images : ["/placeholder.svg"];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <div className="max-w-full space-y-5 overflow-hidden">
      <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <Image src={activeImage} alt={title} fill className="object-cover" priority />
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

      <div className="w-full max-w-full overflow-x-auto pb-2">
        <div className="flex w-max max-w-full gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={cn(
                "relative h-20 w-24 shrink-0 overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5 transition sm:h-24 sm:w-28 md:h-28 md:w-36",
                activeImage === image && "ring-2 ring-amber-200/80",
              )}
            >
              <Image src={image} alt={`${title} ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
