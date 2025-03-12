"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { useScrollAnimation } from "../our-approach/use-scroll-animation";

export default function SectorExpertise() {
  const [financialExpanded, setFinancialExpanded] = useState(false)
  const [businessExpanded, setBusinessExpanded] = useState(false)
  const [sectionVisible, sectionRef] = useScrollAnimation()

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="grid md:grid-cols-2 gap-12">
          <div
            className={`transform transition-all duration-1000 ease-in-out ${
              sectionVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="border-b pb-4 mb-12 w-40">
              <h2 className="text-slate-500 font-medium">Our Sectors</h2>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 hover:text-[#e9844c] transition-colors duration-300">
              Our Sector Expertise
            </h2>

            <div className="w-16 h-1 bg-slate-300 mb-8"></div>

            <p className="text-slate-600 text-lg mb-8">
              Our team leverages broad experience across the financial and business services landscape. We are
              passionate about finding and backing sector-leading companies.
            </p>
          </div>

          <div
            className={`bg-[#1e2a3b] p-8 flex flex-col justify-center transform transition-all duration-1000 ease-in-out ${
              sectionVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="mb-6">
              <div
                className="flex items-center text-white hover:text-[#e9844c] cursor-pointer transition-colors duration-300 mb-2"
                onClick={() => setFinancialExpanded(!financialExpanded)}
              >
                {financialExpanded ? <Minus className="mr-2 w-5 h-5" /> : <Plus className="mr-2 w-5 h-5" />}
                <span className="text-xl font-medium">Financial Technology</span>
              </div>

              {financialExpanded && (
                <div className="ml-7 space-y-2 mt-3 transition-all duration-500 ease-in-out">
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Banking
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Capital Markets
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    CFO-suite tools
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Insurance
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Payments
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Real Estate
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Specialty Finance
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Wealth Management
                  </p>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center text-white hover:text-[#e9844c] cursor-pointer transition-colors duration-300 mb-2"
                onClick={() => setBusinessExpanded(!businessExpanded)}
              >
                {businessExpanded ? <Minus className="mr-2 w-5 h-5" /> : <Plus className="mr-2 w-5 h-5" />}
                <span className="text-xl font-medium">Business Technology</span>
              </div>

              {businessExpanded && (
                <div className="ml-7 space-y-2 mt-3 transition-all duration-500 ease-in-out">
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Governance Risk & Compliance
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Data & Analytics
                  </p>
                  <p className="text-slate-400 hover:text-[#e9844c] transition-colors duration-300 cursor-pointer">
                    Enterprise Software
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

