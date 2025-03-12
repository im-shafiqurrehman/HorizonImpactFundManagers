"use client"
import { Users, BarChart3, BookOpen, Layers, Shield } from "lucide-react"
import { useScrollAnimation } from "../our-approach/use-scroll-animation";

export default function InvestmentFocus() {
  const [headerVisible, headerRef] = useScrollAnimation()
  const [row1Visible, row1Ref] = useScrollAnimation()
  const [row2Visible, row2Ref] = useScrollAnimation()
  const [row3Visible, row3Ref] = useScrollAnimation()
  const [row4Visible, row4Ref] = useScrollAnimation()
  const [row5Visible, row5Ref] = useScrollAnimation()

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={headerRef}>
          <h2
            className={`text-4xl md:text-5xl font-bold text-slate-800 mb-12 text-center transform transition-all duration-1000 ease-in-out ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            } hover:text-[#e9844c] transition-colors duration-300`}
          >
            Our Investment Focus
          </h2>

          <div
            className={`bg-slate-50 rounded-lg p-3 mb-6 transform transition-all duration-1000 ease-in-out ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <div className="grid grid-cols-3 gap-4 mb-0">
              <div className="text-slate-500 font-medium text-sm py-1">Focus</div>
              <div className="text-slate-500 font-medium text-sm py-1">Rationale</div>
              <div className="text-slate-500 font-medium text-sm py-1">Indicators</div>
            </div>
          </div>
        </div>

        <div
          ref={row1Ref}
          className={`mb-8 transform transition-all duration-1000 ease-in-out ${
            row1Visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="group grid md:grid-cols-3 gap-8 p-6 rounded-lg border border-transparent hover:border-[#248bac] hover:bg-gradient-to-r hover:from-[#248bac]/5 hover:to-[#248bac]/10 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 group-hover:bg-white transition-colors duration-300">
                <Users className="w-12 h-12 text-[#545454] group-hover:text-[#e9844c] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-[#e9844c] transition-colors duration-300">
                World Class Teams
              </h3>
            </div>
            <div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                Most of our job is finding and supporting great teams. If we can do that well, the rest typically takes
                care of itself.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium group-hover:text-[#248bac] transition-colors duration-300">
                Aligned equity incentives
              </p>
            </div>
          </div>
        </div>

        <div
          ref={row2Ref}
          className={`mb-8 transform transition-all duration-1000 ease-in-out ${
            row2Visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="group grid md:grid-cols-3 gap-8 p-6 rounded-lg border border-transparent hover:border-[#248bac] hover:bg-gradient-to-r hover:from-[#248bac]/5 hover:to-[#248bac]/10 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 group-hover:bg-white transition-colors duration-300">
                <BarChart3 className="w-12 h-12 text-[#545454] group-hover:text-[#e9844c] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-[#e9844c] transition-colors duration-300">
                Growth Stage Companies
              </h3>
            </div>
            <div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                Growth stage can be defined in many different ways. In our mind, the question is no longer, &quot;How
                can we get this company off the ground?&quot; but rather, &quot;How can we maximize its
                potential?&quot;.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium group-hover:text-[#248bac] transition-colors duration-300">
                Typically at least $5 million of run-rate revenue
              </p>
            </div>
          </div>
        </div>

        <div
          ref={row3Ref}
          className={`mb-8 transform transition-all duration-1000 ease-in-out ${
            row3Visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="group grid md:grid-cols-3 gap-8 p-6 rounded-lg border border-transparent hover:border-[#248bac] hover:bg-gradient-to-r hover:from-[#248bac]/5 hover:to-[#248bac]/10 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 group-hover:bg-white transition-colors duration-300">
                <BookOpen className="w-12 h-12 text-[#545454] group-hover:text-[#e9844c] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-[#e9844c] transition-colors duration-300">
                Sector Experts
              </h3>
            </div>
            <div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                We play in areas that we know well from years of focused investing. We apply the full breadth of our
                knowledge and networks to advance the interests of our portfolio companies.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium group-hover:text-[#248bac] transition-colors duration-300">
                Financial and business technology
              </p>
            </div>
          </div>
        </div>

        <div
          ref={row4Ref}
          className={`mb-8 transform transition-all duration-1000 ease-in-out ${
            row4Visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="group grid md:grid-cols-3 gap-8 p-6 rounded-lg border border-transparent hover:border-[#248bac] hover:bg-gradient-to-r hover:from-[#248bac]/5 hover:to-[#248bac]/10 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 group-hover:bg-white transition-colors duration-300">
                <Layers className="w-12 h-12 text-[#545454] group-hover:text-[#e9844c] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-[#e9844c] transition-colors duration-300">
                Flexible Investment Structure
              </h3>
            </div>
            <div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                We tailor deal structures to accomplish a company's objectives, rather than force deal terms to fit an
                arbitrary investment box.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium group-hover:text-[#248bac] transition-colors duration-300">
                $20 million to $100 million equity checks; minority or majority ownership stakes
              </p>
            </div>
          </div>
        </div>

        <div
          ref={row5Ref}
          className={`transform transition-all duration-1000 ease-in-out ${
            row5Visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="group grid md:grid-cols-3 gap-8 p-6 rounded-lg border border-transparent hover:border-[#248bac] hover:bg-gradient-to-r hover:from-[#248bac]/5 hover:to-[#248bac]/10 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 group-hover:bg-white transition-colors duration-300">
                <Shield className="w-12 h-12 text-[#545454] group-hover:text-[#e9844c] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-[#e9844c] transition-colors duration-300">
                Sound Fundamentals
              </h3>
            </div>
            <div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                While the relevant metrics are different for every business, we believe that great, enduring companies
                can only be built on solid fundamentals.
              </p>
            </div>
            <div>
              <p className="text-slate-800 font-medium group-hover:text-[#248bac] transition-colors duration-300"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

