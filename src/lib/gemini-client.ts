/**
 * Gemini AI client for content generation
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export interface GeneratedImage {
  url: string;
  alt: string;
  prompt: string;
}

export interface GeneratedDiagram {
  type: 'chart' | 'timeline' | 'map' | 'infographic';
  data: any;
  config: any;
  description: string;
}

export interface GeneratedAudio {
  text: string;
  voice?: 'male' | 'female';
  speed?: number;
}

/**
 * Generate image using multiple sources
 */
export async function generateImage(prompt: string, locationName?: string): Promise<GeneratedImage | null> {
  console.log('[Image Gen] Generating for prompt:', prompt.substring(0, 100));
  
  if (!genAI) {
    console.warn('[Image Gen] Gemini client not initialized');
    return null;
  }

  try {
    // Try Gemini image generation first (if model supports it)
    try {
      console.log('[Image Gen] Attempting Gemini image generation...');
      const imageModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
      
      const result = await imageModel.generateContent(prompt);
      const response = result.response;
      
      // Check if response contains image data
      if (response && response.candidates && response.candidates[0]) {
        const candidate = response.candidates[0];
        // Note: Actual image extraction depends on Gemini's response format
        console.log('[Image Gen] Gemini response received');
      }
    } catch (geminiError) {
      console.log('[Image Gen] Gemini image generation not available, using fallback');
    }

    // Fallback: Use Unsplash for location-specific images
    if (locationName) {
      try {
        console.log('[Image Gen] Fetching from Unsplash for:', locationName);
        const unsplashResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(locationName + ' ' + prompt)}&per_page=1&orientation=landscape`,
          {
            headers: {
              'Authorization': 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' // You'll need to add this to .env
            }
          }
        );
        
        if (unsplashResponse.ok) {
          const data = await unsplashResponse.json();
          if (data.results && data.results.length > 0) {
            const photo = data.results[0];
            console.log('[Image Gen] ✓ Found Unsplash image');
            return {
              url: photo.urls.regular,
              alt: photo.alt_description || prompt,
              prompt: prompt
            };
          }
        }
      } catch (unsplashError) {
        console.log('[Image Gen] Unsplash failed, using placeholder');
      }
    }

    // Final fallback: Use location-specific placeholder
    const seed = locationName ? locationName.replace(/\s/g, '-').toLowerCase() : 'random';
    return {
      url: `https://source.unsplash.com/800x600/?${encodeURIComponent(locationName || 'history')},${encodeURIComponent('landmark')}`,
      alt: prompt,
      prompt: prompt
    };
  } catch (error) {
    console.error('[Image Gen] Error:', error);
    return null;
  }
}

/**
 * Generate diagram data using Gemini
 */
/**
 * Generate diagram data using Gemini
 */
export async function generateDiagram(prompt: string): Promise<GeneratedDiagram | null> {
  console.log('[Gemini] generateDiagram called with prompt:', prompt.substring(0, 100));
  
  if (!genAI) {
    console.warn('[Gemini] Client not initialized - returning fallback diagram');
    return {
      type: 'infographic',
      data: [{ label: 'Data visualization', value: prompt }],
      config: { theme: 'minimal' },
      description: prompt
    };
  }

  try {
    console.log('[Gemini] Initializing model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Extract key information from the prompt to create a simple diagram
    const diagramPrompt = `
Create a simple timeline or infographic based on this description:
"${prompt}"

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "type": "timeline",
  "data": [
    {"year": "3000 BCE", "event": "Bronze Age settlements", "importance": "high"},
    {"year": "500 CE", "event": "Classical period", "importance": "medium"}
  ],
  "config": {"orientation": "horizontal", "theme": "historical"},
  "description": "Historical timeline"
}

IMPORTANT: Return ONLY the JSON object, nothing else.
`;

    console.log('[Gemini] Generating content...');
    const result = await model.generateContent(diagramPrompt);
    const response = result.response;
    let text = response.text();
    
    console.log('[Gemini] Response received, length:', text.length);
    console.log('[Gemini] Response preview:', text.substring(0, 300));
    
    // Clean up the response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const parsed = JSON.parse(text);
      console.log('[Gemini] Successfully parsed JSON:', parsed.type);
      return parsed;
    } catch (parseError) {
      console.error('[Gemini] JSON parse error:', parseError);
      console.log('[Gemini] Raw text:', text);
      
      // Create a simple fallback diagram from the prompt
      return {
        type: 'infographic',
        data: [
          { label: 'Historical Period', value: 'Ancient to Modern' },
          { label: 'Key Events', value: 'Multiple civilizations' },
          { label: 'Significance', value: 'Cultural development' }
        ],
        config: { theme: 'minimal' },
        description: prompt.substring(0, 100)
      };
    }
  } catch (error) {
    console.error('[Gemini] Error generating diagram:', error);
    if (error instanceof Error) {
      console.error('[Gemini] Error message:', error.message);
      console.error('[Gemini] Error stack:', error.stack);
    }
    
    // Return fallback
    return {
      type: 'infographic',
      data: [
        { label: 'Visualization', value: 'Historical data' }
      ],
      config: { theme: 'minimal' },
      description: prompt.substring(0, 100)
    };
  }
}

/**
 * Generate enhanced storytelling content using Gemini
 */
export async function enhanceStorytellingContent(
  originalContent: string,
  locationName: string
): Promise<{
  images: GeneratedImage[];
  diagrams: GeneratedDiagram[];
  audioScripts: GeneratedAudio[];
} | null> {
  if (!genAI) {
    console.warn('Gemini client not initialized');
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const enhancementPrompt = `
Analyze this storytelling content about ${locationName} and suggest specific visual and audio enhancements:

CONTENT:
${originalContent}

Generate suggestions for:
1. 3-5 specific images that would enhance the story
2. 2-3 data visualizations/diagrams
3. 2-3 audio narration scripts for key moments

Return as JSON:
{
  "images": [
    {"prompt": "detailed image description", "alt": "alt text", "context": "where it fits in story"}
  ],
  "diagrams": [
    {"type": "timeline|chart|map", "description": "what to visualize", "context": "story context"}
  ],
  "audioScripts": [
    {"text": "narration script", "voice": "male|female", "context": "dramatic moment"}
  ]
}

Focus on historically accurate, visually compelling content that enhances the narrative.
Only return valid JSON.
`;

    const result = await model.generateContent(enhancementPrompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const suggestions = JSON.parse(text);
      
      const images: GeneratedImage[] = [];
      const diagrams: GeneratedDiagram[] = [];
      const audioScripts: GeneratedAudio[] = [];
      
      for (const imgSuggestion of suggestions.images || []) {
        const image = await generateImage(imgSuggestion.prompt);
        if (image) {
          images.push({
            ...image,
            alt: imgSuggestion.alt || image.alt
          });
        }
      }
      
      for (const diagramSuggestion of suggestions.diagrams || []) {
        const diagram = await generateDiagram(diagramSuggestion.description);
        if (diagram) {
          diagrams.push(diagram);
        }
      }
      
      for (const audioSuggestion of suggestions.audioScripts || []) {
        audioScripts.push({
          text: audioSuggestion.text,
          voice: audioSuggestion.voice || 'female',
          speed: 1.0
        });
      }
      
      return { images, diagrams, audioScripts };
    } catch (parseError) {
      console.error('Error parsing enhancement suggestions:', parseError);
      return null;
    }
  } catch (error) {
    console.error('Error enhancing storytelling content:', error);
    return null;
  }
}

/**
 * Generate text-to-speech audio (placeholder for actual TTS integration)
 */
export async function generateAudio(script: GeneratedAudio): Promise<string | null> {
  // In production, integrate with Google Cloud Text-to-Speech or similar
  // For now, return null to indicate audio generation is not available
  return null;
}