/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { SeashellNFCData, NFCMode, SeashellConfig } from "../types";
import { Radio, Sparkles, Smartphone, Mail, Phone, Lock, HelpCircle, CheckCircle2, Waves, Send, RotateCcw } from "lucide-react";
import { registerTag } from "../lib/registry";

interface NFCSimulatorProps {
  initialConfig: SeashellConfig | null;
}

export default function NFCSimulator({ initialConfig }: NFCSimulatorProps) {
  // NFC Chip State
  const [nfcData, setNfcData] = useState<SeashellNFCData>({
    id: "SHELL-4820-TIDAL",
    ownerName: "Taylor Beachcomber",
    phone: "+1 (555) 321-4820",
    email: "taylor@oceanicnfc.com",
    nfcMode: NFCMode.CONTACT,
    message: "Ahoy! You found my keys. They are attached to my lifesaver seashell. Please help me recover them—I'm happy to buy you a warm cup of coffee as a reward!",
    socialLink: "https://github.com/oceanicnfc",
    emergencyInfo: "Penicillin Allergy. ICE: +1 (555) 999-8811",
    isRegistered: true,
    pinCode: "1234",
  });

  // Watch for configuration loaded from customizer
  useEffect(() => {
    if (initialConfig) {
      const generatedId = `SHELL-${Math.floor(1000 + Math.random() * 9000)}-${initialConfig.shellType.toUpperCase()}`;
      setNfcData(prev => ({
        ...prev,
        id: generatedId,
        nfcMode: initialConfig.nfcMode,
        message: getPresetMessage(initialConfig.nfcMode, prev.ownerName, initialConfig.engravingText),
      }));
    }
  }, [initialConfig]);

  // Synchronize the simulator tag setup with our global registry
  useEffect(() => {
    registerTag(nfcData);
  }, [nfcData]);

  const getPresetMessage = (mode: NFCMode, name: string, engraving?: string) => {
    const text = engraving ? ` "${engraving}"` : "";
    switch (mode) {
      case NFCMode.CONTACT:
        return `Ahoy! You found my keys tagged with seashell${text}. This keychain holds deep memories for me. Please use the contact buttons below to help bring it home!`;
      case NFCMode.EMERGENCY:
        return `Emergency Medical tag for ${name}. If found during an incident, please refer to the vital info and contacts loaded inside this seashell.`;
      case NFCMode.SOCIAL:
        return `Hello, beach wanderer! You've tapped my custom seashore keychain${text}. Scan down to connect with my digital links or checkout my blog!`;
      case NFCMode.STORY:
        return `This authentic seashell was gathered on a warm, sunny morning. It travels wherever I go. Connect with me below to share where you found it!`;
    }
  };

  // UI States
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [customAIContext, setCustomAIContext] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  
  // Simulation Phone States
  const [isScanning, setIsScanning] = useState(false);
  const [isPhoneTapped, setIsPhoneTapped] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPortalInsidePhone, setShowPortalInsidePhone] = useState(false);
  
  // Finder message inside portal
  const [finderNote, setFinderNote] = useState("");
  const [finderPhone, setFinderPhone] = useState("");
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Gemini AI message writer
  const handleGenerateAIMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      const response = await fetch("/api/gemini/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nfcData.ownerName,
          mode: nfcData.nfcMode,
          context: customAIContext || `Keychain shell, engraving ${initialConfig?.engravingText || "None"}`
        }),
      });
      const data = await response.json();
      if (data.text) {
        setNfcData(prev => ({ ...prev, message: data.text }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  // Perform virtual NFC tap
  const handleNFCScanTrigger = () => {
    if (isScanning) return;
    setIsScanning(true);
    setIsPhoneTapped(false);
    setShowNotification(false);
    setShowPortalInsidePhone(false);
    setAlertSuccess(false);

    // Simulate scanning waves
    setTimeout(() => {
      setIsScanning(false);
      setIsPhoneTapped(true);
      setShowNotification(true);
      // Play a tiny beep sound (optional/standard browser audio alert simulator)
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Beep frequency
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}
    }, 1500);
  };

  // Open portal from mock iOS notification
  const handleOpenNotificationPortal = () => {
    setShowNotification(false);
    setShowPortalInsidePhone(true);
  };

  // Send Simulated alert from finder to owner
  const handleSendFinderAlert = () => {
    if (!finderNote.trim()) return;
    setIsSendingAlert(true);
    
    // Simulate marine wave transmission
    setTimeout(() => {
      setIsSendingAlert(false);
      setAlertSuccess(true);
      setFinderNote("");
      setFinderPhone("");

      // Simulate a browser-wide Toast or alert
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {}
    }, 2000);
  };

  const handleResetNFCSetup = () => {
    setNfcData({
      id: "SHELL-4820-TIDAL",
      ownerName: "Taylor Beachcomber",
      phone: "+1 (555) 321-4820",
      email: "taylor@oceanicnfc.com",
      nfcMode: NFCMode.CONTACT,
      message: "Ahoy! You found my keys tagged with seashell. Please use the contact buttons below to help bring it home!",
      socialLink: "https://github.com/oceanicnfc",
      emergencyInfo: "Penicillin Allergy. ICE: +1 (555) 999-8811",
      isRegistered: true,
      pinCode: "1234",
    });
    setPinInput("");
    setIsPhoneTapped(false);
    setShowPortalInsidePhone(false);
    setAlertSuccess(false);
  };

  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-b border-teal-100/30" id="simulator-section">
      
      {/* Toast alert system */}
      {alertSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-teal-500/30 flex items-start gap-3 animate-bounce">
            <div className="h-10 w-10 shrink-0 rounded-full bg-teal-500 flex items-center justify-center text-white">
              <Mail className="h-5.5 w-5.5" />
            </div>
            <div>
              <h5 className="font-bold text-xs">Simulated Wave Alert Dispatched!</h5>
              <p className="text-[11px] text-teal-200 mt-0.5 leading-relaxed">
                An anonymous notification with GPS coordinates was sent to <span className="font-bold font-mono text-white">{nfcData.email}</span>. Taylor has been alerted!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 font-mono">Live Interactive Playground</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-950">
            NFC Smartphone & Seashell Simulator
          </h2>
          <p className="text-sm text-teal-900/70">
            Configure your virtual seashell chip on the left, tap the virtual phone on the right, and experience the full lost-and-found recovery flow!
          </p>
        </div>

        {/* Layout split */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT: Seashell NFC Setup Dashboard (Column span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-teal-100/30 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Radio className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-teal-950 text-sm sm:text-base">Shell Payload Configurator</h3>
                    <p className="text-[10px] sm:text-xs text-teal-600 font-mono">{nfcData.id}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleResetNFCSetup}
                  className="p-1.5 hover:bg-teal-50 text-teal-600 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                  title="Reset to Demo defaults"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Form Input fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={nfcData.ownerName}
                    onChange={(e) => setNfcData(prev => ({ ...prev, ownerName: e.target.value }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans"
                    id="setup-owner-name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">NFC Active Mode</label>
                  <select
                    value={nfcData.nfcMode}
                    onChange={(e) => setNfcData(prev => ({ ...prev, nfcMode: e.target.value as NFCMode, message: getPresetMessage(e.target.value as NFCMode, prev.ownerName) }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans bg-white"
                    id="setup-nfc-mode"
                  >
                    <option value={NFCMode.CONTACT}>Contact Info Card</option>
                    <option value={NFCMode.EMERGENCY}>ICE / Medical Card</option>
                    <option value={NFCMode.SOCIAL}>Social Portfolio</option>
                    <option value={NFCMode.STORY}>Sea Adventure Story</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Recovery Phone</label>
                  <input
                    type="text"
                    value={nfcData.phone}
                    onChange={(e) => setNfcData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    id="setup-phone"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Security PIN Lock</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="1234"
                    value={nfcData.pinCode}
                    onChange={(e) => setNfcData(prev => ({ ...prev, pinCode: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono text-center tracking-widest"
                    id="setup-pin"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide mb-1">Secure Contact Email (Notifications)</label>
                  <input
                    type="email"
                    value={nfcData.email}
                    onChange={(e) => setNfcData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    id="setup-email"
                  />
                </div>

                {/* Conditional Fields based on Mode */}
                {nfcData.nfcMode === NFCMode.EMERGENCY && (
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-rose-800 uppercase tracking-wide mb-1">Emergency Medical Details</label>
                    <input
                      type="text"
                      value={nfcData.emergencyInfo}
                      onChange={(e) => setNfcData(prev => ({ ...prev, emergencyInfo: e.target.value }))}
                      placeholder="E.g. Diabetic, Blood O+, ICE: Mom +1 (555) 234-5678"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-rose-100 bg-rose-50/10 focus:outline-hidden focus:border-rose-500 font-sans text-rose-950 font-medium"
                      id="setup-emergency-info"
                    />
                  </div>
                )}

                {nfcData.nfcMode === NFCMode.SOCIAL && (
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-sky-800 uppercase tracking-wide mb-1">Social Portfolio Link</label>
                    <input
                      type="url"
                      value={nfcData.socialLink}
                      onChange={(e) => setNfcData(prev => ({ ...prev, socialLink: e.target.value }))}
                      placeholder="https://instagram.com/my_shell"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-sky-100 bg-sky-50/10 focus:outline-hidden focus:border-sky-500 font-mono text-sky-950"
                      id="setup-social-link"
                    />
                  </div>
                )}

                {/* Custom Message with AI assistance */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wide">
                      Custom Recovery Message
                    </label>
                    <span className="text-[10px] text-teal-600 font-medium">Auto-writes on tap</span>
                  </div>

                  <textarea
                    rows={3}
                    value={nfcData.message}
                    onChange={(e) => setNfcData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans leading-relaxed"
                    placeholder="Write custom instructions for who finds this..."
                    id="setup-message-textarea"
                  />

                  {/* AI message helper prompt drawer */}
                  <div className="rounded-2xl bg-teal-50/40 p-3 border border-teal-100/50 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-teal-600 animate-pulse" />
                      <span className="text-xs font-bold text-teal-950">Seaside AI Message Writer</span>
                    </div>
                    
                    <p className="text-[10px] text-teal-900/60 leading-relaxed font-medium">
                      Let our marine AI write a specialized contact and reward message for your keys or bag.
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customAIContext}
                        onChange={(e) => setCustomAIContext(e.target.value)}
                        placeholder="E.g. This is for my pet retriever named Coral..."
                        className="flex-1 text-[11px] px-3 py-1.5 rounded-lg border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans bg-white"
                        id="ai-context-input"
                      />
                      <button
                        onClick={handleGenerateAIMessage}
                        disabled={isGeneratingMessage}
                        className="inline-flex items-center gap-1 rounded-lg bg-teal-600 hover:bg-teal-700 px-3 py-1.5 text-[11px] font-bold text-white transition-all cursor-pointer disabled:opacity-50"
                        id="ai-generate-button"
                      >
                        {isGeneratingMessage ? (
                          <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span>Compose AI</span>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Smartphone Screen Visualizer (Column span 6) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The interactive scanning space */}
            <div className="w-full max-w-md flex flex-col items-center space-y-6">
              
              {/* Seashell tag with scan ripple */}
              <div className="relative flex flex-col items-center">
                <p className="text-xs font-bold text-teal-900/70 mb-2 uppercase tracking-wide">Physical Seashell Tag</p>
                
                <button
                  onClick={handleNFCScanTrigger}
                  disabled={isScanning}
                  className="relative h-28 w-28 rounded-full bg-white border border-teal-100 shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-transform hover:scale-105 active:scale-95 group"
                  id="simulator-nfc-tag-trigger"
                >
                  {/* Rippling radial rings during active scan */}
                  {isScanning && (
                    <>
                      <div className="absolute inset-[-12px] rounded-full border border-teal-400 animate-ping opacity-60" />
                      <div className="absolute inset-[-28px] rounded-full border border-sky-400 animate-ping opacity-40 delay-150" />
                      <div className="absolute inset-[-48px] rounded-full border border-teal-300 animate-ping opacity-20 delay-300" />
                    </>
                  )}
                  
                  <div className="h-16 w-16 rounded-full bg-linear-to-tr from-teal-50 to-sky-100 border border-teal-200/50 flex items-center justify-center text-teal-600 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                    <Radio className={`h-8 w-8 text-teal-600 ${isScanning ? "animate-pulse scale-110 text-teal-500" : ""}`} />
                  </div>
                </button>
                
                <span className="text-[10px] text-teal-600/70 font-mono mt-2 font-bold uppercase">
                  {isScanning ? "Transmitting waves..." : "Click shell to tap phone"}
                </span>
              </div>

              {/* Mock iOS Phone frame */}
              <div className="relative w-76 h-152 rounded-[40px] border-[9px] border-slate-900 bg-slate-950 p-2.5 shadow-2xl overflow-hidden flex flex-col justify-between" id="mock-smartphone">
                
                {/* Dynamic Island camera capsule */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-16" />
                </div>

                {/* Smartphone Screen Canvas */}
                <div className="relative w-full h-full bg-gradient-to-b from-teal-900 via-sky-950 to-slate-950 rounded-[28px] overflow-hidden flex flex-col p-4 justify-between" id="smartphone-screen-canvas">
                  
                  {/* Waves graphics background */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80')" }} />

                  {/* Top status bar */}
                  <div className="flex items-center justify-between text-white/80 text-[10px] font-bold z-30 font-sans">
                    <span>10:25 PM</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <div className="h-2 w-4 bg-white/80 rounded-[3px]" />
                    </div>
                  </div>

                  {/* Dynamic Area in smartphone */}
                  <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-20">
                    
                    {/* State 1: Awaiting Scan */}
                    {!isPhoneTapped && !showPortalInsidePhone && (
                      <div className="text-center space-y-3.5" id="phone-state-idle">
                        <Smartphone className="h-12 w-12 mx-auto text-teal-200/40 animate-bounce" />
                        <div className="space-y-1">
                          <h4 className="text-white text-xs font-bold font-sans">Awaiting Seashell Tap</h4>
                          <p className="text-[10px] text-teal-200/50 max-w-[180px] mx-auto leading-relaxed">
                            Click the seashell tag above to simulate scanning the tag with your phone.
                          </p>
                        </div>
                        <button
                          onClick={handleNFCScanTrigger}
                          className="rounded-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 px-3.5 py-1.5 text-[10px] font-bold text-teal-300 transition-colors"
                        >
                          Simulate Tap
                        </button>
                      </div>
                    )}

                    {/* State 2: NFC Scan Beep Success & Push Notification Banner */}
                    {showNotification && (
                      <button
                        onClick={handleOpenNotificationPortal}
                        className="absolute top-4 left-0 right-0 rounded-2xl bg-white/95 border border-teal-100 p-2.5 shadow-xl backdrop-blur-md text-left flex items-start gap-2.5 animate-slide-in cursor-pointer hover:bg-white transition-colors"
                        id="phone-notification-banner"
                      >
                        <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center text-white font-sans text-xs font-bold">
                          🐚
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-teal-950">Seashell Found!</span>
                            <span className="text-[8px] text-teal-600 font-bold font-mono">ID MATCHED</span>
                          </div>
                          <p className="text-[9px] text-slate-700 font-semibold truncate">Tap to scan and view Taylor's profile.</p>
                        </div>
                      </button>
                    )}

                    {/* State 3: Public Finder Recovery Portal Page */}
                    {showPortalInsidePhone && (
                      <div className="w-full h-full flex flex-col justify-between bg-white rounded-2xl p-3 shadow-lg border border-teal-100 text-left overflow-y-auto max-h-[420px]" id="finder-portal-screen">
                        
                        {/* Header logo */}
                        <div className="flex items-center justify-between border-b border-teal-100/30 pb-2 mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <Waves className="h-4 w-4 text-teal-600 animate-pulse" />
                            <span className="text-[10px] font-extrabold text-teal-950 uppercase tracking-wider">Seashell Safe</span>
                          </div>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Secured
                          </span>
                        </div>

                        {/* Owner card info */}
                        <div className="space-y-2.5 flex-1 flex flex-col">
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase font-bold tracking-wider text-teal-600 font-mono">Matching Owner</span>
                            <h5 className="text-xs font-bold text-teal-950 truncate">{nfcData.ownerName}</h5>
                          </div>

                          <div className="bg-teal-50/30 rounded-xl p-2.5 border border-teal-100/40 text-[10px] text-teal-950 font-normal leading-relaxed">
                            "{nfcData.message}"
                          </div>

                          {/* Conditional mode info */}
                          {nfcData.nfcMode === NFCMode.EMERGENCY && nfcData.emergencyInfo && (
                            <div className="bg-rose-50 rounded-xl p-2.5 border border-rose-100 text-[10px] text-rose-950">
                              <span className="block text-[8px] uppercase font-bold text-rose-800 font-mono mb-0.5">ICE Emergency Card</span>
                              <p className="font-semibold">{nfcData.emergencyInfo}</p>
                            </div>
                          )}

                          {nfcData.nfcMode === NFCMode.SOCIAL && nfcData.socialLink && (
                            <a
                              href={nfcData.socialLink}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-sky-50 hover:bg-sky-100 rounded-xl p-2 border border-sky-100 text-[10px] text-sky-950 block text-center font-mono font-bold transition-colors"
                            >
                              🔗 Browse Social Portfolio
                            </a>
                          )}

                          {/* Quick direct call/contact buttons */}
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <a
                              href={`tel:${nfcData.phone}`}
                              className="rounded-lg bg-teal-50 hover:bg-teal-100 py-1.5 text-[10px] font-bold text-teal-800 text-center flex items-center justify-center gap-1 transition-all"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call Owner</span>
                            </a>
                            <a
                              href={`mailto:${nfcData.email}`}
                              className="rounded-lg bg-slate-900 hover:bg-slate-800 py-1.5 text-[10px] font-bold text-white text-center flex items-center justify-center gap-1 transition-all"
                            >
                              <Mail className="h-3 w-3" />
                              <span>Email Owner</span>
                            </a>
                          </div>

                          {/* Finder response form */}
                          <div className="border-t border-teal-100/40 pt-2.5 mt-auto space-y-2">
                            <span className="text-[8px] uppercase font-bold tracking-wider text-teal-600 font-mono block">Send Anonymous Finder Notification</span>
                            
                            <textarea
                              rows={2}
                              value={finderNote}
                              onChange={(e) => setFinderNote(e.target.value)}
                              placeholder="E.g. Found your keys near lifeguard tower at Sunset beach!"
                              className="w-full text-[10px] p-2 rounded-lg border border-teal-100 focus:outline-hidden focus:border-teal-500 leading-normal"
                              id="finder-note-input"
                            />

                            <button
                              onClick={handleSendFinderAlert}
                              disabled={isSendingAlert || !finderNote.trim()}
                              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 py-2 text-[10px] font-bold text-white transition-all disabled:opacity-40 cursor-pointer"
                              id="finder-send-alert-button"
                            >
                              {isSendingAlert ? (
                                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Send className="h-3 w-3" />
                                  <span>Send GPS & Alert Notification</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                  {/* iOS bottom home indicator */}
                  <div className="w-24 h-1 bg-white/45 rounded-full mx-auto mb-1 z-30" />

                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
