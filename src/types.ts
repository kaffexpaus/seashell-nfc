/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ShellType {
  SCALLOP = "scallop",
  CONCH = "conch",
  COWRIE = "cowrie",
  STARFISH = "starfish"
}

export enum TetherType {
  SILVER_CHAIN = "silver-chain",
  GOLD_CHAIN = "gold-chain",
  LEATHER_LOOP = "leather-loop",
  SEA_GRASS = "sea-grass"
}

export enum AccentMetal {
  SILVER = "silver",
  GOLD = "gold",
  BRONZE = "bronze"
}

export enum NFCMode {
  CONTACT = "contact",
  EMERGENCY = "emergency",
  SOCIAL = "social",
  STORY = "story"
}

export interface SeashellConfig {
  shellType: ShellType;
  tetherType: TetherType;
  accentMetal: AccentMetal;
  nfcMode: NFCMode;
  engravingText: string;
}

export interface SeashellNFCData {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  nfcMode: NFCMode;
  message: string;
  socialLink?: string;
  emergencyInfo?: string;
  isRegistered: boolean;
  pinCode?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  config?: SeashellConfig;
  imageUrl?: string;
  quantity: number;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}
