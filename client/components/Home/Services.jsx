"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fade, Slide } from "react-awesome-reveal";
import { specializations } from "../constants/services";

export default function Services() {
  return (
    <section className="py-12 text-gray-900 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">


        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-sm font-medium rounded-full text-white border-gray-300 px-4 py-1.5 
             bg-[#e66f3d] hover:text-white 
             cursor-pointer t"
          >
            Our Expertise
          </Badge>
          <h2 className="text-3xl font-bold text-main mb-4">
            Core Investment Strategies
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-xl text-gray-600">
              Delivering innovative investment solutions to drive growth, sustainability,
              and long-term value for our clients.
            </p>
          </div>
        </div>
        <Fade triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <Slide direction="up" triggerOnce key={index} delay={index * 100}>
                <Card className="overflow-hidden hover:bg-main hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-200 group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-main text-white group-hover:bg-white">
                          <spec.icon className="h-8 w-8 text-white group-hover:text-main" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white line-clamp-2">
                          {spec.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-gray-600 group-hover:text-gray-100">
                      {spec.description}
                    </p>
                  </CardContent>
                </Card>
              </Slide>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
