/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Customizer from "./components/Customizer";
import NFCSimulator from "./components/NFCSimulator";
import LostPortal from "./components/LostPortal";
import Catalog from "./components/Catalog";
import OceanGuide from "./components/OceanGuide";
import ScannedTagModal from "./components/ScannedTagModal";
import { CartItem, SeashellConfig } from "./types";
import { Shell, Compass, HelpCircle, Heart, Anchor, ShieldCheck } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerToSimulatorConfig, setCustomizerToSimulatorConfig] = useState<SeashellConfig | null>(null);
  const [activeScannedTag, setActiveScannedTag] = useState<string | null>(null);

  // Check URL query parameters for physical NFC scan trigger (e.g. ?tag=SHELL-4820-TIDAL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagId = params.get("tag") || params.get("id");
    if (tagId) {
      setActiveScannedTag(tagId);
    }
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add customized item from Customizer into the shopping cart
  const handleAddCustomToCart = (config: SeashellConfig, price: number) => {
    const customId = `custom-shell-${Date.now()}`;
    const name = `Bespoke NFC ${config.shellType.toUpperCase()} Keychain`;
    
    const newCartItem: CartItem = {
      id: customId,
      name,
      price,
      config,
      imageUrl: getProductImage(config.shellType),
      quantity: 1,
    };

    setCart((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const getProductImage = (shellType: string) => {
    switch (shellType) {
      case "conch":
        return "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80";
      case "cowrie":
        return "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80";
      default:
        return "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80";
    }
  };

  // Move the customizer configuration instantly to the active simulator!
  const handleLoadToSimulator = (config: SeashellConfig) => {
    setCustomizerToSimulatorConfig(config);
    scrollToSection("simulator-section");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-teal-950 selection:bg-teal-100 selection:text-teal-900 flex flex-col justify-between" id="app-root-layout">
      
      {/* 1. Header (Navbar) */}
      <Header 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
        scrollToSection={scrollToSection} 
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        
        {/* 2. Hero Banner */}
        <Hero scrollToSection={scrollToSection} />

        {/* 3. Features Specifications */}
        <Features />

        {/* 4. Seashell Customizer Studio */}
        <Customizer 
          onAddCustomToCart={handleAddCustomToCart} 
          onLoadToSimulator={handleLoadToSimulator} 
        />

        {/* 5. Smartphone NFC Scanner Simulator */}
        <NFCSimulator initialConfig={customizerToSimulatorConfig} />

        {/* 6. Lost & Found Public Search Portal */}
        <LostPortal />

        {/* 7. Catalog (Shop & Preorders) */}
        <Catalog 
          cart={cart} 
          setCart={setCart} 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen} 
          scrollToSection={scrollToSection} 
        />

      </main>

      {/* 8. AI Support Floating Chatbot */}
      <OceanGuide />

      {/* 9. Footer with beautiful soft ocean styling */}
      <footer className="bg-slate-900 text-teal-100 border-t border-teal-900 py-16 px-6 font-sans" id="website-footer">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-4 border-b border-teal-800/40 pb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shell className="h-6 w-6 text-teal-400 animate-pulse" />
              <span className="font-sans text-lg font-bold tracking-tight text-white">Oceanic NFC</span>
            </div>
            <p className="text-xs text-teal-300/70 leading-relaxed">
              We gather beautiful natural seashell treasures from the world's most pristine shores, handcrafting them with high-durability modern micro-NFC tech. Helping find lost items without losing beach beauty.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-teal-400 uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Sustainably Gathered</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">The Studio</h4>
            <ul className="space-y-2 text-xs text-teal-300/80">
              <li><button onClick={() => scrollToSection("features-section")} className="hover:text-white transition-colors cursor-pointer">Science & Tech</button></li>
              <li><button onClick={() => scrollToSection("customizer-section")} className="hover:text-white transition-colors cursor-pointer">Ocean Configurator</button></li>
              <li><button onClick={() => scrollToSection("catalog-section")} className="hover:text-white transition-colors cursor-pointer">Premium Catalog</button></li>
              <li><button onClick={() => scrollToSection("simulator-section")} className="hover:text-white transition-colors cursor-pointer">Scanner Demo</button></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">Rescue Hub</h4>
            <ul className="space-y-2 text-xs text-teal-300/80">
              <li><button onClick={() => scrollToSection("lost-portal-section")} className="hover:text-white transition-colors cursor-pointer">Public Finder Lookup</button></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection("features-section"); }} className="hover:text-white transition-colors">Privacy Shield</a></li>
              <li><a href="#compatibility" onClick={(e) => { e.preventDefault(); scrollToSection("features-section"); }} className="hover:text-white transition-colors">Smartphone Support</a></li>
              <li><a href="#sustainability" onClick={(e) => { e.preventDefault(); scrollToSection("features-section"); }} className="hover:text-white transition-colors">Coastal Conservation</a></li>
            </ul>
          </div>

          {/* Environmental Statement */}
          <div className="space-y-3.5 bg-teal-950/40 border border-teal-800/40 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wide">
              <Compass className="h-4 w-4 text-teal-400" />
              <span>Marine Pledge</span>
            </div>
            <p className="text-[11px] text-teal-300/70 leading-relaxed">
              We pledge 1% of all keychains and jewelry accessories sales to marine coral reef restorations and ocean cleanup organizations worldwide. Help clear the beaches!
            </p>
          </div>

        </div>

        {/* Legal and credits */}
        <div className="mx-auto max-w-7xl pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-teal-300/50 font-normal">
          <p>© {new Date().getFullYear()} Oceanic NFC Inc. All beachcombing rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
            <span>along the sunset shores</span>
          </p>
        </div>
      </footer>

      {/* 10. Physical NFC Tap Event Modal Overlay */}
      {activeScannedTag && (
        <ScannedTagModal 
          tagId={activeScannedTag} 
          onClose={() => {
            setActiveScannedTag(null);
            // Clean URL parameters cleanly so they don't block subsequent flows
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: cleanUrl }, "", cleanUrl);
          }} 
        />
      )}

    </div>
  );
}
