"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselSlide } from "@/types";

export function CarouselComponent() {
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    async function fetchCarouselSlides() {
      const response = await fetch("/api/carousel");
      const data = await response.json();
      setCarouselSlides(data);
    }
    fetchCarouselSlides();
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {carouselSlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {slide.title}
                </h2>
                <p className="text-xl text-neutral-200">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
