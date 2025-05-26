import { supabase } from '../supabase';
import { KnowledgeCard, Badge } from '../../types/gamification';

export async function getKnowledgeCards(): Promise<KnowledgeCard[]> {
  const { data, error } = await supabase
    .from('knowledge_cards')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching knowledge cards:', error);
    return [];
  }

  return data.map(card => ({
    id: card.id,
    title: card.title,
    description: card.description,
    rarity: card.rarity,
    category: card.category,
    imageUrl: card.image_url,
    isPremium: card.is_premium,
    unlockedAt: card.unlocked_at
  }));
}

export async function getBadges(): Promise<Badge[]> {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('is_special', { ascending: false });

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data.map(badge => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    imageUrl: badge.image_url,
    criteria: {
      type: badge.criteria_type,
      requiredCount: badge.required_count
    },
    isSpecial: badge.is_special
  }));
}

export async function getUserUnlockedBadges(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('badges')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data.badges;
} 