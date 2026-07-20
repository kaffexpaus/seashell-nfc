/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SeashellNFCData, NFCMode } from "../types";

const DEFAULT_REGISTRY: SeashellNFCData[] = [
  {
    id: "SHELL-4820-TIDAL",
    ownerName: "Taylor Beachcomber",
    phone: "+1 (555) 321-4820",
    email: "taylor@oceanicnfc.com",
    nfcMode: NFCMode.CONTACT,
    message: "Ahoy! You found my keys tagged with seashell. This keychain holds deep memories for me. Please use the contact buttons below to help bring it home! Reward offered.",
    isRegistered: true,
    pinCode: "1234",
  },
  {
    id: "SHELL-1209-SCALLOP",
    ownerName: "Jamie Ocean-Heart",
    phone: "+1 (555) 723-9182",
    email: "jamie.ocean@sky.com",
    nfcMode: NFCMode.CONTACT,
    message: "Hello! If found, please notify me. This gym bag has my work gear inside. Thank you so much!",
    isRegistered: true,
    pinCode: "1111",
  },
  {
    id: "SHELL-9944-COWRIE",
    ownerName: "Alex Coastal",
    phone: "+1 (555) 601-3829",
    email: "alex.coastal@gmail.com",
    nfcMode: NFCMode.SOCIAL,
    message: "Scout is our playful golden retriever! He has a shell tag on his collar. Please contact us immediately if Scout is wander-walking alone! Thank you!",
    socialLink: "https://instagram.com/scout_the_beach_dog",
    isRegistered: true,
    pinCode: "2222",
  }
];

export function getRegistry(): SeashellNFCData[] {
  const local = localStorage.getItem("oceanic_nfc_registry");
  if (!local) {
    localStorage.setItem("oceanic_nfc_registry", JSON.stringify(DEFAULT_REGISTRY));
    return DEFAULT_REGISTRY;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return DEFAULT_REGISTRY;
  }
}

export function saveRegistry(registry: SeashellNFCData[]) {
  localStorage.setItem("oceanic_nfc_registry", JSON.stringify(registry));
}

export function getTagById(id: string): SeashellNFCData | undefined {
  const registry = getRegistry();
  return registry.find(tag => tag.id.toUpperCase() === id.toUpperCase());
}

export function registerTag(tag: SeashellNFCData): boolean {
  const registry = getRegistry();
  const index = registry.findIndex(t => t.id.toUpperCase() === tag.id.toUpperCase());
  
  if (index >= 0) {
    // If already registered and has pin, verify pin
    const existing = registry[index];
    if (existing.isRegistered && existing.pinCode && existing.pinCode !== tag.pinCode) {
      return false; // Authentication failed
    }
    registry[index] = { ...tag, isRegistered: true };
  } else {
    registry.push({ ...tag, isRegistered: true });
  }
  
  saveRegistry(registry);
  return true;
}
