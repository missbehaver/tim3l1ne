/**
 * Smart Emotion Detection
 * Analyzes track metadata to assign emotional colors
 * Uses keyword matching and heuristics (no API calls, all local)
 */

import { SpotifyTrack } from '@/types';

// Keywords for different emotions
const EMOTION_KEYWORDS = {
  happy: [
    'love', 'happy', 'joy', 'celebrate', 'party', 'smile', 'laugh',
    'sunshine', 'summer', 'bright', 'dance', 'fun', 'good', 'best',
    'paradise', 'wonderful', 'beautiful', 'dream', 'magic',
  ],
  sad: [
    'sad', 'cry', 'lonely', 'alone', 'heartbreak', 'goodbye', 'lose',
    'funeral', 'death', 'pain', 'sorrow', 'tears', 'broken', 'broken heart',
    'midnight', 'dark', 'empty', 'ghost', 'fade', 'end',
  ],
  energetic: [
    'rock', 'heavy', 'metal', 'punk', 'electric', 'power', 'thunder',
    'wild', 'crazy', 'fast', 'speed', 'blast', 'rush', 'pump',
    'hyper', 'extreme', 'dunk', 'turbo', 'adrenaline',
  ],
  calm: [
    'peace', 'calm', 'quiet', 'sleep', 'dream', 'night', 'soft',
    'gentle', 'lullaby', 'meditation', 'zen', 'flow', 'easy',
    'ambient', 'chill', 'relax', 'breathe', 'still', 'serene',
  ],
};

/**
 * Detect emotion from track metadata
 * @param track - SpotifyTrack to analyze
 * @returns emotion type and confidence score
 */
export function detectEmotion(
  track: SpotifyTrack
): { emotion: string; confidence: number; energyLevel: number } {
  // Combine artist and track name for analysis
  const text = `${track.artistName} ${track.trackName}`.toLowerCase();

  // Count matches for each emotion
  const scores: Record<string, number> = {
    happy: 0,
    sad: 0,
    energetic: 0,
    calm: 0,
  };

  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        scores[emotion]++;
      }
    }
  }

  // Find the dominant emotion
  let dominantEmotion = 'calm'; // default
  let maxScore = 0;

  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantEmotion = emotion;
    }
  }

  // Calculate confidence (0-1)
  const totalMatches = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalMatches > 0 ? maxScore / (totalMatches * 0.5) : 0;

  // Infer energy level from emotion
  // sad/calm = low energy, energetic/happy = high energy
  let energyLevel = 0.5; // neutral default
  if (dominantEmotion === 'energetic') {
    energyLevel = 0.8 + Math.random() * 0.2; // 0.8-1.0
  } else if (dominantEmotion === 'happy') {
    energyLevel = 0.6 + Math.random() * 0.2; // 0.6-0.8
  } else if (dominantEmotion === 'calm') {
    energyLevel = 0.3 + Math.random() * 0.2; // 0.3-0.5
  } else if (dominantEmotion === 'sad') {
    energyLevel = 0.2 + Math.random() * 0.2; // 0.2-0.4
  }

  return {
    emotion: dominantEmotion,
    confidence: Math.min(confidence, 1),
    energyLevel,
  };
}

/**
 * Analyze entire track array and add emotions
 * @param tracks - Array of SpotifyTracks
 * @returns Array with emotion data added
 */
export function analyzeTracklist(tracks: SpotifyTrack[]): SpotifyTrack[] {
  return tracks.map((track) => {
    const { emotion, energyLevel } = detectEmotion(track);
    return {
      ...track,
      emotion,
      energyLevel,
    };
  });
}

/**
 * Get emotion distribution across all tracks
 * @param tracks - Array of SpotifyTracks
 * @returns Object with counts for each emotion
 */
export function getEmotionDistribution(
  tracks: SpotifyTrack[]
): Record<string, number> {
  const distribution = {
    happy: 0,
    sad: 0,
    energetic: 0,
    calm: 0,
  };

  for (const track of tracks) {
    if (track.emotion && track.emotion in distribution) {
      distribution[track.emotion as keyof typeof distribution]++;
    }
  }

  return distribution;
}
