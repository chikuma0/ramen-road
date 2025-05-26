'use client';

import { FC } from 'react';
import { JourneyProgressProps } from '../../types/journey';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';

const JourneyProgress: FC<JourneyProgressProps> = ({ journey }) => {
  // For now, we'll use mock progress data
  const mockProgress = {
    completedEpisodes: 1,
    totalEpisodes: journey.episodes.length,
    collectedCards: 3,
    totalCards: 12,
    lastAccessed: new Date().toISOString(),
  };

  const progressPercentage = (mockProgress.completedEpisodes / mockProgress.totalEpisodes) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Episodes Completed</span>
            <span className="font-medium">
              {mockProgress.completedEpisodes}/{mockProgress.totalEpisodes}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Knowledge Cards</span>
            <span className="font-medium">
              {mockProgress.collectedCards}/{mockProgress.totalCards}
            </span>
          </div>
        </div>

        {/* Premium Upgrade */}
        {journey.episodes.some(ep => ep.isPremium) && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Unlock Premium Content</h3>
            <p className="text-sm text-yellow-700 mb-3">
              Get access to all premium episodes and exclusive content.
            </p>
            <Button className="w-full">Upgrade to Premium</Button>
          </div>
        )}

        {/* Last Accessed */}
        <div className="text-sm text-gray-500">
          Last accessed: {new Date(mockProgress.lastAccessed).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyProgress; 