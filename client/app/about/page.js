"use client";

import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";
import React from "react";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { FaLightbulb, FaUsers, FaCogs } from "react-icons/fa";
import DotPattern from "@/components/ui/dot-pattern";
import TeamProfiles from "../../components/AboutUs/teamprofiles.jsx"
import aboutBanner from "../../public/assets/about-banner.png";

const AboutPage = () => {
  return (
    <MainLayout>
      <HeroBanner
        title="About Us"
        subtitle="Who We Are"
        backgroundImage= {aboutBanner}
      />

      <section className="py-8 md:py-16 bg-gray-50 relative overflow-hidden">
        <Fade triggerOnce direction="up" duration={800} cascade damping={0.2}>
          <header className="mb-8 md:mb-12 w-full max-w-[90%] md:max-w-[90%] lg:max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-main text-center">About Us</h1>
            <div className="w-full text-gray-600 leading-relaxed space-y-4 text-left">
              <p className="text-base md:text-lg">
                Horizon Impact Fund Managers is a Southern Africa-focused impact investment firm dedicated to driving
                sustainable development and inclusive economic growth. We bridge the financing gap in high-impact industries,
                unlocking capital for sustainable agriculture, hydrocarbons, the green economy, basic needs (housing, water,
                sanitation, healthcare, and education), sports & the creative industry, and fintech & digital infrastructure.
              </p>

              <p className="text-base md:text-lg">
                With a target fund size of USD 10–50 million and an investment horizon of 7–10 years, we provide innovative
                financing solutions that generate measurable social and environmental impact while delivering competitive
                financial returns. By focusing on micro, small, and medium-sized enterprises (MSMEs) across Namibia and
                Southern Africa, we aim to catalyze job creation, climate resilience, and economic transformation in
                underserved markets.
              </p>

              <p className="text-base md:text-lg">
                Our investment approach combines financial expertise, strategic partnerships, and responsible capital
                allocation to drive long-term value and sustainable impact. Horizon Impact Fund Managers is committed to
                reshaping Africa's investment landscape—one transformative investment at a time.
              </p>
            </div>
          </header>
        </Fade>
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/assets/mission-bg.jpg')" }}
        ></div>
      </section>



      <section className="py-16 bg-main">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <Fade triggerOnce direction="up" cascade damping={0.3}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src={"/assets/whiteEnergy.png"}
                  alt="Bullet"
                  width={1000}
                  height={1000}
                  className="w-6 mb-6 object-contain"
                />
                <h2 className="text-3xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed">
                  To bridge the gap between social impact and economic growth by providing innovative, blended financing solutions that empower sustainable enterprises, underserved industries, and high-growth sectors across Namibia and Southern Africa. Through strategic investments in agriculture, energy, fintech, basic needs, sports, and the creative industry, we drive inclusive prosperity, climate resilience, and long-term economic transformation while delivering competitive financial returns.
                </p>
              </div>
              <figure className="imageSHineEffect">
                <Image
                  src="/assets/mission.jpg"
                  alt="Our Mission"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-md object-cover w-full"
                />
              </figure>
            </div>
          </Fade>
        </div>
      </section>

      <section className="py-16 bg-gray-50 relative">
        <Fade triggerOnce direction="up" cascade damping={0.3}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <figure className="imageSHineEffect">
                <Image
                  src="/assets/about-2.jpg"
                  alt="Our Vision"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-md object-cover w-full"
                />
              </figure>
              <div>
                <Image
                  src={"/assets/energy.png"}
                  alt="Bullet"
                  width={1000}
                  height={1000}
                  className="w-6 mb-6 object-contain"
                />
                <h2 className="text-3xl font-bold text-main mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be Southern Africa&apos;s leading impact investment firm, pioneering financial solutions that unlock capital for transformative industries, foster entrepreneurship, and create sustainable livelihoods. By bridging social impact and economic progress, we aim to reshape the region&apos;s investment landscape, ensuring equitable growth and lasting change.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>
      <TeamProfiles></TeamProfiles>
      <div className="relative">
        <DotPattern className="absolute inset-0 opacity-50 z-0" />
        <section className="py-16 bg-gradient-to-b from-gray-200 to-gray-300">
          <Fade triggerOnce direction="up" cascade damping={0.3}>
            <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
              <h2 className="text-3xl font-bold text-main mb-6">
                Global Standards
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                All our investment strategies are designed and implemented in
                compliance with global standards, ensuring transparency,
                accountability, and measurable impact.
              </p>
            </div>
          </Fade>
        </section>
      </div>

      <section className="py-16 bg-white relative overflow-hidden">
        <Fade triggerOnce direction="up" cascade damping={0.3}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl font-bold text-main mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-main text-5xl mb-4 flex justify-center">
                  <FaLightbulb />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We leverage cutting-edge financial tools and technologies to
                  create innovative solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="text-main text-5xl mb-4 flex justify-center">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-600 leading-relaxed">
                  We work closely with our clients, partners, and stakeholders
                  to achieve shared goals.
                </p>
              </div>
              <div className="text-center">
                <div className="text-main text-5xl mb-4 flex justify-center">
                  <FaCogs />
                </div>
                <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                <p className="text-gray-600 leading-relaxed">
                  We deliver efficient and tailored financial solutions to meet
                  our clients&apos; needs.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </MainLayout>
  );
};

export default AboutPage;