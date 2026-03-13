import { NextResponse } from 'next/server';
import { getHistoricalImages } from '@/lib/tavily-client';

export async function GET() {
  try {
    console.log('[Test Tavily] Starting test...');
    
    const testLocation = 'Paris';
    const testPrompt = 'Eiffel Tower historical photograph';
    
    console.log('[Test Tavily] Testing with:', { testLocation, testPrompt });
    
    const images = await getHistoricalImages(testLocation, testPrompt);
    
    console.log('[Test Tavily] Result:', JSON.stringify(images, null, 2));
    
    return NextResponse.json({
      success: true,
      location: testLocation,
      prompt: testPrompt,
      imagesFound: images?.length || 0,
      images: images,
      firstImageUrl: images?.[0]?.url || null,
      apiKeyConfigured: !!process.env.TAVILY_API_KEY
    });
  } catch (error: any) {
    console.error('[Test Tavily] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
