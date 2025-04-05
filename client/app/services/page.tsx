import React from "react";
import Services from "@/components/Home/Services";
import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";
import ServeiesBanner from "../../public/assets/service-banner.png";

const page = () => {
  return (
    <MainLayout>
      <HeroBanner
        title="Our Services"
        subtitle="Services"
        backgroundImage={ServeiesBanner}
      />
      <div>
        <Services />
      </div>
    </MainLayout>
  );
};

export default page;