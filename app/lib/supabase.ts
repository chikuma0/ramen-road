import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  knowledge_cards: {
    id: string;
    title: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    category: 'ingredients' | 'techniques' | 'history' | 'culture' | 'regional';
    image_url: string;
    is_premium: boolean;
    related_journey_id?: string;
    unlocked_at?: string;
  };
  badges: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    criteria_type: 'journey_completion' | 'card_collection' | 'level_up' | 'special_event';
    required_count?: number;
    required_id?: string;
    is_special: boolean;
  };
  certificates: {
    id: string;
    journey_id: string;
    user_id: string;
    completed_at: string;
    certificate_image_url?: string;
    taste_insights: string[];
  };
  user_progress: {
    user_id: string;
    level: number;
    experience: number;
    completed_journeys: string[];
    collected_cards: string[];
    badges: string[];
    last_level_up: string;
  };
}; 