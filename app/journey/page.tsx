'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import JourneyEpisode from '../components/journey/JourneyEpisode';
import JourneyNavigation from '../components/journey/JourneyNavigation';
import JourneyProgress from '../components/journey/JourneyProgress';
import { Journey, JourneyEpisode as JourneyEpisodeType, JourneyScene } from '../types/journey';

const JourneyPage: FC = () => {
  const searchParams = useSearchParams();
  const journeyId = searchParams?.get('id') || 'direct-lineage';
  const episodeId = searchParams?.get('episode') || 'episode-1';

  // For now, we'll use mock data
  const mockJourney: Journey = {
    id: journeyId,
    title: '吉村家から世界へ',
    description: '家系ラーメンの発祥から全国・世界へ広がるまでのストーリーを体験しよう。',
    episodes: [
      {
        id: 'episode-1',
        title: '吉村家の誕生',
        description: '1974年、横浜市で誕生した吉村家の物語',
        isPremium: false,
        scenes: [
          {
            id: 'scene-1',
            title: '創業の背景',
            content: '吉村家の創業者、吉村実氏は...',
            media: {
              type: 'image' as const,
              url: '/images/journey/yoshimura-early.jpg'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar - Navigation */}
          <div className="lg:col-span-1">
            <JourneyNavigation journey={mockJourney} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <JourneyEpisode 
              journey={mockJourney}
              episodeId={episodeId}
            />
          </div>

          {/* Right sidebar - Progress */}
          <div className="lg:col-span-1">
            <JourneyProgress journey={mockJourney} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPage; 