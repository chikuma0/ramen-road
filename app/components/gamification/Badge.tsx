'use client';

import { FC } from 'react';
import { Badge as BadgeType } from '../../types/gamification';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

interface BadgeProps {
  badge: BadgeType;
  isUnlocked: boolean;
}

const Badge: FC<BadgeProps> = ({ badge, isUnlocked }) => {
  return (
    <Card className={`relative ${!isUnlocked ? 'opacity-50' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{badge.name}</CardTitle>
          {badge.isSpecial && (
            <span className="text-yellow-500">✨</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square mb-4 relative">
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className={`w-full h-full object-contain rounded-lg ${
              !isUnlocked ? 'grayscale' : ''
            }`}
          />
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🔒</span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
        <div className="text-xs text-gray-500">
          {badge.criteria.type === 'journey_completion' && 'ジャーニー達成'}
          {badge.criteria.type === 'card_collection' && '知識カードを集める'}
          {badge.criteria.type === 'level_up' && 'レベルアップ'}
          {badge.criteria.type === 'special_event' && '特別イベント実績'}
          {badge.criteria.requiredCount && `（${badge.criteria.requiredCount}回必要）`}
        </div>
      </CardContent>
    </Card>
  );
};

export default Badge; 