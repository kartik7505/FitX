"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "Details", href: "#details" },
    { label: "Brand", href: "#brand" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${
        isScrolled ? "bg-canvas/95 backdrop-blur-md border-b border-surface" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-barlow font-bold text-2xl uppercase tracking-wider text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          aria-label="Shakti House"
        >
          SHAKTI HOUSE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href}
                  className="text-sm font-medium text-ivory/80 hover:text-gold transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm px-1 py-0.5"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#enquire"
            className="text-sm font-semibold uppercase tracking-widest text-canvas bg-gold hover:bg-accent px-5 py-2.5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-ivory p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden fixed inset-0 top-20 bg-canvas z-40 px-6 py-8 flex flex-col"
        >
          <nav className="flex flex-col space-y-6 flex-grow">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-barlow font-bold text-ivory hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pb-12">
            <Link
              href="#enquire"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center text-lg font-bold uppercase tracking-widest text-canvas bg-gold py-4 rounded-sm"
            >
              Enquire
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
