import React from "react";
import Services from "@/components/Home/Services";
import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";

const page = () => {
  return (
    <MainLayout>
      <HeroBanner
         title={"Value-added partnerships"}
        subtitle={"Approach"}
        backgroundImage={"/assets/banner-1.png"}
      />
    <div className="m-10 text-black"> page content here </div>
    </MainLayout>
  );
};

export default page;