"use client";
import Link from "next/link";
import { FC } from "react";
import Loader from "../Loader/Loader";

type Props = {
  isLoading: boolean; // Define isLoading as a required prop
};

const Header: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {/* Render loader while data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : (
        <h2> there is a hero content  for the header</h2>
      )}
    </>
  );
};

export default Header;
