/**
 * URL Sharing and Compression
 * Compresses timeline data into shareable URLs
 * Uses lz-string for compression to keep URLs reasonable length
 */

import { SpotifyTrack, ShareableTimeline } from '@/types';
import * as LZ from 'lz-string';

/**
 * Create a shareable timeline object
 * @param tracks - Array of tracks to share
 * @param skinId - Current skin ID
 * @returns ShareableTimeline object
 */
export function createShareableTimeline(
  tracks: SpotifyTrack[],
  skinId: string
): ShareableTimeline {
  return {
    tracks,
    skinId,
    metadata: {
      createdAt: new Date().toISOString(),
      version: '1.0.0',
    },
  };
}

/**
 * Compress timeline data into a URL-safe string
 * @param timeline - ShareableTimeline object
 * @returns Compressed base64 string
 */
export function compressTimeline(timeline: ShareableTimeline): string {
  try {
    const json = JSON.stringify(timeline);
    const compressed = LZ.compressToBase64(json);
    return compressed;
  } catch (error) {
    console.error('Compression error:', error);
    throw new Error('Failed to compress timeline');
  }
}

/**
 * Decompress timeline data from URL string
 * @param compressed - Compressed base64 string
 * @returns Decompressed ShareableTimeline object
 */
export function decompressTimeline(compressed: string): ShareableTimeline {
  try {
    const json = LZ.decompressFromBase64(compressed);
    if (!json) {
      throw new Error('Decompression returned empty string');
    }
    const timeline = JSON.parse(json) as ShareableTimeline;
    return timeline;
  } catch (error) {
    console.error('Decompression error:', error);
    throw new Error('Failed to decompress timeline. Link may be corrupted.');
  }
}

/**
 * Generate a shareable URL
 * @param tracks - Array of tracks
 * @param skinId - Current skin ID
 * @returns Full shareable URL
 */
export function generateShareURL(
  tracks: SpotifyTrack[],
  skinId: string
): string {
  const timeline = createShareableTimeline(tracks, skinId);
  const compressed = compressTimeline(timeline);
  
  // Build the full URL
  const baseURL = typeof window !== 'undefined' 
    ? `${window.location.origin}/view`
    : 'https://tim3l1ne.vercel.app/view';
  
  return `${baseURL}?data=${encodeURIComponent(compressed)}`;
}

/**
 * Extract timeline from URL parameters
 * @returns Decompressed ShareableTimeline or null if not found
 */
export function getTimelineFromURL(): ShareableTimeline | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');

  if (!data) return null;

  try {
    return decompressTimeline(decodeURIComponent(data));
  } catch (error) {
    console.error('Failed to load shared timeline:', error);
    return null;
  }
}

/**
 * Get the download link (for social media sharing)
 * @returns The current page's URL
 */
export function getShareableLink(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}
