"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatardefault.jpeg";

import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

const Header = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { data } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogOut] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout });

  useEffect(() => {
    if (!isLoading) {
      if (!userData && data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data.user?.image,
        });
        refetch();
      }

      if (error && "data" in error) {
        toast.error(error.data.message);
      }

      if (data === null && isSuccess) {
        toast.success("Login Successfully");
      }

      if (data === null && !isLoading && !userData) {
        setLogOut(true);
      }
    }
  }, [data, isSuccess, isLoading, userData, error, socialAuth, refetch]);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full relative">
      <div className={`${active ? "fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="flex items-center justify-between p-3 h-full">
            <Link href={"/"} className="text-[25px] font-Poppins font-[500] text-black dark:text-white">Elearning</Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              <HiOutlineMenuAlt3 size={25} className="800px:hidden cursor-pointer dark:text-white text-black" onClick={() => setOpenSidebar(true)} />
              {userData ? (
                <Link href="/profile">
                  <Image src={userData?.user.avatar?.url || avatar} alt="User Avatar" width={30} height={30} className="w-[30px] h-[30px] rounded-full cursor-pointer" />
                </Link>
              ) : (
                <HiOutlineUserCircle size={25} className="hidden 800px:block cursor-pointer dark:text-white text-black" onClick={() => setOpen(true)} />
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={route === "Login" ? Login : route === "Sign-Up" ? SignUp : Verification} />
      )}
    </div>
  );
};

export default Header;
