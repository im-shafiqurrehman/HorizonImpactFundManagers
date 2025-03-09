import React from "react";
import { CheckCircle } from "lucide-react";
import ScrollReveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { features } from "../../components/constants/benefits";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const qualities = [
  "Trustworthy",
  "Strategic",
  "Innovative",
  "Sustainable",
  "Transparent",
  "Client-Focused",
];

const KeyFeaturesAndBenefits = () => {
  return (
    <section className="py-16 bg-gray-100 mb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <ScrollReveal keyframes={fadeUp} duration={500} triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-main mb-4">
              Key Features & Benefits
            </h2>
            <p className="text-lg text-gray-600">
              Explore the features that make our products stand out.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              keyframes={fadeUp}
              duration={500}
              delay={index * 200}
              triggerOnce
              key={index}
            >
              <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:bg-main hover:text-white group">
                <div className="flex items-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 group-hover:text-white" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal keyframes={fadeUp} duration={500} delay={600} triggerOnce>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-main mb-6">
              Why Industry Leaders Choose Us
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "Reliable",
                "Efficient",
                "Safe",
                "Durable",
                "Compliant",
                "Innovative",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-full text-main font-semibold shadow-md hover:bg-main hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default KeyFeaturesAndBenefits;
