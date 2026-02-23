'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { parseSpotifyCSV } from '@/lib/csvParser';
import { analyzeTracklist } from '@/lib/emotionDetection';
import { processTimelineData } from '@/lib/timelineProcessor';
import { useCSVData, useTimelineData, useSkin } from '@/stores';
import { getAllSkins } from '@/skins';
import CSVUpload from '@/components/CSVUpload';
import SkinSelector from '@/components/SkinSelector';
import Timeline from '@/components/Timeline';
import ExportShare from '@/components/ExportShare';

export default function AppPage() {
  const { csvData, setCSVData } = useCSVData();
  const { processedData, setProcessedData } = useTimelineData();
  const { currentSkin, setCurrentSkin } = useSkin();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle CSV file upload
   */
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // Parse CSV
      const tracks = await parseSpotifyCSV(file);

      if (tracks.length === 0) {
        toast.error('No valid tracks found in CSV');
        setIsLoading(false);
        return;
      }

      // Analyze and add emotions
      const analyzedTracks = analyzeTracklist(tracks);
      setCSVData(analyzedTracks);

      // Process timeline data
      const timeline = processTimelineData(analyzedTracks);
      setProcessedData(timeline);

      toast.success(`Loaded ${tracks.length} tracks! 🎉`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload CSV'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle skin change
   */
  const handleSkinChange = (skinId: string) => {
    const skin = getAllSkins().find((s) => s.id === skinId);
    if (skin) {
      setCurrentSkin(skin);
      toast.success(`Switched to ${skin.name}! 🎨`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="px-6 py-6 border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create Your Timeline
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Upload your Spotify CSV and watch the magic happen
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Step 1: Upload CSV */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Step 1: Upload Your Spotify CSV
          </h2>
          <CSVUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
          {processedData && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-200">
                ✅ Successfully loaded <strong>{processedData.stats.totalSongs} songs</strong> from{' '}
                <strong>{processedData.stats.uniqueArtists} artists</strong> ({processedData.totalMinutes} minutes listened)
              </p>
            </div>
          )}
        </section>

        {/* Step 2: Choose Skin */}
        {processedData && (
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Step 2: Choose Your Skin
            </h2>
            <SkinSelector currentSkinId={currentSkin.id} onSkinChange={handleSkinChange} />
          </section>
        )}

        {/* Step 3: Timeline Visualization */}
        {processedData && (
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Your Timeline
            </h2>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700 overflow-x-auto">
              <Timeline data={processedData} skin={currentSkin} />
            </div>
          </section>
        )}

        {/* Step 4: Export & Share */}
        {processedData && (
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Share Your Timeline
            </h2>
            <ExportShare tracks={csvData} skinId={currentSkin.id} />
          </section>
        )}

        {/* Empty State */}
        {!processedData && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No Timeline Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Upload a Spotify CSV to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
