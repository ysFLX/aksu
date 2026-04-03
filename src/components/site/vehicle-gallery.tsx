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
      <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 sm:h-[420px] xl:h-[520px]">
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

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {gallery.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5 transition",
              activeImage === image && "ring-2 ring-amber-200/80",
            )}
          >
            <Image src={image} alt={`${title} ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
