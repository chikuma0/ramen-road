'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './FamilyTree.module.css';

// Define TypeScript interfaces for our data structures
interface Position {
  top: number;
  left: number;
}

interface ShopData {
  id: string;
  name: string;
  nameRomanized: string;
  year: string;
  description: string;
  address: string;
  position: Position;
  isOrigin?: boolean;
  group: string;
  image: string;
  connections: string[];
  coordinates?: { lat: number; lng: number };
  specialties?: string[];
}

interface GroupData {
  id: string;
  name: string;
  color: string;
}

export default function PremiumFamilyTree() {
  // Enhanced state with additional features
  const [filterValue, setFilterValue] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 400, y: 100 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedShop, setSelectedShop] = useState<ShopData | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'timeline'>('tree');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeDecade, setActiveDecade] = useState<string | null>(null);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [highlightedShop, setHighlightedShop] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'chronological' | 'alphabetical'>('chronological');
  const [tooltipInfo, setTooltipInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
    shopId: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: '',
    shopId: null
  });
  
  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const treeGraphRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState<boolean>(false); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Enhanced effect for shop interactivity
  useEffect(() => {
    if (selectedShop) {
      // Zoom in on the selected shop for better focus
      if (treeGraphRef.current) {
        const newZoom = 1.3;
        setZoom(newZoom);
        
        // Center the view on the selected shop
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const shopX = selectedShop.position.left + 60; // Half of shop width
        const shopY = selectedShop.position.top + 60; // Half of shop height
        
        setPosition({
          x: centerX - shopX * newZoom,
          y: centerY - shopY * newZoom
        });
      }
    }
  }, [selectedShop]);
  
  // Data for shops with enhanced details
  const treeData: ShopData[] = useMemo(() => [
    {
      id: 'yoshimuraya',
      name: '吉村家',
      nameRomanized: 'Yoshimura-ya',
      year: '1974年',
      description: 'The birthplace of Ie-kei Ramen. Founded by Yoshimura-san, this shop established the defining characteristics of Ie-kei style: thick tonkotsu-shoyu broth, straight thick noodles, and signature toppings.',
      address: 'Yokohama, Kanagawa',
      position: { top: 500, left: 1000 },
      isOrigin: true,
      group: 'origin',
      image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1470&auto=format&fit=crop',
      connections: [],
      coordinates: { lat: 35.4660, lng: 139.6226 },
      specialties: ['Original Ie-kei style', 'Thick, rich tonkotsu-shoyu broth']
    },
    {
      id: 'sugitaya',
      name: '杉田家',
      nameRomanized: 'Sugita-ya',
      year: '1999年',
      description: 'One of the first direct disciples of Yoshimura-ya, this shop maintained the authentic Ie-kei style while adding its own unique touches to the broth.',
      address: 'Sugita, Yokohama',
      position: { top: 650, left: 800 },
      group: 'direct',
      image: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?q=80&w=1973&auto=format&fit|crop',
      connections: ['yoshimuraya'],
      coordinates: { lat: 35.3803, lng: 139.6377 },
      specialties: ['Authentic Ie-kei flavor', 'Rich shoyu accent']
    },
    {
      id: 'rokkakuya',
      name: '六角家',
      nameRomanized: 'Rokkaku-ya',
      year: '1988年',
      description: 'A legendary shop with intense garlic-infused broth that spawned its own sub-branch of the Ie-kei family. Known for long lines and a rich, powerful flavor profile.',
      address: 'Honmoku, Yokohama',
      position: { top: 650, left: 1200 },
      group: 'honmoku',
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1470&auto=format&fit|crop',
      connections: ['yoshimuraya'],
      coordinates: { lat: 35.4433, lng: 139.6380 },
      specialties: ['Garlic-infused broth', 'Intense flavor profile']
    },
    {
      id: 'ichiriki',
      name: '一力家',
      nameRomanized: 'Ichiriki-ya',
      year: '1996年',
      description: 'Famous for its rich, creamy tonkotsu broth with a strong shoyu flavor. Their extra-thick noodles and perfect ajitama eggs have gained them a dedicated following.',
      address: 'Tsurumi, Yokohama',
      position: { top: 650, left: 600 },
      group: 'ichi',
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1626&auto=format&fit|crop',
      connections: ['yoshimuraya'],
      coordinates: { lat: 35.5078, lng: 139.6742 },
      specialties: ['Creamy tonkotsu broth', 'Perfect ajitama eggs']
    },
    {
      id: 'nakamuraya',
      name: '中村家',
      nameRomanized: 'Nakamura-ya',
      year: '1993年',
      description: 'A second-generation Ie-kei shop that perfected the balance between pork and chicken broth, creating a lighter yet still rich flavor profile that expanded the appeal of Ie-kei ramen.',
      address: 'Sakuragicho, Yokohama',
      position: { top: 800, left: 900 },
      group: 'direct',
      image: 'https://images.unsplash.com/photo-1630909665091-79b15568fce3?q=80&w=1470&auto=format&fit|crop',
      connections: ['sugitaya'],
      coordinates: { lat: 35.4517, lng: 139.6320 },
      specialties: ['Balanced pork-chicken broth', 'Lighter flavor profile']
    },
    {
      id: 'setagaya',
      name: '世田谷家',
      nameRomanized: 'Setagaya-ya',
      year: '2002年',
      description: 'One of the shops that successfully brought Ie-kei style to Tokyo, adapting it slightly to appeal to Tokyo tastes while maintaining its Yokohama roots.',
      address: 'Setagaya, Tokyo',
      position: { top: 800, left: 1100 },
      group: 'direct',
      image: 'https://images.unsplash.com/photo-1632709810780-b5a4343cebec?q=80&w=1470&auto=format&fit|crop',
      connections: ['sugitaya'],
      coordinates: { lat: 35.6464, lng: 139.6550 },
      specialties: ['Tokyo-style adaptation', 'Refined presentation']
    },
    {
      id: 'takumiya',
      name: '匠家',
      nameRomanized: 'Takumi-ya',
      year: '2005年',
      description: 'Known for their innovative approach to Ie-kei, introducing seasonal limited editions while respecting traditional methods. Their special blend of seven different types of soy sauce creates a uniquely complex flavor.',
      address: 'Kawasaki, Kanagawa',
      position: { top: 950, left: 700 },
      group: 'ichi',
      image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1374&auto=format&fit|crop',
      connections: ['ichiriki'],
      coordinates: { lat: 35.5309, lng: 139.7029 },
      specialties: ['Seven-soy blend', 'Seasonal specials']
    },
    {
      id: 'kokoroya',
      name: '心家',
      nameRomanized: 'Kokoro-ya',
      year: '2010年',
      description: 'A modern interpretation of Ie-kei that focuses on using only the highest quality ingredients. Their premium pork and specially-cultivated wheat noodles have earned them acclaim.',
      address: 'Ebina, Kanagawa',
      position: { top: 950, left: 900 },
      group: 'modern',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=1470&auto=format&fit|crop',
      connections: ['nakamuraya'],
      coordinates: { lat: 35.4614, lng: 139.3911 },
      specialties: ['Premium ingredients', 'Artisanal approach']
    },
    {
      id: 'garyuken',
      name: '我流軒',
      nameRomanized: 'Garyuken',
      year: '1998年',
      description: 'Famous for their extremely garlicky "zebra" style bowl featuring black garlic oil. A popular evolution of the Ie-kei style that has developed its own following.',
      address: 'Hodogaya, Yokohama',
      position: { top: 950, left: 1100 },
      group: 'honmoku',
      image: 'https://images.unsplash.com/photo-1626804475297-41608ea09fec?q=80&w=1470&auto=format&fit|crop',
      connections: ['rokkakuya'],
      coordinates: { lat: 35.4600, lng: 139.5963 },
      specialties: ['Zebra style (garlic oil)', 'Extra thick noodles']
    },
    {
      id: 'musashiya',
      name: '武蔵家',
      nameRomanized: 'Musashi-ya',
      year: '2007年',
      description: 'Known for their balance of faithful Ie-kei style with subtle modern touches. Their "ajitama" eggs are marinated for exactly 24 hours in a special blend of shoyu and mirin.',
      address: 'Musashi-Kosugi, Kawasaki',
      position: { top: 950, left: 1300 },
      group: 'modern',
      image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?q=80&w=1374&auto=format&fit|crop',
      connections: ['setagaya'],
      coordinates: { lat: 35.5761, lng: 139.6597 },
      specialties: ['24-hour marinated eggs', 'Modern interpretations']
    }
  ], []);
  
  // Improve user experience with group info
  const groups: GroupData[] = [
    { id: 'origin', name: 'Founder', color: '#FF4500' },
    { id: 'direct', name: 'Direct Disciples', color: '#3B82F6' },
    { id: 'honmoku', name: 'Honmoku Line', color: '#10B981' },
    { id: 'ichi', name: 'Ichi Line', color: '#8B5CF6' },
    { id: 'modern', name: 'Modern Interpretations', color: '#F59E0B' }
  ];
  
  // Generate decades data
  const decades = useMemo(() => {
    const decadeMap: { [key: string]: ShopData[] } = {};
    
    treeData.forEach(shop => {
      const year = parseInt(shop.year.replace('年', ''));
      const decade = `${Math.floor(year / 10) * 10}s`;
      
      if (!decadeMap[decade]) {
        decadeMap[decade] = [];
      }
      
      decadeMap[decade].push(shop);
    });
    
    return Object.entries(decadeMap).map(([decade, shops]) => ({ 
      decade, 
      shops: sortOrder === 'alphabetical' 
        ? [...shops].sort((a, b) => a.name.localeCompare(b.name))
        : shops 
    }));
  }, [treeData, sortOrder]);
  
  // Filter shops based on search and filter values
  const filteredShops = useMemo(() => {
    return treeData.filter(shop => {
      const matchesSearch = 
        searchValue === '' || 
        shop.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        shop.nameRomanized.toLowerCase().includes(searchValue.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesFilter = filterValue === 'all' || shop.group === filterValue;
      
      return matchesSearch && matchesFilter;
    });
  }, [treeData, searchValue, filterValue]);
  
  // Generate connection lines with enhanced aesthetics
  const connectionLines = useMemo(() => {
    const lines: { from: string; to: string; fromX: number; fromY: number; toX: number; toY: number; highlight: boolean }[] = [];
    
    filteredShops.forEach(shop => {
      shop.connections.forEach(connectionId => {
        const connectedShop = filteredShops.find(s => s.id === connectionId);
        if (connectedShop) {
          const fromX = shop.position.left + 60;
          const fromY = shop.position.top + 60;
          const toX = connectedShop.position.left + 60;
          const toY = connectedShop.position.top + 60;
          
          const highlight =
            (highlightedShop === shop.id || highlightedShop === connectedShop.id) ||
            (selectedShop && (selectedShop.id === shop.id || selectedShop.id === connectedShop.id)) ? true : false;
          
          lines.push({
            from: shop.id,
            to: connectedShop.id,
            fromX,
            fromY,
            toX,
            toY,
            highlight
          });
        }
      });
    });
    
    return lines;
  }, [filteredShops, highlightedShop, selectedShop]);
  
  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Setting up simulated loading effect for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left clicks
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Enhanced zoom controls
  const handleZoom = (type: 'in' | 'out') => {
    setZoom(prev => {
      if (type === 'in' && prev < 2) {
        return prev + 0.1;
      } else if (type === 'out' && prev > 0.3) {
        return prev - 0.1;
      }
      return prev;
    });
  };
  
  // Reset view to default
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 400, y: 100 });
  };
  
  // Optimized wheel handling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (e.deltaY < 0) {
      handleZoom('in');
    } else {
      handleZoom('out');
    }
  };
  
  // Shop selection
  const handleShopClick = (shop: ShopData) => {
    setSelectedShop(shop);
  };
  
  // Tooltip handling
  const handleShopMouseEnter = (shop: ShopData, e: React.MouseEvent) => {
    setHighlightedShop(shop.id);
    
    setTooltipInfo({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      text: `${shop.name} (${shop.year})`,
      shopId: shop.id
    });
    
    setShowTooltip(true);
  };
  
  const handleShopMouseLeave = () => {
    setHighlightedShop(null);
    setTooltipInfo(prev => ({ ...prev, visible: false }));
    setShowTooltip(false);
  };
  
  // Close shop details modal
  const handleCloseModal = () => {
    setSelectedShop(null);
  };
  
  // Switch view mode
  const handleViewModeChange = (mode: 'tree' | 'timeline') => {
    setViewMode(mode);
  };
  
  // Toggle timeline sort order
  const handleSortOrderChange = () => {
    setSortOrder(prev => prev === 'chronological' ? 'alphabetical' : 'chronological');
  };
  
  // Calculate minimap details
  const minimapDetails = useMemo(() => {
    const treeWidth = 2000;
    const treeHeight = 2000;
    const minimapWidth = 150;
    const minimapHeight = 150;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const widthRatio = minimapWidth / treeWidth;
    const heightRatio = minimapHeight / treeHeight;
    
    const viewportWidthScaled = viewportWidth / zoom;
    const viewportHeightScaled = viewportHeight / zoom;
    
    const viewBoxWidth = viewportWidthScaled * widthRatio;
    const viewBoxHeight = viewportHeightScaled * heightRatio;
    
    const viewBoxX = (-position.x / zoom) * widthRatio;
    const viewBoxY = (-position.y / zoom) * heightRatio;
    
    return {
      widthRatio,
      heightRatio,
      viewBoxWidth,
      viewBoxHeight,
      viewBoxX,
      viewBoxY
    };
  }, [position, zoom]);
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={styles.loadingText}
        >
          Loading Ramen Family Tree...
        </motion.p>
      </div>
    );
  }
  
  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>家系ラーメン Family Tree</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search shops..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton} aria-label="Search">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.filterButtons}>
            <button 
              className={`${styles.filterButton} ${filterValue === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setFilterValue('all')}
            >
              All
            </button>
            {groups.map(group => (
              <button 
                key={group.id}
                className={`${styles.filterButton} ${filterValue === group.id ? styles.filterButtonActive : ''}`}
                onClick={() => setFilterValue(group.id)}
                style={{ 
                  borderColor: filterValue === group.id ? group.color : 'transparent',
                  backgroundColor: filterValue === group.id ? `${group.color}22` : 'transparent' 
                }}
              >
                {group.name}
              </button>
            ))}
          </div>
          
          <div className={styles.viewControls}>
            <button 
              className={`${styles.viewButton} ${viewMode === 'tree' ? styles.viewButtonActive : ''}`}
              onClick={() => handleViewModeChange('tree')}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.viewIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tree View
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'timeline' ? styles.viewButtonActive : ''}`}
              onClick={() => handleViewModeChange('timeline')}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.viewIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Timeline
            </button>
          </div>
          
          <button 
            className={styles.minimapToggle}
            onClick={() => setShowMinimap(prev => !prev)}
          >
            {showMinimap ? 'Hide Minimap' : 'Show Minimap'}
          </button>
        </div>
      </header>
      
      <div className={styles.content}>
        {viewMode === 'tree' ? (
          <div 
            className={`${styles.canvas} ${isDragging ? styles.canvasActive : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            ref={perspectiveRef}
          >
            {/* Animated Background Particles */}
            {Array.from({ length: 15 }).map((_, index) => {
              const randomDelay = Math.random() * 10;
              const randomDuration = 15 + Math.random() * 20;
              const endX = -100 + Math.random() * 200;
              const endY = -100 + Math.random() * 200;
              
              return (
                <div 
                  key={`particle-${index}`}
                  className={styles.particle}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    '--delay': `${randomDelay}s`,
                    '--duration': `${randomDuration}s`,
                    '--end-x': `${endX}px`,
                    '--end-y': `${endY}px`,
                  } as React.CSSProperties}
                />
              );
            })}
            
            <motion.div
              className={styles.treeGraph}
              ref={treeGraphRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})
                            rotateX(${mousePosition.y * 0.3}deg) rotateY(${-mousePosition.x * 0.3}deg)`,
                perspective: '1200px',
                width: '2000px',
                height: '2000px',
                background: 'radial-gradient(circle at center, rgba(255,69,0,0.05), transparent 70%)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className={styles.connections} width="2000" height="2000">
                {connectionLines.map((line) => {
                  const { fromX, fromY, toX, toY } = line;
                  const midX = (fromX + toX) / 2;
                  const controlY = Math.min(fromY, toY) - 50;
                  
                  return (
                    <motion.path
                      key={`${line.from}-${line.to}`}
                      d={`M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`}
                      stroke={line.highlight ? "#ff4500" : "#64748b"}
                      strokeWidth={line.highlight ? 3 : 1.5}
                      strokeDasharray={line.highlight ? "none" : "5,5"}
                      fill="none"
                      opacity={line.highlight ? 1 : 0.6}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      filter={line.highlight ? "drop-shadow(0 0 3px rgba(255, 69, 0, 0.5))" : "none"}
                    />
                  );
                })}
              </svg>
              
              {filteredShops.map(shop => {
                const isHighlighted = highlightedShop === shop.id || (selectedShop && selectedShop.id === shop.id);
                const group = groups.find(g => g.id === shop.group);
                const borderColor = group ? group.color : '#64748b';
                
                return (
                  <motion.div
                    key={shop.id}
                    className={`${styles.shopNode} ${shop.isOrigin ? styles.originNode : ''} ${isHighlighted ? styles.highlighted : ''}`}
                    style={{ 
                      top: shop.position.top, 
                      left: shop.position.left,
                      borderColor: isHighlighted ? '#ff4500' : borderColor,
                      boxShadow: isHighlighted 
                        ? '0 0 0 4px rgba(255, 69, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 10px rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={() => handleShopClick(shop)}
                    onMouseEnter={(e) => handleShopMouseEnter(shop, e)}
                    onMouseLeave={handleShopMouseLeave}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: shop.isOrigin ? 0 : 0.1 + Math.random() * 0.5,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    <div className={styles.shopNodeImage} style={{ backgroundImage: `url(${shop.image})` }} />
                    <div className={styles.shopNodeContent}>
                      <h3 className={styles.shopNodeTitle}>{shop.name}</h3>
                      <p className={styles.shopNodeYear}>{shop.year}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <AnimatePresence>
              {tooltipInfo.visible && (
                <motion.div
                  className={styles.tooltip}
                  style={{
                    top: tooltipInfo.y - 10,
                    left: tooltipInfo.x,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tooltipInfo.text}
                  <div className={styles.tooltipArrow}></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {selectedShop && (
                <motion.div 
                  className={styles.modal}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <motion.div 
                    className={styles.modalContent}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <button 
                      className={styles.modalClose}
                      onClick={handleCloseModal}
                      aria-label="Close modal"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className={styles.modalImageContainer}>
                      <Image
                        src={selectedShop.image}
                        alt={selectedShop.name}
                        width={500} // Placeholder width
                        height={300} // Placeholder height
                        className={styles.modalImage}
                      />
                      <div className={styles.modalImageOverlay}>
                        <h2 className={styles.modalTitle}>{selectedShop.name}</h2>
                        <p className={styles.modalSubtitle}>{selectedShop.nameRomanized} • {selectedShop.year}</p>
                      </div>
                    </div>
                    
                    <div className={styles.modalBody}>
                      <div className={styles.modalSection}>
                        <h3 className={styles.modalSectionTitle}>About</h3>
                        <p className={styles.modalDescription}>{selectedShop.description}</p>
                      </div>
                      
                      <div className={styles.modalInfoGrid}>
                        <div className={styles.modalInfoItem}>
                          <h4 className={styles.modalInfoTitle}>Location</h4>
                          <p className={styles.modalInfoValue}>{selectedShop.address}</p>
                        </div>
                        
                        <div className={styles.modalInfoItem}>
                          <h4 className={styles.modalInfoTitle}>Style</h4>
                          <p className={styles.modalInfoValue}>
                            {groups.find(g => g.id === selectedShop.group)?.name || selectedShop.group}
                          </p>
                        </div>
                      </div>
                      
                      {selectedShop.specialties && selectedShop.specialties.length > 0 && (
                        <div className={styles.modalSection}>
                          <h3 className={styles.modalSectionTitle}>Specialties</h3>
                          <div className={styles.specialtiesList}>
                            {selectedShop.specialties.map((specialty, index) => (
                              <span key={index} className={styles.specialtyTag}>
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedShop.connections.length > 0 && (
                        <div className={styles.modalSection}>
                          <h3 className={styles.modalSectionTitle}>Connections</h3>
                          <div className={styles.connectionsGrid}>
                            {selectedShop.connections.map(connectionId => {
                              const connectedShop = treeData.find(s => s.id === connectionId);
                              if (!connectedShop) return null;
                              
                              return (
                                <div 
                                  key={connectionId}
                                  className={styles.connectionCard}
                                  onClick={() => handleShopClick(connectedShop)}
                                >
                                  <div 
                                    className={styles.connectionImage}
                                    style={{ backgroundImage: `url(${connectedShop.image})` }}
                                  />
                                  <div className={styles.connectionInfo}>
                                    <h4 className={styles.connectionName}>{connectedShop.name}</h4>
                                    <p className={styles.connectionYear}>{connectedShop.year}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {showMinimap && (
                <motion.div 
                  className={styles.minimap}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.minimapContainer}>
                    <svg width="150" height="150" viewBox="0 0 2000 2000" className={styles.minimapSvg}>
                      {filteredShops.map(shop => (
                        <circle
                          key={shop.id}
                          cx={shop.position.left + 60}
                          cy={shop.position.top + 60}
                          r={shop.isOrigin ? 8 : 5}
                          fill={shop.isOrigin ? '#ff4500' : (groups.find(g => g.id === shop.group)?.color || '#64748b')}
                          opacity={0.8}
                        />
                      ))}
                      
                      {connectionLines.map((line, index) => (
                        <line
                          key={index}
                          x1={line.fromX}
                          y1={line.fromY}
                          x2={line.toX}
                          y2={line.toY}
                          stroke="#64748b"
                          strokeWidth={1}
                          opacity={0.4}
                        />
                      ))}
                      
                      <rect
                        x={minimapDetails.viewBoxX}
                        y={minimapDetails.viewBoxY}
                        width={minimapDetails.viewBoxWidth}
                        height={minimapDetails.viewBoxHeight}
                        fill="none"
                        stroke="#ff4500"
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        className={styles.viewportRect}
                      />
                    </svg>
                  </div>
                  
                  <div className={styles.minimapButtons}>
                    <button 
                      className={styles.minimapButton}
                      onClick={() => handleZoom('in')}
                      aria-label="Zoom in"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button 
                      className={styles.minimapButton}
                      onClick={() => handleZoom('out')}
                      aria-label="Zoom out"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </button>
                    <button 
                      className={styles.minimapButton}
                      onClick={handleReset}
                      aria-label="Reset view"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <>
              <motion.div 
                className={styles.treeControls}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, staggerChildren: 0.1 }}
              >
                <motion.button 
                  className={styles.controlButton}
                  onClick={() => handleZoom('in')}
                  aria-label="Zoom In"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
                <motion.button 
                  className={styles.controlButton}
                  onClick={() => handleZoom('out')}
                  aria-label="Zoom Out"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </motion.button>
                <motion.button 
                  className={styles.controlButton}
                  onClick={handleReset}
                  aria-label="Reset View"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.button>
                <motion.button 
                  className={styles.controlButton}
                  onClick={() => setViewMode(viewMode === 'tree' ? 'timeline' : 'tree')}
                  aria-label="Switch View"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </motion.div>
            </>
          </div>
        ) : (
          <div className={styles.timelineView}>
            <div className={styles.timelineHeader}>
              <h2 className={styles.timelineTitle}>Ramen Evolution Timeline</h2>
              <button 
                className={styles.sortButton}
                onClick={handleSortOrderChange}
              >
                Sort by: {sortOrder === 'chronological' ? 'Date' : 'Name'} 
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.sortIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            
            <div className={styles.timelineContent}>
              {decades.map((decade, index) => (
                <div 
                  key={decade.decade}
                  className={`${styles.decadeSection} ${activeDecade === decade.decade ? styles.activeDecade : ''}`}
                >
                  <motion.div 
                    className={styles.decadeHeader}
                    onClick={() => setActiveDecade(activeDecade === decade.decade ? null : decade.decade)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className={styles.decadeTitle}>{decade.decade}</h3>
                    <div className={styles.decadeInfo}>
                      <span className={styles.shopCount}>{decade.shops.length} shops</span>
                      <svg 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        className={`${styles.decadeToggleIcon} ${activeDecade === decade.decade ? styles.decadeToggleIconActive : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {activeDecade === decade.decade && (
                      <motion.div 
                        className={styles.timelineShopGrid}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'tween', duration: 0.3 }}
                      >
                        {decade.shops.map((shop, shopIndex) => (
                          <motion.div 
                            key={shop.id}
                            className={styles.timelineShopCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: shopIndex * 0.05 }}
                            onClick={() => handleShopClick(shop)}
                            whileHover={{ 
                              y: -5, 
                              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)', 
                              transition: { duration: 0.2 } 
                            }}
                          >
                            <div 
                              className={styles.timelineShopImage}
                              style={{ backgroundImage: `url(${shop.image})` }}
                            >
                              <div className={styles.timelineShopYear}>{shop.year}</div>
                            </div>
                            <div className={styles.timelineShopContent}>
                              <h4 className={styles.timelineShopName}>{shop.name}</h4>
                              <p className={styles.timelineShopRomanized}>{shop.nameRomanized}</p>
                              <p className={styles.timelineShopDescription}>
                                {shop.description.length > 80 
                                  ? `${shop.description.substring(0, 80)}...` 
                                  : shop.description
                                }
                              </p>
                              <div className={styles.timelineShopFooter}>
                                <div 
                                  className={styles.timelineShopGroup}
                                  style={{ 
                                    backgroundColor: (groups.find(g => g.id === shop.group)?.color || '#64748b') + '33',
                                    color: groups.find(g => g.id === shop.group)?.color || '#64748b' 
                                  }}
                                >
                                  {groups.find(g => g.id === shop.group)?.name || shop.group}
                                </div>
                                <button className={styles.viewDetailsButton}>
                                  View Details
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <motion.footer 
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className={styles.footerText}>
          Interactive Ie-kei Ramen Family Tree • Explore the evolution of Yokohama&apos;s iconic ramen style
        </p>
        <div className={styles.footerButtons}>
          <motion.div whileHover={{ scale: 1.05, color: '#ff4500' }}>
            <a href="#" className={styles.footerButton}>About</a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, color: '#ff4500' }}>
            <a href="#" className={styles.footerButton}>Resources</a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, color: '#ff4500' }}>
            <a href="#" className={styles.footerButton}>Contact</a>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}