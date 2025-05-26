'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { directLineageJourney } from '../data';
import { useAuth } from '../../../contexts/AuthContext';
import { completeJourneyForUser } from '../../../lib/api/profile';
import useSWR, { mutate } from 'swr';

const CompletionPage = () => {
  const { user } = useAuth();
  const badge = directLineageJourney.rewards.find(r => r.type === 'badge');
  const certificate = directLineageJourney.rewards.find(r => r.type === 'certificate');
  const cardSet = directLineageJourney.rewards.find(r => r.type === 'card-set');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateProgress = async () => {
      if (!user || !badge || !certificate) return;
      try {
        await completeJourneyForUser({
          userId: user.id,
          journeyId: directLineageJourney.id,
          badgeId: badge.name, // Use badge name as ID for now (should be badge.id if available)
          certificateImageUrl: certificate.imageUrl,
          certificateName: certificate.name
        });
        // Revalidate SWR cache for user progress and certificates
        mutate(['userProgress', user.id]);
        mutate(['certificates', user.id]);
        setLoading(false);
      } catch (err: any) {
        setError('進捗の保存中にエラーが発生しました');
        setLoading(false);
      }
    };
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">進捗を保存中...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-ramen-primary mb-6">ミッションクリア！</h1>
      <p className="text-lg text-ramen-secondary mb-8">直系ミッションを制覇しました！おめでとうございます！</p>
      <div className="flex flex-col items-center gap-8 mb-12">
        {/* Badge */}
        {badge && (
          <div className="flex flex-col items-center">
            <img src={badge.imageUrl} alt={badge.name} className="w-24 h-24 mb-2" />
            <div className="font-bold text-xl text-amber-700 mb-1">{badge.name}</div>
            <div className="text-gray-600 text-sm">{badge.description}</div>
          </div>
        )}
        {/* Certificate */}
        {certificate && (
          <div className="flex flex-col items-center">
            <img src={certificate.imageUrl} alt={certificate.name} className="w-48 h-32 mb-2 rounded shadow" />
            <div className="font-bold text-lg text-ramen-primary mb-1">{certificate.name}</div>
            <div className="text-gray-600 text-sm">{certificate.description}</div>
          </div>
        )}
        {/* Card Set */}
        {cardSet && (
          <div className="flex flex-col items-center">
            <img src={cardSet.imageUrl} alt={cardSet.name} className="w-32 h-32 mb-2" />
            <div className="font-bold text-lg text-yellow-700 mb-1">{cardSet.name}</div>
            <div className="text-gray-600 text-sm">{cardSet.description}</div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-6 mt-8">
        <Link href="/journey/direct-lineage">
          <button className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition">マップに戻る</button>
        </Link>
        <Link href="/journey">
          <button className="bg-ramen-primary text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-ramen-primary-dark transition">他のジャーニーを探す</button>
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage; 