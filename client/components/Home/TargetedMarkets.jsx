"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

// Updated sectors data with full content
const sectors = [
  {
    id: 1,
    name: "Sustainable Agriculture",
    image: "/assets/marketers/Agriculture-and-Aqua-Groups.jpg",
    description:
      "Agriculture is the backbone of many Southern African economies, providing livelihoods for the majority of rural populations. However, the sector faces challenges such as climate change, low productivity, and limited access to markets and technology.",
    focusAreas: [
      "Climate-Smart Agriculture: Supporting the adoption of drought-resistant crops, efficient irrigation systems, and regenerative farming practices that reduce environmental impact.",
      "Agricultural Value Chain Development: Investing in post-harvest processing, storage facilities, and logistics to minimize food loss and increase market access for farmers.",
      "Agri-Tech Solutions: Promoting technological innovations like precision farming, mobile-based advisory services, and digital platforms that connect farmers to buyers and financial services.",
      "Youth and Women in Agriculture: Empowering marginalized groups through targeted financing and capacity-building initiatives.",
    ],
    impactGoals:
      "Improve food security, increase rural incomes, and foster sustainable land use while mitigating climate risks.",
  },
  {
    id: 2,
    name: "Hydrocarbons (Oil & Gas Local Content Development)",
    image: "/assets/marketers/Genset-Rental-Companies.jpg",
    description:
      "Namibia's hydrocarbons sector holds significant potential for economic growth, job creation, and infrastructure development. However, ensuring that the benefits reach local communities is essential.",
    focusAreas: [
      "Local Supplier Development: Financing and mentoring local businesses to participate in the oil and gas value chain.",
      "Skills Development & Training: Supporting vocational training programs that equip Namibians with the skills required for employment in the hydrocarbons sector.",
      "Sustainable Energy Transition: Encouraging responsible extraction practices while investing in renewable energy solutions to complement hydrocarbons development.",
      "Community Engagement: Ensuring that local communities are involved in decision-making processes and benefit directly from resource-related investments.",
    ],
    impactGoals:
      "Foster economic inclusivity, reduce unemployment, and ensure that resource wealth contributes to national development.",
  },
  {
    id: 3,
    name: "Green Economy (SMEs & Informal Sector Development)",
    image: "/assets/marketers/System-Integrators.jpg",
    description:
      "A thriving small business ecosystem is vital for inclusive economic growth. Horizon Impact Fund targets the informal sector and early-stage SMEs, which are often overlooked by traditional financiers.",
    focusAreas: [
      "Access to Finance for SMEs: Providing working capital, growth financing, and business development services to micro, small, and medium enterprises.",
      "Informal Sector Support: Offering micro-loans, contract/invoice discounting, and tailored financial products to boost productivity and formalization.",
      "Green Innovation: Investing in eco-friendly businesses that focus on waste management, renewable energy, and sustainable production.",
      "Women and Youth Entrepreneurship: Prioritizing ventures led by women and young entrepreneurs to promote inclusivity and gender equality.",
    ],
    impactGoals:
      "Stimulate job creation, improve livelihoods, and promote environmental sustainability through green and inclusive business models.",
  },
  {
    id: 4,
    name: "Basic Needs (Housing, Education, and Water & Sanitation)",
    image: "/assets/marketers/Residential-Complexes.jpg",
    description:
      "Meeting basic human needs is fundamental to sustainable development. Our investments in this sector aim to improve the quality of life for underserved communities.",
    focusAreas: [
      "Affordable Housing: Partnering with developers to create safe, cost-effective housing solutions for low and middle-income families.",
      "Educational Infrastructure: Supporting the development of schools, digital learning platforms, and vocational training centers to enhance educational outcomes.",
      "Water & Sanitation: Investing in clean water supply systems, sanitation infrastructure, and hygiene awareness programs to improve public health.",
      "Health Access: Funding community health initiatives that increase access to basic healthcare services.",
    ],
    impactGoals: "Reduce poverty, enhance educational attainment, and improve overall community well-being.",
  },
  {
    id: 5,
    name: "Sports and Creative Industry",
    image: "/assets/marketers/General-Contractors.jpg",
    description:
      "The sports and creative sectors are powerful engines for economic growth, cultural preservation, and youth empowerment. Horizon Impact Fund sees untapped potential in leveraging these industries for community development.",
    focusAreas: [
      "Sports Infrastructure Development: Financing the construction and renovation of stadiums, training facilities, and community sports centers.",
      "Talent Development: Supporting grassroots programs that identify and nurture sports and creative talent among youth.",
      "Creative Arts & Media: Investing in film, music, digital content creation, and cultural heritage projects that promote local narratives and global exposure.",
      "Economic Opportunities: Facilitating job creation through creative entrepreneurship and event hosting.",
    ],
    impactGoals:
      "Promote social cohesion, create employment opportunities, and showcase Southern Africa's cultural richness.",
  },
  {
    id: 6,
    name: "Fintech and Digital Infrastructure",
    image: "/assets/marketers/Hospitals.jpg",
    description:
      "Financial inclusion and digital connectivity are essential drivers of economic resilience and competitiveness. Horizon Impact Fund aims to bridge the digital divide, particularly in rural and underserved areas.",
    focusAreas: [
      "Financial Inclusion Technologies: Investing in digital payment platforms, mobile banking solutions, and fintech innovations that expand access to financial services.",
      "Digital Infrastructure Expansion: Supporting broadband connectivity projects, data centers, and technology hubs to improve digital access.",
      "E-Commerce and Digital Platforms: Financing startups that enable small businesses to participate in the digital economy.",
      "Cybersecurity and Data Privacy: Ensuring that digital solutions are secure and protect user data.",
    ],
    impactGoals:
      "Enhance connectivity, reduce financial exclusion, and boost economic opportunities through digital transformation.",
  },
]

export default function TargetSectors() {
  const [angle, setAngle] = useState(0)
  const [expandedSector, setExpandedSector] = useState(null)
  const [isAnyExpanded, setIsAnyExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 2) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsAnyExpanded(expandedSector !== null)
  }, [expandedSector])

  const toggleSector = (id) => {
    setExpandedSector(expandedSector === id ? null : id)
  }

  return (
    <div className="bg-slate-900 relative text-gray-100 py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 rotate-90 opacity-30">
        <Image src="/assets/sqaure-shape.png" alt="shape" width={200} height={200} />
      </div>
      <div className="absolute z-0 -bottom-2 right-4 -rotate-90 opacity-30">
        <Image src="/assets/sqaure-shape.png" alt="shape" width={200} height={200} />
      </div>

      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-[#E66F3D] mb-8">Target Sectors</h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          At Horizon Impact Fund, we strategically focus on sectors that offer both robust financial returns and
          measurable social and environmental impacts. Our targeted sectors address Southern Africa's most pressing
          development challenges while aligning with the UN Sustainable Development Goals.
        </p>
      </div>

      {/* Sectors grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {sectors.map((sector) => (
          <motion.div
            key={sector.id}
            layout
            className={`relative overflow-hidden rounded-2xl group transition-all duration-500 ${
              isAnyExpanded && expandedSector !== sector.id ? "opacity-60 scale-95" : "opacity-100"
            } ${expandedSector === sector.id ? "sm:col-span-2 lg:col-span-3 cursor-default" : "cursor-pointer"}`}
            onClick={() => expandedSector !== sector.id && toggleSector(sector.id)}
            style={{
              background: `linear-gradient(45deg, #172033, #172033 50%, #172033) padding-box, 
                          conic-gradient(from ${angle}deg, rgba(31, 41, 55, 0.48) 80%, #E66F3D 86%, rgba(99, 102, 241, 0.4) 90%, #E66F3D 94%, rgba(31, 41, 55, 0.48) 98%) border-box`,
            }}
          >
            <AnimatePresence>
              {expandedSector === sector.id ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src={sector.image || "/placeholder.svg"}
                        alt={sector.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-[#E66F3D]">{sector.name}</h3>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSector(sector.id)
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-white"
                        >
                          <ChevronUp className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-gray-300 mb-4">{sector.description}</p>

                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-[#E66F3D]" />
                          Our Focus Areas
                        </h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {sector.focusAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#E66F3D]/10 p-4 rounded-lg border border-[#E66F3D]/30">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-[#E66F3D]" />
                          Impact Goals
                        </h4>
                        <p className="text-gray-300">{sector.impactGoals}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={sector.image || "/placeholder.svg"}
                      alt={sector.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-[#E66F3D] text-center mb-2">{sector.name}</h3>
                    <p className="text-gray-300 text-sm text-center line-clamp-2">{sector.description}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSector(sector.id)
                      }}
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-gray-300 hover:text-white"
                    >
                      <ChevronDown className="h-5 w-5 mr-1" />
                      <span>Learn More</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

