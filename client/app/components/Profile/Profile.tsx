import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SidebarProfile from "./SidebarProfile";


type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setLogout(true);
    await signOut({ redirect: false });
    localStorage.clear(); // Clear storage if session data is stored locally
    window.location.href = "/"; // Manual redirection to the homepage
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-auto min-h-[450px] bg-white bg-opacity-90 border border-[#248bac]/20 rounded-lg shadow-md mt-20 mb-20 sticky ${
          scroll ? "top-[120px]" : "top-8"
        } left-8 transition-all duration-300`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          logoutHandler={logoutHandler}
          avatar={avatar}
        />
      </div>
      <div className="w-full h-full bg-transparent mt-20 pl-6">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
        {active === 2 && <ChangePassword />}
      </div>
    </div>
  );
};

export default Profile;