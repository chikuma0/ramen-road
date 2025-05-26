'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './FamilyTree.module.css';
import { ShopNode, ShopLink, groupColors } from './tree-data';

interface FamilyTreeVisualProps {
  nodes: ShopNode[];
  links: ShopLink[];
  onNodeClick?: (node: ShopNode) => void;
}

const FamilyTreeVisual: React.FC<FamilyTreeVisualProps> = ({ nodes, links, onNodeClick }) => {
  console.log('FamilyTreeVisual nodes:', nodes);
  console.log('FamilyTreeVisual links:', links);

  const canvasRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<{ node: ShopNode, x: number, y: number } | null>(null);
  const [nodeElements, setNodeElements] = useState<React.ReactNode[]>([]);
  const [connectionLines, setConnectionLines] = useState<React.ReactNode[]>([]);

  // Calculate node positions in a force-directed layout
  useEffect(() => {
    if (!nodes || !links) return;

    // Simple force-directed layout algorithm
    const width = 2000;
    const height = 1500;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create a map of node positions
    const nodePositions = new Map<string, { x: number, y: number }>();
    
    // Initialize with random positions
    nodes.forEach(node => {
      // Position origin node in center
      if (node.isOrigin) {
        nodePositions.set(node.id, { x: centerX, y: centerY });
      } else {
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 400;
        nodePositions.set(node.id, { 
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance
        });
      }
    });

    // Run several iterations of force-directed algorithm
    const iterations = 50;
    const k = 200; // Optimal distance
    
    for (let i = 0; i < iterations; i++) {
      // Calculate repulsive forces
      nodes.forEach(node1 => {
        let fx = 0;
        let fy = 0;
        
        nodes.forEach(node2 => {
          if (node1.id === node2.id) return;
          
          const pos1 = nodePositions.get(node1.id)!;
          const pos2 = nodePositions.get(node2.id)!;
          
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance === 0) return;
          
          // Repulsive force
          const force = k * k / distance;
          fx += (dx / distance) * force;
          fy += (dy / distance) * force;
        });
        
        // Update position based on repulsive forces
        const pos = nodePositions.get(node1.id)!;
        nodePositions.set(node1.id, {
          x: pos.x + fx * 0.05,
          y: pos.y + fy * 0.05
        });
      });
      
      // Calculate attractive forces (for links)
      links.forEach(link => {
        const sourcePos = nodePositions.get(link.source)!;
        const targetPos = nodePositions.get(link.target)!;
        
        const dx = sourcePos.x - targetPos.x;
        const dy = sourcePos.y - targetPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return;
        
        // Attractive force
        const force = distance * distance / k;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        // Move source toward target
        nodePositions.set(link.source, {
          x: sourcePos.x - fx * 0.05,
          y: sourcePos.y - fy * 0.05
        });
        
        // Move target toward source
        nodePositions.set(link.target, {
          x: targetPos.x + fx * 0.05,
          y: targetPos.y + fy * 0.05
        });
      });
      
      // Keep origin node fixed at center if it exists
      const originNode = nodes.find(node => node.isOrigin);
      if (originNode) {
        nodePositions.set(originNode.id, { x: centerX, y: centerY });
      }
    }

    // Create node elements based on calculated positions
    const nodeElems = nodes.map(node => {
      const pos = nodePositions.get(node.id)!;
      const style = {
        transform: `translate(${pos.x - 60}px, ${pos.y - 60}px)`, // Center the node
      };

      const handleNodeClick = () => {
        if (onNodeClick) onNodeClick(node);
      };

      const handleMouseEnter = () => {
        setTooltip({
          node,
          x: pos.x,
          y: pos.y - 80
        });
      };

      const handleMouseLeave = () => {
        setTooltip(null);
      };

      return (
        <div
          key={node.id}
          className={`${styles.shopNode} ${node.isOrigin ? styles.originNode : ''}`}
          style={style}
          onClick={handleNodeClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={styles.shopNodeImage} 
            style={{ backgroundImage: `url(${node.image || ''})` }}
          />
          <div className={styles.shopNodeContent}>
            <h3 className={styles.shopNodeTitle}>{node.name}</h3>
            <p className={styles.shopNodeYear}>{node.year}</p>
          </div>
        </div>
      );
    });
    
    setNodeElements(nodeElems);

    // Create SVG connection lines
    const connections = links.map((link, index) => {
      const sourcePos = nodePositions.get(link.source)!;
      const targetPos = nodePositions.get(link.target)!;

      // Different styles for different connection types
      let strokeColor = "#ffffff30";
      let strokeWidth = 2;
      let dashArray = "";
      
      switch(link.type) {
        case "direct":
          strokeColor = "#ff4500";
          strokeWidth = 3;
          break;
        case "branch":
          strokeColor = "#4f8eff";
          strokeWidth = 2;
          dashArray = "5,5";
          break;
        case "inspiration":
          strokeColor = "#ffffff50";
          strokeWidth = 2;
          dashArray = "3,3";
          break;
      }
      
      return (
        <svg 
          key={`${link.source}-${link.target}`} 
          className={styles.connections}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <line
            x1={sourcePos.x}
            y1={sourcePos.y}
            x2={targetPos.x}
            y2={targetPos.y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
          />
          
          {/* Animated particles along the line */}
          {[...Array(3)].map((_, i) => {
            const delay = i * 2; // seconds
            const duration = 6; // seconds
            
            return (
              <circle
                key={`particle-${index}-${i}`}
                cx={sourcePos.x}
                cy={sourcePos.y}
                r={3}
                fill="#fff"
                opacity={0.7}
                style={{
                  animation: `moveAlongPath${index} ${duration}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
          
          <style>
            {`
              @keyframes moveAlongPath${index} {
                0% {
                  cx: ${sourcePos.x}px;
                  cy: ${sourcePos.y}px;
                }
                100% {
                  cx: ${targetPos.x}px;
                  cy: ${targetPos.y}px;
                }
              }
            `}
          </style>
        </svg>
      );
    });
    
    setConnectionLines(connections);
    
  }, [nodes, links, onNodeClick]);

  // Handle dragging & zooming of the graph
  useEffect(() => {
    if (!canvasRef.current || !graphRef.current) return;

    const handleMouseDown = (e: MouseEvent) => {
      setDragging(true);
      setStartPoint({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      
      const newX = e.clientX - startPoint.x;
      const newY = e.clientY - startPoint.y;
      
      setPosition({ x: newX, y: newY });
      
      if (graphRef.current) {
        graphRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(${scale})`;
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.max(0.5, Math.min(scale + delta, 2));
      
      setScale(newScale);
      
      if (graphRef.current) {
        graphRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${newScale})`;
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [dragging, position, scale, startPoint]);

  // Center the graph initially
  useEffect(() => {
    if (!canvasRef.current || !graphRef.current) return;
    
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    
    const centerX = canvas.clientWidth / 2 - graph.clientWidth / 2;
    const centerY = canvas.clientHeight / 2 - graph.clientHeight / 2;
    
    setPosition({ x: centerX, y: centerY });
    graph.style.transform = `translate(${centerX}px, ${centerY}px) scale(${scale})`;
  }, [scale, nodeElements.length]);

  // Create particles for background effect
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const particleCount = 50;
    const particleElems = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 10;
      const startX = Math.random() * 100; // percent
      const startY = Math.random() * 100; // percent
      const endX = (Math.random() - 0.5) * 30; // percent movement
      const endY = (Math.random() - 0.5) * 30; // percent movement
      
      particleElems.push(
        <div
          key={`particle-${i}`}
          className={styles.particle}
          style={{
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random() * 0.5 + 0.1,
            '--duration': `${duration}s`,
            '--delay': `${delay}s`,
            '--end-x': `${endX}vw`,
            '--end-y': `${endY}vh`,
          } as React.CSSProperties}
        />
      );
    }
    
    setParticles(particleElems);
  }, []);

  return (
    <div>
      <div style={{color: 'red', fontWeight: 'bold', padding: 20, fontSize: 24}}>FAMILY TREE VISUAL RENDERED</div>
    <div className={styles.content}>
      {/* Background particles */}
      {particles}
      {/* Main canvas for interaction */}
      <div 
        ref={canvasRef}
        className={`${styles.canvas} ${dragging ? styles.canvasActive : ''}`}
      >
        {/* Tree Graph */}
        <div 
          ref={graphRef}
          className={styles.treeGraph}
          style={{ width: '2000px', height: '1500px' }}
        >
          {/* Connection lines between nodes */}
          {connectionLines}
          {/* Shop nodes */}
          {nodeElements}
        </div>
      </div>
      {/* Tooltip */}
      {tooltip && (
        <div 
          className={styles.tooltip} 
          style={{ left: `calc(50% + ${position.x + tooltip.x * scale}px)`, top: `${position.y + tooltip.y * scale}px` }}
        >
          {tooltip.node.nameRomanized} ({tooltip.node.year})
          <div className={styles.tooltipArrow}></div>
        </div>
      )}
      {/* Controls */}
      <div className={styles.treeControls}>
        <button 
          className={styles.controlButton}
          onClick={() => {
            const newScale = Math.min(scale + 0.1, 2);
            setScale(newScale);
            if (graphRef.current) {
              graphRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${newScale})`;
            }
          }}
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          className={styles.controlButton}
          onClick={() => {
            const newScale = Math.max(scale - 0.1, 0.5);
            setScale(newScale);
            if (graphRef.current) {
              graphRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${newScale})`;
            }
          }}
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
        <button 
          className={styles.controlButton}
          onClick={() => {
            if (!canvasRef.current || !graphRef.current) return;
            const canvas = canvasRef.current;
            const graph = graphRef.current;
            const centerX = canvas.clientWidth / 2 - graph.clientWidth / 2;
            const centerY = canvas.clientHeight / 2 - graph.clientHeight / 2;
            setPosition({ x: centerX, y: centerY });
            setScale(1);
            graph.style.transform = `translate(${centerX}px, ${centerY}px) scale(1)`;
          }}
          aria-label="Reset view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      {/* Minimap */}
      <div className={styles.minimap}>
        <div className={styles.minimapContainer}>
          <svg className={styles.minimapSvg}>
            {/* Miniature version of the graph */}
            {links.map(link => {
              const source = nodes.find(n => n.id === link.source);
              const target = nodes.find(n => n.id === link.target);
              if (!source || !target) return null;
              return (
                <line
                  key={`minimap-${link.source}-${link.target}`}
                  x1={`${(source.val || 0) * 5}%`}
                  y1={`${(source.val || 0) * 5}%`}
                  x2={`${(target.val || 0) * 5}%`}
                  y2={`${(target.val || 0) * 5}%`}
                  stroke="#ffffff30"
                  strokeWidth={1}
                />
              );
            })}
            {nodes.map(node => (
              <circle
                key={`minimap-${node.id}`}
                cx={`${(node.val || 0) * 5}%`}
                cy={`${(node.val || 0) * 5}%`}
                r={node.isOrigin ? 4 : 2}
                fill={groupColors[node.group] || "#ffffff"}
              />
            ))}
            {/* Viewport rectangle */}
            <rect
              className={styles.viewportRect}
              x="30%"
              y="30%"
              width="40%"
              height="40%"
            />
          </svg>
        </div>
        <div className={styles.minimapButtons}>
          <button className={styles.minimapButton} aria-label="Zoom to top-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button className={styles.minimapButton} aria-label="Zoom to top-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className={styles.minimapButton} aria-label="Zoom to bottom-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTreeVisual;