import { Shield, TrendingUp, Clock } from "lucide-react";

export const features = [
  {
    icon: <Shield className="w-8 h-8 text-main group-hover:text-white" />,
    title: "Robust Risk Management",
    description:
      "Our investment strategies are built on robust risk management, ensuring the safety and security of your portfolio.",
    benefits: [
      "Diversified investments",
      "Risk assessment tools",
      "Secure asset allocation",
    ],
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-main group-hover:text-white" />,
    title: "High Growth Potential",
    description:
      "We focus on high-growth opportunities across diverse sectors, delivering superior returns for our clients.",
    benefits: [
      "Youth and women led investments",
      "Venture capital opportunities",
      "Real estate growth",
    ],
  },
  {
    icon: <Clock className="w-8 h-8 text-main group-hover:text-white" />,
    title: "Long-Term Value Creation",
    description:
      "Our strategies are designed to create sustainable, long-term value, ensuring financial security and growth for the future.",
    benefits: [
      "Sustainable investments",
      "Portfolio diversification",
      "Long-term planning",
    ],
  },
];