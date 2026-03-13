'use client';

import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, BarChart3, Volume2, Map, Loader2, Play, Pause } from 'lucide-react';
import { MediaBlock } from '@/lib/storytelling-prompt';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MediaBlockRendererProps {
  block: MediaBlock;
  animated?: boolean;
  locationName?: string;
}

interface GeneratedContent {
  images: Array<{ url: string; alt: string; prompt: string }>;
  diagrams: Array<{ type: string; data: any; config: any; description: string }>;
  audioScripts: Array<{ text: string; voice: string }>;
}

export function MediaBlockRenderer({ block, animated = true, locationName }: MediaBlockRendererProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedDiagram, setGeneratedDiagram] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const BlockWrapper: any = animated ? motion.div : 'div';
  const blockProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } : {};

  // Generate content when block mounts - AUTO GENERATE
  useEffect(() => {
    if ((block.type === 'IMAGE_GENERATION_PROMPT' || block.type === 'DIAGRAM_PROMPT') && !isGenerating && !generatedImage && !generatedDiagram) {
      console.log('[MediaBlock] Auto-generating content for:', block.type);
      generateContent();
    }
  }, [block.type, block.content]);

  const generateContent = async () => {
    console.log('[MediaBlock] Generating content for:', block.type);
    console.log('[MediaBlock] Prompt:', block.content.substring(0, 100));
    
    setIsGenerating(true);
    setImageError(null);
    
    try {
      if (block.type === 'IMAGE_GENERATION_PROMPT') {
        console.log('[MediaBlock] Calling /api/storytelling/generate for image...');
        const response = await fetch('/api/storytelling/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'image',
            prompt: block.content,
            locationName: locationName || 'Unknown Location'
          })
        });
        
        console.log('[MediaBlock] Image response status:', response.status);
        const data = await response.json();
        console.log('[MediaBlock] Image response data:', data);
        console.log('[MediaBlock] Image URL received:', data.image?.url);
        
        if (data.image?.url) {
          // Validate URL before setting
          const url = data.image.url;
          if (url.startsWith('http://') || url.startsWith('https://')) {
            console.log('[MediaBlock] ✓ Valid image URL, setting state');
            setGeneratedImage(url);
          } else {
            console.error('[MediaBlock] ✗ Invalid URL format:', url);
            setImageError('Invalid image URL format');
            // Fallback to Picsum
            const seed = (locationName || 'history').toLowerCase().replace(/\s+/g, '-');
            const fallbackUrl = `https://picsum.photos/seed/${seed}/800/600`;
            setGeneratedImage(fallbackUrl);
          }
        } else {
          console.log('[MediaBlock] No image URL in response, using fallback');
          // Fallback to Picsum if API fails
          const seed = (locationName || 'history').toLowerCase().replace(/\s+/g, '-');
          const fallbackUrl = `https://picsum.photos/seed/${seed}/800/600`;
          setGeneratedImage(fallbackUrl);
        }
      } else if (block.type === 'DIAGRAM_PROMPT') {
        console.log('[MediaBlock] Calling /api/storytelling/generate for diagram...');
        const response = await fetch('/api/storytelling/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'diagram',
            diagramPrompt: block.content,
            locationName: locationName || 'Unknown Location'
          })
        });
        
        console.log('[MediaBlock] Diagram response status:', response.status);
        const data = await response.json();
        console.log('[MediaBlock] Diagram response data:', data);
        
        if (data.diagram) {
          setGeneratedDiagram(data.diagram);
        }
      }
    } catch (error) {
      console.error('[MediaBlock] Error generating content:', error);
      
      // Set fallback content on error
      if (block.type === 'IMAGE_GENERATION_PROMPT') {
        const fallbackUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(locationName || 'history')},landmark`;
        setGeneratedImage(fallbackUrl);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(block.content);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const renderDiagram = (diagram: any) => {
    if (!diagram) return null;

    switch (diagram.type) {
      case 'timeline':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm mb-4">{diagram.description}</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
              
              {/* Timeline items */}
              <div className="space-y-6">
                {diagram.data?.map((item: any, idx: number) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-4">
                    {/* Timeline dot */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-background z-10 ${
                      item.importance === 'high' ? 'bg-primary' : 
                      item.importance === 'medium' ? 'bg-blue-500' : 
                      'bg-gray-400'
                    }`} />
                    
                    {/* Content */}
                    <div className="flex-1 ml-8 p-3 bg-background/80 rounded-lg border border-border/50 shadow-sm">
                      <div className="flex items-baseline gap-3">
                        <div className="font-mono text-sm font-bold text-primary min-w-[80px]">
                          {item.year}
                        </div>
                        <div className="text-sm flex-1">{item.event}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{diagram.description}</h4>
            <div className="grid grid-cols-2 gap-3">
              {diagram.data?.map((item: any, idx: number) => {
                const maxValue = Math.max(...(diagram.data?.map((d: any) => parseFloat(d.value) || 0) || [1]));
                const percentage = ((parseFloat(item.value) || 0) / maxValue) * 100;
                
                return (
                  <div key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary mb-1">{item.value}</div>
                    <div className="text-xs text-muted-foreground mb-2">{item.label}</div>
                    {/* Visual bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'infographic':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm mb-4">{diagram.description}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {diagram.data?.map((item: any, idx: number) => (
                <div key={idx} className="relative p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-border/50 text-center">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    {item.label}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-muted/30 rounded">
            <p className="text-sm">{diagram.description}</p>
          </div>
        );
    }
  };

  switch (block.type) {
    case 'TEXT_NARRATION':
      return (
        <BlockWrapper {...blockProps} className="my-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 mb-3">
              <Film className="h-5 w-5 text-primary/60 flex-shrink-0 mt-1" />
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Narration
              </div>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light tracking-wide">
              {block.content}
            </p>
          </div>
        </BlockWrapper>
      );

    case 'IMAGE_GENERATION_PROMPT':
      return (
        <BlockWrapper {...blockProps} className="my-8">
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 shadow-lg">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Visual Scene
                </div>
              </div>
              
              {isGenerating ? (
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border border-border/30">
                  <div className="text-center p-6">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Generating image...</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="aspect-video rounded-lg overflow-hidden border border-border/30">
                  <img 
                    src={generatedImage} 
                    alt={block.content}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('[MediaBlock] ✗ Image failed to load:', generatedImage);
                      console.error('[MediaBlock] Error event:', e);
                      setImageError(`Failed to load image from: ${generatedImage}`);
                      // Try Picsum fallback
                      const seed = (locationName || 'history').toLowerCase().replace(/\s+/g, '-');
                      const fallbackUrl = `https://picsum.photos/seed/${seed}/800/600`;
                      if (generatedImage !== fallbackUrl) {
                        console.log('[MediaBlock] Trying Picsum fallback');
                        setGeneratedImage(fallbackUrl);
                      }
                    }}
                    onLoad={() => {
                      console.log('[MediaBlock] ✓ Image loaded successfully:', generatedImage);
                    }}
                  />
                  {imageError && (
                    <div className="absolute bottom-2 left-2 right-2 bg-red-500/90 text-white text-xs p-2 rounded">
                      {imageError}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border border-border/30">
                  <div className="text-center p-6">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground/70 italic max-w-md mb-3">
                      {block.content}
                    </p>
                    <Button 
                      onClick={generateContent}
                      size="sm"
                      variant="outline"
                    >
                      Generate Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BlockWrapper>
      );

    case 'DIAGRAM_PROMPT':
      return (
        <BlockWrapper {...blockProps} className="my-8">
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-lg">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                  Data Visualization
                </div>
              </div>
              
              {isGenerating ? (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border border-border/30">
                  <div className="text-center p-6">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Generating diagram...</p>
                  </div>
                </div>
              ) : generatedDiagram ? (
                <div className="bg-background/80 rounded-lg p-4 border border-border/30">
                  {renderDiagram(generatedDiagram)}
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border border-border/30">
                  <div className="text-center p-6">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground/70 italic max-w-md mb-3">
                      {block.content}
                    </p>
                    <Button 
                      onClick={generateContent}
                      size="sm"
                      variant="outline"
                    >
                      Generate Diagram
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BlockWrapper>
      );

    case 'AUDIO_NARRATION_SCRIPT':
      return (
        <BlockWrapper {...blockProps} className="my-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-md">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                      Voice-Over
                    </div>
                  </div>
                  {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                    <Button
                      onClick={handlePlayAudio}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3 w-3" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          Play
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-base md:text-lg leading-relaxed text-foreground/80 italic">
                  "{block.content}"
                </p>
              </div>
            </div>
          </div>
        </BlockWrapper>
      );

    case 'MAP_VISUALIZATION':
      const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      return (
        <BlockWrapper {...blockProps} className="my-8">
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20 shadow-lg">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative p-6">
              <div className="flex items-center gap-2 mb-4">
                <Map className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
                  Map View
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden border border-border/30">
                {locationName && googleMapsApiKey ? (
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(locationName)}&zoom=10`}
                    allowFullScreen
                    title={`Map of ${locationName}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6">
                      <Map className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground/70 italic max-w-md">
                        {googleMapsApiKey ? block.content : 'Google Maps API key not configured'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                {block.content}
              </p>
            </div>
          </div>
        </BlockWrapper>
      );

    default:
      return null;
  }
}
