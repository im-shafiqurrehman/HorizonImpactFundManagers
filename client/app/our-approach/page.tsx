import React from "react";
import Services from "@/components/Home/Services";
import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";
import WhatWeDo from "../../components/our-approach/what-we-do";
import SectorExpertise from "../../components/our-approach/sector-expertise";
import InvestmentFocus from "../../components/our-approach/investment-focus";
import approachBanner from "../../public/assets/our-approach-banner.png"

const page = () => {
  return (
    <MainLayout>
      <HeroBanner
         title="OUR APPROACH"
        subtitle="Approach"
        backgroundImage={approachBanner}
      />
    <WhatWeDo />
      {/* <SectorExpertise /> */}
      {/* <InvestmentFocus /> */}
    </MainLayout>
  );
};

export default page;