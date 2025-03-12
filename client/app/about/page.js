"use client";

import HeroBanner from "@/components/HeroBanner";
import MainLayout from "@/components/Layout/MainLayout";
import React from "react";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { FaLightbulb, FaUsers, FaCogs } from "react-icons/fa";
import { Sponser } from "@/components/Home/Sponsers";
import DotPattern from "@/components/ui/dot-pattern";

const AboutPage = () => {
  return (
    <MainLayout>
      <HeroBanner
        title="About Us"
        subtitle="Who We Are"
        backgroundImage="/assets/about-banner.jpg"
      />

      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <Fade triggerOnce direction="up" duration={800} cascade damping={0.2}>
          <header className="text-center mb-12 px-4">
            <h1 className="text-4xl font-extrabold mb-6 text-main">
              About Horizon Impact Fund Managers
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              Horizon Impact Fund Managers is a leading financial services
              company specializing in impact investments. We are committed to
              creating sustainable and impactful financial solutions for our
              clients.
            </p>
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
                  At Horizon Impact Fund Managers, our mission is to deliver
                  innovative financial solutions that drive positive social and
                  environmental impact while generating sustainable returns for
                  our clients.
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
                  We envision a world where financial investments not only
                  generate returns but also contribute to solving global
                  challenges such as climate change, poverty, and inequality.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>

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

      <div className="bg-gray-50">
        <Sponser />
      </div>
    </MainLayout>
  );
};

export default AboutPage;