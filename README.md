# PWBC (Probably Wrong But Confident)

> I can't stop doomscrolling Google Maps so I built AI that researches anywhere on Earth

An interactive 3D globe that lets you explore the fascinating history of any location on the planet. Born from opening Google Maps in satellite view at 2am and clicking on random shit - obscure atolls in the Pacific that look like someone dropped a pixel, unnamed mountains in Kyrgyzstan, Arctic settlements with 9 people. Places so remote they don't have Wikipedia pages.

Be curious.

## The Problem

I have a problem. I'll lose 6 hours to doomscrolling Google Maps. Just clicking. Finding volcanic islands that look photoshopped. Fjords that defy physics. Tiny dots of land in the middle of nowhere. And every single time I think: **what IS this place? Who found it? Why does it exist? What happened here?**

Then you try to research it and it's hell. 47 Wikipedia tabs. A poorly-translated Kazakh government PDF from 2003. A travel blog from 1987. A single Reddit comment from 2014 that says "I think my uncle went there once." You piece it together like a conspiracy theorist and still don't get the full story.

**The information exists somewhere.** Historical databases. Academic archives. Colonial records. Exploration logs from the 1800s. But it's scattered everywhere and takes forever to find.

## The Solution

Click anywhere on a globe. Get actual research. It searches hundreds of sources and gives you the full story. With citations so you know it's not making shit up.

Not ChatGPT summarizing from training data. **Actual research.** It searches:
- Historical databases and archives
- Academic papers and journals
- Colonial records and exploration logs
- Archaeological surveys
- Wikipedia and structured knowledge bases
- Real-time web sources

**Example: Tristan da Cunha** (most remote inhabited island on Earth, population 245)

Click on it and you get:
- Discovery by Portuguese explorers in 1506
- British annexation in 1816 (strategic location during Napoleonic Wars)
- Volcanic eruption in 1961 that evacuated the entire population
- Current economy (crayfish export, philately)
- Cultural evolution of the tiny community
- Full timeline with sources

What would take hours of manual research happens automatically. And you can verify everything.

## Why This Exists

Because I've spent literal months of my life doomscrolling Google Maps clicking on random islands at 3am and I want to actually understand them. Not skim a 4-paragraph Wikipedia stub. Not guess based on the name. **Proper historical research. Fast.**

The databases exist. The archives are digitized. The APIs are built. Someone just needed to connect them to a globe and make it accessible.

**This is what AI should be doing.** Not writing emails. Augmenting genuine human curiosity about the world.

## Storytelling Mode

But wait - there's more. PWBC doesn't just dump facts on you. It **tells a story**.

When you research a location, the AI crafts a narrative documentary-style experience. It doesn't just answer "what happened" - it explains **why it matters**. The storytelling engine:

- **Narrative flow** - Builds a cohesive story from scattered historical threads
- **Visual storytelling** - Generates relevant images and diagrams to illustrate key moments
- **Contextual depth** - Connects events across time periods
- **Engaging presentation** - Structured like a documentary script, not a Wikipedia article

Think of it as your personal history documentary producer. Give it a location, and it'll dig through archives, academic papers, and historical records to craft a compelling narrative about that place.

## Key Features

### Real Research Infrastructure
- **AI-powered research** - Searches hundreds of sources across the web
- **Full citations** - Every claim linked to verifiable sources
- **Live progress tracking** - Watch the research unfold in real-time

### Interactive Globe
- **3D Satellite Visualization** - Stunning Mapbox satellite imagery with globe projection
- **Click literally anywhere** - Any country, island, mountain, or geographical feature
- **Random Discovery** - "I'm Feeling Lucky" button for random location exploration
- **Multiple Map Styles** - Satellite, streets, outdoors, and more

### Storytelling Features
- **Documentary-style narratives** - AI-crafted stories that flow like a documentary
- **Visual aids** - Generated images and diagrams to illustrate key moments
- **Contextual connections** - Links events across time periods
- **Engaging presentation** - Not just facts - a story worth telling

## Technology Stack

### Research & AI
- **[Gemini AI](https://gemini.google.com/)** - AI-powered content generation, image creation, and diagram generation
- **[Tavily Search API](https://tavily.com/)** - Web search and historical image retrieval

### Frontend
- **[Next.js 15](https://nextjs.org)** + **[React 19](https://react.dev)** - Modern web framework
- **[Mapbox GL JS](https://www.mapbox.com/mapbox-gljs)** - Interactive 3D globe visualization
- **[Tailwind CSS](https://tailwindcss.com)** + **[Framer Motion](https://www.framer.com/motion/)** - Beautiful UI with smooth animations
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Rendering research reports

### Infrastructure
- **[Vercel](https://vercel.com)** - Deployment and hosting
- **TypeScript** - Type safety throughout

Fully open-source. Self-hostable. Model-agnostic.

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm, npm, or yarn
- Gemini API key ([get one free at makersuite.google.com](https://makersuite.google.com/app/apikey))
- Mapbox access token ([get one free at mapbox.com](https://account.mapbox.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shanky0007/PWBC.git
   cd PWBC
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or npm install
   # or yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Gemini API (Required for storytelling)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Mapbox Configuration (Required)
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_access_token_here

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or npm run dev
   # or yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Start exploring**

   - Click anywhere on the globe to research that location
   - Use the "Random Location" button to discover somewhere new
   - Watch the AI research unfold in real-time
   - See the storytelling mode in action with documentary-style narratives

## How to Use

### Basic Usage

1. **Navigate the Globe**
   - Drag to rotate
   - Scroll to zoom in/out
   - The globe auto-rotates when idle

2. **Research a Location**
   - Click on any country, city, island, or geographical feature
   - A popup will show the location name
   - The research interface opens automatically

3. **Watch the Research**
   - See the AI's reasoning process
   - View searches and sources being discovered in real-time

4. **Review Results**
   - Read the comprehensive historical analysis
   - Click on source citations to verify information
   - View images and visual aids

### Advanced Features

- **Random Discovery**: Click "Random Location" to explore a random place on Earth
- **Map Styles**: Switch between satellite, streets, and other map styles
- **Dark Mode**: Automatically matches your system preferences
- **Storytelling Mode**: Experience locations through documentary-style narratives

## Getting API Keys

### Gemini API (Required)

1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to `.env.local` as `GEMINI_API_KEY`

**Pricing:**
- Free tier available for testing
- Pay-as-you-go pricing for production
- Generous free limits for Gemini Flash models

### Mapbox Access Token (Required)

1. Go to [mapbox.com](https://account.mapbox.com)
2. Sign up for a free account
3. Create a new access token
4. Add it to `.env.local` as `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

**Pricing:**
- 50,000 free map loads per month
- Additional usage billed per load (very affordable)

## Contributing

PWBC is fully open-source. Contributions are welcome and appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution

- Additional map styles and visualizations
- Location bookmarking and collections
- Image galleries for historical locations
- Mobile app optimizations
- Multi-language support
- Data visualizations (timelines, charts)
- Advanced search and filtering
- Accessibility improvements
- Storytelling enhancements (new narrative styles, better visual aids)

## Who This Is For

If you also spend hours clicking random islands on Google Maps, you'll understand why this needed to exist.

Perfect for:
- People who doomscroll maps like me
- History researchers who need quick location context
- Travel planners researching destinations
- Students learning world geography
- Anyone curious about literally any place on Earth

## Known Issues & Limitations

- Mapbox free tier limited to 50k loads/month
- AI API calls cost money (though very reasonable)
- Globe performance may be slower on older devices
- Some remote locations may have limited historical data

## License

This project is open-source and available under the MIT License.

## Support & Questions

- **Issues**: [Open an issue](https://github.com/Shanky0007/PWBC/issues) on GitHub
- **Discussions**: [Join the discussion](https://github.com/Shanky0007/PWBC/discussions)

## Roadmap

Future features under consideration:

- Timeline visualization with historical events
- Multiple locations comparison
- Historical image galleries from archives
- PDF export of research reports
- Collaborative research sharing
- Location bookmarks and collections
- Advanced filters (time periods, topics, event types)
- Mobile app versions (iOS, Android)
- Offline mode with cached research
- 3D historical recreations
- AR view for mobile devices

## Inspiration & Acknowledgments

This project was born from countless hours spent exploring Google Maps, clicking on random islands, mountains, and remote places at 2am, and wanting to know their stories. Special thanks to:

- **[Google Gemini](https://gemini.google.com/)** - For powerful AI content generation capabilities
- **[Tavily](https://tavily.com/)** - For excellent web search and image retrieval
- **[Mapbox](https://mapbox.com)** - For beautiful, performant globe visualization

---

**Built for geography enthusiasts, history buffs, map doomscrollers, and curious minds everywhere.**

*Explore. Discover. Learn.*