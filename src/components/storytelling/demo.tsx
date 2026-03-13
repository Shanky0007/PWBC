'use client';

import { StoryView } from './story-view';
import { MediaBlock } from '@/lib/storytelling-prompt';

const DEMO_BLOCKS: MediaBlock[] = [
  {
    type: 'TEXT_NARRATION',
    content: 'The island emerges from the Atlantic like a forgotten thought — volcanic, solitary, and impossibly far from anywhere.',
    index: 0,
  },
  {
    type: 'IMAGE_GENERATION_PROMPT',
    content: 'Aerial view of a remote volcanic island in the South Atlantic, dramatic basalt cliffs dropping into dark ocean, low clouds catching golden light, painterly realism style, wide cinematic aspect ratio.',
    index: 1,
  },
  {
    type: 'AUDIO_NARRATION_SCRIPT',
    content: 'Tristan da Cunha. Over 2,400 kilometres from the nearest land. For centuries, it existed only as a rumour among sailors.',
    index: 2,
  },
  {
    type: 'DIAGRAM_PROMPT',
    content: 'Distance comparison infographic: Tristan da Cunha vs other remote islands, showing nearest landmasses with labelled km markers. Clean, minimal style with ocean-blue palette.',
    index: 3,
  },
  {
    type: 'TEXT_NARRATION',
    content: 'Portuguese explorer Tristão da Cunha first sighted these peaks in 1506, sailing toward India through treacherous southern waters.',
    index: 4,
  },
  {
    type: 'MAP_VISUALIZATION',
    content: 'Historical map showing Portuguese trade routes to India in the 16th century, with Tristan da Cunha marked as a waypoint. Vintage cartographic style with compass rose and sailing ships.',
    index: 5,
  },
];

export function StorytellingDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Storytelling Demo</h1>
        <p className="text-muted-foreground">
          Example of how geographic research is transformed into immersive documentary experiences
        </p>
      </div>
      
      <StoryView 
        blocks={DEMO_BLOCKS}
        locationName="Tristan da Cunha"
        isComplete={true}
      />
    </div>
  );
}