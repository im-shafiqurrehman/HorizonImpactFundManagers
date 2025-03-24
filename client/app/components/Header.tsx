"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogoutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi";
import avatarDefault from "../../public/assets/avatardefault.jpeg";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgetPassword from "../components/Auth/ForgetPassword";
import Forgetpasswordotp from "../components/Auth/Forgetpasswordotp";
import Verification from "../components/Auth/Verification";
import CustomModal from "../utlis/CustomModal";
import logo from "../../public/assets/logo1.png";
import { Twirl as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetClose } from "../../components/ui/sheet";
import { X } from "lucide-react";

interface User {
  avatar?: {
    url: string;
  };
  user?: {
    avatar?: {
      url: string;
    };
  };
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const pathname = usePathname();

  const isActiveLink = (href: string) => pathname === href;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/our-approach", label: "Our Approach" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  useEffect(() => {
    // console.log("User Data: ", userData); 
    if (!isLoading) {
      if (!userData) {
        if(data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Welcome back to ELearning!");
        setOpen(false);
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, isLoading, isSuccess, refetch, setOpen, socialAuth, userData]);

  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    setRoute("Login");
    setOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[80] overflow-hidden" style={{ maxWidth: "100vw" }}>
      <div
        className={`h-[80px] border-b transition duration-500 overflow-hidden ${
          active ? "shadow-md py-2 px-4 lg:px-8 bg-white" : "shadow-sm py-2 px-4 lg:px-12 bg-white"
        }`}
      >
        <div className="w-full max-w-[1200px] h-full flex items-center justify-between overflow-hidden">
          <Link href={"/"} className="text-[25px] font-Poppins font-[500] text-black">
            <Image src={logo || "/placeholder.svg"} alt="Logo" width={75} height={140} priority />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden 800px:flex items-center gap-6 font-semibold text-gray-700">
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
          </nav>

          <div className="flex items-center">
            {/* Mobile hamburger menu */}
            <div className="800px:hidden z-10 w-[40px] h-[40px] flex items-center justify-center">
              <Hamburger toggled={openSidebar} toggle={setOpenSidebar} size={20} color="#000000" duration={0.2} />
            </div>

            {/* User profile icon - desktop */}
            <div className="hidden 800px:block">
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={userData?.user?.avatar ? userData?.user?.avatar.url : avatarDefault}
                    alt="Profile Photo"
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    style={{ border: activeItem === 5 ? "2px solid cyan" : "none" }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle className="cursor-pointer text-black" size={30} onClick={handleProfileClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetContent
          side="right"
          className="w-[280px] sm:w-[350px] h-full bg-white pt-16 mt-10 overflow-hidden text-gray-800"
          style={{ maxWidth: "100vw" }}
        >
          <SheetClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
          <nav
            className="flex flex-col gap-6 px-2 h-full overflow-y-auto overflow-x-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              nav::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-base font-semibold py-3 ${isActiveLink(link.href) ? "text-main" : ""}`}
                onClick={() => setOpenSidebar(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* User profile in mobile menu */}
            <div className="mt-8 pt-2 border-t border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 w-full overflow-hidden">
                {userData ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 w-full"
                    onClick={() => setOpenSidebar(false)}
                  >
                    <div className="min-w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <Image
                        src={userData?.user?.avatar?.url || avatarDefault}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full overflow-hidden mr-6">
                      <p className="text-sm text-gray-500 truncate">Access your account</p>
                    </div>
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-3 w-full"
                    onClick={() => {
                      setRoute("Login");
                      setOpen(true);
                      setOpenSidebar(false);
                    }}
                  >
                    <div className="min-w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <HiOutlineUserCircle className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="w-full overflow-hidden mr-6">
                      <p className="text-sm text-gray-500 truncate">Access your account</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

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
      {route === "Forget" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={ForgetPassword}
        />
      )}
      {route === "Forgetpasswordotp" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Forgetpasswordotp}
        />
      )}
    </header>
  );
};

export default Header;