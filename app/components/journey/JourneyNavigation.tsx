'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JourneyNavigationProps } from '../../types/journey';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

const JourneyNavigation: FC<JourneyNavigationProps> = ({ journey }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentEpisodeId = searchParams?.get('episode') || journey.episodes[0].id;

  const handleEpisodeClick = (episodeId: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('episode', episodeId);
    router.push(`/journey?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Episodes</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {journey.episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => handleEpisodeClick(episode.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentEpisodeId === episode.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{episode.title}</span>
                {episode.isPremium && (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {episode.description}
              </p>
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default JourneyNavigation; 