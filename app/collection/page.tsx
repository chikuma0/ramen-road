'use client';

import { FC, useEffect, useState } from 'react';
import KnowledgeCardCollection from '../components/gamification/KnowledgeCardCollection';
import BadgeCollection from '../components/gamification/BadgeCollection';
import { KnowledgeCard, Badge } from '../types/gamification';
import { getKnowledgeCards, getBadges, getUserUnlockedBadges } from '../lib/api/collection';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

const CollectionPage: FC = () => {
  const [cards, setCards] = useState<KnowledgeCard[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadCollectionData() {
      try {
        setIsLoading(true);
        const [cardsData, badgesData] = await Promise.all([
          getKnowledgeCards(),
          getBadges()
        ]);

        setCards(cardsData);
        setBadges(badgesData);

        if (user) {
          const unlockedBadgesData = await getUserUnlockedBadges(user.id);
          setUnlockedBadges(unlockedBadgesData);
        }
      } catch (err) {
        console.error('Error loading collection data:', err);
        setError('Failed to load collection data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadCollectionData();
    }
  }, [user]);

  const content = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Collection</h1>
          
          {/* Knowledge Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Knowledge Cards</h2>
            <KnowledgeCardCollection cards={cards} />
          </div>

          {/* Badges & Achievements */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Badges & Achievements</h2>
            <BadgeCollection badges={badges} unlockedBadges={unlockedBadges} />
          </div>

          {/* TODO: Add Certificates section */}
        </div>
      </div>
    );
  };

  return <ProtectedRoute>{content()}</ProtectedRoute>;
};

export default CollectionPage; 