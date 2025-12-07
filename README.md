# ThatLatestBulletin

ThatLatestBulletin is a modern news exploration experience built with React and Vite. It focuses on speed, smooth interaction, and clean readability while delivering a uniquely animated interface powered by Lenis scrolling and GSAP/AnimeJS motion. The platform aims to make browsing global headlines feel fluid, responsive, and visually engaging across devices.

## Overview

The application aggregates news from multiple regions and categories with user-driven filtering. Headlines can be refined by category, country, and language, with curated defaults for quick access. Even under slow or unstable network conditions, the interface maintains graceful behavior through fallbacks and error-handling logic.

A minimal top-loader bar appears during fetch operations to provide clear visual feedback without interrupting the browsing experience. The theme system includes neon and light modes, and interactive article cards help maintain a lively feel. A Three.js-rendered newspaper backdrop enhances the visual atmosphere on supported devices, with automatic fallback on older hardware or reduced-motion settings.

## Key Features

### Smooth Interaction and Motion
- Lenis-powered smooth scrolling for consistent movement across screen sizes.
- GSAP and AnimeJS animations tuned for clarity and subtlety.
- Controlled state transitions that support readability without overwhelming users.

### News Filtering and Discovery
- Article filtering by category, country, and language.
- Preset defaults for quickly accessing curated news.
- API integration with defensive fallbacks and retry behavior.
- Stable experience even when the upstream API is slow or offline.

### Interface and Presentation
- Two theme presets: neon and light.
- Responsive layout optimized for mobile and desktop.
- Clickable article cards with hover and entry animations.
- Three.js newspaper environment for enhanced depth (with fallback when necessary).

### System Feedback and Stability
- Top-loader bar displayed during network requests.
- Error boundaries and fallback UI for network or parsing failures.
- Motion and rendering remain responsive, even with degraded API performance.

## Tech Stack

- React (with Vite)
- Lenis (smooth scrolling)
- GSAP and AnimeJS (motion)
- Three.js (background visuals)
- Custom theme and layout system

## Project Goals

ThatLatestBulletin is built to create a news interface that feels dynamic without compromising clarity. Motion is used intentionally to guide attention and improve usability. The application emphasizes speed, fluidity, and a smooth reading experience rather than heavy visual effects.

