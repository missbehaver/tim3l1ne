/**
 * Application Constants
 * Configuration values used throughout the app
 */

/**
 * Get donation link from environment
 * Falls back to placeholder if not configured
 */
export const DONATION_LINK =
  process.env.NEXT_PUBLIC_DONATION_LINK ||
  'https://ko-fi.com/placeholder';

/**
 * App branding
 */
export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || 'Archive Heart Timeline';

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Transform your Spotify listening history into an interactive, artistic emotional timeline';

/**
 * App URL for sharing
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://tim3l1ne.vercel.app';

/**
 * V ercel / hosting info
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * File upload constraints
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['text/csv', 'text/plain'];

/**
 * Timeline rendering
 */
export const TIMELINE_HEIGHT = 200; // SVG height in pixels
export const TIMELINE_PADDING = { top: 20, right: 20, bottom: 20, left: 20 };

/**
 * Colors for emotions (used as fallback if skin colors not available)
 */
export const DEFAULT_EMOTION_COLORS = {
  happy: '#FFD700',     // Gold
  sad: '#4169E1',       // Royal Blue
  energetic: '#FF6347', // Tomato Red
  calm: '#3CB371',      // Med Sea Green
};

/**
 * Toast notification settings
 */
export const TOAST_DURATION = 3000;
export const TOAST_POSITION = 'bottom-right' as const;
