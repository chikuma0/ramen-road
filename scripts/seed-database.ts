import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate UUIDs for our entities
const journeyIds = {
  yokohamaOriginal: crypto.randomUUID(),
  directLineage: crypto.randomUUID(),
  classicLineage: crypto.randomUUID(),
  ichiLineage: crypto.randomUUID(),
  musashiyaLineage: crypto.randomUUID()
};

const testUserId = crypto.randomUUID();

async function seedDatabase() {
  try {
    // Insert knowledge cards
    const { data: cards, error: cardsError } = await supabase
      .from('knowledge_cards')
      .insert([
        {
          title: 'IEKEI Ramen Definition',
          description: 'A style of ramen characterized by tonkotsu-shoyu broth, thick straight noodles, and toppings of spinach, chashu, and nori. Created by Yoshimura in 1974.',
          rarity: 'legendary',
          category: 'history',
          image_url: '/images/cards/iekei-definition.jpg',
          is_premium: false,
          related_journey_id: journeyIds.yokohamaOriginal
        },
        {
          title: 'Yoshimura\'s Legacy',
          description: 'The story of how Yoshimura created the IEKEI style in 1974 in Yokohama, establishing the foundation for all IEKEI ramen shops.',
          rarity: 'legendary',
          category: 'history',
          image_url: '/images/cards/yoshimura.jpg',
          is_premium: true,
          related_journey_id: journeyIds.yokohamaOriginal
        },
        {
          title: 'Direct Lineage',
          description: 'The orthodox branch directly derived from Yoshimura, known for their shoyu-forward soup and smoked chashu in black bowls.',
          rarity: 'rare',
          category: 'regional',
          image_url: '/images/cards/direct-lineage.jpg',
          is_premium: false,
          related_journey_id: journeyIds.directLineage
        },
        {
          title: 'Classic Lineage',
          description: 'Traditional branch emphasizing balance, featuring golden soup served in celadon bowls. Represented by Rokkakuya and Honmokuya.',
          rarity: 'rare',
          category: 'regional',
          image_url: '/images/cards/classic-lineage.jpg',
          is_premium: false,
          related_journey_id: journeyIds.classicLineage
        },
        {
          title: 'Ichi Lineage',
          description: 'Multi-shop expansion style derived from Ichi-Rokuya, known for creamy white soup and free quail eggs and rice.',
          rarity: 'rare',
          category: 'regional',
          image_url: '/images/cards/ichi-lineage.jpg',
          is_premium: false,
          related_journey_id: journeyIds.ichiLineage
        },
        {
          title: 'Shin-Nakano Musashiya Lineage',
          description: 'New IEKEI trend that spread in Tokyo, featuring stronger tonkotsu soup with brown tint and unlimited rice with firm noodles.',
          rarity: 'rare',
          category: 'regional',
          image_url: '/images/cards/musashiya-lineage.jpg',
          is_premium: false,
          related_journey_id: journeyIds.musashiyaLineage
        }
      ])
      .select('id');

    if (cardsError) throw cardsError;
    console.log('Knowledge cards seeded successfully');

    // Insert badges
    const { data: badges, error: badgesError } = await supabase
      .from('badges')
      .insert([
        {
          name: 'IEKEI Explorer',
          description: 'Complete your first IEKEI ramen journey',
          image_url: '/images/badges/iekei-explorer.png',
          criteria_type: 'journey_completion',
          required_count: 1,
          is_special: false
        },
        {
          name: 'Lineage Scholar',
          description: 'Learn about all four IEKEI lineages',
          image_url: '/images/badges/lineage-scholar.png',
          criteria_type: 'card_collection',
          required_count: 4,
          is_special: false
        },
        {
          name: 'IEKEI Master',
          description: 'Complete all premium IEKEI journeys',
          image_url: '/images/badges/iekei-master.png',
          criteria_type: 'journey_completion',
          required_count: 5,
          is_special: true
        },
        {
          name: 'Yokohama Heritage',
          description: 'Visit all original IEKEI shops in Yokohama',
          image_url: '/images/badges/yokohama-heritage.png',
          criteria_type: 'journey_completion',
          required_count: 3,
          is_special: true
        }
      ])
      .select('id');

    if (badgesError) throw badgesError;
    console.log('Badges seeded successfully');

    // Insert initial user progress (for testing)
    const { error: progressError } = await supabase
      .from('user_progress')
      .insert([
        {
          user_id: testUserId,
          level: 15,
          experience: 15750,
          completed_journeys: Object.values(journeyIds),
          collected_cards: cards?.map(card => card.id) || [],
          badges: badges?.slice(0, 3).map(badge => badge.id) || [],
          last_level_up: new Date().toISOString()
        }
      ]);

    if (progressError) throw progressError;
    console.log('User progress seeded successfully');

    // Insert certificates
    const { error: certificatesError } = await supabase
      .from('certificates')
      .insert([
        {
          journey_id: journeyIds.yokohamaOriginal,
          user_id: testUserId,
          completed_at: new Date().toISOString(),
          certificate_image_url: '/certificates/yokohama-original.png',
          taste_insights: [
            'Developed a deep appreciation for the original IEKEI style',
            'Mastered the art of identifying authentic tonkotsu-shoyu balance',
            'Gained insight into the historical significance of Yoshimura\'s creation'
          ]
        },
        {
          journey_id: journeyIds.directLineage,
          user_id: testUserId,
          completed_at: new Date().toISOString(),
          certificate_image_url: '/certificates/direct-lineage.png',
          taste_insights: [
            'Learned to appreciate the shoyu-forward soup style',
            'Developed a taste for smoked chashu in black bowls',
            'Understood the significance of the orthodox branch'
          ]
        },
        {
          journey_id: journeyIds.classicLineage,
          user_id: testUserId,
          completed_at: new Date().toISOString(),
          certificate_image_url: '/certificates/classic-lineage.png',
          taste_insights: [
            'Appreciated the golden soup served in celadon bowls',
            'Learned about the traditional balance of flavors',
            'Experienced the heritage of Rokkakuya and Honmokuya'
          ]
        }
      ]);

    if (certificatesError) throw certificatesError;
    console.log('Certificates seeded successfully');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 