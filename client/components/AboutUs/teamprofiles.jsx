"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Arinze from "../../public/assets/Arinze.jpeg"
import Sean from "../../public/assets/Sean.png"
import Justin from "../../public/assets/Justin.png"
import Utaara from "../../public/assets/Utaara.png"
import Veneranda from "../../public/assets/Veneranda.png"

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Arinze Okafor, CFA, CAIA",
    role: "Chief Executive Officer (CEO)",
    description:
      "Arinze Okafor provides strategic leadership and vision, ensuring Horizon Impact Fund achieves its dual focus on financial performance and social impact. With a proven track record in asset management and impact investing, Arinze has co-founded Mopane Asset Management (managing over NAD 1.3 billion) and Bellatrix Capital (managing over NAD 72 million). His leadership at Bellatrix includes launching initiatives like the Bellatrix SME Debt Fund and Green Impact Facility, which have significantly supported economic growth in Namibia.",
    responsibilities:
      "As the Chief Executive Officer (CEO) of Horizon Impact Fund, Arinze Okafor, CFA, CAIA, will provide strategic leadership and vision to the fund. His primary responsibilities include aligning the fund with its mission, ensuring adherence to its investment principles, and maintaining a balanced focus on both financial performance and social impact. Arinze will engage with key stakeholders—such as investors, development agencies, and policymakers—to foster strategic partnerships and leverage opportunities for collaboration.",
    trackRecord:
      "Arinze Okafor brings an extensive background in asset management and impact investing, with a proven track record of establishing and managing successful funds across multiple asset classes.",
    image: Arinze,
  },
  {
    id: 2,
    name: "Justin Rovian Naidoo",
    role: "Chief Investment Officer (CIO) & Portfolio Manager",
    description:
      "Justin Naidoo brings over 20 years of experience in private equity, venture capital, and impact investing. He leads Horizon Impact Fund's investment strategy, focusing on blended finance solutions that drive sustainable agriculture, fintech, renewable energy, and SME development. Justin has mobilized over $300 million for African impact funds and structured over 500MW of renewable energy deals, positioning the fund at the forefront of green industrialization in Namibia.",
    responsibilities:
      "As Chief Investment Officer, Justin leads the fund's investment strategy and portfolio management, focusing on identifying and executing investments that deliver both financial returns and meaningful social impact.",
    trackRecord:
      "With over 20 years of experience, Justin has mobilized over $300 million for African impact funds and structured over 500MW of renewable energy deals, demonstrating exceptional expertise in sustainable finance.",
    image: Justin,
  },
  {
    id: 3,
    name: "Veneranda Mahindi",
    role: "Independent Board Chairperson",
    description:
      "With over 15 years in financial regulation and pension fund governance, Veneranda provides governance oversight and risk management. As Manager: Pension Funds at NAMFISA, she ensures Horizon Impact Fund operates with transparency, accountability, and regulatory compliance, strengthening investor confidence and long-term capital attraction.",
    responsibilities:
      "As Independent Board Chairperson, Veneranda oversees governance and risk management, ensuring the fund operates with transparency and accountability to all stakeholders.",
    trackRecord:
      "With over 15 years in financial regulation and pension fund governance at NAMFISA, Veneranda brings critical expertise in regulatory compliance and investor protection.",
    image: Veneranda,
  },
  {
    id: 4,
    name: "Utaara Jauch",
    role: "Independent Non-Executive Director",
    description:
      "An expert in financial regulation and corporate governance, Utaara oversees legal compliance and investment structuring. Her extensive legal background ensures that the fund adheres to strict governance standards while navigating complex regulatory environments, protecting investor interests, and driving sustainable investments.",
    responsibilities:
      "As an Independent Non-Executive Director, Utaara provides oversight on legal compliance and investment structuring, ensuring the fund adheres to strict governance standards.",
    trackRecord:
      "With extensive experience in financial regulation and corporate governance, Utaara has a proven record of navigating complex regulatory environments while protecting investor interests.",
    image: Utaara,
  },
  {
    id: 5,
    name: "Sean Moekena",
    role: "Assistant Portfolio Manager",
    description:
      "Sean supports portfolio management, focusing on deal sourcing, due diligence, and investment monitoring. His role ensures that Horizon Impact Fund's investments achieve both financial returns and meaningful social impact across target sectors.",
    responsibilities:
      "As Assistant Portfolio Manager, Sean supports investment operations through deal sourcing, due diligence, and monitoring of portfolio companies.",
    trackRecord:
      "Sean brings valuable expertise in financial analysis and impact measurement, ensuring investments meet both financial and social impact objectives.",
    image: Sean,
  },
]

const TeamProfiles = () => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Team Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet Our Team</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Our dedicated team brings expertise, passion, and a commitment to driving financial returns and social impact.
        </p>
      </div>

      <div className="space-y-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section - Increased height for mobile */}
                  <div className="md:w-1/3 lg:w-1/4 md:order-2">
                    <div className="relative w-full h-full min-h-[450px] md:min-h-[300px]">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center"
                        priority={member.id === 1}
                      />
                    </div>
                  </div>

                  {/* Content Section - Adjusted width */}
                  <div className="md:w-2/3 lg:w-3/4 p-6 md:order-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-1">{member.name}</h3>
                    <p className="text-gray-700 font-medium mb-4">{member.role}</p>

                    <div className="space-y-4">
                      <p className="text-gray-700">{member.responsibilities}</p>
                      <p className="text-gray-700">{member.trackRecord}</p>

                      {expandedId === member.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          <p className="text-gray-700">{member.description}</p>
                        </motion.div>
                      )}

                      <button
                        onClick={() => toggleExpand(member.id)}
                        className="text-blue-600 font-medium hover:text-blue-800 transition-colors mt-2"
                      >
                        {expandedId === member.id ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TeamProfiles