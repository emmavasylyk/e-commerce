import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ sliderList }) {
  return (
    <Carousel>
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
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${sliderUrl}`}
                  width={1000}
                  height={400}
                  alt="slider"
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                />
              ))}
              {/* <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
                width={1000}
                height={400}
                alt="slider"
                className="w-full h-full object-cover"
              /> */}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
