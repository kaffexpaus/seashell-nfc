/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shell, Radio, ShoppingCart } from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ cart, setIsCartOpen, scrollToSection }: HeaderProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full" id="header-container">
      {/* Wave alert / announcement bar */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-600 px-4 py-1.5 text-center text-xs font-medium text-white shadow-sm flex items-center justify-center gap-2">
        <Radio className="h-3 w-3 animate-pulse text-teal-100" />
        <span>Summer Wave Drop: All NFC seashell accessories now ship with custom marine-grade engraving!</span>
      </div>

      {/* Main glass-navbar */}
      <div className="border-b border-teal-100/40 bg-white/85 py-3.5 px-6 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero-section")} 
            className="flex items-center gap-2.5 group cursor-pointer transition-transform hover:scale-[1.02]"
            id="logo-button"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-teal-50 to-sky-100 text-teal-600 shadow-inner group-hover:from-teal-100 group-hover:to-sky-200">
              <Shell className="h-5.5 w-5.5 transition-transform duration-500 group-hover:rotate-12 text-teal-600" />
              <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal-500 text-[8px] font-bold text-white ring-2 ring-white">
                NFC
              </div>
            </div>
            <div className="text-left">
              <span className="block font-sans text-lg font-semibold tracking-tight text-teal-950">Oceanic NFC</span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-teal-600 font-medium">Smart Seashells</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-teal-950/80">
            <button 
              onClick={() => scrollToSection("features-section")} 
              className="hover:text-teal-600 cursor-pointer transition-colors"
              id="nav-features"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("customizer-section")} 
              className="hover:text-teal-600 cursor-pointer transition-colors"
              id="nav-customizer"
            >
              Configurator
            </button>
            <button 
              onClick={() => scrollToSection("simulator-section")} 
              className="hover:text-teal-600 cursor-pointer transition-colors flex items-center gap-1"
              id="nav-simulator"
            >
              <span>NFC Demo</span>
              <span className="rounded-full bg-sky-100 px-1.5 py-0.2 text-[9px] text-sky-700 font-bold uppercase animate-pulse">Test</span>
            </button>
            <button 
              onClick={() => scrollToSection("lost-portal-section")} 
              className="hover:text-teal-600 cursor-pointer transition-colors"
              id="nav-portal"
            >
              Search Portal
            </button>
            <button 
              onClick={() => scrollToSection("catalog-section")} 
              className="hover:text-teal-600 cursor-pointer transition-colors"
              id="nav-catalog"
            >
              Seashell Shop
            </button>
          </nav>

          {/* Right side Actions */}
          <div className="flex items-center gap-4">
            {/* Direct simulator shortcut button */}
            <button
              onClick={() => scrollToSection("simulator-section")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50/50 hover:bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-800 transition-all cursor-pointer"
              id="header-try-simulator"
            >
              <Radio className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
              <span>Interactive NFC Scan</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-teal-100 bg-teal-50/30 hover:bg-teal-50 text-teal-900 transition-colors cursor-pointer"
              aria-label="Open Shopping Cart"
              id="cart-trigger-button"
            >
              <ShoppingCart className="h-5 w-5 text-teal-900" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white animate-bounce shadow-md">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
