'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MediaBlock } from '@/lib/storytelling-prompt';
import { MediaBlockRenderer } from './media-block-renderer';
import { Sparkles } from 'lucide-react';

interface StoryViewProps {
  blocks: MediaBlock[];
  locationName: string;
  isComplete?: boolean;
}

export function StoryView({ blocks, locationName, isComplete = false }: StoryViewProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-12 w-12 text-primary/60 mx-auto mb-4" />
          </motion.div>
          <p className="text-sm font-medium text-muted-foreground">
            Crafting your documentary story...
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Story Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-12 border-b border-border/30"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-tight font-serif italic text-foreground/95 mb-4">
            {locationName}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="uppercase tracking-wider font-medium">A Documentary Story</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Media Blocks */}
      <div className="py-8">
        <AnimatePresence mode="sync">
          {blocks.map((block) => (
            <MediaBlockRenderer
              key={`block-${block.index}`}
              block={block}
              animated={true}
              locationName={locationName}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Completion Indicator */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-12 border-t border-border/30"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Story Complete</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
