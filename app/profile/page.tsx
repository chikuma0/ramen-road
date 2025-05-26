'use client';

import { FC } from 'react';
import UserProgress from '../components/gamification/UserProgress';
import BadgeCollection from '../components/gamification/BadgeCollection';
import Certificate from '../components/gamification/Certificate';
import { UserProgress as UserProgressType, Badge as BadgeType, Certificate as CertificateType } from '../types/gamification';
import { getUserProgress, getUserCertificates } from '../lib/api/profile';
import { getBadges } from '../lib/api/collection';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import useSWR from 'swr';

const fetchUserProgress = async (userId: string) => {
  return await getUserProgress(userId);
};
const fetchBadges = async () => {
  return await getBadges();
};
const fetchCertificates = async (userId: string) => {
  return await getUserCertificates(userId);
};

const ProfilePage: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><LoadingSpinner /></div>;
  }

  const {
    data: progress,
    error: progressError,
    isLoading: progressLoading
  } = useSWR(['userProgress', user.id], () => fetchUserProgress(user.id));

  const {
    data: badges,
    error: badgesError,
    isLoading: badgesLoading
  } = useSWR('badges', fetchBadges);

  const {
    data: certificates,
    error: certificatesError,
    isLoading: certificatesLoading
  } = useSWR(['certificates', user.id], () => fetchCertificates(user.id));

  const isLoading = progressLoading || badgesLoading || certificatesLoading;
  const error = progressError || badgesError || certificatesError;

  const content = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (error || !progress) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'プロフィールの読み込みに失敗しました'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              再試行
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">マイプロフィール</h1>
        
        {/* User Progress Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">進捗状況</h2>
          <UserProgress progress={progress} />
        </section>

        {/* Badges Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">実績・バッジ</h2>
          <BadgeCollection badges={badges || []} unlockedBadges={progress.badges} />
        </section>

        {/* Certificates Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">認定証</h2>
          <div className="space-y-8">
            {(certificates || []).map((certificate) => (
              <Certificate
                key={certificate.id}
                certificate={certificate}
                journeyName={certificate.journeyName}
              />
            ))}
          </div>
        </section>
      </div>
    );
  };

  return <ProtectedRoute>{content()}</ProtectedRoute>;
};

export default ProfilePage; 