/**
 * Timeline Component
 * Renders interactive D3.js timeline visualization
 * Shows songs over time with emotional colors
 */

'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TimelineData, Skin, SpotifyTrack } from '@/types';
import { groupByYear, getYearStats } from '@/lib/timelineProcessor';
import { TIMELINE_HEIGHT, TIMELINE_PADDING } from '@/lib/constants';

interface TimelineProps {
  data: TimelineData;
  skin: Skin;
}

export default function Timeline({ data, skin }: TimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.tracks.length === 0) {
      return;
    }

    // Group tracks by year
    const yearGroups = groupByYear(data.tracks);
    const years = Array.from(yearGroups.keys()).sort();

    // Get container width
    const containerWidth = containerRef.current.clientWidth;
    const margin = TIMELINE_PADDING;
    const width = containerWidth - margin.left - margin.right;
    const height = TIMELINE_HEIGHT - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous

    const g = svg
      .attr('width', containerWidth)
      .attr('height', TIMELINE_HEIGHT)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create X scale (years)
    const xScale = d3
      .scaleBand()
      .domain(years.map(String))
      .range([0, width])
      .padding(0.1);

    // Create Y scale (songs)
    const maxSongs = Math.max(...Array.from(yearGroups.values()).map((t) => t.length));
    const yScale = d3
      .scaleLinear()
      .domain([0, maxSongs])
      .range([height, 0]);

    // Map emotions to colors from skin
    const emotionToColor = (emotion: string): string => {
      switch (emotion) {
        case 'happy':
          return skin.colors.happy;
        case 'sad':
          return skin.colors.sad;
        case 'energetic':
          return skin.colors.energetic;
        case 'calm':
          return skin.colors.calm;
        default:
          return skin.colors.primary;
      }
    };

    // Group tracks by month within each year for better visualization
    const monthData = data.tracks.reduce(
      (acc, track) => {
        const date = new Date(track.endTime);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!acc[yearMonth]) {
          acc[yearMonth] = [];
        }
        acc[yearMonth].push(track);
        return acc;
      },
      {} as Record<string, SpotifyTrack[]>
    );

    const monthEntries = Object.entries(monthData).sort();

    // Create month X scale
    const monthXScale = d3
      .scaleBand()
      .domain(monthEntries.map(([key]) => key))
      .range([0, width])
      .padding(0.05);

    // Draw bars for each month
    monthEntries.forEach(([monthKey, tracks]) => {
      const emotionCounts = {
        happy: 0,
        sad: 0,
        energetic: 0,
        calm: 0,
      };

      // Count emotions
      tracks.forEach((track) => {
        if (track.emotion && track.emotion in emotionCounts) {
          emotionCounts[track.emotion as keyof typeof emotionCounts]++;
        }
      });

      const xPos = monthXScale(monthKey) || 0;
      const barWidth = monthXScale.bandwidth();

      // Draw stacked bars for emotions
      let currentHeight = height;
      const emotions = ['energetic', 'happy', 'calm', 'sad'] as const;

      emotions.forEach((emotion) => {
        const count = emotionCounts[emotion];
        if (count > 0) {
          const barHeight = yScale(0) - yScale(count);

          g.append('rect')
            .attr('x', xPos)
            .attr('y', currentHeight - barHeight)
            .attr('width', barWidth)
            .attr('height', barHeight)
            .attr('fill', emotionToColor(emotion))
            .attr('opacity', 0.85)
            .append('title')
            .text(`${monthKey}: ${count} ${emotion} songs`);

          currentHeight -= barHeight;
        }
      });
    });

    // Add X axis
    const xAxis = d3.axisBottom(monthXScale).tickValues(
      monthEntries
        .filter((_, i) => i % Math.ceil(monthEntries.length / 12) === 0)
        .map(([key]) => key)
    );

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .attr('color', skin.colors.text)
      .selectAll('text')
      .style('font-size', '12px')
      .attr('opacity', 0.7);

    // Add Y axis
    const yAxis = d3.axisLeft(yScale).ticks(5);
    g.append('g')
      .call(yAxis)
      .attr('color', skin.colors.text)
      .selectAll('text')
      .style('font-size', '12px')
      .attr('opacity', 0.7);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .attr('stroke', skin.colors.text);

    // Add legend
    const legendY = -30;
    const legendItems = [
      { emotion: 'energetic', label: 'Energetic' },
      { emotion: 'happy', label: 'Happy' },
      { emotion: 'calm', label: 'Calm' },
      { emotion: 'sad', label: 'Sad' },
    ];

    let legendX = 0;
    legendItems.forEach(({ emotion, label }) => {
      const itemWidth = 120;

      g.append('rect')
        .attr('x', legendX)
        .attr('y', legendY)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', emotionToColor(emotion))
        .attr('opacity', 0.85);

      g.append('text')
        .attr('x', legendX + 18)
        .attr('y', legendY + 10)
        .attr('font-size', '12px')
        .attr('fill', skin.colors.text)
        .attr('opacity', 0.7)
        .text(label);

      legendX += itemWidth;
    });
  }, [data, skin]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        backgroundColor: skin.colors.background,
        color: skin.colors.text,
      }}
    >
      <svg ref={svgRef} />
    </div>
  );
}
