"use client"
import logo1 from "../../public/assets/logo1.png"

import Image from "next/image"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-6 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-4">
            <Link href={"/"}>
              <Image src={logo1} alt="Horizon Impact Logo" width={75} height={140} className="mb-6" />
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed">
              Horizon Impact Fund Managers is a leading financial services company specializing in impact investments.
              We are committed to creating sustainable and impactful financial solutions for our clients.
            </p>
            <div className="flex space-x-4">
              <TooltipProvider>
                {[
                  {
                    // href: "https://www.facebook.com",
                    href: "#",
                    label: "Facebook",
                    icon: FaFacebook,
                  },
                  {
                    // href: "https://www.instagram.com",
                    href: "#",
                    label: "Instagram",
                    icon: FaInstagram,
                  },
                  {
                    // href: "https://www.linkedin.com",
                    href: "#",
                    label: "LinkedIn",
                    icon: FaLinkedin,
                  },
                  {
                    // href: "https://www.twitter.com",
                    href: "#",
                    label: "Twitter",
                    icon: FaTwitter,
                  },
                ].map(({ href, label, icon: Icon }) => (
                  <Tooltip key={label} side="top" align="center">
                    <TooltipTrigger>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex items-center justify-center w-12 h-12 bg-main hover:bg-mainHover rounded-full text-white shadow-md transition-colors duration-300"
                      >
                        <Icon className="text-2xl" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-white p-2 rounded-md">{label}</TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <div>
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117901.28005096214!2d16.979823599970523!3d-22.56357672260761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c0b1b5cb30c01ed%3A0xe4b84940cc445d3b!2sWindhoek%2C%20Namibia!5e0!3m2!1sen!2s!4v1743932559107!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="mt-10 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-8 md:pl-8">
            <h2 className="text-2xl font-semibold text-main mb-4">Contact Information</h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <div className="flex mt-0.5 items-center justify-center w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full text-main">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <span className="text-lg text-gray-400">
                  <p>
                    Horizon Impact Fund Managers <br />
                    Windhoek, Namibia
                  </p>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full text-main">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <span className="text-lg text-gray-400">
                  Call Us:
                  <a href="tel:+264814174301" className="text-lg pl-2 hover:text-main hover:underline">
                    +264814174301
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full text-main">
                  <FaWhatsapp className="text-xl" />
                </div>
                <span className="text-lg text-gray-400">
                  Whatsapp Us:
                  <a
                    href="https://wa.me/+264814174301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg pl-2 hover:text-main hover:underline"
                  >
                    +264814174301
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full text-main">
                  <Mail className="text-xl" />
                </div>
                <div>
                  <span className="text-lg text-gray-400">Email Us:</span>
                  <div className="mt-1">
                    <a href="mailto:info@HIFM.com.na" className="block text-lg text-gray-400 hover:text-main hover:underline">
                      info@HIFM.com.na
                    </a>
                    <a href="mailto:arinze@HIFM.com.na" className="block text-lg text-gray-400 hover:text-main hover:underline">
                      arinze@HIFM.com.na
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

