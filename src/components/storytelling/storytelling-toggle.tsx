'use client';

import { motion } from 'framer-motion';
import { Film, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StorytellingToggleProps {
  isStoryMode: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

export function StorytellingToggle({ isStoryMode, onToggle, disabled = false }: StorytellingToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg border">
      <Button
        variant={!isStoryMode ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(false)}
        disabled={disabled}
        className="gap-1.5 h-8 px-3"
      >
        <FileText className="h-3.5 w-3.5" />
        <span className="text-xs">Report</span>
      </Button>
      
      <Button
        variant={isStoryMode ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(true)}
        disabled={disabled}
        className="gap-1.5 h-8 px-3"
      >
        <Film className="h-3.5 w-3.5" />
        <span className="text-xs">Story</span>
      </Button>
    </div>
  );
}