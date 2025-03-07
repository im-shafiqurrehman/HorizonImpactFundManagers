"use client";

import React from "react";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import Loader from "./components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  if (isLoading) return <Loader />;
  return <>{children}</>;
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} bg-white`}>
        <Providers>
          <SessionProvider>
            <Custom>{children}</Custom>
            <Toaster position="top-center" reverseOrder={false} />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
