/**
 * Tavily API client for web search and image retrieval
 */

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  raw_content?: string;
}

export interface TavilyImageResult {
  url: string;
  description: string;
}

/**
 * Search for historical content using Tavily
 */
export async function searchHistoricalContent(
  query: string,
  options?: {
    includeImages?: boolean;
    maxResults?: number;
  }
): Promise<{
  results: TavilySearchResult[];
  images: TavilyImageResult[];
} | null> {
  if (!TAVILY_API_KEY) {
    console.warn('[Tavily] API key not configured');
    return null;
  }

  try {
    console.log('[Tavily] Searching for:', query);

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: 'advanced',
        include_images: options?.includeImages ?? true,
        include_answer: false,
        max_results: options?.maxResults ?? 5,
      }),
    });

    if (!response.ok) {
      console.error('[Tavily] API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    console.log('[Tavily] Raw response:', JSON.stringify(data, null, 2));
    console.log('[Tavily] Found results:', data.results?.length || 0);
    console.log('[Tavily] Found images:', data.images?.length || 0);
    
    if (data.images && data.images.length > 0) {
      console.log('[Tavily] First image type:', typeof data.images[0]);
      console.log('[Tavily] First image:', JSON.stringify(data.images[0], null, 2));
    }

    // Tavily returns images as an array of strings, not objects
    // Convert to our expected format
    const images = (data.images || []).map((img: any) => {
      if (typeof img === 'string') {
        return { url: img, description: '' };
      }
      return img;
    });

    return {
      results: data.results || [],
      images: images,
    };
  } catch (error) {
    console.error('[Tavily] Error:', error);
    return null;
  }
}

/**
 * Get historical images for a location
 */
export async function getHistoricalImages(
  locationName: string,
  context?: string
): Promise<TavilyImageResult[]> {
  const query = context 
    ? `${locationName} ${context} historical photos landmarks`
    : `${locationName} historical photos landmarks architecture`;

  const results = await searchHistoricalContent(query, {
    includeImages: true,
    maxResults: 3,
  });

  return results?.images || [];
}

/**
 * Get contextual information for storytelling
 */
export async function getContextualInfo(
  locationName: string,
  topic: string
): Promise<string | null> {
  const query = `${locationName} ${topic} history`;

  const results = await searchHistoricalContent(query, {
    includeImages: false,
    maxResults: 3,
  });

  if (!results || results.results.length === 0) {
    return null;
  }

  // Combine top results into a summary
  const summary = results.results
    .slice(0, 2)
    .map(r => r.content)
    .join('\n\n');

  return summary;
}
