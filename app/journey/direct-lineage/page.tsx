import React from 'react';
import Link from 'next/link';

const DirectLineageJourneyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-ramen-primary">直系ミッション：家系ラーメンの源流を巡る旅</h1>
      <p className="mb-8 text-lg text-ramen-secondary">
        1974年、横浜で誕生した「家系ラーメン」。その源流である「吉村家」から直接派生した"直系"店舗は、厳しい修行と伝統を受け継ぐ正統派のみが名乗ることを許されています。<br />
        あなたは今、家系ラーメンの真髄を探る旅に出発します。すべての直系店舗を巡り、知識カードを集め、伝説の証を手に入れましょう！
      </p>
      {/* Progress Map Placeholder */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
          [ここに進捗マップ/ツリーが入ります]
        </div>
      </div>
      {/* Progress Bar Placeholder */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-ramen-primary h-4 rounded-full" style={{ width: '0%' }} />
        </div>
        <div className="text-right text-sm mt-1 text-gray-600">0/6 店舗クリア</div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/journey/direct-lineage/shop/yoshimuraya">
          <button className="bg-ramen-primary text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-ramen-primary-dark transition">旅を始める</button>
        </Link>
      </div>
    </div>
  );
};

export default DirectLineageJourneyPage; 