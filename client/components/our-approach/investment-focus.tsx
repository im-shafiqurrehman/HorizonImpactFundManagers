"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function InvestmentFocus() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-slate-800 mb-12 text-center transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } hover:text-[#e9844c] transition-colors duration-300`}
        >
          Our Investment Focus
        </h2>

        <div
          className={`bg-slate-50 rounded-lg p-6 mb-12 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-slate-500 font-medium">Focus</div>
            <div className="text-slate-500 font-medium">Rationale</div>
            <div className="text-slate-500 font-medium">Indicators</div>
          </div>
        </div>

        <div
          className={`border-b pb-8 mb-8 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.03.2025_04.12.33_REC-ZaEdjcPx69oR8akyoI0RUwQeJb33mZ.png"
                  alt="World Class Teams icon"
                  width={200}
                  height={100}
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center hover:text-[#e9844c] transition-colors duration-300">
                World Class Teams
              </h3>
            </div>
            <div>
              <p className="text-slate-700">
                Most of our job is finding and supporting great teams. If we can do that well, the rest typically takes
                care of itself.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium">Aligned equity incentives</p>
            </div>
          </div>
        </div>

        <div
          className={`border-b pb-8 mb-8 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } delay-100`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.03.2025_04.12.33_REC-ZaEdjcPx69oR8akyoI0RUwQeJb33mZ.png"
                  alt="Growth Stage Companies icon"
                  width={200}
                  height={100}
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center hover:text-[#e9844c] transition-colors duration-300">
                Growth Stage Companies
              </h3>
            </div>
            <div>
              <p className="text-slate-700">
                Growth stage can be defined in many different ways. In our mind, the question is no longer, "How can we
                get this company off the ground?" but rather, "How can we maximize its potential?".
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium">Typically at least $5 million of run-rate revenue</p>
            </div>
          </div>
        </div>

        <div
          className={`border-b pb-8 mb-8 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } delay-200`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.03.2025_04.12.33_REC-ZaEdjcPx69oR8akyoI0RUwQeJb33mZ.png"
                  alt="Sector Experts icon"
                  width={200}
                  height={100}
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center hover:text-[#e9844c] transition-colors duration-300">
                Sector Experts
              </h3>
            </div>
            <div>
              <p className="text-slate-700">
                We play in areas that we know well from years of focused investing. We apply the full breadth of our
                knowledge and networks to advance the interests of our portfolio companies.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium">Financial and business technology</p>
            </div>
          </div>
        </div>

        <div
          className={`border-b pb-8 mb-8 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } delay-300`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Flexible Investment Structure icon"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center hover:text-[#e9844c] transition-colors duration-300">
                Flexible Investment Structure
              </h3>
            </div>
            <div>
              <p className="text-slate-700">
                We tailor deal structures to accomplish a company's objectives, rather than force deal terms to fit an
                arbitrary investment box.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium">
                $20 million to $100 million equity checks; minority or majority ownership stakes
              </p>
            </div>
          </div>
        </div>

        <div
          className={`transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } delay-400`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Sound Fundamentals icon"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center hover:text-[#e9844c] transition-colors duration-300">
                Sound Fundamentals
              </h3>
            </div>
            <div>
              <p className="text-slate-700">
                While the relevant metrics are different for every business, we believe that great, enduring companies
                can only be built on solid fundamentals.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

