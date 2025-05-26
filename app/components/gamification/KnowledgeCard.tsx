'use client';

import React from 'react';
import { KnowledgeCard as KnowledgeCardType } from '../../types/gamification';

interface KnowledgeCardProps {
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
  borderRadius: 16,
  background: 'transparent',
  boxSizing: 'border-box',
};

const innerStyle = (flipped: boolean): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.7s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'none',
});

const getFaceStyle = (isLegendary: boolean): React.CSSProperties => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: 16,
  boxShadow: isLegendary
    ? '0 0 32px 8px #ffe066cc, 0 0 0 8px #fffbe6 inset, 0 0 24px 4px #ffd70099'
    : '0 4px 24px #aaa',
  border: isLegendary
    ? '6px solid'
    : undefined,
  borderImage: isLegendary
    ? 'linear-gradient(120deg, #ffe066 0%, #ffd700 30%, #fffbe6 60%, #bfa100 100%) 1'
    : undefined,
  background: isLegendary
    ? 'linear-gradient(135deg, #f8fafc 0%, #ffe066 20%, #fffbe6 40%, #ffd700 60%, #bfa100 80%, #f8fafc 100%)'
    : '#fff',
  backgroundSize: isLegendary ? '300% 300%' : undefined,
  animation: isLegendary ? 'holoMove 4s linear infinite' : undefined,
  opacity: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontSize: 18,
  fontWeight: 500,
  padding: 16,
  boxSizing: 'border-box',
  overflow: 'hidden',
});

const backStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: 16,
  boxShadow: '0 4px 24px #aaa',
  background: '#f5e7b2',
  color: '#bbb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 32,
  fontWeight: 700,
  transform: 'rotateY(180deg)',
  overflow: 'hidden',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  objectFit: 'cover',
  borderRadius: 12,
  margin: '12px 0',
  zIndex: 1,
};

// Keyframes for holographic animation
const styleSheet = typeof window !== 'undefined' ? window.document.styleSheets[0] : null;
if (styleSheet && !Array.from(styleSheet.cssRules).find(r => r.cssText.includes('holoMove'))) {
  styleSheet.insertRule(`@keyframes holoMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }`, styleSheet.cssRules.length);
}

export default function KnowledgeCard({ card, isFlipped = false, onClick }: KnowledgeCardProps) {
  const isLegendary = card.rarity === 'legendary';
  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={innerStyle(isFlipped)}>
        {/* Front */}
        <div style={getFaceStyle(isLegendary)}>
          {/* Legendary Crown and Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 4, marginTop: 2, zIndex: 1 }}>
            {isLegendary && (
              <span
                style={{
                  fontSize: 20,
                  marginRight: 6,
                  filter: 'drop-shadow(0 0 4px #fffbe6)',
                  flexShrink: 0,
                }}
                title="Legendary"
              >
                👑
              </span>
            )}
            <span style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 30px)' }}>{card.title}</span>
          </div>
          {/* Category Label */}
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #ffe066 0%, #ffd700 100%)',
              color: '#bfa100',
              fontSize: 13,
              fontWeight: 700,
              padding: '2px 10px',
              borderRadius: 8,
              boxShadow: '0 1px 2px #ffd70022',
              letterSpacing: '0.03em',
              marginBottom: 8,
              zIndex: 1,
            }}
          >
            {card.category}
          </div>
          <img src={card.imageUrl} alt={card.title} style={imageStyle} />
          <div style={{ marginTop: 8, fontSize: 15, zIndex: 1 }}>{card.description}</div>
          {/* Masterpiece Edition Label */}
          {isLegendary && (
            <div
              style={{
                margin: '16px 0 0 0',
                background: 'linear-gradient(90deg, #ffe066 0%, #bfa100 100%)',
                color: '#3a2c00',
                fontWeight: 'bold',
                fontSize: 13,
                padding: '4px 16px',
                borderRadius: 10,
                boxShadow: '0 1px 4px #ffd70044',
                border: '1px solid #7c5c00',
                letterSpacing: '0.04em',
                display: 'inline-block',
                zIndex: 1,
              }}
            >
              Masterpiece Edition #0001
            </div>
          )}
          {/* Rarity Label at Bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              background: 'linear-gradient(90deg, #ffe066 0%, #ffd700 100%)',
              color: '#bfa100',
              fontWeight: 700,
              fontSize: 13,
              padding: '2px 10px',
              borderRadius: 8,
              boxShadow: '0 1px 2px #ffd70022',
              letterSpacing: '0.06em',
              zIndex: 1,
            }}
          >
            {card.rarity.toUpperCase()}
          </div>
        </div>
        {/* Back */}
        <div style={backStyle}>
          RJ
        </div>
      </div>
    </div>
  );
} 