# Archive Heart Timeline 🎵🎨

Transform your Spotify listening history into an interactive, artistic emotional timeline with switchable visual themes.

## What Is This?

Archive Heart Timeline is a **zero-cost, browser-based web app** that turns your Spotify CSV export into a beautiful, shareable visualization of your music taste over time. Every song is analyzed for emotional resonance and visualized with colors representing different moods.

### Core Features ✨

- **📊 Interactive Timeline** - D3.js visualization showing your listening patterns across months and years
- **🎭 6 Visual Skins** - Switch between artistic themes:
  - Cityscape (urban, neon)
  - Futuristic (holographic, sleek)
  - Ocean (flowing blues, waves)
  - Minimalistic Modern Art (clean, monochromatic)
  - Sparkly Space (cosmic, glitter)
  - Girly Pink Pastel Flowers (dreamy, floral)
- **🧠 Smart Emotion Detection** - Local algorithm analyzes song titles/artists to assign emotions (happy, sad, energetic, calm)
- **🔗 Shareable Links** - Compress your timeline into a URL that others can view (no accounts needed)
- **🖼️ PNG Export** - Download your timeline as a high-res image for social media
- **💝 Donation Integration** - Built-in donation link on every shared timeline

### Why This Exists

Spotify Wrapped shows you numbers. Archive Heart Timeline shows you **feelings**. It's art made from data.

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Spotify account

### Installation

```bash
# Clone the repository
git clone https://github.com/missbehaver/tim3l1ne.git
cd tim3l1ne

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_DONATION_LINK=https://ko-fi.com/yourname
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm run start
```

---

## How to Use

### 1. Get Your Spotify Data

1. Visit [Spotify Account Settings → Privacy](https://www.spotify.com/account/privacy/)
2. Click "Download your data"
3. Spotify will send you a ZIP file (takes a few days)
4. Extract and find `StreamingHistory0.csv` (or `StreamingHistory1.csv`, etc.)

### 2. Create Your Timeline

1. Go to the app homepage
2. Click "Start Creating Timeline"
3. Upload your Spotify CSV file
4. Watch the timeline appear! 🎉

### 3. Customize

- **Choose a Skin** - Click to preview and apply any of the 6 themes
- **Emotions** - Colors represent different emotional tones (automatically detected)

### 4. Share or Export

- **Share Link** - Click "Generate Share Link" to get a URL with your timeline
  - Share anywhere: Twitter, Discord, email, etc.
  - Others view with a click—no account needed
- **Export PNG** - Download as an image for social media

---

## Technical Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/) + [TailwindCSS](https://tailwindcss.com/)
- **Visualization**: [D3.js](https://d3js.org/)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **CSV**: [PapaParse](https://www.papaparse.com/)
- **Export**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Sharing**: [lz-string](https://github.com/pieroxy/lz-string)

---

## How It Works

1. **CSV Upload** - Parser validates Spotify CSV format
2. **Emotion Detection** - Keyword matching algorithm analyzes song names
3. **Timeline Generation** - Data aggregated by month/year
4. **Visualization** - D3.js renders stacked bar chart
5. **Sharing** - Timeline compressed into URL parameter
6. **Export** - html-to-image converts chart to PNG

All processing happens **in the browser** - no data is sent to servers.

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Go to vercel.com and import the repository
# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_DONATION_LINK=https://ko-fi.com/yourname

# Done! Vercel auto-deploys on push
```

Benefits:
- ✅ Free tier (100GB bandwidth)
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Global CDN

### Alternative Hosting

Works on Netlify, GitHub Pages, or any Node.js provider.

---

## Customization

### Add a New Skin

Edit `skins/index.ts`:

```typescript
my_skin: {
  id: 'my_skin',
  name: 'My Skin Name',
  description: 'Description',
  colors: {
    primary: '#color1',
    secondary: '#color2',
    background: '#color3',
    text: '#color4',
    happy: '#color5',
    sad: '#color6',
    energetic: '#color7',
    calm: '#color8',
  },
}
```

### Change Donation Link

Edit `.env.local`:

```env
NEXT_PUBLIC_DONATION_LINK=https://your-link.com
```

### Adjust Emotion Keywords

Edit `lib/emotionDetection.ts` to add/remove keywords for each emotion.

---

## Project Structure

```
tim3l1ne/
├── app/
│   ├── page.tsx           # Landing page
│   ├── app/page.tsx       # Main app (upload, visualize, share)
│   └── view/page.tsx      # Shared timeline view
├── components/            # React components
│   ├── CSVUpload.tsx
│   ├── SkinSelector.tsx
│   ├── Timeline.tsx       # D3.js visualization
│   └── ExportShare.tsx
├── lib/                   # Utilities
│   ├── csvParser.ts
│   ├── emotionDetection.ts
│   ├── timelineProcessor.ts
│   ├── sharing.ts
│   └── constants.ts
├── stores/
│   └── index.ts           # Zustand state
├── types/
│   └── index.ts           # TypeScript definitions
└── skins/
    └── index.ts           # Visual theme definitions
```

---

## Privacy & Security

✅ **100% Private**
- All processing happens in your browser
- Your Spotify CSV never leaves your device
- No accounts, no tracking, no analytics

---

## FAQ

**Q: Is my data secure?**
A: Yes! Everything runs locally in your browser.

**Q: Can others edit shared timelines?**
A: No, sharing is view-only.

**Q: Can I use this offline?**
A: Yes, after the initial load. A future update will add full offline support.

**Q: Does this work on mobile?**
A: Yes, the UI is fully responsive (but CSV upload is easier on desktop).

---

## License

MIT - Feel free to fork and customize

---

## Made with ❤️

Archive Heart Timeline transforms your music into art. Every listen tells a story.

🚀 [Start creating your timeline now!](https://tim3l1ne.vercel.app)
