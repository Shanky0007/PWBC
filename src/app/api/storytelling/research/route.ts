import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateStorytellingPrompt } from '@/lib/storytelling-prompt';

export const maxDuration = 300; // 5 minutes

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { location } = await req.json();

    if (!location || !location.name) {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Storytelling Research] Starting for:', location.name);

    // Generate storytelling prompt
    const prompt = generateStorytellingPrompt({
      locationName: location.name,
      lat: location.lat,
      lng: location.lng,
    });

    console.log('[Storytelling Research] Prompt length:', prompt.length);

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    });

    console.log('[Storytelling Research] Calling Gemini...');

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial status
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'status',
                status: 'generating',
                message: 'Crafting your documentary story...',
              })}\n\n`
            )
          );

          // Generate content
          const result = await model.generateContentStream(prompt);

          let fullText = '';
          
          // Stream chunks as they arrive
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'content_chunk',
                  content: chunkText,
                })}\n\n`
              )
            );
          }

          console.log('[Storytelling Research] Generated content length:', fullText.length);

          // Send complete content
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'content',
                content: fullText,
              })}\n\n`
            )
          );

          // Send done signal
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
              })}\n\n`
            )
          );

          console.log('[Storytelling Research] ✓ Complete');
        } catch (error) {
          console.error('[Storytelling Research] Error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[Storytelling Research] Request error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
