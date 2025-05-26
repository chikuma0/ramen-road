"use client";
// import Image from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/Card';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '../shared/Modal';
import { Button } from '../shared/Button';
import { useState } from 'react';

interface FeaturedShop {
  id: string;
  name: string;
  nameRomanized: string;
  description: string;
  image: string;
  specialties: string[];
  location: string;
  style: string;
}

const featuredShops: FeaturedShop[] = [
  {
    id: 'yoshimuraya',
    name: '吉村家',
    nameRomanized: 'Yoshimura-ya',
    description: '家系ラーメン発祥の店。創業者・吉村実が生み出した濃厚な豚骨醤油スープと太麺が特徴。','image': '/ramen-hero.jpg',
    specialties: ['家系', '太麺ストレート', '豚骨醤油'],
    location: '横浜',
    style: '元祖家系'
  },
  {
    id: 'musashiya',
    name: '武蔵家',
    nameRomanized: 'Musashi-ya',
    description: '東京・新中野発の家系代表店。ややあっさりした飲みやすいスープと無料ライスが人気。','image': '/ramen-hero.jpg',
    specialties: ['あっさりスープ', '無料ライス'],
    location: '中野（東京）',
    style: '東京家系'
  },
  {
    id: 'rokakuya',
    name: '六角家',
    nameRomanized: 'Rokkaku-ya',
    description: 'ガーリックの効いた濃厚スープが特徴。独自の系譜を持つ伝説的な一杯。','image': '/ramen-hero.jpg',
    specialties: ['ガーリック風味', '濃厚な味わい'],
    location: '横浜',
    style: '六角家系'
  }
];

export default function FeaturedShops() {
  const [selectedShop, setSelectedShop] = useState<FeaturedShop | null>(null);

  return (
    <section className="py-16 bg-ramen-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">注目のラーメン店</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="opacity-80"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{shop.name}</span>
                  <span className="text-sm text-ramen-secondary">{shop.nameRomanized}</span>
                </CardTitle>
                <CardDescription>{shop.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{shop.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {shop.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-ramen-primary-light text-ramen-primary text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedShop(shop)}
                >
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedShop} onClose={() => setSelectedShop(null)}>
        {selectedShop && (
          <>
            <ModalHeader>
              <ModalTitle>{selectedShop.name}</ModalTitle>
              <ModalDescription>{selectedShop.nameRomanized}</ModalDescription>
            </ModalHeader>
            <ModalContent>
              <div className="mb-4">
                <p className="text-gray-600">{selectedShop.description}</p>
                <p className="mt-2 text-sm text-gray-500">所在地: {selectedShop.location}</p>
                <p className="text-sm text-gray-500">系統: {selectedShop.style}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedShop.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-ramen-primary-light text-ramen-primary text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setSelectedShop(null)}>
                閉じる
              </Button>
              <Link href={`/shops/${selectedShop.id}`}>
                <Button>店舗詳細へ</Button>
              </Link>
            </ModalFooter>
          </>
        )}
      </Modal>
    </section>
  );
} 