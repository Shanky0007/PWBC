'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function TestGeminiPage() {
  const [prompt, setPrompt] = useState('Generate a timeline of major events in Paris history');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testGeneration = async (type: 'image' | 'diagram') => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/storytelling/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          [type === 'image' ? 'prompt' : 'diagramPrompt']: prompt,
          locationName: 'Paris',
          content: 'Test content'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gemini Integration Test</h1>
        <p className="text-muted-foreground">
          Test the Gemini AI integration for storytelling content generation.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Test Prompt
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to test..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => testGeneration('image')}
            disabled={loading || !prompt.trim()}
            className="flex-1"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Test Image Generation
          </Button>
          
          <Button
            onClick={() => testGeneration('diagram')}
            disabled={loading || !prompt.trim()}
            variant="outline"
            className="flex-1"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Test Diagram Generation
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="font-semibold text-destructive mb-2">Error</h3>
          <p className="text-sm text-destructive/80">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Make sure you have set the GEMINI_API_KEY environment variable.
          </p>
        </div>
      )}

      {result && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Result</h3>
          <pre className="text-xs bg-background p-3 rounded border overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Setup Instructions:</strong></p>
        <p>1. Get a Gemini API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" className="text-primary hover:underline">Google AI Studio</a></p>
        <p>2. Add GEMINI_API_KEY=your_key_here to your .env.local file</p>
        <p>3. Restart the development server</p>
      </div>
    </div>
  );
}