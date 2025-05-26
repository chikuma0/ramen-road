"use client";
import { FC, useState } from 'react';
import { Button } from '../shared/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/Card';
import styles from './TopPage.module.css';
import TopPageHero from './TopPageHero';
import FeaturedShops from './FeaturedShops';
import JourneyTypes from './JourneyTypes';
import ModernFamilyTree from './ModernFamilyTree';
import { ramenFamilyTree } from '../../family-tree/tree-data';

const TopPage: FC = () => {
  const [activeJourney, setActiveJourney] = useState<string | null>(null);
  const [previewedJourney, setPreviewedJourney] = useState<string | null>(null);

  // Map the tree data to the format expected by ModernFamilyTree
  const mappedNodes = ramenFamilyTree.nodes.map(node => ({
    id: node.id,
    name: node.name,
    group: node.group,
    lineage: node.style
  }));

  const mappedLinks = ramenFamilyTree.links.map(link => ({
    source: link.source,
    target: link.target
  }));

  return (
    <div>
      <TopPageHero />
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1 className={styles.title}>横浜家系ラーメンの系譜</h1>
          <p className={styles.description}>
            1974年に横浜市で誕生した、豚骨醤油ベースで太いストレート麺を特徴とする「家系ラーメン」。<br />
            吉村家から派生した四大系譜「直系」「クラシック系」「壱系」「新中野武蔵家系」など、家系ラーメンの歴史と進化を体験しよう。
          </p>
          <div className={styles.buttonGroup}>
            <Button size="lg">スタート</Button>
            <Button variant="secondary" size="lg">
              あなたの好みを探す
            </Button>
          </div>
        </section>

        {/* Featured Shops Section */}
        <FeaturedShops />

        {/* Family Tree Section */}
        <section className={styles.treeSection}>
          <h2 className={styles.sectionTitle}>家系ラーメンファミリーツリー</h2>
          <div className={styles.treeContainer}>
            <ModernFamilyTree
              nodes={mappedNodes}
              links={mappedLinks}
              activeJourney={activeJourney}
              previewedJourney={previewedJourney}
            />
          </div>
        </section>

        {/* Journey Types Section */}
        <JourneyTypes setActiveJourney={setActiveJourney} setPreviewedJourney={setPreviewedJourney} />

        {/* Featured Journey Section */}
        <section className={styles.featuredSection}>
          <div className={styles.featuredContent}>
            <h2 className={styles.featuredTitle}>
              家系ラーメンの旅：吉村家から世界へ
            </h2>
            <p className={styles.featuredDescription}>
              家系ラーメンの発祥から全国・世界へ広がるまでのストーリーを体験しよう。
            </p>
            <Button size="lg" onClick={() => setActiveJourney('direct-lineage')}>この旅を始める</Button>
          </div>
        </section>

        {/* Resources Section */}
        <section className={styles.resourcesSection}>
          <h2 className={styles.sectionTitle}>追加リソース</h2>
          <div className={styles.cardContainer}>
            <Card>
              <CardHeader>
                <CardTitle>味覚診断</CardTitle>
                <CardDescription>
                  あなたのラーメン好みを診断し、ぴったりの一杯をおすすめします
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => window.location.href = '/quiz'}>クイズに挑戦</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>知識ベース</CardTitle>
                <CardDescription>
                  家系ラーメンの歴史・材料・技術を深掘りしよう
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => window.location.href = '/knowledge'}>記事を読む</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>コミュニティ</CardTitle>
                <CardDescription>
                  ラーメン好き同士で交流し、情報をシェアしよう
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => window.location.href = '/community'}>参加する</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopPage; 