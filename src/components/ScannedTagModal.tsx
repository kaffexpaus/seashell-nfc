/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { SeashellNFCData, NFCMode } from "../types";
import { getTagById, registerTag } from "../lib/registry";
import { 
  X, Waves, Radio, Sparkles, Phone, Mail, Send, Lock, 
  CheckCircle2, AlertCircle, ShieldCheck, Heart, Compass, ClipboardCopy 
} from "lucide-react";

interface ScannedTagModalProps {
  tagId: string;
  onClose: () => void;
}

export default function ScannedTagModal({ tagId, onClose }: ScannedTagModalProps) {
  const [tagData, setTagData] = useState<SeashellNFCData | null>(null);
  const [isNewTag, setIsNewTag] = useState(false);
  
  // Registration form state
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nfcMode, setNfcMode] = useState<NFCMode>(NFCMode.CONTACT);
  const [message, setMessage] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [emergencyInfo, setEmergencyInfo] = useState("");
  const [pinCode, setPinCode] = useState("");
  
  // Registration feedback
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Finder alert state
  const [finderNote, setFinderNote] = useState("");
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  // AI assistant state
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [aiPromptContext, setAiPromptContext] = useState("");

  useEffect(() => {
    loadTag();
  }, [tagId]);

  const loadTag = () => {
    const existing = getTagById(tagId);
    if (existing) {
      setTagData(existing);
      setIsNewTag(false);
    } else {
      setIsNewTag(true);
      // Pre-fill some defaults for the user
      setMessage(`Ahoy! You found my keys tagged with seashell ${tagId}. This keychain holds deep memories for me. Please use the contact buttons below to help bring it home!`);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !email || !pinCode) {
      setRegisterError("Please fill in all required fields (Name, Phone, Email, PIN).");
      return;
    }
    if (pinCode.length < 4) {
      setRegisterError("Security PIN must be exactly 4 digits.");
      return;
    }

    setIsRegistering(true);
    setRegisterError("");

    setTimeout(() => {
      const newTag: SeashellNFCData = {
        id: tagId,
        ownerName,
        phone,
        email,
        nfcMode,
        message: message || `Ahoy! You found my seashell tag ${tagId}. Please get in touch below!`,
        socialLink: nfcMode === NFCMode.SOCIAL ? socialLink : undefined,
        emergencyInfo: nfcMode === NFCMode.EMERGENCY ? emergencyInfo : undefined,
        isRegistered: true,
        pinCode
      };

      const success = registerTag(newTag);
      setIsRegistering(false);

      if (success) {
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          loadTag(); // Refresh the view to show the registered tag profile!
        }, 1500);
      } else {
        setRegisterError("Failed to register. A tag with this ID is already secured with a different PIN.");
      }
    }, 1200);
  };

  const handleSendFinderAlert = () => {
    if (!finderNote.trim()) return;
    setIsSendingAlert(true);

    setTimeout(() => {
      setIsSendingAlert(false);
      setAlertSuccess(true);
      setFinderNote("");
      
      // Play soft wave audio chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {}
    }, 1800);
  };

  const handleGenerateAIMessage = async () => {
    if (!ownerName) {
      setRegisterError("Please enter your Owner Name first so the AI can customize your message.");
      return;
    }
    setIsGeneratingMessage(true);
    try {
      const response = await fetch("/api/gemini/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ownerName,
          mode: nfcMode,
          context: aiPromptContext || `Seashell keychain tag ${tagId}`
        }),
      });
      const data = await response.json();
      if (data.text) {
        setMessage(data.text);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Background soft ocean ripples */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_50%)]" />

      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-teal-100 overflow-hidden relative flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Header bar */}
        <div className="bg-linear-to-r from-teal-950 to-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-teal-900/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/40 animate-pulse text-teal-300">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">Oceanic NFC Sea-Tap Gateway</h3>
              <p className="text-[10px] text-teal-300/80 font-mono font-medium uppercase tracking-wide">ID: {tagId}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-teal-100 hover:text-white"
          >
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Modal content area (scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STATE A: TAG IS REGISTERED (Finder Portal) */}
          {tagData && !isNewTag && (
            <div className="space-y-6" id="scanned-active-tag">
              
              {/* Status Alert Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-teal-950 text-xs sm:text-sm">Verified Seashell Secure Connection</h4>
                  <p className="text-[11px] text-teal-900/70 mt-0.5 leading-relaxed">
                    This authentic handcrafted seashell was read successfully. The profile below is actively monitored and verified by the owner.
                  </p>
                </div>
              </div>

              {/* Owner Profile Grid */}
              <div className="bg-slate-50 border border-teal-100/30 rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-teal-100/30 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest font-mono">Matched Seashell Owner</span>
                    <h2 className="text-xl font-extrabold text-teal-950">{tagData.ownerName}</h2>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-800 border border-teal-500/20">
                    {tagData.nfcMode.toUpperCase()} Active Card
                  </span>
                </div>

                {/* Custom owner message inside serene speech bubble */}
                <div className="relative">
                  <div className="bg-white p-4 rounded-2xl border border-teal-100/50 shadow-xs text-xs sm:text-sm text-teal-950 italic leading-relaxed">
                    "{tagData.message}"
                  </div>
                </div>

                {/* Emergency indicator if active */}
                {tagData.nfcMode === NFCMode.EMERGENCY && tagData.emergencyInfo && (
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs">
                    <span className="block text-[9px] uppercase font-bold text-rose-800 font-mono tracking-wider mb-1">
                      🚨 Critical Emergency / ICE Information
                    </span>
                    <p className="font-bold text-rose-950 leading-relaxed text-sm">{tagData.emergencyInfo}</p>
                  </div>
                )}

                {/* Social links if active */}
                {tagData.nfcMode === NFCMode.SOCIAL && tagData.socialLink && (
                  <a
                    href={tagData.socialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-linear-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 py-3 rounded-xl text-xs font-extrabold text-white block transition-all shadow-md tracking-wider font-mono uppercase"
                  >
                    🔗 Visit Owner's Social Space
                  </a>
                )}

                {/* Interactive contact buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`tel:${tagData.phone}`}
                    className="rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200/50 py-3 text-xs font-bold text-teal-900 text-center flex items-center justify-center gap-2 transition-all shadow-2xs"
                  >
                    <Phone className="h-4 w-4 text-teal-600" />
                    <span>Call Owner</span>
                  </a>
                  <a
                    href={`mailto:${tagData.email}`}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 py-3 text-xs font-bold text-white text-center flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Mail className="h-4 w-4 text-teal-300" />
                    <span>Email securely</span>
                  </a>
                </div>
              </div>

              {/* Anonymous Finder Notification Dispatcher */}
              <div className="bg-white border border-teal-100 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs sm:text-sm text-teal-950">Send Instant Sea-Wave Recovery Alert</h4>
                  <p className="text-[11px] text-teal-900/60 leading-relaxed">
                    Leave a quick note for the owner (e.g. your location or phone). Clicking dispatch will instantly trigger an anonymous notification email with mock GPS tracking coordinates to help them recover it.
                  </p>
                </div>

                {alertSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center space-y-2 animate-fade-in">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                    <h5 className="font-bold text-xs text-emerald-800">Alert Dispatched to {tagData.ownerName}!</h5>
                    <p className="text-[11px] text-teal-900/70">
                      The coordinates and your note have been sent securely. Thank you for your amazing coastal kindness! 🌊🐚
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      rows={2}
                      value={finderNote}
                      onChange={(e) => setFinderNote(e.target.value)}
                      placeholder="E.g. Found your keys near lifeguard tower at Sunset Beach! Left them with the beachfront cafe manager."
                      className="w-full text-xs p-3 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 leading-relaxed placeholder-teal-300"
                    />

                    <button
                      onClick={handleSendFinderAlert}
                      disabled={isSendingAlert || !finderNote.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-3 text-xs font-bold text-white transition-all disabled:opacity-40 cursor-pointer shadow-md"
                    >
                      {isSendingAlert ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Dispatch Anonymous Alert & GPS</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STATE B: NEW TAG DETECTED (Activation Form) */}
          {isNewTag && (
            <div className="space-y-6" id="scanned-unregistered-tag">
              
              {/* Warning/Intro card */}
              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-teal-600 flex items-center justify-center text-white">
                  <Compass className="h-5 w-5 animate-spin" />
                </div>
                <div>
                  <h4 className="font-bold text-teal-950 text-xs sm:text-sm">Unregistered Seashell Tag Detected!</h4>
                  <p className="text-[11px] text-teal-900/70 mt-0.5 leading-relaxed">
                    This is your physical seashell keychain's unique ID. It is currently unassigned in our local database. Complete the quick activation form below to bind your contact info!
                  </p>
                </div>
              </div>

              {/* Activation Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                
                {registerError && (
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{registerError}</span>
                  </div>
                )}

                {registerSuccess && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center text-xs text-emerald-800 flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 animate-bounce text-emerald-600" />
                    <span className="font-bold">Seashell successfully registered! Booting profile...</span>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide mb-1">Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g. Taylor Beachcomber"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide mb-1">Active Mode *</label>
                    <select
                      value={nfcMode}
                      onChange={(e) => setNfcMode(e.target.value as NFCMode)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans bg-white"
                    >
                      <option value={NFCMode.CONTACT}>Contact Card Mode</option>
                      <option value={NFCMode.EMERGENCY}>Medical Emergency ICE</option>
                      <option value={NFCMode.SOCIAL}>Social Portfolio Mode</option>
                      <option value={NFCMode.STORY}>Travel Sea Story</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide mb-1">Recovery Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="E.g. +1 (555) 321-4820"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide mb-1">Secure Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="E.g. taylor@oceanicnfc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono"
                    />
                  </div>

                  {/* Mode specific fields */}
                  {nfcMode === NFCMode.EMERGENCY && (
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-rose-800 uppercase tracking-wide mb-1">🚨 Vital Medical & Emergency Contacts *</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g. Penicillin Allergy. ICE Husband: John +1 (555) 123-4567"
                        value={emergencyInfo}
                        onChange={(e) => setEmergencyInfo(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-rose-100 bg-rose-50/10 focus:outline-hidden focus:border-rose-500 font-sans font-bold text-rose-950"
                      />
                    </div>
                  )}

                  {nfcMode === NFCMode.SOCIAL && (
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-sky-800 uppercase tracking-wide mb-1">🔗 Social Portfolio URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="E.g. https://instagram.com/my_ocean_adventure"
                        value={socialLink}
                        onChange={(e) => setSocialLink(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-sky-100 bg-sky-50/10 focus:outline-hidden focus:border-sky-500 font-mono text-sky-950"
                      />
                    </div>
                  )}

                  {/* Recovery message & AI */}
                  <div className="sm:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide">Custom Recovery Instructions Message</label>
                      <span className="text-[10px] text-teal-600 font-mono font-semibold">Step 2: Custom Text</span>
                    </div>

                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write custom lost-and-found instructions here..."
                      className="w-full text-xs p-3 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 leading-relaxed font-sans"
                    />

                    {/* AI Message Assistant */}
                    <div className="rounded-2xl bg-teal-50/30 p-3.5 border border-teal-100/50 space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-teal-600 animate-pulse" />
                        <span className="text-xs font-bold text-teal-950">Seaside AI Message Writer</span>
                      </div>
                      <p className="text-[10px] text-teal-900/60 leading-relaxed font-medium">
                        Need some inspiration? Provide a quick keyword (e.g. "for dog scout" or "hiking backpack reward") and let Gemini compose a pristine coastal recovery message for you.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="E.g. For keys, please call me, offering a big reward..."
                          value={aiPromptContext}
                          onChange={(e) => setAiPromptContext(e.target.value)}
                          className="flex-1 text-[11px] px-3 py-1.5 rounded-lg border border-teal-100 focus:outline-hidden focus:border-teal-500 bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleGenerateAIMessage}
                          disabled={isGeneratingMessage}
                          className="inline-flex items-center justify-center rounded-lg bg-teal-600 hover:bg-teal-700 px-3.5 py-1.5 text-[11px] font-bold text-white cursor-pointer disabled:opacity-50 transition-colors"
                        >
                          {isGeneratingMessage ? (
                            <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <span>Compose AI</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PIN lock */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-bold text-teal-900 uppercase tracking-wide">
                        Create 4-Digit Security PIN *
                      </label>
                      <span className="text-[10px] text-teal-600 font-mono">For future edits</span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-teal-400" />
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        maxLength={4}
                        placeholder="E.g. 1234"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-teal-100 focus:outline-hidden focus:border-teal-500 font-mono tracking-widest text-teal-950 font-bold"
                      />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isRegistering || registerSuccess}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-3.5 text-xs font-bold text-white transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isRegistering ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Activate Physical Seashell Tag Now</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          )}

        </div>

        {/* Footer with marine pledge */}
        <div className="bg-slate-50 p-4 border-t border-teal-50 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
          <p className="text-[10px] text-teal-900/50 flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-extrabold text-teal-950">Oceanic NFC</span>
          </p>
          <p className="text-[10px] text-teal-900/50 flex items-center gap-1">
            <span>Authentic Seashell Safe Network</span>
            <Heart className="h-3 w-3 text-rose-500 fill-current" />
          </p>
        </div>

      </div>
    </div>
  );
}
