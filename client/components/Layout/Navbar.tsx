import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavbarProps {
  activeItem: number;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem, isMobile }) => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActiveLink = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-none ${
        isScrolled ? "py-3" : "py-3"
      } ${isLoaded ? "animate-navbar" : "opacity-0"}`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Navigation Links */}
          <div className="hidden lg:flex md:items-center gap-6 font-semibold text-gray-700">
            <Link
              href="/"
              className={`relative group ${
                isActiveLink("/") ? "text-main" : ""
              }`}
            >
              Home
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
            <Link
              href="/investments"
              className={`relative group ${
                isActiveLink("/investments") ? "text-main" : ""
              }`}
            >
              Investments
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/investments") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
            <Link
              href="/services"
              className={`relative group ${
                isActiveLink("/services") ? "text-main" : ""
              }`}
            >
              Services
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/services") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
            <Link
              href="/portfolio"
              className={`relative group ${
                isActiveLink("/portfolio") ? "text-main" : ""
              }`}
            >
              Portfolio
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/portfolio") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
            <Link
              href="/about"
              className={`relative group ${
                isActiveLink("/about") ? "text-main" : ""
              }`}
            >
              About Us
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/about") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
            <Link
              href="/contact"
              className={`relative group ${
                isActiveLink("/contact") ? "text-main" : ""
              }`}
            >
              Contact Us
              <span
                className={`absolute left-0 -bottom-1 h-1 rounded-md bg-main block w-0 group-hover:w-3/4 transition-all duration-300 ${
                  isActiveLink("/contact") ? "w-3/4" : ""
                }`}
              ></span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] min-h-screen overflow-y-auto no-scrollbar text-gray-800"
              >
                <nav className="flex flex-col mt-6 gap-2">
                  <Link
                    href="/"
                    className={`block text-base font-semibold ${
                      isActiveLink("/") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                  <Link
                    href="/investments"
                    className={`block text-base font-semibold ${
                      isActiveLink("/investments") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Investments
                  </Link>
                  <Link
                    href="/services"
                    className={`block text-base font-semibold ${
                      isActiveLink("/services") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Services
                  </Link>
                  <Link
                    href="/portfolio"
                    className={`block text-base font-semibold ${
                      isActiveLink("/portfolio") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/about"
                    className={`block text-base font-semibold ${
                      isActiveLink("/about") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className={`block text-base font-semibold ${
                      isActiveLink("/contact") ? "text-main" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Contact Us
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;