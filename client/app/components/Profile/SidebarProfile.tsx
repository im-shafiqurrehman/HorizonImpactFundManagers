"use client"

import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import avatarDefault from "../../../public/assets/Profile.png"

type Props = {
  user: any
  active: number
  setActive: (active: number) => void
  avatar: string | null
  logoutHandler: any
}

const SidebarProfile: FC<Props> = ({ user, setActive, active, avatar, logoutHandler }) => {
  return (
    <div className="w-full z-30">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#248bac]/5 transition-all duration-300`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
          alt="Profile Photo"
          width={20}
          height={20}
          className="w-6 h-6 800px:w-8 800px:h-8 cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#545454]">{user.name}</h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#248bac]/5 transition-all duration-300`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-[#545454]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#545454]">Change Password</h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          } hover:bg-[#248bac]/5 transition-all duration-300`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-[#545454]" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#545454]">Admin Dashboard</h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-red-50 transition-all duration-300`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-[#e9844c]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#e9844c]">Logout</h5>
      </div>
    </div>
  )
}

export default SidebarProfile
