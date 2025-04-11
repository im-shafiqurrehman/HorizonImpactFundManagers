"use client";

import { FC, useState } from "react";
import Header from "./components/Header";
import Headings from "./utlis/Heading";
import AboutUs from "@/components/Home/About";
import Slider from "@/components/Home/AnimatedHero";
import KeyFeaturesAndBenefits from "@/components/Home/Benifits";
import Services from "@/components/Home/Services";
import { Sponser } from "@/components/Home/Sponsers";
import TargetedMarkets from "@/components/Home/TargetedMarkets";
import { Testimonial } from "@/components/Home/Testimonial";
import FAQSection from "@/components/Home/faqs";
import MainLayout from "@/components/Layout/MainLayout";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
       <MainLayout>
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
     <Slider />
        <AboutUs />
        <TargetedMarkets />
        {/* <ProductShowcase slice={true} /> */}
        <Services />
        {/* <Projects /> */}
        <KeyFeaturesAndBenefits />
        {/* <Sponser /> */}
        {/* <Testimonial/> */}
        { /* <FAQSection/> */ } 
     </MainLayout>
    </div>
  );
};

export default Page;
