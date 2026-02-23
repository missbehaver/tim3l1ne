/**
 * Export & Share Component
 * Handles PNG export and URL sharing
 */

'use client';

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { toPng } from 'html-to-image';
import { generateShareURL } from '@/lib/sharing';
import { SpotifyTrack } from '@/types';

interface ExportShareProps {
  tracks: SpotifyTrack[];
  skinId: string;
}

export default function ExportShare({ tracks, skinId }: ExportShareProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [shareURL, setShareURL] = useState<string | null>(null);

  /**
   * Generate shareable link
   */
  const handleGenerateLink = () => {
    try {
      const url = generateShareURL(tracks, skinId);
      setShareURL(url);
      toast.success('Share link generated! 🔗');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate share link'
      );
    }
  };

  /**
   * Copy link to clipboard
   */
  const handleCopyLink = async () => {
    if (!shareURL) return;

    try {
      await navigator.clipboard.writeText(shareURL);
      toast.success('Link copied to clipboard! 📋');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  /**
   * Export timeline as PNG
   */
  const handleExportPNG = async () => {
    if (!timelineRef.current) {
      toast.error('Timeline not found');
      return;
    }

    setIsExporting(true);
    try {
      const image = await toPng(timelineRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      // Create download link
      const link = document.createElement('a');
      link.href = image;
      link.download = `timeline-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Timeline exported as PNG! 🖼️');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export image');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Share Link Section */}
        <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            🔗 Share Link
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Generate a shareable link that others can use to view your timeline
            without editing it.
          </p>

          {!shareURL ? (
            <button
              onClick={handleGenerateLink}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Generate Share Link
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg break-all text-sm">
                <input
                  type="text"
                  value={shareURL}
                  readOnly
                  className="w-full bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span>📋 Copy Link</span>
              </button>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Share this link on social media, email, or anywhere! Others can
                view and explore your timeline.
              </p>
            </div>
          )}
        </div>

        {/* Export PNG Section */}
        <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            🖼️ Export as Image
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Download your timeline as a high-resolution PNG image for sharing
            on social media.
          </p>

          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className={`w-full font-semibold py-2 px-4 rounded-lg transition ${
              isExporting
                ? 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isExporting ? '⏳ Exporting...' : '⬇️ Download PNG'}
          </button>
        </div>
      </div>

      {/* Share Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
          💡 Sharing Tips:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
          <li>✓ Share the link on Twitter, Instagram, TikTok, or Discord</li>
          <li>✓ Send via email or messaging apps</li>
          <li>✓ Post the PNG image on social media for quick previews</li>
          <li>✓ Include donation link for supporters</li>
        </ul>
      </div>
    </div>
  );
}
