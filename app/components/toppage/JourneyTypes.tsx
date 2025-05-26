'use client';
import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';

interface JourneyType {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface JourneyTypesProps {
  setActiveJourney: (journey: string) => void;
  setPreviewedJourney: (journey: string | null) => void;
}

const journeyTypes: JourneyType[] = [
  {
    id: 'lineage',
    title: '系譜をたどる旅',
    description: '家系ラーメンの歴史や進化を、発祥から現代まで時系列で体験できます。',
    icon: '🌳',
    link: '/journeys/lineage'
  },
  {
    id: 'curated',
    title: 'おすすめ体験コース',
    description: 'ラーメンの世界を深く知るための、専門家が厳選した学びのコース。',
    icon: '🎯',
    link: '/journeys/curated'
  },
  {
    id: 'technique',
    title: '技術を極める旅',
    description: 'スープ作りや麺選びなど、ラーメンの技術を徹底的に学べます。',
    icon: '🔬',
    link: '/journeys/technique'
  }
];

const JourneyTypes: FC<JourneyTypesProps> = ({ setActiveJourney, setPreviewedJourney }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">旅のタイプを選ぶ</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            家系ラーメンの世界を、あなたに合った方法で探求しましょう
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journeyTypes.map((journey) => (
            <Card key={journey.id} className="hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="text-4xl mb-4" role="img" aria-label={journey.title}>{journey.icon}</div>
                <CardTitle>{journey.title}</CardTitle>
                <CardDescription>{journey.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onMouseEnter={() => {
                    if (journey.id === 'lineage') setPreviewedJourney('direct-lineage');
                  }}
                  onMouseLeave={() => setPreviewedJourney(null)}
                  onClick={() => {
                    if (journey.id === 'lineage') {
                      setActiveJourney('direct-lineage');
                    } else {
                      window.location.href = journey.link;
                    }
                  }}
                  aria-label={`「${journey.title}」を始める`}
                >
                  {journey.id === 'lineage' && '系譜を体験'}
                  {journey.id === 'curated' && 'コースを見る'}
                  {journey.id === 'technique' && '技術を学ぶ'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTypes; 