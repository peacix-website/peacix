import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import { megaMenuData } from "@/data/megaMenuData";
import { supabase } from "@/lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

const Header = ({ session }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const dropdownMenus = [
    "experts",
    "clinics",
    "services",
    "conditions",
    "resources",
  ];

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const handleSignIn = () => {
    window.location.href = "/auth";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-[1000] bg-background border-b border-border backdrop-blur"
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-16">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-8 h-full">

              {/* LOGO */}
              <Link to="/" className="flex flex-col leading-[1.1] select-none">
                <span className="text-2xl md:text-3xl font-extrabold tracking-wider text-primary">
                  PEACIX
                </span>
                <span className="text-[11px] md:text-xs text-secondary">
                  Less Noise.{" "}
                  <span className="font-semibold text-primary">
                    More You
                  </span>
                </span>
              </Link>

              {/* DESKTOP MENU */}
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

              {/* Phone */}
              <a
                href="tel:+918510055849"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 transition"
              >
                <Phone className="w-5 h-5 text-primary" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918510055849"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/30 hover:bg-accent/50 transition"
              >
                <FaWhatsapp className="w-5 h-5 text-foreground" />
              </a>

              {/* AUTH */}
              {session ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    {session.user?.user_metadata?.avatar_url ? (
                      <img
                        src={session.user.user_metadata.avatar_url}
                        alt="profile"
                        className="w-11 h-11 rounded-full border border-border"
                      />
                    ) : (
                      <div className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 transition">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </Link>

                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={handleSignIn} size="lg">
                  Sign In
                </Button>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden ml-auto text-foreground"
            >
              <Menu />
            </button>

          </div>
        </nav>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-[999]"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-background z-[1000] shadow-xl flex flex-col"
            >

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <span className="font-semibold text-lg">Menu</span>

                <button onClick={() => setMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>

              {/* MENU ITEMS */}
              <div className="flex flex-col gap-6 p-6 text-lg">

                {dropdownMenus.map((menu) => (
                  <Link
                    key={menu}
                    to={`/${menu}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="capitalize font-medium hover:text-primary"
                  >
                    {menu}
                  </Link>
                ))}

                <div className="border-t border-border pt-6 flex flex-col gap-5">

                  <a
                    href="tel:+918510055849"
                    className="flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    Call Us
                  </a>

                  <a
                    href="https://wa.me/918510055849"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <FaWhatsapp className="w-5 h-5 text-primary" />
                    WhatsApp
                  </a>

                  {session ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <Button variant="outline" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleSignIn}>
                      Sign In
                    </Button>
                  )}

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;