import Link from "next/link";
import Image from "next/image"; 
import { FC } from "react";
import logo from "../../public/assets/logo.png"

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Our-Approach",
    url: "/our-approach",
  },

  {
    name: "Team",
    url: "/team",
  },
  {
    name: "Portfolio",
    url: "/portfolio",
  },
  {
    name: "Contact",
    url: "/contact-us",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="w-full 800px:hidden mt-5">
            <div className="full text-center py-6">
                <Link href="/" passHref>
                <Image src={logo} alt="Logo" width={150} height={50} />
                </Link>
            </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={`${i.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;