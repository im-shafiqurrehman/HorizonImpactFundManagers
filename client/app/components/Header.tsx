"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogoutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import avatar from "../../public/assets/Profile.png";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification";
import CustomModal from "../utlis/CustomModal";
import logo from "../../public/assets/logo1.png";
import Navbar from "../../components/Layout/Navbar"; 
import { Twirl as Hamburger } from "hamburger-react";

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
  const { user } = useSelector((state: any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
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
        toast.success("Welcome back to Horizon Impact Fund Managers!");
        setOpen(false);
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, isLoading, isSuccess, refetch, setOpen, socialAuth, userData]);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      // Close sidebar automatically on larger screens
      if (window.innerWidth >= 800 && openSidebar) {
        setOpenSidebar(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[100px] z-[80] border-b shadow-xl transition duration-500 ${
          active
            ? "shadow-md py-3 px-4 lg:px-8 bg-gradient-to-r from-gray-100 to-white"
            : "shadow py-3 px-4 lg:px-12 bg-gradient-to-r from-gray-100 to-white"
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link href={"/"} className="text-[25px] font-Poppins font-[500] text-black">
                <Image src={logo || "/placeholder.svg"} alt="Logo" width={130} height={20} />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Navbar
                activeItem={activeItem}
                isMobile={false}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                userData={userData}
                setOpen={setOpen}
              />

              {/* Mobile hamburger menu - only visible on mobile */}
              <div className="block 800px:hidden">
                <Hamburger toggled={openSidebar} toggle={setOpenSidebar} size={20} color="#000000" duration={0.3} />
              </div>

              {/* User profile icon - only visible on desktop */}
              <div className="hidden 800px:block">
                {userData ? (
                  <Link href={"/profile"}>
                    <Image
                      src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                      alt="Profile Photo"
                      width={30}
                      height={30}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      style={{ border: activeItem === 5 ? "2px solid cyan" : "none" }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle className="cursor-pointer text-black" size={25} onClick={() => setOpen(true)} />
                )}
              </div>
            </div>
          </div>
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
    </div>
  )
}

export default Header;