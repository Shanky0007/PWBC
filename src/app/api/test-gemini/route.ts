import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('[Test Gemini] API Key present:', !!apiKey);
  console.log('[Test Gemini] API Key preview:', apiKey?.substring(0, 20) + '...');
  
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'GEMINI_API_KEY not found in environment variables'
    }, { status: 500 });
  }

  try {
    console.log('[Test Gemini] Initializing GoogleGenerativeAI...');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log('[Test Gemini] Getting model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('[Test Gemini] Generating test content...');
    const result = await model.generateContent('Say hello in one word');
    
    console.log('[Test Gemini] Getting response...');
    const response = result.response;
    const text = response.text();
    
    console.log('[Test Gemini] ✓ Success! Response:', text);
    
    return NextResponse.json({
      success: true,
      message: 'Gemini API is working!',
      response: text,
      apiKeyPreview: apiKey.substring(0, 20) + '...'
    });
  } catch (error) {
    console.error('[Test Gemini] ✗ Error:', error);
    
    if (error instanceof Error) {
      console.error('[Test Gemini] Error message:', error.message);
      console.error('[Test Gemini] Error stack:', error.stack);
      
      return NextResponse.json({
        success: false,
        error: error.message,
        errorType: error.constructor.name,
        stack: error.stack
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}
