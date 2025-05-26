import React from 'react';
import { KnowledgeCard as KnowledgeCardType } from '../../types/gamification';

interface KnowledgeCardHybridProps {
  card: KnowledgeCardType;
  isFlipped?: boolean;
  onClick?: () => void;
}

const cardStyle: React.CSSProperties = {
  width: 256,
  height: 384,
  perspective: 1000,
  margin: '40px auto',
  cursor: 'pointer',
};

const innerStyle = (flipped: boolean): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.7s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'none',
});

const faceStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: 16,
  boxShadow: '0 4px 24px #aaa',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontSize: 18,
  fontWeight: 500,
  padding: 16,
  boxSizing: 'border-box',
};

const backStyle: React.CSSProperties = {
  ...faceStyle,
  background: '#f5e7b2',
  color: '#bbb',
  justifyContent: 'center',
  fontSize: 32,
  fontWeight: 700,
  transform: 'rotateY(180deg)',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  objectFit: 'cover',
  borderRadius: 12,
  margin: '12px 0',
};

export default function KnowledgeCardHybrid({ card, isFlipped = false, onClick }: KnowledgeCardHybridProps) {
  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={innerStyle(isFlipped)}>
        {/* Front */}
        <div style={faceStyle}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{card.title}</div>
          <img src={card.imageUrl} alt={card.title} style={imageStyle} />
          <div style={{ marginTop: 8, fontSize: 15 }}>{card.description}</div>
        </div>
        {/* Back */}
        <div style={backStyle}>
          RJ
        </div>
      </div>
    </div>
  );
} 