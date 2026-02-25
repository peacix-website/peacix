import React from "react";
import {
  Heart,
  Shield,
  Lock,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Find Expert", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Experts", href: "/counselors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ];

  const trustIndicators = [
    { icon: Shield, text: "Licensed Professionals" },
    { icon: Lock, text: "100% Confidential" },
    { icon: Award, text: "RCI Registered" },
    { icon: FileText, text: "HIPAA Compliant" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@peacix.com" },
    { icon: Phone, text: "+91 8851158960" },
    { icon: MapPin, text: "Ghaziabad, UP, India" },
    { icon: Clock, text: "Mon-Sat: 9AM - 9PM" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#facebook", label: "Facebook" },
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Instagram, href: "#instagram", label: "Instagram" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-primary/10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-7 h-7 text-primary" />
              <span className="text-2xl font-semibold text-foreground">
                Peacix
              </span>
            </div>

            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              A mental healthcare ecosystem for the way we live, feel, and connect.
              We support your emotional well-being with compassion and care.
            </p>

            <div className="flex flex-wrap gap-4">
              {trustIndicators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contact
            </h3>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <item.icon className="w-4 h-4 text-primary mt-1" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Peacix. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full bg-secondary/20 hover:bg-primary/20 transition"
              >
                <social.icon className="w-5 h-5 text-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;