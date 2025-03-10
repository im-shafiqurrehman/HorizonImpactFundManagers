import Header from "@/app/components/Header";
import ContactSection from "../Home/Contact";
import Footer from "./Footer";
import ScrollToTop from "../../components/Common/ScrollToTop";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <ContactSection />
      <Footer />
      <ScrollToTop/>
    </>
  );
};

export default MainLayout;
