/**
 * Skin Definitions
 * Each skin is a visual theme with its own color palette and personality
 */

import { Skin } from '@/types';

export const SKINS: Record<string, Skin> = {
  cityscape: {
    id: 'cityscape',
    name: 'Cityscape',
    description: 'Urban geometry with neon accents. Your listening as a bustling metropolis.',
    colors: {
      primary: '#1a1a2e',      // Dark charcoal
      secondary: '#16213e',    // Deeper navy
      background: '#0f3460',   // Dark blue
      text: '#eaeaea',         // Light gray
      happy: '#ff006e',        // Neon pink
      sad: '#4361ee',          // Neon blue
      energetic: '#ffbe0b',    // Neon yellow
      calm: '#00bbf9',         // Neon cyan
    },
  },
  
  futuristic: {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Holographic and sleek. Your music as cutting-edge technology.',
    colors: {
      primary: '#0a0e27',      // Deep space black
      secondary: '#1a1f3a',    // Blue-black
      background: '#0f1419',   // Almost black
      text: '#ffffff',         // Pure white
      happy: '#00ff88',        // Neon green
      sad: '#ff006e',          // Hot pink
      energetic: '#00d4ff',    // Cyan
      calm: '#a78bfa',         // Purple
    },
  },
  
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Flowing blues and teals. Your listening as waves and currents.',
    colors: {
      primary: '#0a3d62',      // Deep ocean blue
      secondary: '#1f5a7a',    // Medium sea blue
      background: '#164863',   // Teal-blue
      text: '#e8f4f8',         // Light cyan
      happy: '#76c893',        // Sea green
      sad: '#3d5a80',          // Deep blue
      energetic: '#ee964b',    // Coral
      calm: '#4ecdc4',         // Turquoise
    },
  },
  
  minimalistic: {
    id: 'minimalistic',
    name: 'Minimalistic Modern Art',
    description: 'Clean lines and breathing space. Your music distilled to essence.',
    colors: {
      primary: '#ffffff',      // Pure white
      secondary: '#f5f5f5',    // Off-white
      background: '#fafafa',   // Light gray-white
      text: '#1a1a1a',         // Dark charcoal
      happy: '#ff6b35',        // Warm orange
      sad: '#004e89',          // Deep blue
      energetic: '#f7931e',    // Gold
      calm: '#95b8d1',         // Soft blue
    },
  },
  
  sparkly_space: {
    id: 'sparkly_space',
    name: 'Sparkly Space',
    description: 'Cosmic wonder with glitter and stars. Your music as the universe.',
    colors: {
      primary: '#0b0014',      // Deep purple-black
      secondary: '#200030',    // Dark purple
      background: '#0d0011',   // Almost black
      text: '#e0d5ff',         // Lavender white
      happy: '#ffd700',        // Gold star
      sad: '#4a0080',          // Deep purple
      energetic: '#ff1493',    // Deep pink
      calm: '#00ffff',         // Cyan
    },
  },
  
  girly_pink: {
    id: 'girly_pink',
    name: 'Girly Pink Pastel Flowers',
    description: 'Soft, dreamy, and floral. Your music as a flower garden in spring.',
    colors: {
      primary: '#fce4ec',      // Light pink
      secondary: '#f8bbd0',    // Medium pink
      background: '#fff0f5',   // Very light pink
      text: '#880e4f',         // Deep wine
      happy: '#f06292',        // Pink
      sad: '#ce93d8',          // Light purple
      energetic: '#ff80ab',    // Hot pink
      calm: '#b39ddb',         // Soft purple
    },
  },
};

/**
 * Get a skin by ID
 * @param skinId - The skin identifier
 * @returns The Skin object, or default if not found
 */
export function getSkinById(skinId: string): Skin {
  return SKINS[skinId] || SKINS.ocean;
}

/**
 * Get all available skins
 * @returns Array of all skins
 */
export function getAllSkins(): Skin[] {
  return Object.values(SKINS);
}

/**
 * Get default skin for new users
 * @returns The Ocean skin as default
 */
export function getDefaultSkin(): Skin {
  return SKINS.ocean;
}
