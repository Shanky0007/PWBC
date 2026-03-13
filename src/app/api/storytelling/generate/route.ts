import { NextRequest, NextResponse } from 'next/server';
import { enhanceStorytellingContent, generateImage, generateDiagram } from '@/lib/gemini-client';
import { getHistoricalImages } from '@/lib/tavily-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, locationName, type, prompt, diagramPrompt } = body;

    if (!locationName) {
      return NextResponse.json(
        { error: 'Location name is required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'enhance':
        // Generate comprehensive enhancements
        if (!content) {
          return NextResponse.json(
            { error: 'Content is required for enhancement' },
            { status: 400 }
          );
        }
        const enhancements = await enhanceStorytellingContent(content, locationName);
        return NextResponse.json({ enhancements });

      case 'image':
        // Generate single image - try Tavily first for real historical photos
        if (!prompt) {
          return NextResponse.json(
            { error: 'Image prompt is required' },
            { status: 400 }
          );
        }
        
        console.log('[Storytelling API] Fetching image for:', locationName);
        console.log('[Storytelling API] Image prompt:', prompt.substring(0, 100));
        
        // Try Tavily for real historical images
        try {
          const tavilyImages = await getHistoricalImages(locationName, prompt);
          if (tavilyImages && tavilyImages.length > 0) {
            console.log('[Storytelling API] ✓ Found Tavily images:', tavilyImages.length);
            console.log('[Storytelling API] All Tavily images:', JSON.stringify(tavilyImages, null, 2));
            
            const firstImage = tavilyImages[0];
            console.log('[Storytelling API] First image object:', JSON.stringify(firstImage, null, 2));
            console.log('[Storytelling API] First image URL:', firstImage.url);
            console.log('[Storytelling API] First image description:', firstImage.description);
            console.log('[Storytelling API] URL type:', typeof firstImage.url);
            console.log('[Storytelling API] URL starts with http:', firstImage.url?.startsWith('http'));
            
            // Validate the URL
            const imageUrl = firstImage.url;
            if (imageUrl && typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
              console.log('[Storytelling API] ✓ Valid URL, returning to client');
              return NextResponse.json({ 
                image: {
                  url: imageUrl,
                  alt: firstImage.description || prompt,
                  prompt: prompt,
                  source: 'tavily'
                }
              });
            } else {
              console.log('[Storytelling API] ✗ Invalid Tavily URL format:', imageUrl);
            }
          } else {
            console.log('[Storytelling API] No Tavily images found in response');
          }
        } catch (tavilyError) {
          console.error('[Storytelling API] Tavily error:', tavilyError);
          console.error('[Storytelling API] Error details:', JSON.stringify(tavilyError, null, 2));
        }
        
        // Fallback to Picsum (Lorem Picsum - reliable placeholder service)
        console.log('[Storytelling API] Using Picsum fallback for location:', locationName);
        // Use a deterministic seed based on location name for consistent images
        const seed = locationName.toLowerCase().replace(/\s+/g, '-');
        const fallbackUrl = `https://picsum.photos/seed/${seed}/800/600`;
        console.log('[Storytelling API] Fallback URL:', fallbackUrl);
        return NextResponse.json({ 
          image: {
            url: fallbackUrl,
            alt: prompt,
            prompt: prompt,
            source: 'picsum'
          }
        });

      case 'diagram':
        // Generate single diagram
        if (!diagramPrompt) {
          return NextResponse.json(
            { error: 'Diagram prompt is required' },
            { status: 400 }
          );
        }
        const diagram = await generateDiagram(diagramPrompt);
        return NextResponse.json({ diagram });

      default:
        return NextResponse.json(
          { error: 'Invalid generation type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in storytelling generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}