"use client";

import Link from "next/link";
import { FC } from "react";
import Loader from "../Loader/Loader";

const Header: FC = () => {
  return (
    <>
      <Loader />
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
