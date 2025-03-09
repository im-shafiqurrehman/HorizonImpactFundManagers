"use client";

import { FC, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Headings from "./utlis/Heading";
import Footer from "@/components/Layout/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Headings
        title="Horizon"
        description="Our Investment Company provides strategic financial solutions and expert guidance to help you grow your wealth."
        keywords=""
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
     <Hero isLoading={true} />
     <Footer/>
    </div>
  );
};

export default Page;
