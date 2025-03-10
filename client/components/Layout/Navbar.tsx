"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent } from "../ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { HiOutlineUserCircle } from "react-icons/hi"

interface NavbarProps {
  activeItem: number
  isMobile: boolean
  openSidebar: boolean
  setOpenSidebar: (open: boolean) => void
  userData: any
  setOpen: (open: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeItem, isMobile, openSidebar, setOpenSidebar, userData, setOpen }) => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const isActiveLink = (href: string) => pathname === href

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    setIsLoaded(true)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = () => {
    setOpenSidebar(false)
  }

  // Navigation links array for DRY code
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/our-approach", label: "Our Approach" },
    { href: "/services", label: "Services" },

    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <nav
      className={`transition-all duration-300 bg-none ${
        isScrolled ? "py-3" : "py-3"
      } ${isLoaded ? "animate-navbar" : "opacity-0"}`}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation Links */}
          <div className="hidden 800px:flex items-center gap-6 font-semibold text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group ${isActiveLink(link.href) ? "text-main" : ""}`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                    isActiveLink(link.href) ? "w-3/4" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Sheet */}
          <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] min-h-screen bg-white mt-[100px] pt-30 overflow-y-auto no-scrollbar text-gray-800"
            >
              <nav className="flex flex-col gap-6 px-2">
                {/* Mobile Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-base font-semibold py-3 ${isActiveLink(link.href) ? "text-main" : ""}`}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* User profile in mobile menu - placed BELOW navigation links with more margin */}
                <div className="mt-4 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    {userData ? (
                      <Link href="/profile" className="flex items-center gap-3" onClick={handleLinkClick}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                          <Image
                            src={userData?.user.avatar ? userData?.user.avatar.url : "/assets/Profile.png"}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Access your account</p>
                        </div>
                      </Link>
                    ) : (
                      <button
                        className="flex items-center gap-3"
                        onClick={() => {
                          setOpen(true)
                          setOpenSidebar(false)
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <HiOutlineUserCircle className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Access your account</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

