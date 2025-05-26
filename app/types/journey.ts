export interface JourneyScene {
  id: string;
  title: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  knowledgeCard?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    category: string;
  };
}

export interface JourneyEpisode {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  scenes: JourneyScene[];
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  episodes: JourneyEpisode[];
}

export interface JourneyNavigationProps {
  journey: Journey;
}

export interface JourneyEpisodeProps {
  journey: Journey;
  episodeId: string;
}

export interface JourneyProgressProps {
  journey: Journey;
} 