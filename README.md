# PWBC (Probably Wrong But Confident)

> Research isn't boring. History isn't a textbook. Facts are Shakespeare.

An interactive 3D globe that transforms geographical research into immersive, multimodal storytelling experiences. Click anywhere on Earth and watch as raw research data becomes an elegant, creative narrative—woven together with text, images, diagrams, and interactive elements in a single fluid stream.

Think of it as having a creative director in your pocket who researches like a scholar but tells stories like Shakespeare—elegant, over-the-top, deeply engaging, and impossible to look away from.

## The Problem

Research is broken. You click on a location and get:
- 47 Wikipedia tabs with dry facts
- Academic papers written for other academics
- Travel blogs that are just ads
- Reddit comments from people who "think" they know

The information exists. The stories are there. But they're buried under mountains of boring presentation.

**What if facts could be beautiful?** What if learning about a place felt like watching a documentary directed by someone who actually cares about engaging you?

## The Solution: Multimodal Storytelling with Interleaved Output

PWBC doesn't just research. It **creates**. Like a creative director, it thinks in multiple mediums simultaneously:

Click on **Tristan da Cunha** and instead of a research dump, you experience:

```
[ELEGANT NARRATION]
"In 1506, Portuguese explorers stumbled upon an impossibly remote island 
in the South Atlantic—a volcanic speck so isolated that for centuries, 
the world forgot it existed."

[ATMOSPHERIC IMAGE]
Aerial view of dramatic basalt cliffs, golden light catching the peaks, 
waves crashing against ancient stone.

[INTERACTIVE TIMELINE]
Visual representation of key moments: Discovery → British Annexation → 
Volcanic Eruption → Modern Community

[NARRATION CONTINUES]
"Then came 1961. A volcano that had slept for 200 years woke up. 
The entire population—all 245 people—had to evacuate..."

[DIAGRAM]
Map showing evacuation routes, population distribution, current settlement

[CREATIVE INSIGHT]
"Today, they export crayfish and postage stamps. Yes, postage stamps. 
Because when you're the most remote inhabited place on Earth, 
even your mail becomes a collector's item."
```

This isn't a research report. This is an **interactive storybook** where facts are woven into narrative, visuals appear exactly when they matter, and the story flows like a film—not a textbook.

## How It Works: The Creative Director Agent

PWBC uses Gemini's native interleaved output to act like a creative director:

1. **Research Phase** - Gathers data from hundreds of sources (Tavily, academic databases, archives)
2. **Creative Synthesis** - Transforms raw facts into narrative structure
3. **Multimodal Generation** - Seamlessly interleaves:
   - **Text Narration** - Elegant, engaging prose (not academic jargon)
   - **Generated Imagery** - Visuals appear inline where they enhance understanding
   - **Diagrams & Maps** - Complex information visualized beautifully
   - **Interactive Elements** - Timelines, comparisons, explorations
   - **Audio Scripts** - Optional voiceover narration for key moments

4. **Fluid Output Stream** - Everything flows together in one cohesive experience

## Key Features

### 🌍 Interactive 3D Globe
- Click literally anywhere on Earth
- Satellite imagery with multiple map styles
- Random discovery for serendipitous exploration
- Responsive on all devices

### 📖 Multimodal Storytelling
- **Text + Visuals + Diagrams** - All interleaved in real-time
- **Creative Narration** - Facts told with elegance and personality
- **Interactive Elements** - Timelines, maps, comparisons
- **Engagement-First Design** - Even non-readers stay engaged

### 🎨 Creative Director AI
- Thinks like a filmmaker, not a search engine
- Transforms research into narrative
- Generates contextual imagery on-the-fly
- Weaves multiple mediums seamlessly

### 🔍 Real Research Infrastructure
- Searches hundreds of sources simultaneously
- Academic databases, archives, historical records
- Full citations for verification
- Live progress tracking

### 💾 Save & Share
- Research history with full multimodal content
- Shareable links with embedded storytelling
- Export as interactive documents
- Mobile-responsive sharing

## Technology Stack

### Research & AI
- **[Gemini AI](https://gemini.google.com/)** - Multimodal content generation with interleaved output
- **[Tavily Search API](https://tavily.com/)** - Real-time web search and image retrieval
- **Native Interleaved Output** - Seamless text + image + diagram generation

### Frontend
- **[Next.js 15](https://nextjs.org)** + **[React 19](https://react.dev)** - Modern web framework
- **[Mapbox GL JS](https://www.mapbox.com/mapbox-gljs)** - Interactive 3D globe
- **[Tailwind CSS](https://tailwindcss.com)** + **[Framer Motion](https://www.framer.com/motion/)** - Beautiful animations
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Rich content rendering

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

   Create a `.env.local` file:

   ```env
   # Gemini API (Required for multimodal storytelling)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Mapbox Configuration (Required)
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_access_token_here

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Basic Workflow

1. **Navigate the Globe**
   - Drag to rotate
   - Scroll to zoom
   - Auto-rotates when idle

2. **Click to Research**
   - Click any location
   - Confirm your research interest
   - Watch the creative director work

3. **Experience the Story**
   - Read elegant narration
   - See contextual imagery appear
   - Explore interactive diagrams
   - Discover connections and insights

4. **Engage Deeper**
   - Click citations to verify facts
   - Explore related locations
   - Save stories for later
   - Share with others

### Advanced Features

- **Random Discovery** - Let serendipity guide you
- **Custom Instructions** - Guide the narrative direction
- **Source Filtering** - Choose which sources to prioritize
- **Storytelling Modes** - Different narrative styles
- **Dark Mode** - Matches your system preferences

## The Creative Director Difference

Traditional research tools show you information. PWBC **tells you stories**.

**Before (Traditional Research):**
```
Tristan da Cunha
- Population: 245
- Location: South Atlantic
- Founded: 1506
- Economy: Fishing, postage stamps
```

**After (PWBC Storytelling):**
```
[NARRATION]
"Imagine a place so remote that the nearest neighbor is 2,400 kilometers away. 
A volcanic island where the entire world population could fit in a small town. 
Where your mail becomes a collector's item simply because you live there."

[IMAGE]
Dramatic volcanic landscape with golden light

[INSIGHT]
"In 1961, a volcano woke up. The entire population evacuated. 
When they returned, they came back to rebuild—not because they had to, 
but because home is home, no matter how remote."

[TIMELINE]
Visual journey through 500 years of history

[REFLECTION]
"Today, they export crayfish and dreams. 
Because isolation breeds resilience, and resilience breeds community."
```

See the difference? One is information. The other is **experience**.

## Use Cases

### 📚 Interactive Storybooks
- Educational content that actually engages students
- History that comes alive
- Geography that tells stories

### 🎬 Documentary-Style Narratives
- Research presented like a film
- Facts woven with visuals
- Engagement-first design

### 🎨 Creative Content Generation
- Marketing copy + visuals + diagrams
- Social media content with context
- Presentation materials that wow

### 🧠 Learning & Discovery
- Make research fun again
- Engage non-traditional learners
- Turn facts into stories

## Getting API Keys

### Gemini API (Required)

1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to `.env.local` as `GEMINI_API_KEY`

**Pricing:**
- Free tier available for testing
- Pay-as-you-go for production
- Generous free limits for Gemini Flash models

### Mapbox Access Token (Required)

1. Go to [mapbox.com](https://account.mapbox.com)
2. Sign up for a free account
3. Create a new access token
4. Add it to `.env.local` as `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

**Pricing:**
- 50,000 free map loads per month
- Additional usage billed per load

## Contributing

PWBC is fully open-source. Contributions are welcome.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution

- New storytelling narrative styles
- Additional media types (video, audio)
- Enhanced visual generation
- Interactive element types
- Language support
- Accessibility improvements
- Performance optimizations
- Mobile app versions

## Who This Is For

If you believe research should be engaging. If you think facts can be beautiful. If you've ever wished learning felt less like homework and more like discovery.

Perfect for:
- Students who want to actually enjoy learning
- Educators looking to engage students
- Content creators needing rich narratives
- Researchers wanting beautiful presentations
- Anyone curious about the world

## Known Limitations

- Mapbox free tier: 50k loads/month
- Gemini API calls cost money (very reasonable)
- Some remote locations have limited historical data
- Interleaved output requires modern browsers

## License

MIT License - Open source and free to use.

## Support & Questions

- **Issues**: [Open an issue](https://github.com/Shanky0007/PWBC/issues) on GitHub
- **Discussions**: [Join the discussion](https://github.com/Shanky0007/PWBC/discussions)
- **Feedback**: We'd love to hear how you're using PWBC

## Roadmap

- [ ] Video generation and embedding
- [ ] Audio narration with voice synthesis
- [ ] Multiple narrative styles (Shakespeare, Journalist, Poet, etc.)
- [ ] Collaborative storytelling
- [ ] Advanced timeline visualizations
- [ ] 3D historical recreations
- [ ] AR view for mobile
- [ ] Offline mode with cached stories
- [ ] Community-contributed narratives
- [ ] API for third-party integrations

## The Philosophy

Research shouldn't be boring. History shouldn't be a textbook. Facts shouldn't put you to sleep.

PWBC is built on the belief that **information becomes powerful when it's beautiful**. That engagement matters more than exhaustiveness. That a well-told story about a place teaches you more than a thousand facts ever could.

We're not trying to replace academic research. We're trying to make discovery fun again.

---

**Built for curious minds who believe facts can be beautiful.**

*Click. Discover. Experience. Learn.*

**PWBC: Where Research Meets Storytelling**