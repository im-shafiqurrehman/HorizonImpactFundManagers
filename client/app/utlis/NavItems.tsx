import Link from "next/link"
import Image from "next/image"
import type { FC } from "react"
import logo from "../../public/assets/logo.png"

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Investments", url: "/investments" },
  { name: "Services", url: "/services" },
  { name: "Portfolio", url: "/portfolio" },
  { name: "Contact", url: "/contact-us" },
]

type Props = {
  activeItem: number
  isMobile: boolean
}

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex z-[9999] relative">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`text-[16px] px-6 py-1 font-bold transition-all duration-300 relative group
                ${activeItem === index ? "text-[#e9844c]" : "text-black hover:text-[#e9844c]"}`}
            >
              {i.name}
              {activeItem === index ? (
                <span className="absolute bottom-0 left-[25px] w-[50%] h-[4px] bg-[#e9844c]"></span>
              ) : (
                <span className="absolute bottom-0 left-[25px] w-0 h-[4px] bg-[#e9844c] transition-all duration-300 group-hover:w-[45%]"></span>
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="w-full 800px:hidden mt-5 z-[9999] fixed top-0 left-0 right-0 bg-white">
          <div className="w-full text-center py-6 border-b-3 border-gray-200">
            <Link href="/" passHref>
              <div className="inline-block">
                <Image src={logo || "/placeholder.svg"} alt="Logo" width={150} height={50} className="mx-auto" />
              </div>
            </Link>
          </div>
          {navItemsData.map((i, index) => (
            <Link href={i.url} key={index} passHref>
              <span
                className={`block py-4 text-[16px] px-6 font-bold transition-all duration-300
                  ${
                    activeItem === index
                      ? "bg-[#e9844c]/10 text-[#e9844c] border-l-6 border-[#e9844c]"
                      : "text-black hover:text-[#e9844c] hover:bg-[#e9844c]/5"
                  }`}
              >
                {i.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default NavItems

