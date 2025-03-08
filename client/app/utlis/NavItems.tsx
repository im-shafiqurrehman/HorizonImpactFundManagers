import Link from "next/link";
import { FC } from "react";

export const navItemsData = [
  {
    name: "HOME",
    url: "/",
  },
  {
    name: "ABOUT",
    url: "/about",
  },
  {
    name: "OUR APPROACH",
    url: "/courses",
  },

  {
    name: "OUR TEAM",
    url: "/about",
  },
  {
    name: "PORTFOLIO",
    url: "/policy",
  },
  {
    name: "Contact US",
    url: "/faq",
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
                    <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">ELearning</span>
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