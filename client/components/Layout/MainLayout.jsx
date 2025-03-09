import Header from "@/app/components/Header";
import ContactSection from "../Home/Contact";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <ContactSection />
      <Footer />
    </>
  );
};

export default MainLayout;
