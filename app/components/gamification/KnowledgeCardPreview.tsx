'use client';

import React, { useState } from 'react';
import KnowledgeCard from './KnowledgeCard';
import { KnowledgeCard as KnowledgeCardType } from '../../types/gamification';

const sampleCard: KnowledgeCardType = {
  id: "card-yoshimuraya",
  title: "家系の原点：吉村家",
  description: "1974年創業、家系ラーメンのすべてはここから始まった。",
  imageUrl: "/images/shops/placeholder.png",
  rarity: "legendary",
  category: "regional",
  isPremium: false
};

const KnowledgeCardPreview: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Knowledge Card Preview
        </h1>
        
        <div className="flex flex-wrap gap-8 items-center justify-center" style={{ minHeight: 400 }}>
          <KnowledgeCard
            card={sampleCard}
            isFlipped={isFlipped}
            onClick={() => setIsFlipped(!isFlipped)}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCardPreview; 