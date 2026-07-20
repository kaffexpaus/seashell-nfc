/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShellType, TetherType, AccentMetal, NFCMode, SeashellConfig, CartItem } from "../types";
import { Hammer, Sparkles, Check, HelpCircle, Save, ArrowRight } from "lucide-react";

interface CustomizerProps {
  onAddCustomToCart: (config: SeashellConfig, price: number) => void;
  onLoadToSimulator: (config: SeashellConfig) => void;
}

const SHELL_OPTIONS = [
  { type: ShellType.SCALLOP, name: "Sands Scallop", price: 25, desc: "Classic fan-shaped ribbed shell, elegant and symmetrical. Picked from the Atlantic coastline.", color: "bg-amber-50 border-amber-200" },
  { type: ShellType.CONCH, name: "Nautilus Conch", price: 32, desc: "Spiral-coiled premium shell with soft peach-pearl interiors. High tactile feel.", color: "bg-rose-50 border-rose-200" },
  { type: ShellType.COWRIE, name: "Pacific Cowrie", price: 28, desc: "Sleek, highly polished dome-like shell with speckled patterns. Traditional symbol of wealth.", color: "bg-neutral-50 border-neutral-200" },
  { type: ShellType.STARFISH, name: "Reef Starfish", price: 35, desc: "Unique five-point textured star shell, sturdy and distinctive. Rare beachfind.", color: "bg-orange-50 border-orange-200" },
];

const TETHER_OPTIONS = [
  { id: TetherType.SILVER_CHAIN, name: "Sterling Silver Chain", extra: 0, icon: "⛓️" },
  { id: TetherType.GOLD_CHAIN, name: "14K Gold-Plated Chain", extra: 5, icon: "⚜️" },
  { id: TetherType.LEATHER_LOOP, name: "Italian Tan Leather Loop", extra: 3, icon: "📿" },
  { id: TetherType.SEA_GRASS, name: "Braided Sea-Grass Cord", extra: 0, icon: "🌾" },
];

const METAL_OPTIONS = [
  { id: AccentMetal.SILVER, name: "Brushed Silver", color: "bg-slate-300 ring-slate-400" },
  { id: AccentMetal.GOLD, name: "Polished Gold", color: "bg-yellow-400 ring-yellow-500" },
  { id: AccentMetal.BRONZE, name: "Antique Bronze", color: "bg-amber-700 ring-amber-800" },
];

const NFC_MODE_OPTIONS = [
  { id: NFCMode.CONTACT, name: "Return Contact Card", desc: "Share your email, phone & custom finder's reward note." },
  { id: NFCMode.EMERGENCY, name: "ICE Medical & Alert", desc: "Expose emergency contact, medical tags, or blood group." },
  { id: NFCMode.SOCIAL, name: "Social Link Hub", desc: "Direct finder to your personal website or social profile." },
  { id: NFCMode.STORY, name: "Sea Travel Note", desc: "Share a custom poem, beach coordinates, or travel log." },
];

export default function Customizer({ onAddCustomToCart, onLoadToSimulator }: CustomizerProps) {
  // Configurator state
  const [shellType, setShellType] = useState<ShellType>(ShellType.SCALLOP);
  const [tetherType, setTetherType] = useState<TetherType>(TetherType.SILVER_CHAIN);
  const [accentMetal, setAccentMetal] = useState<AccentMetal>(AccentMetal.SILVER);
  const [nfcMode, setNfcMode] = useState<NFCMode>(NFCMode.CONTACT);
  const [engravingText, setEngravingText] = useState<string>("");
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Calculate current price
  const basePrice = SHELL_OPTIONS.find(s => s.type === shellType)?.price || 25;
  const tetherExtra = TETHER_OPTIONS.find(t => t.id === tetherType)?.extra || 0;
  const engravingExtra = engravingText.trim().length > 0 ? 5 : 0;
  const totalPrice = basePrice + tetherExtra + engravingExtra;

  const currentConfig: SeashellConfig = {
    shellType,
    tetherType,
    accentMetal,
    nfcMode,
    engravingText,
  };

  const handleAddToCart = () => {
    onAddCustomToCart(currentConfig, totalPrice);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  // Render a beautifully colored CSS representation of the custom shell!
  const getShellPreviewStyles = () => {
    const accents: Record<AccentMetal, string> = {
      [AccentMetal.SILVER]: "border-slate-300 bg-linear-to-b from-slate-100 to-slate-400",
      [AccentMetal.GOLD]: "border-yellow-300 bg-linear-to-b from-yellow-100 to-yellow-500",
      [AccentMetal.BRONZE]: "border-amber-700 bg-linear-to-b from-amber-600 to-amber-900",
    };

    const tethers: Record<TetherType, string> = {
      [TetherType.SILVER_CHAIN]: "border-slate-300 bg-linear-to-r from-slate-200 via-white to-slate-400 h-20 w-3 rounded-md",
      [TetherType.GOLD_CHAIN]: "border-yellow-300 bg-linear-to-r from-yellow-200 via-white to-yellow-500 h-20 w-3 rounded-md",
      [TetherType.LEATHER_LOOP]: "border-amber-800 bg-linear-to-r from-amber-700 to-amber-900 h-24 w-4 rounded-xl",
      [TetherType.SEA_GRASS]: "border-emerald-700/40 bg-linear-to-r from-emerald-600 to-teal-800 h-24 w-3.5 rounded-sm shadow-xs border-dashed",
    };

    return {
      accentRing: accents[accentMetal],
      tetherLine: tethers[tetherType],
    };
  };

  const { accentRing, tetherLine } = getShellPreviewStyles();

  return (
    <section className="bg-gradient-to-b from-white via-teal-50/20 to-sky-50/20 py-16 lg:py-24" id="customizer-section">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Bespoke Seaside Studio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-950">
            Interactive Seashell Configurator
          </h2>
          <p className="text-sm text-teal-900/70">
            Design your custom seashell, select your high-performance tether loops, and configure the NFC behavior to match your lifestyle.
          </p>
        </div>

        {/* Studio Grid layout */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* Left Block: The Interactive Live Preview (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl border border-teal-100 bg-white/70 p-6 shadow-lg backdrop-blur-md text-center relative overflow-hidden flex flex-col justify-between aspect-[4/5] min-h-[440px]">
              
              {/* Sandy oceanic backdrop wave */}
              <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-teal-500/5 blur-2xl pointer-events-none" />

              {/* Price floating badge */}
              <div className="absolute top-4 right-4 rounded-full bg-teal-50 px-3.5 py-1.5 border border-teal-100 text-xs font-bold text-teal-800 shadow-xs flex items-center gap-1.5 animate-pulse">
                <span>Total:</span>
                <span className="text-sm font-extrabold">${totalPrice}.00</span>
              </div>

              {/* Preview header */}
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 font-mono">Live Studio Preview</span>
                <h4 className="text-sm font-bold text-teal-950 mt-0.5 truncate">
                  {SHELL_OPTIONS.find(s => s.type === shellType)?.name}
                </h4>
              </div>

              {/* Interactive CSS / SVG Seashell rendering */}
              <div className="flex-1 flex flex-col items-center justify-center py-6 relative" id="seashell-rendered-preview">
                
                {/* 1. Tether Loop Line */}
                <div className={`transition-all duration-500 mb-[-12px] relative z-10 ${tetherLine}`} />

                {/* 2. Metal Connector Accent Ring */}
                <div className={`h-8 w-8 rounded-full border-4 shadow-sm z-20 flex items-center justify-center transition-all duration-500 ${accentRing}`}>
                  <div className="h-2 w-2 rounded-full bg-white/60" />
                </div>

                {/* 3. Outer Marine-grade transparent dome resin envelope */}
                <div className="relative mt-[-4px] z-30 transition-all duration-500 group flex items-center justify-center cursor-pointer">
                  {/* Glowing NFC induction pulse */}
                  <div className="absolute inset-0 rounded-full bg-teal-400/20 scale-125 blur-lg animate-pulse" />
                  
                  {/* Scallop Shell CSS Graphic */}
                  {shellType === ShellType.SCALLOP && (
                    <div className="relative w-36 h-36 bg-amber-50/90 rounded-t-full rounded-b-[40%] shadow-lg border border-amber-200/60 p-4 flex flex-col items-center justify-between transition-transform group-hover:scale-[1.03]" id="scallop-graphic">
                      {/* Ribbed lines inside scallop */}
                      <div className="absolute inset-0 flex justify-between px-6 pointer-events-none">
                        <div className="w-[1.5px] bg-amber-200/50 h-full rotate-[35deg]" />
                        <div className="w-[1.5px] bg-amber-200/50 h-full rotate-[15deg]" />
                        <div className="w-[1.5px] bg-amber-200/50 h-full" />
                        <div className="w-[1.5px] bg-amber-200/50 h-full rotate-[-15deg]" />
                        <div className="w-[1.5px] bg-amber-200/50 h-full rotate-[-35deg]" />
                      </div>
                      {/* Embedded blue translucent resin chip circle */}
                      <div className="h-9 w-9 rounded-full bg-teal-400/30 border border-teal-400/60 z-10 flex items-center justify-center shadow-inner mt-4 animate-pulse">
                        <div className="h-4.5 w-4.5 rounded-full bg-sky-500/80 flex items-center justify-center text-[7px] font-bold text-white tracking-widest">NFC</div>
                      </div>
                    </div>
                  )}

                  {/* Conch Shell CSS Graphic */}
                  {shellType === ShellType.CONCH && (
                    <div className="relative w-32 h-38 bg-rose-50/90 rounded-tr-[70%] rounded-tl-[40%] rounded-b-[50%] shadow-lg border border-rose-200/60 p-4 flex flex-col items-center justify-between transition-transform group-hover:scale-[1.03]" id="conch-graphic">
                      {/* Spiral overlay swirls */}
                      <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-rose-200/40 border-t-transparent border-l-transparent rotate-45 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-rose-200/30 border-t-transparent border-l-transparent rotate-45 pointer-events-none" />
                      {/* Embedded chip */}
                      <div className="h-9 w-9 rounded-full bg-teal-400/30 border border-teal-400/60 z-10 flex items-center justify-center shadow-inner mt-6 animate-pulse">
                        <div className="h-4.5 w-4.5 rounded-full bg-sky-500/80 flex items-center justify-center text-[7px] font-bold text-white tracking-widest">NFC</div>
                      </div>
                    </div>
                  )}

                  {/* Cowrie Shell CSS Graphic */}
                  {shellType === ShellType.COWRIE && (
                    <div className="relative w-28 h-36 bg-neutral-100/90 rounded-[50%_50%_45%_45%] shadow-lg border border-neutral-300/60 p-3 flex flex-col items-center justify-between transition-transform group-hover:scale-[1.03]" id="cowrie-graphic">
                      {/* Speckles & central toothed slit */}
                      <div className="absolute inset-y-4 w-1.5 bg-neutral-300 rounded-full" />
                      <div className="absolute top-6 left-5 w-1 h-1.5 rounded-full bg-neutral-400/40" />
                      <div className="absolute top-12 right-6 w-1 h-2 rounded-full bg-neutral-400/40" />
                      <div className="absolute bottom-8 left-6 w-1 h-1 rounded-full bg-neutral-400/40" />
                      {/* Embedded chip */}
                      <div className="h-9 w-9 rounded-full bg-teal-400/30 border border-teal-400/60 z-10 flex items-center justify-center shadow-inner mt-4 animate-pulse">
                        <div className="h-4.5 w-4.5 rounded-full bg-sky-500/80 flex items-center justify-center text-[7px] font-bold text-white tracking-widest">NFC</div>
                      </div>
                    </div>
                  )}

                  {/* Starfish Shell CSS Graphic */}
                  {shellType === ShellType.STARFISH && (
                    <div className="relative w-36 h-36 bg-orange-100/95 rounded-full shadow-lg border border-orange-200/60 p-4 flex flex-col items-center justify-center transition-transform group-hover:scale-[1.03]" id="starfish-graphic">
                      {/* Five star points (stylized) */}
                      <div className="absolute h-full w-5 bg-orange-200/35 rotate-0" />
                      <div className="absolute h-full w-5 bg-orange-200/35 rotate-[72deg]" />
                      <div className="absolute h-full w-5 bg-orange-200/35 rotate-[144deg]" />
                      {/* Embedded chip */}
                      <div className="h-9 w-9 rounded-full bg-teal-400/30 border border-teal-400/60 z-10 flex items-center justify-center shadow-inner animate-pulse">
                        <div className="h-4.5 w-4.5 rounded-full bg-sky-500/80 flex items-center justify-center text-[7px] font-bold text-white tracking-widest">NFC</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Laser engraving on beach sand */}
                {engravingText && (
                  <div className="mt-4 z-40 bg-teal-900/10 rounded-full px-3.5 py-0.5 text-[9px] font-mono font-bold tracking-widest text-teal-900 border border-teal-950/10 animate-pulse">
                    " {engravingText.toUpperCase()} "
                  </div>
                )}
              </div>

              {/* Action shortcuts */}
              <div className="pt-3 border-t border-teal-100/30 text-center">
                <span className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider block mb-1">Engraving Included:</span>
                <span className="text-xs text-teal-950/80 font-medium">Laser engraved on reverse shell side</span>
              </div>

            </div>
          </div>

          {/* Right Block: Customizer selections (Column span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Shell Selection */}
            <div className="bg-white p-5 rounded-2xl border border-teal-100/50 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">1</span>
                <h4 className="text-sm font-bold text-teal-950 uppercase tracking-wide">Select Your Seashell Variety</h4>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {SHELL_OPTIONS.map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => setShellType(opt.type)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      shellType === opt.type 
                        ? "border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/10" 
                        : "border-teal-100 hover:border-teal-300 bg-white"
                    }`}
                    id={`shell-select-${opt.type}`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border border-teal-200 shrink-0 flex items-center justify-center ${shellType === opt.type ? "bg-teal-600" : "bg-white"}`}>
                      {shellType === opt.type && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-teal-950">{opt.name}</span>
                        <span className="text-xs font-mono font-bold text-teal-700">${opt.price}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-teal-900/60 leading-normal">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Chain/Tether selection */}
            <div className="bg-white p-5 rounded-2xl border border-teal-100/50 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">2</span>
                <h4 className="text-sm font-bold text-teal-950 uppercase tracking-wide">Select Your Tether Style</h4>
              </div>

              <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                {TETHER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTetherType(opt.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      tetherType === opt.id 
                        ? "border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/10" 
                        : "border-teal-100 hover:border-teal-300 bg-white"
                    }`}
                    id={`tether-select-${opt.id}`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-xs font-bold text-teal-950 line-clamp-1">{opt.name}</span>
                    <span className="text-[10px] font-mono text-teal-600 font-bold">
                      {opt.extra === 0 ? "Included" : `+$${opt.extra}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Accent Hardware Metal & Laser Engraving */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Metal accent */}
              <div className="bg-white p-5 rounded-2xl border border-teal-100/50 shadow-xs space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">3</span>
                  <h4 className="text-sm font-bold text-teal-950 uppercase tracking-wide">Hardware Accent</h4>
                </div>
                <div className="flex gap-4">
                  {METAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAccentMetal(opt.id)}
                      className={`h-9 w-9 rounded-full ring-offset-2 ring-2 transition-all cursor-pointer ${opt.color} ${
                        accentMetal === opt.id ? "ring-teal-500 scale-105" : "ring-transparent hover:scale-105"
                      }`}
                      title={opt.name}
                      aria-label={`Select accent metal ${opt.name}`}
                      id={`metal-select-${opt.id}`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-teal-900/60 font-semibold uppercase tracking-wider">
                  Matte ring loops & secure hardware accent
                </p>
              </div>

              {/* Laser Engraving */}
              <div className="bg-white p-5 rounded-2xl border border-teal-100/50 shadow-xs space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">4</span>
                  <h4 className="text-sm font-bold text-teal-950 uppercase tracking-wide">Reverse Engraving (Optional)</h4>
                </div>
                <div>
                  <input
                    type="text"
                    maxLength={12}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.slice(0, 12))}
                    placeholder="E.g. ALOHA, OCEAN, SAVER"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 font-mono uppercase bg-teal-50/10 placeholder-teal-300"
                    id="engraving-input"
                  />
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-teal-600/75 mt-1 font-semibold uppercase">
                    <span>{engravingText.length} / 12 characters</span>
                    <span>{engravingText.trim().length > 0 ? "+$5.00 Laser Custom" : "Included in Base price"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. NFC Mode Selector */}
            <div className="bg-white p-5 rounded-2xl border border-teal-100/50 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">5</span>
                <h4 className="text-sm font-bold text-teal-950 uppercase tracking-wide">Preset Chip Mode</h4>
              </div>

              <div className="grid gap-2 grid-cols-2">
                {NFC_MODE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setNfcMode(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      nfcMode === opt.id 
                        ? "border-teal-500 bg-teal-50/30" 
                        : "border-teal-100 hover:border-teal-300 bg-white"
                    }`}
                    id={`nfc-mode-select-${opt.id}`}
                  >
                    <span className="block text-xs font-bold text-teal-950 truncate">{opt.name}</span>
                    <span className="block text-[10px] text-teal-600/80 leading-snug line-clamp-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                  isAddedFeedback 
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" 
                    : "bg-linear-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 shadow-teal-100"
                }`}
                id="customizer-add-to-cart"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Hammer className="h-5 w-5" />
                    <span>Add Config to Cart - ${totalPrice}.00</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onLoadToSimulator(currentConfig)}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-6 py-4 text-sm font-bold transition-all cursor-pointer shadow-xs"
                id="customizer-test-simulator"
              >
                <span>Write to Virtual Tag</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
