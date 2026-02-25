import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import { megaMenuData } from "@/data/megaMenuData";
import { supabase } from "@/lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const dropdownMenus = [
    "experts",
    "clinics",
    "services",
    "conditions",
    "resources",
  ];

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-[1000] bg-background border-b border-border backdrop-blur"
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-12">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Peacix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {dropdownMenus.map((menu) => (
                <div
                  key={menu}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(menu)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="capitalize font-medium text-foreground hover:text-primary transition">
                    {menu}
                  </button>

                  <AnimatePresence>
                    {activeMenu === menu && megaMenuData[menu] && (
                      <MegaMenu
                        items={megaMenuData[menu].items}
                        rightCard={megaMenuData[menu].rightCard}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto hidden md:flex items-center gap-6">

            {/* Call Button */}
            <a
              href="tel:+911234567890"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 transition"
            >
              <Phone className="w-5 h-5 text-primary" />
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/30 hover:bg-accent/50 transition"
            >
              <FaWhatsapp className="w-5 h-5 text-foreground" />
            </a>

            {/* Sign In */}
            <Button
              onClick={handleSignIn}
              size="lg"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-auto text-foreground"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;