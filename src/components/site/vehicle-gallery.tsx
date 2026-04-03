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
      <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_rgba(255,255,255,0.03)_48%,_rgba(0,0,0,0.28)_100%)] sm:h-[420px] xl:h-[520px]">
        <Image src={activeImage} alt={title} fill className="object-contain p-3 sm:p-4" priority />
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

      <div className="max-w-full overflow-x-auto pb-2">
        <div className="inline-grid grid-flow-col grid-rows-2 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={cn(
                "relative h-20 w-24 overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5 transition sm:h-24 sm:w-28 md:h-24 md:w-32",
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
