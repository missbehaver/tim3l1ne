/**
 * Zustand Store for Archive Heart Timeline
 * Manages global app state (data, skin selection, timeline)
 */

import { create } from 'zustand';
import { TimelineStore, SpotifyTrack, TimelineData, Skin } from '@/types';
import { getDefaultSkin } from '@/skins';

export const useTimelineStore = create<TimelineStore>((set) => ({
  // Initial state
  csvData: [],
  processedData: null,
  currentSkin: getDefaultSkin(),
  selectedYear: null,

  // Action: Set uploaded CSV data
  setCSVData: (data: SpotifyTrack[]) =>
    set({ csvData: data }),

  // Action: Set processed timeline data
  setProcessedData: (data: TimelineData) =>
    set({ processedData: data }),

  // Action: Change the current skin
  setCurrentSkin: (skin: Skin) =>
    set({ currentSkin: skin }),

  // Action: Select a specific year to display
  setSelectedYear: (year: number | null) =>
    set({ selectedYear: year }),

  // Action: Clear all data (used when resetting)
  clearAll: () =>
    set({
      csvData: [],
      processedData: null,
      currentSkin: getDefaultSkin(),
      selectedYear: null,
    }),
}));

/**
 * Custom hook to access CSV data
 */
export const useCSVData = () => {
  const csvData = useTimelineStore((state) => state.csvData);
  const setCSVData = useTimelineStore((state) => state.setCSVData);
  return { csvData, setCSVData };
};

/**
 * Custom hook to access processed timeline
 */
export const useTimelineData = () => {
  const processedData = useTimelineStore((state) => state.processedData);
  const setProcessedData = useTimelineStore((state) => state.setProcessedData);
  return { processedData, setProcessedData };
};

/**
 * Custom hook to access skin selection
 */
export const useSkin = () => {
  const currentSkin = useTimelineStore((state) => state.currentSkin);
  const setCurrentSkin = useTimelineStore((state) => state.setCurrentSkin);
  return { currentSkin, setCurrentSkin };
};

/**
 * Custom hook to access year selection
 */
export const useYearSelection = () => {
  const selectedYear = useTimelineStore((state) => state.selectedYear);
  const setSelectedYear = useTimelineStore((state) => state.setSelectedYear);
  return { selectedYear, setSelectedYear };
};
