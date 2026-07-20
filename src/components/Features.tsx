/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Battery, Settings, EyeOff, Sparkles, Anchor } from "lucide-react";

export default function Features() {
  const list = [
    {
      icon: Shield,
      title: "Marine-Grade Resin Seal",
      desc: "Our NFC microchips are encased in high-clarity, impact-resistant resin injected directly inside the shell, protecting it fully against salty seawater, drop impacts, and deep ocean pressure.",
      color: "from-teal-500 to-emerald-500",
      bgLight: "bg-teal-50/50"
    },
    {
      icon: Battery,
      title: "Zero Battery. Infinite Life.",
      desc: "Requires absolutely no charging or batteries. The embedded antenna harvests passive radio frequency signals from the finder's scanning phone to transmit its owner profile instantly.",
      color: "from-sky-500 to-blue-500",
      bgLight: "bg-sky-50/50"
    },
    {
      icon: Settings,
      title: "Instantly Re-writable",
      desc: "Need to change your contact details, travel note, or medical status? Simply tap your device with your private security PIN to modify or update your public profile instantly.",
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50/50"
    },
    {
      icon: EyeOff,
      title: "Privacy First & Anonymized",
      desc: "You have complete control. Enable 'Stealth Mode' to let finders send secure, anonymous email alerts with location pins without ever exposing your private phone or email address.",
      color: "from-indigo-500 to-sky-500",
      bgLight: "bg-indigo-50/50"
    },
    {
      icon: Anchor,
      title: "Hand-Picked Authentic Shells",
      desc: "Every single piece is a real, high-quality seashell gathered from responsibly managed beaches. Hand-cleaned, polished, and finished with elegant premium hardware in our coastal studio.",
      color: "from-teal-600 to-cyan-500",
      bgLight: "bg-teal-100/30"
    },
    {
      icon: Sparkles,
      title: "AI Message Assistant",
      desc: "Not sure what contact instructions or stories to write? Our integrated Oceanic AI helper (Gemini) crafts personalized emergency and return scripts tailored to your specific keys or bags.",
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50/50"
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-y border-teal-50" id="features-section">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Modern Tech meets Coastal Soul</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-950">
            A small seashore treasure that keeps your belongings safe
          </h2>
          <p className="text-sm sm:text-base text-teal-900/70">
            Engineered for high durability and absolute simplicity. No applications to install, no passwords to memorize, and no charging blocks required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-2xl border border-teal-100/40 p-6 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${item.bgLight}`}
                id={`feature-card-${idx}`}
              >
                {/* Decorative background sea glow */}
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-teal-100/10 blur-xl transition-all duration-300 group-hover:scale-125" />
                
                {/* Icon block */}
                <div className="mb-4.5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-white to-white shadow-xs group-hover:shadow-sm border border-teal-100/60 transition-transform group-hover:scale-105">
                  <IconComponent className="h-5.5 w-5.5 text-teal-600 group-hover:text-teal-500" />
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-bold text-teal-950 mb-2 group-hover:text-teal-900 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
