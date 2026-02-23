/**
 * CSV Parsing and Validation
 * Converts raw Spotify CSV into typed SpotifyTrack objects
 */

import { SpotifyTrack } from '@/types';
import Papa from 'papaparse';

/**
 * Parse Spotify CSV file
 * Expected columns: endTime, artistName, trackName, msPlayed
 * 
 * @param file - CSV File from upload
 * @returns Promise resolving to array of SpotifyTrack objects
 */
export async function parseSpotifyCSV(file: File): Promise<SpotifyTrack[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,           // First row contains column names
      skipEmptyLines: true,   // Ignore empty rows
      dynamicTyping: false,   // Keep everything as strings for now
      complete: (results) => {
        try {
          // Transform CSV rows into SpotifyTrack objects
          const tracks = (results.data as Record<string, string>[])
            .filter((row) => row.endTime && row.trackName && row.artistName)
            .map((row) => {
              const date = new Date(row.endTime);
              return {
                endTime: row.endTime,
                artistName: row.artistName.trim(),
                trackName: row.trackName.trim(),
                msPlayed: parseInt(row.msPlayed) || 0,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
              };
            });

          resolve(tracks);
        } catch (error) {
          reject(new Error(`Failed to parse CSV: ${error}`));
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
}

/**
 * Validate that we have the required columns
 * @param headers - Column headers from CSV
 * @returns true if all required columns present
 */
export function validateCSVHeaders(headers: string[]): boolean {
  const required = ['endTime', 'artistName', 'trackName', 'msPlayed'];
  return required.every((col) => headers.includes(col));
}

/**
 * Merge multiple CSV datasets
 * Used when user uploads multiple years
 * 
 * @param datasets - Array of SpotifyTrack arrays
 * @returns Combined and deduplicated array
 */
export function mergeCSVDatasets(...datasets: SpotifyTrack[][]): SpotifyTrack[] {
  const allTracks = datasets.flat();
  
  // Remove duplicates (same artist + track + time)
  const unique = new Map<string, SpotifyTrack>();
  for (const track of allTracks) {
    const key = `${track.artistName}|${track.trackName}|${track.endTime}`;
    if (!unique.has(key)) {
      unique.set(key, track);
    }
  }

  // Sort by date
  return Array.from(unique.values()).sort(
    (a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
  );
}
