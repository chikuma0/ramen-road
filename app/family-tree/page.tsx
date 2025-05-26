'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './FamilyTree.module.css';
import { ramenFamilyTree } from './tree-data';

// Dynamically import the FamilyTreeVisual component
const FamilyTreeVisual = dynamic(() => import('./FamilyTreeVisual'), {
  ssr: false,
  loading: () => <div className={styles.loadingContainer}>Loading tree visualization...</div>
});

export default function FamilyTreePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ramen Family Tree</h1>
      
        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>
      
        <div className={styles.description}>
          <p>
          This interactive visualization shows the lineage relationships between influential ramen shops.
          Click on nodes to explore, or use the controls to take an automatic tour.
        </p>
      </div>
      </header>
      
      {/* Tree visualization container */}
      <div className={styles.treeContainer}>
        <FamilyTreeVisual 
          nodes={ramenFamilyTree.nodes}
          links={ramenFamilyTree.links}
        />
      </div>
      
      <div className={styles.footer}>
        <h2 className={styles.footerTitle}>About the Ramen Family Tree</h2>
        <p className={styles.footerText}>
          This visualization shows how different ramen styles have evolved and influenced each other over time.
          Each node represents a significant shop that has contributed to the development of ramen as we know it today.
        </p>
        <p className={styles.footerText}>
          Premium features include detailed histories, interviews with shop owners, and analysis of techniques.
        </p>
      </div>
    </div>
  );
}