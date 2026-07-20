/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Compass, Key, HelpCircle, Mail, Phone, AlertTriangle } from "lucide-react";

export default function LostPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [matchedResult, setMatchedResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  // Mock static shells database for simulator search
  const MOCK_SHELL_REGISTRY = [
    {
      id: "SHELL-4820-TIDAL",
      owner: "Taylor Beachcomber",
      item: "Keys & Car Fob",
      phone: "+1 (555) 321-4820",
      email: "taylor@oceanicnfc.com",
      message: "Ahoy! You found my keys tagged with seashell. This keychain holds deep memories for me. Please use the contact buttons below to help bring it home! Reward offered.",
      isSecured: true,
      registeredOn: "June 14, 2026"
    },
    {
      id: "SHELL-1209-SCALLOP",
      owner: "Jamie Ocean-Heart",
      item: "Gym Bag & Airpods",
      phone: "+1 (555) 723-9182",
      email: "jamie.ocean@sky.com",
      message: "Hello! If found, please notify me. This gym bag has my work gear inside. Thank you so much!",
      isSecured: true,
      registeredOn: "July 01, 2026"
    },
    {
      id: "SHELL-9944-COWRIE",
      owner: "Alex Coastal",
      item: "Pet Dog (Scout)",
      phone: "+1 (555) 601-3829",
      email: "alex.coastal@gmail.com",
      message: "Scout is our playful golden retriever retriever! He has a shell tag on his collar. Please contact us immediately if Scout is wander-walking alone! Thank you!",
      isSecured: true,
      registeredOn: "May 28, 2026"
    }
  ];

  const handleRegistrySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setMatchedResult(null);
    setSearched(false);

    // Simulate database lookup
    setTimeout(() => {
      const match = MOCK_SHELL_REGISTRY.find(
        s => s.id.toLowerCase() === searchQuery.trim().toLowerCase()
      );
      setMatchedResult(match || null);
      setSearched(true);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-teal-100/30" id="lost-portal-section">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Oceanic Recovery Grid</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-950">
            Lost & Found Public Lookup Portal
          </h2>
          <p className="text-sm text-teal-900/70">
            No NFC phone? No problem. Finders can type in the laser-engraved Seashell ID code on the back of any accessory to fetch the owner's active profile and dispatch recovery alerts.
          </p>
        </div>

        {/* Central Search block */}
        <div className="mx-auto max-w-3xl space-y-8">
          
          <form onSubmit={handleRegistrySearch} className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-teal-400" />
              <input
                type="text"
                placeholder="Type Engraved Seashell ID (e.g. SHELL-4820-TIDAL)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                className="w-full text-xs sm:text-sm pl-12 pr-4 py-3.5 rounded-full border border-teal-200 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 font-mono bg-teal-50/10 placeholder-teal-300"
                id="portal-search-input"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="rounded-full bg-teal-600 hover:bg-teal-700 px-7 py-3.5 text-xs sm:text-sm font-bold text-white transition-all disabled:opacity-50 cursor-pointer shadow-md"
              id="portal-search-submit"
            >
              {isSearching ? "Searching Sea..." : "Search Registry"}
            </button>
          </form>

          {/* Quick instructions / tip indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-teal-700 font-medium">
            <div className="flex items-center gap-1.5">
              <Key className="h-4 w-4 text-teal-500" />
              <span>Try: <code className="bg-teal-50 px-1.5 py-0.5 rounded-md text-teal-900">SHELL-4820-TIDAL</code></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Key className="h-4 w-4 text-teal-500" />
              <span>Try: <code className="bg-teal-50 px-1.5 py-0.5 rounded-md text-teal-900">SHELL-9944-COWRIE</code></span>
            </div>
          </div>

          {/* Search results rendering */}
          {isSearching && (
            <div className="text-center py-8 space-y-3" id="portal-search-loading">
              <Compass className="h-10 w-10 text-teal-600 animate-spin mx-auto" />
              <p className="text-xs text-teal-600 font-mono uppercase tracking-widest animate-pulse">Sifting coastal databases...</p>
            </div>
          )}

          {searched && matchedResult && (
            <div className="rounded-3xl border border-teal-100 bg-teal-50/20 p-6 sm:p-8 shadow-xl animate-fade-in relative overflow-hidden" id="portal-search-success">
              
              {/* Sandy glow backdrop */}
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
              
              <div className="grid gap-6 md:grid-cols-12 md:items-start relative">
                
                {/* Visual Shell Icon/Badge */}
                <div className="md:col-span-3 flex flex-col items-center text-center space-y-2.5">
                  <div className="relative h-20 w-20 rounded-2xl bg-white border border-teal-100 flex items-center justify-center text-3xl shadow-inner shadow-teal-50/50">
                    🐚
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">✓</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 font-mono block">SECURED CHIP</span>
                    <span className="text-xs font-bold text-teal-950 font-mono">{matchedResult.id}</span>
                  </div>
                </div>

                {/* Main Information */}
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 font-mono">Matched Owner Card</span>
                    <h4 className="text-lg font-extrabold text-teal-950 mt-0.5">
                      {matchedResult.owner} <span className="text-xs text-teal-600/70 font-sans font-medium">({matchedResult.item})</span>
                    </h4>
                  </div>

                  <blockquote className="bg-white/80 border border-teal-100/50 p-4 rounded-2xl text-xs sm:text-sm text-teal-950 italic leading-relaxed">
                    "{matchedResult.message}"
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                    <span className="text-teal-950/60 font-medium">Registered: {matchedResult.registeredOn}</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] uppercase font-mono">Active Monitoring</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`tel:${matchedResult.phone}`}
                      className="rounded-full bg-teal-600 hover:bg-teal-700 px-5 py-2.5 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call {matchedResult.owner}</span>
                    </a>
                    
                    <a
                      href={`mailto:${matchedResult.email}`}
                      className="rounded-full border border-teal-200 bg-white hover:bg-teal-50 px-5 py-2.5 text-xs font-bold text-teal-900 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email Owner securely</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>
          )}

          {searched && !matchedResult && (
            <div className="rounded-3xl border border-amber-100 bg-amber-50/20 p-6 shadow-md text-center max-w-lg mx-auto space-y-3 animate-fade-in" id="portal-search-fail">
              <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
              <div>
                <h5 className="font-bold text-teal-950 text-sm">No matched shell registry found</h5>
                <p className="text-xs text-teal-950/75 mt-1 leading-relaxed">
                  Make sure you typed the seashell's unique ID code exactly as printed (including the hyphens e.g., <code className="bg-amber-100 px-1 rounded-sm text-amber-900 font-mono font-bold">SHELL-4820-TIDAL</code>).
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
