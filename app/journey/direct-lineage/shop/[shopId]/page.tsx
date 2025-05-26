'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { directLineageJourney } from '../../data';
import KnowledgeCard from '../../../../components/gamification/KnowledgeCard';
import { CardRarity } from '../../../../types/gamification';

const ShopMissionPage = () => {
  const params = useParams();
  const shopId = params?.shopId as string;
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Find the current shop
  const shop = useMemo(() =>
    directLineageJourney.shops.find((s) => s.id === shopId), [shopId]
  );

  // Find the next shop (or null if last)
  const shopIndex = useMemo(() =>
    directLineageJourney.shops.findIndex((s) => s.id === shopId), [shopId]
  );
  const nextShop =
    shopIndex >= 0 && shopIndex < directLineageJourney.shops.length - 1
      ? directLineageJourney.shops[shopIndex + 1]
      : null;

  if (!shop) {
    return <div className="container mx-auto px-4 py-8">ショップが見つかりません。</div>;
  }

  // Find correct answer index
  const correctIndex = shop.question.options.findIndex(opt => opt === shop.question.correctAnswer);

  const handleSelect = (i: number) => {
    setSelected(i);
    setAnswered(true);
    setIsCorrect(i === correctIndex);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-ramen-primary">{shop.name}</h2>
      <div className="mb-6">
        <img src={shop.card.imageUrl} onError={e => (e.currentTarget.src = '/images/shops/placeholder.png')} alt={shop.name} className="w-full max-w-md rounded-lg shadow mb-4" />
        <p className="text-lg text-ramen-secondary mb-2">{shop.story}</p>
      </div>
      {/* Interactive Question */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow">
        <p className="font-semibold mb-2">{shop.question.text}</p>
        <div className="flex flex-col gap-2">
          {shop.question.options.map((opt, i) => (
            <button
              key={i}
              className={`bg-white border font-bold py-2 px-4 rounded transition ${
                selected === i
                  ? isCorrect && i === correctIndex
                    ? 'border-green-500 text-green-700 bg-green-50'
                    : !isCorrect && i === selected
                    ? 'border-red-500 text-red-700 bg-red-50'
                    : 'border-ramen-primary text-ramen-primary'
                  : 'border-ramen-primary text-ramen-primary hover:bg-ramen-primary hover:text-white'
              }`}
              disabled={answered}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div className={`mt-4 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '正解！' : '不正解...'}
          </div>
        )}
      </div>
      {/* Reveal features and card only after correct answer */}
      {answered && isCorrect && (
        <>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {shop.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <div className="mb-8 flex justify-center">
            <KnowledgeCard card={{
              ...shop.card,
              rarity: shop.card.rarity as CardRarity,
              category: 'regional',
              isPremium: false
            }} />
          </div>
        </>
      )}
      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/journey/direct-lineage">
          <button className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition">マップに戻る</button>
        </Link>
        {answered && isCorrect && (nextShop ? (
          <Link href={`/journey/direct-lineage/shop/${nextShop.id}`}>
            <button className="bg-ramen-primary text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-ramen-primary-dark transition">次の店舗へ</button>
          </Link>
        ) : answered && isCorrect && (
          <Link href="/journey/direct-lineage/completion">
            <button className="bg-ramen-primary text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-ramen-primary-dark transition">ミッションクリア！</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopMissionPage; 