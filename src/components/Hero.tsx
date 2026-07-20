/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowRight, Radio, Compass, Anchor, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // Use our beautifully generated product photo
  const heroImageSrc = "/src/assets/images/seashell_keychain_hero_1784524799310.jpg";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-sky-50/50 to-white py-16 lg:py-24" id="hero-section">
      {/* Abstract decorative floating sea shapes */}
      <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/60 px-3 py-1 text-xs font-semibold text-teal-800 backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 animate-spin-slow text-teal-600" />
              <span>100% Genuine Hand-Harvested Shells</span>
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-teal-950 leading-tight">
              Secure your lost essentials <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                with the whispers of the ocean.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-teal-900/80 max-w-xl leading-relaxed">
              Meet the first-ever high-luxury accessory embedded with battery-free, waterproof NFC microchips. Attach authentic seashore shells to your keys, bags, or pets, and let kind finders tap to instantly return them home.
            </p>

            {/* Quick feature badges in hero */}
            <div className="grid grid-cols-3 gap-4 py-2 max-w-lg">
              <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 border border-teal-100/40 shadow-xs backdrop-blur-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Anchor className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-teal-950">Waterproof</span>
                  <span className="block text-[10px] text-teal-600 font-medium">Marine Resin</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 border border-teal-100/40 shadow-xs backdrop-blur-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Radio className="h-4 w-4 text-sky-500" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-teal-950">No Charging</span>
                  <span className="block text-[10px] text-sky-600 font-medium">Zero Battery</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 border border-teal-100/40 shadow-xs backdrop-blur-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-teal-950">Instant Tap</span>
                  <span className="block text-[10px] text-emerald-600 font-medium">Auto-Portal</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("customizer-section")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-configure-button"
              >
                <span>Design Your Shell</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("simulator-section")}
                className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white hover:bg-teal-50 px-6 py-3.5 text-sm font-semibold text-teal-900 transition-all cursor-pointer"
                id="hero-test-button"
              >
                <Radio className="h-4 w-4 text-teal-600 animate-pulse" />
                <span>Test Interactive Simulator</span>
              </button>
            </div>
          </div>

          {/* Hero interactive visual banner (Right side) */}
          <div className="lg:col-span-5 relative" id="hero-graphic-container">
            {/* Animated ocean-breeze shadow wrapper */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-400/20 to-teal-400/20 blur-2xl opacity-75 animate-pulse" />
            
            <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-3 shadow-xl">
              <img
                src={heroImageSrc}
                alt="Oceanic Natural NFC Seashell Keychain Premium Shot"
                className="w-full h-auto rounded-xl object-cover transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay active notification floating badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-teal-100 bg-white/95 p-3.5 shadow-lg backdrop-blur-md flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-inner animate-bounce">
                  <Radio className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-teal-950 truncate">Seashell Scanned Successfully</p>
                  <p className="text-[10px] text-teal-600 font-semibold uppercase tracking-wide">ID: SHELL-4820-TIDAL</p>
                </div>
                <button
                  onClick={() => scrollToSection("simulator-section")}
                  className="rounded-lg bg-teal-50 hover:bg-teal-100 px-2.5 py-1 text-[10px] font-bold text-teal-800 transition-colors"
                >
                  View Portal
                </button>
              </div>
            </div>

            {/* Float tags */}
            <div className="absolute -top-4 right-4 rounded-full bg-white px-3.5 py-1.5 shadow-md border border-teal-50 flex items-center gap-1.5 text-xs text-teal-950 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Pre-assembled & Calibrated</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
