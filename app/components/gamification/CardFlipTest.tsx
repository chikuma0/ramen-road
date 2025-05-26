import React, { useState } from 'react';

const cardStyle: React.CSSProperties = {
  width: 256,
  height: 384,
  perspective: 1000,
  margin: '40px auto',
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
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 700,
};

const backStyle: React.CSSProperties = {
  ...faceStyle,
  background: '#f5e7b2',
  color: '#bbb',
  transform: 'rotateY(180deg)',
};

export default function CardFlipTest() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={cardStyle} onClick={() => setFlipped(f => !f)}>
      <div style={innerStyle(flipped)}>
        <div style={faceStyle}>
          FRONT
        </div>
        <div style={backStyle}>
          BACK
        </div>
      </div>
    </div>
  );
} 