import { supabase } from '../supabase';
import { UserProgress, Certificate } from '../../types/gamification';

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  console.log('getUserProgress called with userId:', userId);
  const { supabase } = await import('../supabase');
  try {
    console.log('getUserProgress: querying supabase...');
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    console.log('getUserProgress: query result:', { data, error });
    if (error || !data) {
      console.error('Error fetching user progress:', error);
      return null;
    }
    return {
      level: data.level,
      experience: data.experience,
      completedJourneys: data.completed_journeys,
      collectedCards: data.collected_cards,
      badges: data.badges,
      lastLevelUp: data.last_level_up
    };
  } catch (err) {
    console.error('getUserProgress: exception thrown:', err);
    return null;
  }
}

export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching user certificates:', error);
    return [];
  }

  return data.map(cert => ({
    id: cert.id,
    journeyId: cert.journey_id,
    userId: cert.user_id,
    completedAt: cert.completed_at,
    certificateImageUrl: cert.certificate_image_url,
    tasteInsights: cert.taste_insights,
    journeyName: cert.journey_id || 'Unknown Journey',
  }));
}

export async function getJourneyName(journeyId: string): Promise<string> {
  // This is a temporary function until we create the journeys table
  const journeyNames: { [key: string]: string } = {
    'yokohama-original': 'Yokohama Original IEKEI Journey',
    'direct-lineage': 'Direct Lineage Journey',
    'classic-lineage': 'Classic Lineage Journey',
    'ichi-lineage': 'Ichi Lineage Journey',
    'musashiya-lineage': 'Musashiya Lineage Journey'
  };

  return journeyNames[journeyId] || 'Unknown Journey';
}

export async function completeJourneyForUser({
  userId,
  journeyId,
  badgeId,
  certificateImageUrl,
  certificateName
}: {
  userId: string;
  journeyId: string;
  badgeId: string;
  certificateImageUrl: string;
  certificateName: string;
}) {
  // 1. Update user_progress: add journeyId to completed_journeys, badgeId to badges
  const { data: progress, error: progressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (progressError || !progress) throw progressError || new Error('No user progress');

  // Add journey if not already present
  const completedJourneys = Array.isArray(progress.completed_journeys) ? progress.completed_journeys : [];
  const badges = Array.isArray(progress.badges) ? progress.badges : [];
  const newCompletedJourneys = completedJourneys.includes(journeyId)
    ? completedJourneys
    : [...completedJourneys, journeyId];
  const newBadges = badges.includes(badgeId) ? badges : [...badges, badgeId];

  await supabase
    .from('user_progress')
    .update({
      completed_journeys: newCompletedJourneys,
      badges: newBadges
    })
    .eq('user_id', userId);

  // 2. Insert certificate if not already present
  const { data: certs } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .eq('journey_id', journeyId);
  if (!certs || certs.length === 0) {
    await supabase.from('certificates').insert({
      journey_id: journeyId,
      user_id: userId,
      certificate_image_url: certificateImageUrl,
      journey_name: certificateName
    });
  }
} 