"use client"

import Image from "next/image"
import type { FC } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"
import avatarDefault from "../../../public/assets/Profile.png"

interface User {
  name: string
  avatar?: {
    url: string
  }
  role: string
}

type Props = {
  user: User
  active: number
  setActive: (active: number) => void
  avatar: string | null
  logoutHandler: () => void
}

const SidebarProfile: FC<Props> = ({ user, setActive, active, avatar, logoutHandler }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 py-6">
      <div
        className={`w-full flex items-center px-3 py-2 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#e9844c]/5 transition-all duration-300`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar?.url || avatar || avatarDefault}
          alt="Profile Photo"
          width={20}
          height={20}
          className="w-6 h-6 800px:w-7 800px:h-7 cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#545454] text-sm">{user.name}</h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-2 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#e9844c]/5 transition-all duration-300`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={18} className="dark:text-white text-[#545454]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#545454] text-sm">Change Password</h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-2 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-red-50 transition-all duration-300`}
        onClick={logoutHandler}
      >
        <AiOutlineLogout size={18} className="dark:text-white text-[#e9844c]" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-[#e9844c] text-sm">Logout</h5>
      </div>
    </div>
  )
}

export default SidebarProfile

