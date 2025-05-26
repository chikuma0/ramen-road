export type CardRarity = 'legendary' | 'rare' | 'uncommon' | 'common';
export type CardCategory = 'ingredients' | 'techniques' | 'history' | 'culture' | 'regional';

export interface KnowledgeCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rarity: CardRarity;
  category: CardCategory;
  isPremium: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  level: number;
  experience: number;
  completedJourneys: string[];
  collectedCards: string[];
  badges: string[];
  lastLevelUp: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: {
    type: 'journey_completion' | 'card_collection' | 'level_up' | 'special_event';
    requiredId?: string;
    requiredCount?: number;
  };
  isSpecial: boolean;
}

export interface Certificate {
  id: string;
  journeyId: string;
  userId: string;
  completedAt: string;
  certificateImageUrl?: string;
  tasteInsights: string[];
  journeyName: string;
} 