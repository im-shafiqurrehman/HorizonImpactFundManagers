"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Search, PlusCircle, MinusCircle, HelpCircle } from 'lucide-react'
import Link from "next/link"

// You can import this component and use it in your main file
export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // FAQ data
  const faqs = [
    {
      question: "What investment options does Horizon Impact Fund Managers offer?",
      answer: "Horizon Impact Fund Managers offers a diverse range of investment options including stocks, bonds, ETFs, mutual funds, real estate investment trusts (REITs), and alternative investments. Our platform is designed to accommodate various risk profiles, from conservative to aggressive growth strategies. Each investment option is carefully vetted by our expert team to ensure quality and potential for returns."
    },
    {
      question: "How does Horizon Impact Fund Managers ensure the security of my investments?",
      answer: "We implement bank-level security protocols including 256-bit encryption, two-factor authentication, and continuous monitoring systems. Additionally, all accounts are insured up to $500,000 through our partnership with leading financial security institutions. Our dedicated security team works around the clock to monitor and protect your investments from any potential threats."
    },
    {
      question: "What are the minimum investment requirements?",
      answer: "Our standard accounts start with a minimum investment of $1,000. However, we offer specialized starter portfolios for as low as $250 for new investors. Premium investment strategies typically require a minimum of $10,000. We believe in making investing accessible to everyone, regardless of their starting capital."
    },
    {
      question: "How are investment fees structured at Horizon Impact Fund Managers?",
      answer: "Horizon Impact Fund Managers operates on a transparent fee structure with no hidden costs. We charge an annual management fee of 0.75% for standard accounts, which decreases to 0.5% for accounts over $100,000. Premium services include additional features and personalized advice for 1.25% annually. All transaction fees are clearly displayed before execution."
    },
    {
      question: "Can I withdraw my investments at any time?",
      answer: "Yes, most investments can be liquidated and withdrawn at any time without penalty. However, certain specialized investment vehicles may have lock-up periods or early withdrawal fees. These terms are clearly communicated before investment. Standard withdrawals typically process within 2-3 business days, while larger amounts may take up to 5 business days."
    },
    {
      question: "How does Horizon Impact Fund Managers help with tax optimization?",
      answer: "Our platform includes advanced tax optimization tools that automatically implement strategies like tax-loss harvesting, efficient asset location, and dividend optimization. Additionally, our premium clients receive personalized tax planning advice from our certified financial advisors. We provide comprehensive year-end tax reports and work with your tax professional to ensure optimal tax efficiency."
    },
    {
      question: "What kind of returns can I expect from my investments?",
      answer: "While past performance doesn't guarantee future results, our Conservative portfolios have historically yielded 3-5% annually, Balanced portfolios 5-8%, and Growth portfolios 8-12%+. Each investor's returns will vary based on their chosen strategy, market conditions, and investment timeline. We focus on long-term wealth building rather than short-term gains."
    },
    {
      question: "How does Horizon Impact Fund Managers' advisory service work?",
      answer: "Our advisory service combines sophisticated algorithms with human expertise. New clients complete a comprehensive financial assessment, after which our system generates personalized investment recommendations. These are then reviewed by a dedicated financial advisor who fine-tunes the strategy. Clients receive quarterly strategy reviews and can schedule unlimited one-on-one consultations with their advisor."
    }
  ]

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  }

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.04, 0.62, 0.23, 0.98] 
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background elements */}
      <div className="absolute -left-20 top-40 h-[400px] w-[400px] rounded-full bg-[#248bac]/5 blur-3xl" />
      <div className="absolute -right-20 bottom-40 h-[300px] w-[300px] rounded-full bg-[#e9844c]/5 blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#545454] md:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-[#248bac]">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#545454]/80">
            Find answers to common questions about investing with Horizon Impact Fund Managers.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl"
        >
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545454]/50 transition-colors duration-300 group-focus-within:text-[#248bac]">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 border-[#545454]/10 bg-white py-4 pl-12 pr-4 text-[#545454] outline-none transition-all duration-300 placeholder:text-[#545454]/50 focus:border-[#248bac] focus:shadow-lg focus:shadow-[#248bac]/10"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="rounded-full p-1 text-[#545454]/50 transition-colors duration-300 hover:bg-[#545454]/5 hover:text-[#545454]"
                >
                  <span className="sr-only">Clear search</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* FAQ items */}
        <motion.div 
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group mb-4 overflow-hidden rounded-xl border-2 transition-all duration-500 ${
                  activeIndex === index 
                    ? 'border-[#248bac] bg-white shadow-lg shadow-[#248bac]/10' 
                    : 'border-[#545454]/10 bg-white hover:border-[#e9844c]/50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
                      activeIndex === index 
                        ? 'bg-[#248bac] text-white' 
                        : 'bg-[#545454]/5 text-[#545454] group-hover:bg-[#e9844c]/10 group-hover:text-[#e9844c]'
                    }`}>
                      {activeIndex === index ? (
                        <MinusCircle className="h-5 w-5" />
                      ) : (
                        <PlusCircle className="h-5 w-5" />
                      )}
                    </div>
                    <h3 className={`text-base font-medium transition-colors duration-300 ${
                      activeIndex === index 
                        ? 'text-[#248bac]' 
                        : 'text-[#545454] group-hover:text-[#e9844c]'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`h-5 w-5 transition-colors duration-300 ${
                      activeIndex === index 
                        ? 'text-[#248bac]' 
                        : 'text-[#545454]/70 group-hover:text-[#e9844c]'
                    }`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="px-5 pb-5"
                    >
                      <div className="relative ml-11 border-l-2 border-dashed border-[#248bac]/30 pl-6">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#248bac]/20" />
                        <p className="text-sm text-[#545454]/80">
                          {faq.answer}
                        </p>
                        <div className="absolute -left-[9px] bottom-0 h-4 w-4 rounded-full bg-[#248bac]/20" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border-2 border-dashed border-[#545454]/20 p-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#248bac]/10">
                <HelpCircle className="h-8 w-8 text-[#248bac]" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-[#545454]">No results found</h3>
              <p className="text-[#545454]/70">
                We couldn&apos;t find any FAQs matching your search. Try different keywords or browse all questions.
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#248bac] px-6 py-2 text-white transition-all duration-300 hover:bg-[#248bac]/90"
              >
                <span>View all questions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Still have questions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl bg-gradient-to-r from-[#248bac]/10 to-[#e9844c]/10 p-8 text-center md:p-12"
        >
          <div className="relative mx-auto mb-6 h-16 w-16 overflow-hidden rounded-full">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-[#248bac] to-[#e9844c] opacity-30" />
            <div className="absolute inset-1 flex items-center justify-center rounded-full bg-white">
              <HelpCircle className="h-8 w-8 text-[#248bac]" />
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-[#545454]">Still have questions?</h3>
          <p className="mb-6 text-[#545454]/80">
            Our dedicated support team is here to help you with any questions you may have about investing with Horizon Impact Fund Managers.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <button className="group relative overflow-hidden rounded-full bg-[#248bac] px-6 py-3 text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#248bac]/20">
                <span className="relative z-10 flex items-center justify-center gap-2" >
                  Contact Support
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span className="absolute bottom-0 left-0 h-full w-0 bg-[#e9844c] transition-all duration-500 group-hover:w-full" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-20 bottom-40 h-40 w-40 rounded-full border-2 border-[#248bac]/10" 
          style={{ animation: "float 15s infinite ease-in-out" }} />
        <div className="absolute -right-10 top-20 h-20 w-20 rounded-full border-2 border-[#e9844c]/10" 
          style={{ animation: "float 12s infinite ease-in-out 1s" }} />
        <div className="absolute left-1/4 top-1/3 h-6 w-6 rounded-full bg-[#248bac]/10" 
          style={{ animation: "float 8s infinite ease-in-out 0.5s" }} />
        <div className="absolute bottom-1/4 right-1/3 h-8 w-8 rounded-full bg-[#e9844c]/10" 
          style={{ animation: "float 10s infinite ease-in-out 0.2s" }} />
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  )
}