'use client';

import { FC } from 'react';
import { KnowledgeCard as KnowledgeCardType } from '../../types/gamification';
import KnowledgeCard from './KnowledgeCard';

interface KnowledgeCardCollectionProps {
  cards: KnowledgeCardType[];
}

const KnowledgeCardCollection: FC<KnowledgeCardCollectionProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="flex justify-center">
          <KnowledgeCard card={card} />
        </div>
      ))}
    </div>
  );
};

export default KnowledgeCardCollection; 