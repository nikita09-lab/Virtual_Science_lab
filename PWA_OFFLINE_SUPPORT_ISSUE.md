# Title: Feature: Progressive Web App (PWA) Offline Support Integration

**Labels:** enhancement, frontend, PWA, Level4, NSoC'26

## Overview

The Virtual Science Lab is designed to be accessible for students globally. Currently, the application detects offline status using `useOnlineStatus` and saves lab reports locally to `localStorage` as a fallback. However, if a user reloads the page without an internet connection, the application itself will fail to load because the static assets are not cached.

This issue proposes converting the Virtual Science Lab into a fully installable Progressive Web App (PWA). By implementing service workers and advanced caching strategies, students in remote areas with intermittent internet access will be able to load the application, view cached experiments, and write notebook entries completely offline.

---

## Proposed Implementation

### 1. Vite PWA Plugin
Install and configure `vite-plugin-pwa` in `vite.config.js`. This is the modern standard for adding service workers to React applications built with Vite.

### 2. Web App Manifest
Add a Web App Manifest configuration within the Vite plugin to make the application installable on Desktop (Chrome/Edge) and Mobile devices (iOS/Android). Include:
* App name and short name ("Virtual Science Lab").
* Theme colors matching the existing design (e.g., `#2563eb`).
* App icons (192x192 and 512x512).

### 3. Caching Strategies
Configure the service worker `workbox` options to cache:
* Static assets (JS, CSS, HTML).
* Google Fonts.
* Specific dynamic API routes (e.g., caching the latest fetched leaderboard or classroom feed).

### 4. Install Prompt UI
Add an "Install App" button or prompt somewhere accessible (like the `Navbar` or `Profile` page) that triggers the browser's native PWA installation prompt.

---

## Files to Update

```text
frontend/vite.config.js
frontend/index.html
frontend/src/main.jsx
frontend/package.json
```

---

## Acceptance Criteria

* `vite-plugin-pwa` is integrated without build errors.
* The application can be installed on Desktop/Mobile as a standalone app.
* Lighthouse PWA score reaches at least 90%.
* If the user turns off WiFi/Network and refreshes the page, the core UI still loads instantly from the service worker cache.

---

## Educational Impact
PWA support is a massive leap forward for accessibility. It empowers schools and students in developing regions with unstable internet to reliably access science simulations anytime, bridging the digital divide.
