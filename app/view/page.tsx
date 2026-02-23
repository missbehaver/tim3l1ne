'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getTimelineFromURL } from '@/lib/sharing';
import { processTimelineData } from '@/lib/timelineProcessor';
import { getSkinById } from '@/skins';
import { TimelineData, Skin, SpotifyTrack } from '@/types';
import { DONATION_LINK, APP_NAME } from '@/lib/constants';
import Timeline from '@/components/Timeline';

export default function ViewPage() {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [skin, setSkin] = useState<Skin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sharedTimeline = getTimelineFromURL();

      if (!sharedTimeline) {
        setError('No timeline data found. The link may be invalid or corrupted.');
        setIsLoading(false);
        return;
      }

      // Get the skin
      const selectedSkin = getSkinById(sharedTimeline.skinId);
      setSkin(selectedSkin);

      // Process the tracks
      const processed = processTimelineData(sharedTimeline.tracks);
      setTimelineData(processed);

      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load shared timeline:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load shared timeline'
      );
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-4">
          <div className="text-5xl animate-pulse">🎵</div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Loading timeline...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md text-center border border-red-300 dark:border-red-700">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Create Your Own Timeline
          </a>
        </div>
      </div>
    );
  }

  if (!timelineData || !skin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          No timeline data available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: skin.colors.background }}>
      {/* Header */}
      <header className="border-b px-6 py-6" style={{ borderColor: skin.colors.secondary }}>
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-3xl font-bold"
            style={{ color: skin.colors.primary }}
          >
            {APP_NAME}
          </h1>
          <p style={{ color: skin.colors.text }}>
            A beautiful music timeline • Skin: <strong>{skin.name}</strong>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Card */}
        <div
          className="rounded-lg shadow-lg p-8 mb-8 border"
          style={{
            backgroundColor: skin.colors.secondary,
            borderColor: skin.colors.primary,
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: skin.colors.happy }}
              >
                {timelineData.stats.totalSongs}
              </div>
              <div style={{ color: skin.colors.text }} className="text-sm mt-1">
                Total Songs
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: skin.colors.energetic }}
              >
                {timelineData.stats.uniqueArtists}
              </div>
              <div style={{ color: skin.colors.text }} className="text-sm mt-1">
                Artists
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: skin.colors.calm }}
              >
                {timelineData.totalMinutes.toLocaleString()}
              </div>
              <div style={{ color: skin.colors.text }} className="text-sm mt-1">
                Minutes
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: skin.colors.sad }}
              >
                {timelineData.yearRange.end - timelineData.yearRange.start + 1}
              </div>
              <div style={{ color: skin.colors.text }} className="text-sm mt-1">
                Years
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div
          className="rounded-lg shadow-lg p-8 border overflow-x-auto"
          style={{
            backgroundColor: skin.colors.background,
            borderColor: skin.colors.primary,
          }}
        >
          <Timeline data={timelineData} skin={skin} />
        </div>

        {/* Donation Footer */}
        <footer className="mt-16 text-center py-8 border-t" style={{ borderColor: skin.colors.secondary }}>
          <p style={{ color: skin.colors.text }} className="mb-4">
            Love this timeline? Support the creator
          </p>
          <a
            href={DONATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
            style={{
              backgroundColor: skin.colors.happy,
              color: skin.colors.background,
            }}
          >
            💝 Make a Donation
          </a>
        </footer>
      </main>
    </div>
  );
}
