'use client';

import React from 'react';
import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION, DONATION_LINK } from '@/lib/constants';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex flex-col justify-center items-center px-4">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center space-y-8 mb-16">
        {/* Logo / Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {APP_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light">
            {APP_DESCRIPTION}
          </p>
        </div>

        {/* Feature Description */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-4 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            What is this?
          </h2>
          <ul className="text-left space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">🎵</span>
              <span>Upload your Spotify CSV listening history</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">🎨</span>
              <span>Watch it transform into an artistic emotional timeline</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">🎭</span>
              <span>Switch between 6 beautiful visual themes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">🔗</span>
              <span>Share your timeline with a single link—no account needed</span>
            </li>
          </ul>
        </div>

        {/* How to Get Your Spotify CSV */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
            📥 How to get your Spotify data:
          </h3>
          <ol className="text-sm text-yellow-800 dark:text-yellow-300 text-left space-y-2">
            <li>1. Visit <a href="https://www.spotify.com/account/privacy/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900 dark:hover:text-yellow-100">Spotify Account Privacy Settings</a></li>
            <li>2. Click "Download your data"</li>
            <li>3. Wait for Spotify to send you a file (can take a few days)</li>
            <li>4. Extract the ZIP and look for <code className="bg-yellow-200 dark:bg-yellow-900 px-2 py-1 rounded text-xs">StreamingHistory.csv</code></li>
          </ol>
        </div>

        {/* CTA Button */}
        <Link
          href="/app"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          Start Creating Timeline
        </Link>
      </div>

      {/* Footer with Donation */}
      <footer className="w-full border-t border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Built with ❤️ | All processing happens locally in your browser
          </p>
          <a
            href={DONATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            💝 Support this project
          </a>
        </div>
      </footer>
    </div>
  );
}
