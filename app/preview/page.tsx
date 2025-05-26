'use client';

import KnowledgeCard from '../components/gamification/KnowledgeCard';
import { KnowledgeCard as KnowledgeCardType } from '../types/gamification';
import { useState } from 'react';

export default function PreviewPage() {
  const sampleCard: KnowledgeCardType = {
    id: "card-yoshimuraya",
    title: "家系の原点：吉村家",
    description: "1974年創業、家系ラーメンのすべてはここから始まった。",
    imageUrl: "/images/shops/placeholder.png",
    rarity: "legendary",
    category: "regional",
    isPremium: false
  };

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div>
      <h1>Knowledge Card Preview</h1>
      <KnowledgeCard
        card={sampleCard}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(f => !f)}
      />
    </div>
  );
} 