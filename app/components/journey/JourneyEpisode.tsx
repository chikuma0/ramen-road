'use client';

import { FC, useState } from 'react';
import { JourneyEpisodeProps, JourneyScene } from '../../types/journey';
import { Button } from '../shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import KnowledgeCard from '../gamification/KnowledgeCard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const JourneyEpisode: FC<JourneyEpisodeProps> = ({ journey, episodeId }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showKnowledgeCard, setShowKnowledgeCard] = useState(false);
  const [currentCard, setCurrentCard] = useState<any>(null);
  const supabase = createClientComponentClient();
  
  const episode = journey.episodes.find(ep => ep.id === episodeId);
  if (!episode) return null;

  const currentScene = episode.scenes[currentSceneIndex];

  const handleNextScene = async () => {
    if (currentSceneIndex < episode.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      
      // Check if this scene has a knowledge card
      if (currentScene.knowledgeCard) {
        setCurrentCard(currentScene.knowledgeCard);
        setShowKnowledgeCard(true);
        
        // Record card collection
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('user_cards').upsert({
            user_id: user.id,
            card_id: currentScene.knowledgeCard.id,
            collected_at: new Date().toISOString()
          });
        }
      }
    }
  };

  const handlePreviousScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const handleCardClick = () => {
    setShowKnowledgeCard(false);
  };

  return (
    <div className="space-y-6">
      {/* Episode Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">{episode.title}</h1>
        <p className="text-gray-600">{episode.description}</p>
        {episode.isPremium && (
          <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Premium Content
          </span>
        )}
      </div>

      {/* Scene Content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentScene.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentScene.media && (
            <div className="mb-6">
              {currentScene.media.type === 'image' ? (
                <img 
                  src={currentScene.media.url} 
                  alt={currentScene.title}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <video 
                  src={currentScene.media.url}
                  controls
                  className="w-full rounded-lg"
                />
              )}
            </div>
          )}
          <div className="prose max-w-none">
            {currentScene.content}
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Card Modal */}
      {showKnowledgeCard && currentCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <KnowledgeCard card={currentCard} onClick={handleCardClick} />
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePreviousScene}
          disabled={currentSceneIndex === 0}
        >
          Previous Scene
        </Button>
        <span className="text-sm text-gray-500">
          Scene {currentSceneIndex + 1} of {episode.scenes.length}
        </span>
        <Button
          onClick={handleNextScene}
          disabled={currentSceneIndex === episode.scenes.length - 1}
        >
          Next Scene
        </Button>
      </div>
    </div>
  );
};

export default JourneyEpisode; 