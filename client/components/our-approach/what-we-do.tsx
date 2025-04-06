"use client"

import Image from "next/image"
import { useScrollAnimation } from "../our-approach/use-scroll-animation"
import appach1 from "../../public/assets/impact-driven.png"
import appach2 from "../../public/assets/approach2.png"
import appach3 from "../../public/assets/approach3.png"
import appach4 from "../../public/assets/strategic-partnership.png"

export default function WhatWeDo() {
  const [section1Visible, section1Ref] = useScrollAnimation()
  const [section2Visible, section2Ref] = useScrollAnimation()
  const [section3Visible, section3Ref] = useScrollAnimation()
  const [section4Visible, section4Ref] = useScrollAnimation()

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="border-b pb-4 mb-12 w-40">
          <h2 className="text-slate-500 font-medium">What We Do</h2>
        </div>

        <div ref={section1Ref} className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`relative transform transition-all duration-1000 ease-in-out flex justify-center items-center ${
              section1Visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="max-w-md mx-auto">
              <Image
                src={appach1 || "/placeholder.svg"}
                alt="Impact Investment"
                width={500}
                height={350}
                className="h-auto"
              />
            </div>
          </div>
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 ease-in-out ${
              section1Visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">01.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Impact-driven investment.
            </h2>
            <p className="text-slate-600 text-lg">
              Horizon Impact Fund Managers is a Southern Africa-focused impact investment firm dedicated to driving
              sustainable development and inclusive economic growth. We bridge the financing gap in high-impact
              industries, unlocking capital for sustainable agriculture, hydrocarbons, the green economy, basic needs,
              sports & the creative industry, and fintech & digital infrastructure.
            </p>
          </div>
        </div>

        <div ref={section2Ref} className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`flex flex-col justify-center order-2 md:order-1 transform transition-all duration-1000 ease-in-out ${
              section2Visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">02.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Innovative financing solutions.
            </h2>
            <p className="text-slate-600 text-lg">
              With a target fund size of USD 10–50 million and an investment horizon of 7–10 years, we provide
              innovative financing solutions that generate measurable social and environmental impact while delivering
              competitive financial returns. Our flexible investment structures are tailored to achieve both company and
              community objectives.
            </p>
          </div>
          <div
            className={`relative order-1 md:order-2 transform transition-all duration-1000 ease-in-out flex justify-center items-center ${
              section2Visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="max-w-md mx-auto">
              <Image
                src={appach2 || "/placeholder.svg"}
                alt="Innovative financing"
                width={500}
                height={350}
                className="h-auto"
              />
            </div>
          </div>
        </div>

        <div ref={section3Ref} className="grid md:grid-cols-2 gap-12 mb-16">
          <div
            className={`relative transform transition-all duration-1000 ease-in-out flex justify-center items-center ${
              section3Visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="max-w-md mx-auto">
              <Image src={appach3 || "/placeholder.svg"} alt="MSME focus" width={500} height={350} className="h-auto" />
            </div>
          </div>
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 ease-in-out ${
              section3Visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">03.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              MSME development focus.
            </h2>
            <p className="text-slate-600 text-lg">
              By focusing on micro, small, and medium-sized enterprises (MSMEs) across Namibia and Southern Africa, we
              aim to catalyze job creation, climate resilience, and economic transformation in underserved markets. Our
              portfolio companies receive complete access to our network of industry leaders, strategic partners, and
              financial institutions.
            </p>
          </div>
        </div>

        <div ref={section4Ref} className="grid md:grid-cols-2 gap-12">
          <div
            className={`flex flex-col justify-center order-2 md:order-1 transform transition-all duration-1000 ease-in-out ${
              section4Visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="mb-4 text-slate-600">
              <span className="font-medium">04.</span> What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 hover:text-[#e9844c] transition-colors duration-300">
              Strategic partnerships.
            </h2>
            <p className="text-slate-600 text-lg">
              Our investment approach combines financial expertise, strategic partnerships, and responsible capital
              allocation to drive long-term value and sustainable impact. Horizon Impact Fund Managers is committed to
              reshaping Africa's investment landscape—one transformative investment at a time. We provide hands-on
              support across growth strategies, operational improvements, and market expansion.
            </p>
          </div>
          <div
            className={`relative order-1 md:order-2 transform transition-all duration-1000 ease-in-out flex justify-center items-center ${
              section4Visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="max-w-md mx-auto">
              <Image
                src={appach4 || "/placeholder.svg"}
                alt="Strategic partnerships"
                width={500}
                height={350}
                className="h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

