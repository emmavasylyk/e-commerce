"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ sliderList }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="mb-5 md:mb-8 xl:mb-10"
    >
      <CarouselContent>
        {sliderList.map((slider, index) => {
          const sliderUrls = slider?.attributes?.image?.data?.map(
            (image) => image?.attributes?.url
          );
          return (
            <CarouselItem key={index}>
              {sliderUrls?.map((sliderUrl, index) => (
                <Image
                  key={index}
                  src={sliderUrl}
                  width={1000}
                  height={400}
                  alt="slider"
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                />
              ))}
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

export default Slider;
