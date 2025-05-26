# Ramen Journey Gamification Implementation Plan

## Overview

This document outlines the technical implementation plan for the gamification features described in the `RamenJourney_Gamification_Design.md` document. This plan provides a phased approach to implementing the gamification system, breaking down the work into manageable components while ensuring a cohesive user experience.

## Phase 1: Core Foundation (Current Sprint)

### Database Schema Enhancements

1. **User Taste Profile Table**
   ```sql
   CREATE TABLE user_taste_profiles (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     richness INTEGER NOT NULL CHECK (richness BETWEEN 1 AND 10),
     saltiness INTEGER NOT NULL CHECK (saltiness BETWEEN 1 AND 10),
     spiciness INTEGER NOT NULL CHECK (spiciness BETWEEN 1 AND 10),
     umami INTEGER NOT NULL CHECK (umami BETWEEN 1 AND 10),
     acidity INTEGER NOT NULL CHECK (acidity BETWEEN 1 AND 10),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id)
   );
   ```

2. **User Progress Table**
   ```sql
   CREATE TABLE user_progress (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     xp INTEGER NOT NULL DEFAULT 0,
     level INTEGER NOT NULL DEFAULT 1,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id)
   );
   ```

3. **Journey Badges Table**
   ```sql
   CREATE TABLE journey_badges (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name VARCHAR(100) NOT NULL,
     description TEXT NOT NULL,
     image_url TEXT,
     is_special BOOLEAN NOT NULL DEFAULT false,
     related_journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
     criteria_type VARCHAR(50) NOT NULL,
     criteria_required_id UUID,
     criteria_required_count INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

4. **User Badges Table**
   ```sql
   CREATE TABLE user_badges (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     badge_id UUID NOT NULL REFERENCES journey_badges(id) ON DELETE CASCADE,
     earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, badge_id)
   );
   ```

### Frontend Components Implementation

1. **Taste Profile Components**
   - [x] `PreferenceQuestionCard.tsx` - For individual questions in the taste profile quiz
   - [x] `UserTasteProfile.tsx` - For displaying the user's taste profile
   - [x] `TasteProfileQuiz.tsx` - Main component for the taste quiz experience

2. **Badge Components**
   - [x] `JourneyBadgeDisplay.tsx` - For displaying individual badges
   - [ ] `BadgeCollectionGrid.tsx` - For displaying user's badge collection

3. **Progress Components**
   - [ ] `UserProgressBar.tsx` - For displaying XP and level progress
   - [ ] `LevelUpNotification.tsx` - Animated notification for level up events

### Backend API Endpoints

1. **Taste Profile Management**
   - [ ] `POST /api/taste-profile` - Save user taste profile
   - [ ] `GET /api/taste-profile` - Get user taste profile
   - [ ] `GET /api/taste-profile/recommendations` - Get personalized recommendations

2. **Badge Management**
   - [ ] `GET /api/badges` - Get all available badges
   - [ ] `GET /api/badges/user` - Get user's earned badges
   - [ ] `POST /api/badges/award` - Award a badge to user (admin/system only)

3. **Progress Management**
   - [ ] `GET /api/progress` - Get user's XP and level
   - [ ] `POST /api/progress/award-xp` - Award XP to user

### Pages & Routes

1. **Taste Profile Pages**
   - [x] `/taste-profile/quiz` - Interactive taste profile quiz
   - [x] `/taste-profile/results` - Results and recommendations
   - [ ] `/taste-profile` - User's taste profile dashboard

2. **Achievement Pages**
   - [ ] `/achievements` - User's badge collection and progress
   - [ ] `/achievements/[badgeId]` - Detailed view of a specific badge

### Integration Points

1. **Journey Pages Integration**
   - [ ] Add taste profile recommendations to journey listing pages
   - [ ] Add badge displays to completed journey pages
   - [ ] Add XP rewards to journey module completion

2. **User Profile Integration**
   - [ ] Add taste profile section to user profile
   - [ ] Add badge showcase to user profile
   - [ ] Add level and XP display to user profile

## Phase 2: Enhanced Engagement (Next Sprint)

### Database Schema Enhancements

1. **Knowledge Cards Table**
   ```sql
   CREATE TABLE knowledge_cards (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title VARCHAR(100) NOT NULL,
     content TEXT NOT NULL,
     image_url TEXT,
     rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'legendary')),
     categories TEXT[] NOT NULL,
     journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
     premium_only BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **User Card Collection Table**
   ```sql
   CREATE TABLE user_cards (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     card_id UUID NOT NULL REFERENCES knowledge_cards(id) ON DELETE CASCADE,
     collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, card_id)
   );
   ```

3. **Challenges Table**
   ```sql
   CREATE TABLE journey_challenges (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title VARCHAR(100) NOT NULL,
     description TEXT NOT NULL,
     type VARCHAR(20) NOT NULL,
     xp_reward INTEGER NOT NULL,
     tasks JSONB NOT NULL,
     start_date TIMESTAMP WITH TIME ZONE,
     end_date TIMESTAMP WITH TIME ZONE,
     premium_only BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

4. **User Challenges Table**
   ```sql
   CREATE TABLE user_challenges (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     challenge_id UUID NOT NULL REFERENCES journey_challenges(id) ON DELETE CASCADE,
     task_progress INTEGER[] NOT NULL,
     completed BOOLEAN NOT NULL DEFAULT false,
     completed_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, challenge_id)
   );
   ```

### Frontend Components

1. **Knowledge Card Components**
   - [ ] `KnowledgeCard.tsx` - For displaying collectible knowledge cards
   - [ ] `CardCollectionGrid.tsx` - For browsing card collection
   - [ ] `CardDiscoveryModal.tsx` - For revealing newly discovered cards

2. **Challenge Components**
   - [ ] `ChallengeCard.tsx` - For displaying challenge information
   - [ ] `ChallengeProgressTracker.tsx` - For tracking progress on challenges
   - [ ] `ActiveChallengesList.tsx` - For listing active challenges

3. **Certificate Components**
   - [ ] `JourneyCertificate.tsx` - For displaying journey completion certificates
   - [ ] `CertificateShareCard.tsx` - For sharing certificates to social media

### Pages & Routes

1. **Knowledge Card Pages**
   - [ ] `/cards` - User's card collection
   - [ ] `/cards/[cardId]` - Detailed view of a specific card
   - [ ] `/cards/sets` - Card set completion status

2. **Challenge Pages**
   - [ ] `/challenges` - Active and available challenges
   - [ ] `/challenges/[challengeId]` - Detailed view of a specific challenge
   - [ ] `/challenges/daily` - Daily challenges hub

3. **Certificate Pages**
   - [ ] `/certificates` - User's earned certificates
   - [ ] `/certificates/[certificateId]` - Shareable certificate view

## Phase 3: Social & Community (Future Sprint)

### Database Schema Enhancements

1. **Friend Connections Table**
   ```sql
   CREATE TABLE user_friends (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     friend_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     status VARCHAR(20) NOT NULL DEFAULT 'pending',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, friend_id),
     CHECK (user_id != friend_id)
   );
   ```

2. **Community Challenges Table**
   ```sql
   CREATE TABLE community_challenges (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title VARCHAR(100) NOT NULL,
     description TEXT NOT NULL,
     goal INTEGER NOT NULL,
     current_progress INTEGER NOT NULL DEFAULT 0,
     start_date TIMESTAMP WITH TIME ZONE NOT NULL,
     end_date TIMESTAMP WITH TIME ZONE NOT NULL,
     reward_description TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **User Community Contributions Table**
   ```sql
   CREATE TABLE user_community_contributions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     challenge_id UUID NOT NULL REFERENCES community_challenges(id) ON DELETE CASCADE,
     contribution_amount INTEGER NOT NULL DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

### Frontend Components

1. **Social Components**
   - [ ] `FriendsList.tsx` - For displaying and managing friends
   - [ ] `FriendProgressComparison.tsx` - For comparing progress with friends
   - [ ] `SocialShareCard.tsx` - For sharing achievements to social media

2. **Community Components**
   - [ ] `CommunityGoalTracker.tsx` - For tracking community-wide challenge progress
   - [ ] `CommunityLeaderboard.tsx` - For displaying top contributors
   - [ ] `ContributionHistoryChart.tsx` - For visualizing personal contributions

3. **Trading Components**
   - [ ] `CardTradingInterface.tsx` - For trading cards with other users
   - [ ] `TradeOfferCard.tsx` - For displaying incoming/outgoing trade offers
   - [ ] `CardValueEstimator.tsx` - For estimating card rarity and trade value

## Technical Implementation Details

### Client-Side State Management

1. **Local Storage Strategy**
   - Store taste profile temporarily during quiz
   - Cache badge collection for offline viewing
   - Store XP animations state to prevent repeated animations

2. **React Context API**
   - Create `GamificationContext` for sharing user progress, badges, and cards
   - Create `TasteProfileContext` for sharing taste preferences
   - Create `ChallengeContext` for tracking active challenges

### Server-Side Implementation

1. **Supabase Integration**
   - Real-time subscription to user progress updates
   - Row-level security policies for user data
   - Storage buckets for badge and card images

2. **Background Jobs**
   - Daily challenge reset job
   - XP decay prevention notifications
   - Badge eligibility checking

### Analytics Integration

1. **Event Tracking**
   - Track taste profile completion
   - Track badge unlocks
   - Track knowledge card discoveries
   - Track challenge completions

2. **Conversion Analytics**
   - Measure impact of gamification on premium conversion
   - Analyze engagement patterns by taste profile segment
   - Measure journey completion rates

## Testing Strategy

### Unit Tests

1. **Component Tests**
   - Test badge display with various states
   - Test taste profile visualization
   - Test XP bar animations and level up

2. **Utility Tests**
   - Test taste profile matching algorithm
   - Test XP calculation functions
   - Test badge eligibility checkers

### Integration Tests

1. **User Flow Tests**
   - Complete quiz and verify taste profile saved
   - Complete journey and verify badge awarded
   - Complete challenge and verify XP awarded

2. **API Tests**
   - Test badge award endpoint
   - Test XP award endpoint
   - Test recommendation algorithm

### User Acceptance Testing

1. **Scenarios**
   - New user onboarding with taste profile
   - Returning user journey progression
   - Premium user exclusive content access

## Deployment Plan

### Phase 1 Deployment (Current Sprint)

1. Database migrations for taste profiles, user progress, and badges
2. Deploy core components for taste profile and badges
3. Enable taste profile quiz and results pages
4. Integrate basic progress tracking with journey pages

### Phase 2 Deployment (Next Sprint)

1. Database migrations for knowledge cards and challenges
2. Deploy components for cards and challenges
3. Enable card collection and challenge pages
4. Integrate challenge tracking with journey pages

### Phase 3 Deployment (Future Sprint)

1. Database migrations for social features
2. Deploy components for social interaction
3. Enable friend system and community challenges
4. Integrate social sharing across the platform

## Conclusion

This implementation plan provides a structured approach to adding gamification features to the Ramen Journey application. By breaking the work into phases, we can deliver value incrementally while building toward a comprehensive gamification system that enhances user engagement and learning.

The technical foundation established in Phase 1 will support the more advanced features in Phases 2 and 3, ensuring a scalable and maintainable system. Regular testing and analytics throughout the implementation will allow us to measure impact and make adjustments as needed.