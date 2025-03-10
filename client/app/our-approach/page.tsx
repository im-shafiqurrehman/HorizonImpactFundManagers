import React from "react";
import Services from "@/components/Home/Services";
import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";
import WhatWeDo from "../../components/our-approach/what-we-do";
import SectorExpertise from "../../components/our-approach/sector-expertise";
import InvestmentFocus from "../../components/our-approach/investment-focus";

const page = () => {
  return (
    <MainLayout>
      <HeroBanner
         title={"Value-added partnerships"}
        subtitle={"Approach"}
        backgroundImage={"/assets/banner-1.png"}
      />
    <WhatWeDo />
      <SectorExpertise />
      <InvestmentFocus />
    </MainLayout>
  );
};

export default page;