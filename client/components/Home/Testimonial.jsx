"use client";

import * as React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import Image from "next/image";
import { testimonials } from "../../components/constants/testimonialData";
import DotPattern from "../ui/dot-pattern";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const options = {
  loop: true,
  align: "start",
  skipSnaps: false,
};

const autoplayOptions = {
  delay: 5000,
  rootNode: (emblaRoot) => emblaRoot.parentElement,
};

export function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0">
        <Image
          src="/assets/top-left-shape.png"
          alt="Top Left Decorative Shape"
          width={300}
          height={300}
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src="/assets/bottom-right-shape.png"
          alt="Bottom Right Decorative Shape"
          width={300}
          height={300}
        />
      </div>

      <DotPattern className="absolute inset-0 opacity-40 z-0" />

      <div className="container mx-auto">
        <div className="flex justify-center">
          <Image
            src={"/assets/energy.png"}
            alt="Bullet"
            width={1000}
            height={1000}
            className="w-8 mb-4 object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 text-[#e9844c]">
          What Our Customers Say
        </h2>
        <div className="relative container mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <div
              onClick={scrollPrev}
              className="flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-main" />
            </div>
            <div
              onClick={scrollNext}
              className="flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 text-gray-600 hover:text-main" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
