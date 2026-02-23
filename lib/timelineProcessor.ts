/**
 * Timeline Data Processing
 * Transforms raw track data into structured timeline format
 */

import { SpotifyTrack, TimelineData } from '@/types';

/**
 * Calculate total listening time in minutes
 * @param tracks - Array of tracks
 * @returns Total minutes listened
 */
export function calculateTotalMinutes(tracks: SpotifyTrack[]): number {
  const totalMs = tracks.reduce((sum, track) => sum + track.msPlayed, 0);
  return Math.round(totalMs / 60000); // Convert ms to minutes
}

/**
 * Get the year range from tracks
 * @param tracks - Array of tracks
 * @returns { start, end } year range
 */
export function getYearRange(tracks: SpotifyTrack[]): { start: number; end: number } {
  const years = tracks
    .map((t) => new Date(t.endTime).getFullYear())
    .filter((y) => !isNaN(y));

  if (years.length === 0) {
    return { start: new Date().getFullYear(), end: new Date().getFullYear() };
  }

  return {
    start: Math.min(...years),
    end: Math.max(...years),
  };
}

/**
 * Get unique artists
 * @param tracks - Array of tracks
 * @returns Array of unique artist names
 */
export function getUniqueArtists(tracks: SpotifyTrack[]): string[] {
  return [...new Set(tracks.map((t) => t.artistName))];
}

/**
 * Find most played artist
 * @param tracks - Array of tracks
 * @returns Artist name with most plays
 */
export function getMostPlayedArtist(tracks: SpotifyTrack[]): string {
  const artistCounts = new Map<string, number>();

  for (const track of tracks) {
    const current = artistCounts.get(track.artistName) || 0;
    artistCounts.set(track.artistName, current + 1);
  }

  let topArtist = '';
  let maxCount = 0;

  for (const [artist, count] of artistCounts) {
    if (count > maxCount) {
      maxCount = count;
      topArtist = artist;
    }
  }

  return topArtist;
}

/**
 * Process raw tracks into structured TimelineData
 * @param tracks - Array of raw SpotifyTrack objects
 * @returns Fully processed TimelineData
 */
export function processTimelineData(tracks: SpotifyTrack[]): TimelineData {
  if (tracks.length === 0) {
    throw new Error('No tracks to process');
  }

  const yearRange = getYearRange(tracks);
  const totalMinutes = calculateTotalMinutes(tracks);
  const uniqueArtists = getUniqueArtists(tracks);
  const mostPlayedArtist = getMostPlayedArtist(tracks);

  return {
    tracks,
    yearRange,
    totalMinutes,
    stats: {
      totalSongs: tracks.length,
      uniqueArtists: uniqueArtists.length,
      mostPlayedArtist,
    },
  };
}

/**
 * Filter tracks by year
 * @param tracks - Array of tracks
 * @param year - Year to filter for
 * @returns Tracks from that year
 */
export function filterByYear(tracks: SpotifyTrack[], year: number): SpotifyTrack[] {
  return tracks.filter((t) => new Date(t.endTime).getFullYear() === year);
}

/**
 * Get tracks grouped by year
 * @param tracks - Array of tracks
 * @returns Map of year -> tracks
 */
export function groupByYear(
  tracks: SpotifyTrack[]
): Map<number, SpotifyTrack[]> {
  const grouped = new Map<number, SpotifyTrack[]>();

  for (const track of tracks) {
    const year = new Date(track.endTime).getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(track);
  }

  return grouped;
}

/**
 * Calculate statistics for a year
 * @param yearTracks - Tracks from a specific year
 * @returns Year statistics
 */
export function getYearStats(yearTracks: SpotifyTrack[]) {
  const totalMinutes = calculateTotalMinutes(yearTracks);
  const uniqueArtists = getUniqueArtists(yearTracks).length;
  const mostPlayedArtist = getMostPlayedArtist(yearTracks);

  return {
    totalSongs: yearTracks.length,
    totalMinutes,
    uniqueArtists,
    mostPlayedArtist,
  };
}
