# Ramen Journey Feature Redesign

## Current State
The current journey feature is based on a simpler "lineage" model that presents educational content about ramen in a more straightforward manner. It lacks the narrative structure and premium content features needed to create compelling storytelling experiences that can drive subscription revenue.

## Vision for Curated Journeys
Curated journeys reimagine the educational experience as immersive, narrative-driven adventures through the world of ramen. We'll transform educational content into engaging storylines that users will want to follow from beginning to end.

### Key Differentiators
1. **Narrative Structure**: Content organized into a compelling story arc with proper narrative phases (exposition, rising_action, climax, falling_action, resolution)
2. **Character-Driven**: Featuring prominent ramen figures whose stories add depth and human connection
3. **Premium Tiering**: Strategic mix of free and premium content to drive subscriptions
4. **Production Value**: Higher quality media, including exclusive interviews and video content
5. **Journey Types**: Specialized journey categories (historical, regional, technique, flavor, master class)

## Business Goals
1. Increase user engagement with longer session times and repeat visits
2. Create clear value proposition for premium subscriptions
3. Build foundation for recurring revenue through subscription model
4. Cultivate deeper knowledge and appreciation of ramen culture

## Implementation Plan

### Phase 1: Core Infrastructure (Current)
- ✅ Define type system for curated journeys
- ✅ Create database schema for journeys, episodes, scenes, and characters
- ✅ Build card components for displaying journeys in listings
- ✅ Design journey detail pages with episode navigation

### Phase 2: Content Creation & Premium Features
- Create initial set of 3-5 curated journeys with varied themes
- Develop premium content locking mechanism
- Implement subscription handling and payment processing
- Build analytics tracking for journey progression

### Phase 3: User Engagement & Retention
- Add journey bookmarks and favorites
- Implement knowledge card collection feature
- Create journey completion rewards and certificates
- Add social sharing for completed journeys

## Content Strategy

### Journey Types
- **Historical**: Chronicle the evolution of ramen styles
- **Master Class**: Deep dives into techniques from renowned chefs
- **Regional**: Explorations of regional variations and influences
- **Flavor Profile**: Focus on ingredient combinations and taste development
- **Technique**: Specific cooking methods and preparation approaches

### Target Audiences
- **Beginner**: Newcomers to ramen appreciation
- **Enthusiast**: Regular ramen consumers seeking deeper knowledge
- **Connoisseur**: Dedicated fans and culinary professionals

## Premium Content Strategy
For each journey, we'll follow this content allocation strategy:
- **Free**: 1-2 introductory episodes to showcase quality and hook users
- **Premium Basic**: Core storyline episodes with standard production value
- **Premium Exclusive**: Special content with higher production value (interviews, behind-the-scenes, rare techniques)

## Database Schema Changes
```sql
-- See journey_curated_schema.sql for complete implementation details
CREATE TABLE journey_curated (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_japanese VARCHAR(255),
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  storyline TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  journey_type VARCHAR(50) NOT NULL,
  target_audience VARCHAR(50) NOT NULL,
  estimated_completion_minutes INTEGER NOT NULL,
  -- Additional fields omitted for brevity
);

CREATE TABLE journey_episodes (
  id SERIAL PRIMARY KEY,
  journey_id INTEGER REFERENCES journey_curated(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_free_preview BOOLEAN NOT NULL DEFAULT false,
  narrative_phase VARCHAR(50),
  -- Additional fields omitted for brevity
);

-- Additional tables for scenes, characters, etc.
```

## User Interface Components
- `CuratedJourneyCard`: Display journey in listings with premium indicators
- `CuratedJourneyDetails`: Show complete journey with episode list and progress
- `CuratedJourneyEpisodePage`: Single episode view with scene navigation
- `PremiumLockedContent`: Paywall presentation for premium content
- `JourneyCharacter`: Character information display component
- `KnowledgeCardDisplay`: Interactive knowledge cards that users can collect

## Next Steps
1. Finalize premium subscription tiers and pricing
2. Create editorial calendar for journey content creation
3. Design promotional strategy for premium journeys
4. Set up analytics for measuring subscription conversion rate
5. Develop A/B testing plan for optimizing conversion

## Future Expansion
- User-generated journeys and reviews
- Expert-led live events tied to journey themes
- Physical merchandise tied to journey completion
- Mobile app with offline journey access for travelers