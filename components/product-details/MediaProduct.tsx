"use client";
import { Media } from "@/@types/api/product";
import Image from "next/image";
import React, { useState } from "react";

export default function MediaProduct({ media }: { media: Media[] }) {
  const [selectedImage, setSelectedImage] = useState<Media>(media[0]);
  return (
    <>
      <div className="flex flex-row items-start lg:flex-col select-none flex-wrap gap-1">
        {media.map((image, index) => (
          <label key={index}>
            <input
              type="radio"
              name="image-selector"
              className="peer sr-only"
              onChange={() => setSelectedImage(image)}
            />
            <p className="cursor-pointer peer-checked:ring-2 peer-checked:ring-primary size-16">
              <img
                width={70}
                height={70}
                className="h-full w-full object-cover"
                src={image.url}
                alt={image.alt_text}
              />
            </p>
          </label>
        ))}
      </div>
      <div className="lg:w-24 order-2 lg:order-1"></div>
      <div className="w-full order-1 lg:order-2 flex items-start h-full">
        <img
          width={1000}
          height={1000}
          className="h-full w-full object-contain"
          src={selectedImage.url}
          alt={selectedImage.alt_text}
        />
      </div>
    </>
  );
}
