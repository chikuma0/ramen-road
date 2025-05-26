import Image from 'next/image';
import Link from 'next/link';

export default function TopPageHero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-[350px] md:min-h-[500px] py-8 md:py-16 overflow-hidden bg-ramen-light-gray">
      <div className="absolute inset-0 z-0">
        <Image
          src="/ramen-hero.jpg"
          alt="ラーメンのヒーロー画像"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="opacity-60"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-0">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-ramen-primary drop-shadow-lg mb-4">ラーメンの世界を探検しよう</h1>
        <p className="font-body text-lg md:text-2xl text-ramen-secondary mb-8 max-w-2xl">系譜・技術・味わいを、インタラクティブな旅で体験しよう</p>
        <div className="flex gap-4">
          <Link href="#start-journey">
            <button className="bg-ramen-primary text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-ramen-primary-dark transition">旅を始める</button>
          </Link>
          <Link href="#find-taste">
            <button className="bg-white text-ramen-primary font-bold py-3 px-6 rounded-lg border border-ramen-primary shadow hover:bg-ramen-primary-light transition">好みを見つける</button>
          </Link>
        </div>
      </div>
    </section>
  );
} 