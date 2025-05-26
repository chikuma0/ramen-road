-- Insert sample knowledge cards
INSERT INTO knowledge_cards (title, description, rarity, category, image_url, is_premium) VALUES
('Yokohama IEKEI Origins', 'The story of how IEKEI ramen was born in Yokohama', 'rare', 'history', '/images/cards/yokohama-iekei.jpg', false),
('Pork Bone Broth', 'The art of making tonkotsu broth', 'common', 'techniques', '/images/cards/pork-bone-broth.jpg', false),
('Noodle Making', 'Traditional ramen noodle making techniques', 'uncommon', 'techniques', '/images/cards/noodle-making.jpg', false),
('Soy Sauce Types', 'Different types of soy sauce used in ramen', 'common', 'ingredients', '/images/cards/soy-sauce.jpg', false),
('Ramen Culture', 'The cultural significance of ramen in Japan', 'legendary', 'culture', '/images/cards/ramen-culture.jpg', true);

-- Insert sample badges
INSERT INTO badges (name, description, image_url, criteria_type, required_count, is_special) VALUES
('Ramen Novice', 'Complete your first ramen journey', '/images/badges/novice.png', 'journey_completion', 1, false),
('Knowledge Collector', 'Collect 10 knowledge cards', '/images/badges/collector.png', 'card_collection', 10, false),
('Ramen Master', 'Reach level 10', '/images/badges/master.png', 'level_up', 10, false),
('Founder''s Badge', 'Special badge for early supporters', '/images/badges/founder.png', 'special_event', NULL, true);

-- Insert sample user progress (replace USER_ID with an actual user ID after registration)
-- INSERT INTO user_progress (user_id, level, experience, completed_journeys, collected_cards, badges)
-- VALUES ('USER_ID', 1, 0, ARRAY['yokohama-original'], ARRAY[]::uuid[], ARRAY[]::uuid[]);

-- Insert sample certificate (replace USER_ID with an actual user ID after registration)
-- INSERT INTO certificates (journey_id, user_id, certificate_image_url, taste_insights)
-- VALUES ('yokohama-original', 'USER_ID', '/images/certificates/yokohama-original.jpg', ARRAY['Rich tonkotsu flavor', 'Perfect noodle texture']); 