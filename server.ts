/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or is a placeholder. Using mock responses for fallback.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) || 3000;

  // Endpoint 1: Generate personalized lost-and-found NFC recovery messages
  app.post("/api/gemini/generate-message", async (req, res) => {
    const { name, mode, context } = req.body;

    if (!name || !mode) {
      return res.status(400).json({ error: "Missing required parameters (name, mode)." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isMock = !apiKey || apiKey === "MY_GEMINI_API_KEY";

    if (isMock) {
      // Return a beautiful, high-quality, simulated response if key is missing
      const mockMessages: Record<string, string> = {
        contact: `Hello! If found, please return this to ${name}. It holds precious memories, and a reward will be warmly offered! Please reach out to the contact details below. Thank you for your kindness! 🐚`,
        emergency: `EMERGENCY MEDICAL CARD for ${name}. If found in an emergency, please scan this tag immediately to view critical medical indicators and emergency contacts. Your quick action can make all the difference.`,
        social: `Greetings, fellow beachcomber! You've scanned ${name}'s digital shell card. Connect with me on social media or browse my projects through the links below. Let's make waves! 🌊`,
        story: `Ahoy! You found ${name}'s travel seashell companion! This shell was picked up on a quiet coastal morning. Feel free to follow my journey or get in touch below to return it. May the sea-winds guide you! ⛵`,
      };
      const responseText = mockMessages[mode] || `Hello, you've found ${name}'s NFC Seashell. Please help return it by calling the details below!`;
      return res.json({ text: responseText, isMock: true });
    }

    try {
      const ai = getGeminiClient();
      const prompt = `Write a short, engaging, polite, and clear lost-and-found or tag message for an NFC seashell accessory.
Owner Name: ${name}
Accessory Mode: ${mode} (options: contact card, emergency card, social portfolio, custom travel story)
Additional Context: ${context || "None"}

Please keep the tone matching a serene, elegant seaside product. Limit the message to 2-3 warm, scannable sentences. Include a marine-themed emoji (e.g. 🐚, 🌊, ⛵, 🐳) if fitting. Do not include placeholders; write a ready-to-use message.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an elegant, polite sea-themed assistant for Oceanic NFC Seashell Keychains. Your writing is clean, elegant, warm, and comforting.",
        }
      });

      return res.json({ text: response.text, isMock: false });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Failed to generate message via Gemini AI." });
    }
  });

  // Endpoint 2: Customer support chat helper powered by Gemini
  app.post("/api/gemini/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isMock = !apiKey || apiKey === "MY_GEMINI_API_KEY";

    if (isMock) {
      const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let mockReply = "Hello! I am your Oceanic Guide. I can tell you all about our NFC Seashell accessories! How can I help you today? 🌊";
      
      if (lastUserMsg.includes("nfc") || lastUserMsg.includes("work")) {
        mockReply = "Our seashells have a high-performance NFC chip embedded inside marine-grade protective resin. No batteries are needed! When an iPhone or Android phone is tapped close to the shell, it reads the chip instantly using electromagnetic induction, opening your personalized recovery portal. 🐚";
      } else if (lastUserMsg.includes("water") || lastUserMsg.includes("durab")) {
        mockReply = "Yes, they are 100% waterproof and salt-resistant! We seal the microchips deep within authentic, hand-gathered scallop, cowrie, and conch shells using high-clarity resin. You can swim, dive, or walk in the rain without ever worrying. 🌊";
      } else if (lastUserMsg.includes("lost") || lastUserMsg.includes("find")) {
        mockReply = "If you lose your keys or bag, a friendly finder can tap their phone to the seashell. This immediately brings up your custom recovery page with contact options, ICE details, or a custom message. They can send a secure, anonymous email alert with their location coordinates to help you retrieve it! 📍";
      } else if (lastUserMsg.includes("accessory") || lastUserMsg.includes("bracelet") || lastUserMsg.includes("necklace")) {
        mockReply = "Right now, we actively offer the Original Seashell NFC Keychain. However, we have a beautiful tidal anklet, braided necklace, and a nautilus luggage tag coming very soon in our next product drop! You can view and preorder them in our Catalog. 📿";
      } else if (lastUserMsg.includes("private") || lastUserMsg.includes("secure")) {
        mockReply = "Security is our absolute priority. You can lock your shell's digital data with a personal PIN code. This prevents anyone from modifying your info. Plus, you can instantly turn off or update your public profile anytime from our dashboard. 🔒";
      }
      return res.json({ text: mockReply, isMock: true });
    }

    try {
      const ai = getGeminiClient();
      const systemPrompt = `You are "Koral", a friendly, polished, and highly knowledgeable Oceanic Guide for our brand "Oceanic NFC Seashells".
Our product is a collection of hand-gathered natural seashells (keychains, anklets, luggage tags) embedded with high-quality, completely waterproof, battery-free NFC chips.
Finders can tap their phone to the seashell to immediately see the owner's chosen recovery card (contact, emergency/ICE, social links, or custom notes) and notify them safely.

Rules:
1. Speak in a warm, polite, and elegant tone with subtle marine/ocean themes (e.g., tides, shores, shells, ripples).
2. Answer questions about how the NFC seashells work, compatibility (works on iPhone XR+ and modern Androids automatically, no app required to scan), waterproof qualities (fully sealed in marine-grade resin, completely seawater-proof), future accessories (anklets, braided necklaces, luggage tags), and security (lockable with a PIN, fully customizable data).
3. Keep answers concise, highly readable, and friendly. Do not invent non-existent features, but answer accurately based on the beach product's specifications.`;

      // Format messages into chat format for GoogleGenAI SDK
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text, isMock: false });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      return res.status(500).json({ error: "Failed to communicate with Koral, your Oceanic Guide." });
    }
  });

  // Vite integration for full-stack rendering
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oceanic NFC backend running on http://localhost:${PORT}`);
  });
}

startServer();
