"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function WhatWeDo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="border-b pb-4 mb-12 w-40">
          <h2 className="text-slate-500 font-medium">What We Do</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`relative transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sectorExperties-8bHCm4KA47xg9yY6j31m2xlaG6IBKt.png"
              alt="Team meeting"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">00.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Sector expertise.
            </h2>
            <p className="text-slate-600 text-lg">
              Specialization matters to us. Our deep domain knowledge and thesis-driven approach have led to our track
              record of investment success. Specialization also matters to our partners. It allows us to add value from
              day one, without wasting time getting up to speed.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`flex flex-col justify-center order-2 md:order-1 transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">00.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Collaborative and flexible partnerships.
            </h2>
            <p className="text-slate-600 text-lg">
              A spirit of partnership sits at the foundation of every Long Ridge investment. We seek to align incentives
              with our management teams. Our investment structures are tailored to achieve a company's objectives,
              rather than the other way around.
            </p>
          </div>
          <div
            className={`relative order-1 md:order-2 transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Collaborative partnerships"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`relative transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Network of industry leaders"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">00.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Access to our network of industry leaders.
            </h2>
            <p className="text-slate-600 text-lg">
              We offer our companies complete access to our network, which has been built over decades. Long Ridge's
              portfolio companies regularly tap into the network to receive commercial introductions, recruit executive
              talent, and solicit expert advice.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`flex flex-col justify-center order-2 md:order-1 transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">00.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Strategic support.
            </h2>
            <p className="text-slate-600 text-lg">
              Our companies solicit strategic support from Long Ridge across a wide range of initiatives. We are happy
              to roll up our sleeves and offer our assistance. Key areas of involvement tend to be around organic growth
              (e.g., sales & marketing, pricing), inorganic growth (i.e., M&A), and augmenting the executive team and
              board.
            </p>
          </div>
          <div
            className={`relative order-1 md:order-2 transform transition-all duration-1000 ease-in-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Strategic support"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

