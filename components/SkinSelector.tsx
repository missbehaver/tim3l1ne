/**
 * Skin Selector Component
 * Displays all available skins and allows user to switch
 */

'use client';

import React from 'react';
import { getAllSkins } from '@/skins';

interface SkinSelectorProps {
  currentSkinId: string;
  onSkinChange: (skinId: string) => void;
}

export default function SkinSelector({
  currentSkinId,
  onSkinChange,
}: SkinSelectorProps) {
  const skins = getAllSkins();

  return (
    <div className="space-y-6">
      <p className="text-slate-600 dark:text-slate-400">
        Click on any skin to preview and apply it to your timeline
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skins.map((skin) => (
          <button
            key={skin.id}
            onClick={() => onSkinChange(skin.id)}
            className={`block w-full text-left p-6 rounded-lg border-2 transition transform hover:scale-105 active:scale-95 ${
              currentSkinId === skin.id
                ? 'border-indigo-600 dark:border-indigo-400 shadow-lg'
                : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500'
            }`}
            style={{
              backgroundColor: skin.colors.background,
            }}
          >
            {/* Skin Preview */}
            <div className="mb-4 h-24 rounded flex items-end gap-1 overflow-hidden">
              <div
                className="flex-1 rounded hover:opacity-80 transition"
                style={{
                  backgroundColor: skin.colors.happy,
                  height: '60%',
                }}
              />
              <div
                className="flex-1 rounded hover:opacity-80 transition"
                style={{
                  backgroundColor: skin.colors.energetic,
                  height: '80%',
                }}
              />
              <div
                className="flex-1 rounded hover:opacity-80 transition"
                style={{
                  backgroundColor: skin.colors.calm,
                  height: '40%',
                }}
              />
              <div
                className="flex-1 rounded hover:opacity-80 transition"
                style={{
                  backgroundColor: skin.colors.sad,
                  height: '30%',
                }}
              />
            </div>

            {/* Skin Info */}
            <h3
              className="font-bold text-lg mb-1"
              style={{ color: skin.colors.text }}
            >
              {skin.name}
            </h3>
            <p className="text-sm" style={{ color: skin.colors.text, opacity: 0.7 }}>
              {skin.description}
            </p>

            {/* Selected Badge */}
            {currentSkinId === skin.id && (
              <div className="mt-4 inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ✓ Currently Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
