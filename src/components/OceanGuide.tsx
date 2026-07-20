/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, X, Send, Compass, Waves, CheckCircle2 } from "lucide-react";

export default function OceanGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Greetings, voyager! I am Koral, your Oceanic Guide. I can share everything about our battery-free, waterproof NFC seashell keychains and upcoming drops! Ask me anything! 🐚🌊",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    "How does the NFC seashell chip work?",
    "Are these shells fully waterproof?",
    "Do they need batteries?",
    "Are there other accessories coming?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Gather chat history
      const historyPayload = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyPayload }),
      });

      const data = await response.json();
      
      const modelReply: ChatMessage = {
        role: "model",
        text: data.text || "Apologies, voyager! The marine waves got slightly tangled. Can you ask me again?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, modelReply]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I apologize, my communication tides are unstable at the moment. Please rest assured our seashells are waterproof, passive (no batteries), and 100% natural! 🐚",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="ocean-guide-container">
      
      {/* 1. FLOATING ACTION TRIGGER CLAM SHELL BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer group"
          aria-label="Open Oceanic Support Chatbot"
          id="ocean-guide-trigger"
        >
          {/* Pulsing sea foam wave circle */}
          <div className="absolute inset-0 rounded-full border border-teal-400 animate-ping opacity-25" />
          
          <MessageSquare className="h-6 w-6 text-white group-hover:rotate-6 transition-transform" />
          
          {/* Unread dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 border-2 border-white" />
        </button>
      )}

      {/* 2. CHAT PANEL INTERFACE */}
      {isOpen && (
        <div className="w-80 sm:w-92 h-120 bg-white rounded-3xl border border-teal-100 shadow-2xl overflow-hidden flex flex-col justify-between animate-slide-in" id="ocean-guide-panel">
          
          {/* Chat Header */}
          <div className="px-4 py-4 border-b border-teal-100/35 flex items-center justify-between bg-linear-to-r from-teal-600 via-emerald-600 to-sky-600 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-lg shadow-inner">
                🧜‍♀️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-none flex items-center gap-1.5">
                  <span>Koral</span>
                  <span className="text-[8px] bg-teal-500/30 text-teal-100 rounded-md px-1 py-0.2 font-mono font-bold uppercase">AI Guide</span>
                </h4>
                <p className="text-[10px] text-teal-100/80 mt-0.5 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span>Sailing online</span>
                </p>
              </div>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 text-white rounded-lg cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 items-start max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {m.role === "model" && (
                  <div className="h-6.5 w-6.5 rounded-full bg-teal-100 flex items-center justify-center text-xs shrink-0 font-sans shadow-xs">
                    🐚
                  </div>
                )}
                
                <div className="space-y-0.5">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user" 
                      ? "bg-teal-600 text-white rounded-tr-xs" 
                      : "bg-white text-teal-950 border border-teal-100/40 shadow-xs rounded-tl-xs"
                  }`}>
                    {m.text}
                  </div>
                  <span className="block text-[8px] text-slate-400 font-medium font-mono px-1">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-start max-w-[80%]">
                <div className="h-6.5 w-6.5 rounded-full bg-teal-100 flex items-center justify-center text-xs shrink-0 animate-bounce">
                  🐚
                </div>
                <div className="bg-white text-slate-500 p-2.5 rounded-2xl text-xs border border-teal-100/30 flex items-center gap-1.5 rounded-tl-xs shadow-xs">
                  <Waves className="h-3 w-3 text-teal-500 animate-spin" />
                  <span className="font-medium">Formulating currents...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Preset question chips */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-teal-50 flex flex-wrap gap-1.5 bg-white">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="rounded-full bg-teal-50 hover:bg-teal-100 px-3 py-1 text-[9px] font-bold text-teal-800 transition-colors text-left cursor-pointer truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat input form */}
          <div className="p-3 border-t border-teal-100/35 bg-white flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              placeholder="Ask Koral about keychains..."
              className="flex-1 text-xs px-3.5 py-2 rounded-full border border-teal-100 focus:outline-hidden focus:border-teal-500 font-sans"
              id="chatbot-text-input"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isTyping || !inputValue.trim()}
              className="h-8 w-8 shrink-0 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
              id="chatbot-send-button"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
