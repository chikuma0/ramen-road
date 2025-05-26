'use client';

import { FC, useState } from 'react';
import { Badge as BadgeType } from '../../types/gamification';
import Badge from './Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

interface BadgeCollectionProps {
  badges: BadgeType[];
  unlockedBadges: string[];
}

const BadgeCollection: FC<BadgeCollectionProps> = ({ badges, unlockedBadges }) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const badgeTypes = [
    { id: 'all', label: 'すべてのバッジ' },
    { id: 'journey_completion', label: 'ジャーニーバッジ' },
    { id: 'card_collection', label: 'コレクションバッジ' },
    { id: 'level_up', label: 'レベルバッジ' },
    { id: 'special_event', label: '特別イベント' }
  ];

  const filteredBadges = selectedType === 'all'
    ? badges
    : badges.filter(badge => badge.criteria.type === selectedType);

  const unlockedCount = badges.filter(badge => unlockedBadges.includes(badge.id)).length;
  const specialBadges = badges.filter(badge => badge.isSpecial);
  const unlockedSpecialBadges = specialBadges.filter(badge => unlockedBadges.includes(badge.id));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>実績・バッジ</CardTitle>
          <div className="text-sm text-gray-600">
            {unlockedCount}/{badges.length} 個アンロック済み
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {badgeTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === type.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Special Badges Section */}
        {specialBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">特別実績</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialBadges.map(badge => (
                <Badge
                  key={badge.id}
                  badge={badge}
                  isUnlocked={unlockedBadges.includes(badge.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges
            .filter(badge => !badge.isSpecial)
            .map(badge => (
              <Badge
                key={badge.id}
                badge={badge}
                isUnlocked={unlockedBadges.includes(badge.id)}
              />
            ))}
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{unlockedCount}</div>
              <div className="text-sm text-gray-600">アンロック済み</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{badges.length}</div>
              <div className="text-sm text-gray-600">合計</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{unlockedSpecialBadges.length}</div>
              <div className="text-sm text-gray-600">特別</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((unlockedCount / badges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">達成率</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeCollection; 