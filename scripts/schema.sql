-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create knowledge_cards table
CREATE TABLE IF NOT EXISTS knowledge_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'legendary')),
  category TEXT NOT NULL CHECK (category IN ('ingredients', 'techniques', 'history', 'culture', 'regional')),
  image_url TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  related_journey_id UUID,
  unlocked_at TIMESTAMP WITH TIME ZONE
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  criteria_type TEXT NOT NULL CHECK (criteria_type IN ('journey_completion', 'card_collection', 'level_up', 'special_event')),
  required_count INTEGER,
  required_id UUID,
  is_special BOOLEAN DEFAULT false
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journey_id UUID NOT NULL,
  user_id UUID NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  certificate_image_url TEXT,
  taste_insights TEXT[] NOT NULL
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY,
  level INTEGER NOT NULL DEFAULT 1,
  experience INTEGER NOT NULL DEFAULT 0,
  completed_journeys UUID[] DEFAULT '{}',
  collected_cards UUID[] DEFAULT '{}',
  badges UUID[] DEFAULT '{}',
  last_level_up TIMESTAMP WITH TIME ZONE NOT NULL
); 