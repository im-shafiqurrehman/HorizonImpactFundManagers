"use client"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import { useLogoutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { type FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { HiOutlineUserCircle } from "react-icons/hi"
import avatarDefault from "../../public/assets/avatardefault.jpeg"
import Login from "../components/Auth/Login"
import Signup from "../components/Auth/Signup"
import Verification from "../components/Auth/Verification"
import CustomModal from "../utlis/CustomModal"
import logo from "../../public/assets/logo1.png"
import { usePathname } from "next/navigation"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem: number
  route: string
  setRoute: (route: string) => void
}

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
  const { data } = useSession()
  const [socialAuth, { isSuccess }] = useSocialAuthMutation()
  const [logout, setLogout] = useState(false)
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  })
  const pathname = usePathname()

  const isActiveLink = (href: string) => pathname === href

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/our-approach", label: "Our Approach" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ]

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            socialimage: data?.user?.image,
          })
          refetch()
        }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Welcome back to ELearning!")
        setOpen(false)
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true)
    }
  }, [data, isLoading, isSuccess, refetch, setOpen, socialAuth, userData])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true)
      } else {
        setActive(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleProfileClick = () => {
    setRoute("Login")
    setOpen(true)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className={`bg-white border-gray-200 fixed top-0 left-0 w-full z-[80] ${active ? "shadow-md" : ""}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} alt="Logo" width={60} height={40} priority />
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          {/* Profile Icon */}
          <div className="mr-4 transition-transform duration-300 hover:scale-110">
            {userData ? (
              <Link href="/profile">
                <Image
                  src={userData?.user?.avatar ? userData?.user?.avatar.url : avatarDefault}
                  alt="Profile Photo"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md"
                  style={{ border: activeItem === 5 ? "2px solid cyan" : "none" }}
                />
              </Link>
            ) : (
              <HiOutlineUserCircle
                className="cursor-pointer text-black transition-colors duration-300 hover:text-main"
                size={25}
                onClick={handleProfileClick}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleMobileMenu}
            aria-controls="navbar-menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between ${mobileMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-3 md:p-0 relative group ${
                    isActiveLink(link.href) ? "text-main" : "text-gray-700 md:hover:text-main"
                  }`}
                >
                  {link.label}
                  {/* Only show underline effect on desktop */}
                  <span
                    className={`hidden md:block absolute left-0 -bottom-1 h-1 rounded-md bg-main w-0 group-hover:w-3/4 transition-all duration-300 ${
                      isActiveLink(link.href) ? "w-3/4" : ""
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Authentication modals */}
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Signup} />
      )}
      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </nav>
  )
}

export default Header

