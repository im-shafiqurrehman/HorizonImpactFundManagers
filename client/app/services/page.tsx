import React from "react";
import Services from "@/components/Home/Services";
import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";

const page = () => {
  return (
    <MainLayout>
      <HeroBanner
        title={"Our Services"}
        subtitle={"Services"}
        backgroundImage={"/assets/banner-1.png"}
      />
      <div>
        <Services />
      </div>
    </MainLayout>
  );
};

export default page;