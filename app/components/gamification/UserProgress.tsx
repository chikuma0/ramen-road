'use client';

import { FC } from 'react';
import { UserProgress as UserProgressType } from '../../types/gamification';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

interface UserProgressProps {
  progress: UserProgressType;
  onLevelUp?: () => void;
}

const XP_PER_LEVEL = 1000;
const MAX_LEVEL = 50;

const UserProgress: FC<UserProgressProps> = ({ progress, onLevelUp }) => {
  const currentLevelXP = progress.experience % XP_PER_LEVEL;
  const progressPercentage = (currentLevelXP / XP_PER_LEVEL) * 100;
  const nextLevelXP = XP_PER_LEVEL - currentLevelXP;

  const getLevelTitle = (level: number) => {
    if (level <= 5) return 'Ramen Novice';
    if (level <= 15) return 'Ramen Enthusiast';
    if (level <= 30) return 'Ramen Expert';
    if (level <= 45) return 'Ramen Master';
    return 'Ramen Legend';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Level {progress.level}</CardTitle>
            <p className="text-sm text-gray-600">{getLevelTitle(progress.level)}</p>
          </div>
          {progress.level < MAX_LEVEL && (
            <div className="text-right">
              <div className="text-sm text-gray-600">Next Level</div>
              <div className="font-medium">{nextLevelXP} XP needed</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{currentLevelXP} / {XP_PER_LEVEL} XP</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{progress.level}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{progress.experience}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{progress.completedJourneys.length}</div>
            <div className="text-sm text-gray-600">Journeys</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{progress.collectedCards.length}</div>
            <div className="text-sm text-gray-600">Cards</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Last level up: {new Date(progress.lastLevelUp).toLocaleDateString()}
            </div>
            {progress.level < MAX_LEVEL && (
              <div className="text-sm text-blue-600">
                {nextLevelXP} XP until level {progress.level + 1}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgress; 