/**
 * Core Type Definitions for Archive Heart Timeline
 * These describe the shape of data throughout the app
 */

// Represents a single Spotify song
export interface SpotifyTrack {
  endTime: string;        // ISO timestamp when song finished
  artistName: string;     // Artist name
  trackName: string;      // Song title
  msPlayed: number;       // Milliseconds listened
  year?: number;          // Extracted year from endTime
  month?: number;         // Extracted month from endTime
  emotion?: string;       // Detected emotion (happy, sad, energetic, calm)
  energyLevel?: number;   // 0-1 energy intensity
}

// A single day's listening data
export interface DayData {
  date: Date;
  tracks: SpotifyTrack[];
  totalMinutes: number;
  dominantEmotion: string;
}

// Full collection of processed listening data
export interface TimelineData {
  tracks: SpotifyTrack[];
  yearRange: {
    start: number;
    end: number;
  };
  totalMinutes: number;
  stats: {
    totalSongs: number;
    uniqueArtists: number;
    mostPlayedArtist: string;
  };
}

// Represents a color scheme for a skin
export interface SkinColorScheme {
  primary: string;        // Main color (hex)
  secondary: string;      // Accent color
  background: string;     // Background color
  text: string;          // Text color
  happy: string;         // Color for happy/positive emotions
  sad: string;           // Color for sad/melancholic emotions
  energetic: string;     // Color for energetic/upbeat
  calm: string;          // Color for calm/peaceful
}

// A visual theme/skin definition
export interface Skin {
  id: string;            // Unique identifier (cityscape, futuristic, etc.)
  name: string;          // Display name
  colors: SkinColorScheme;
  description: string;   // What makes this skin special
  pattern?: string;      // Optional SVG pattern or texture
}

// App state for Zustand store
export interface TimelineStore {
  // Data
  csvData: SpotifyTrack[];
  processedData: TimelineData | null;
  currentSkin: Skin;
  selectedYear: number | null;
  
  // Actions
  setCSVData: (data: SpotifyTrack[]) => void;
  setProcessedData: (data: TimelineData) => void;
  setCurrentSkin: (skin: Skin) => void;
  setSelectedYear: (year: number | null) => void;
  clearAll: () => void;
}

// Shared/viewable timeline (what gets compressed into URL)
export interface ShareableTimeline {
  tracks: SpotifyTrack[];
  skinId: string;
  metadata: {
    createdAt: string;
    version: string;
  };
}
