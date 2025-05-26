'use client';
import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TopPageShopNode, ShopLink, TreeState } from '../../types/toppage-tree';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '../shared/Modal';
import { Button } from '../shared/Button';
import styles from './FamilyTreeVisualization.module.css';

interface FamilyTreeVisualizationProps {
  nodes: TopPageShopNode[];
  links: ShopLink[];
}

interface SimulationNode extends TopPageShopNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationLink {
  source: SimulationNode;
  target: SimulationNode;
  strength: number;
}

const FamilyTreeVisualization: FC<FamilyTreeVisualizationProps> = ({ nodes, links }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<TopPageShopNode | null>(null);
  const [treeState, setTreeState] = useState<TreeState>({
    nodes,
    links,
    nodeMap: new Map(nodes.map(node => [node.id, node])),
    linkMap: new Map(links.map(link => [`${link.source}-${link.target}`, link])),
    viewport: { x: 0, y: 0, width: 0, height: 0 },
    zoom: 1,
    center: { x: 0, y: 0 }
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create SVG
    const svg = d3.select<HTMLDivElement, unknown>(container)
      .append<SVGSVGElement>('svg')
      .attr('width', width)
      .attr('height', height);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setTreeState(prev => ({
          ...prev,
          zoom: event.transform.k,
          center: { x: event.transform.x, y: event.transform.y }
        }));
      });

    svg.call(zoom);

    // Create main group for all elements
    const g = svg.append('g');

    // Convert links to simulation format
    const simulationNodes = nodes as SimulationNode[];
    const simulationLinks: SimulationLink[] = links.map(link => {
      const sourceNode = simulationNodes.find(n => n.id === link.source);
      const targetNode = simulationNodes.find(n => n.id === link.target);
      if (!sourceNode || !targetNode) {
        throw new Error(`Invalid link: ${link.source}-${link.target}`);
      }
      return {
        source: sourceNode,
        target: targetNode,
        strength: link.strength
      };
    });

    // Create force simulation
    const simulation = d3.forceSimulation<SimulationNode>()
      .nodes(simulationNodes)
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(simulationLinks).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const link = g.append('g')
      .selectAll<SVGLineElement, SimulationLink>('line')
      .data(simulationLinks)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.strength) * 2);

    // Create nodes
    const node = g.append('g')
      .selectAll<SVGCircleElement, SimulationNode>('circle')
      .data(simulationNodes)
      .join('circle')
      .attr('r', d => d.importance === 1 ? 10 : d.importance === 2 ? 8 : 6)
      .attr('fill', d => {
        switch (d.lineage) {
          case 'ie-kei': return '#FF4500';
          case 'tonkotsu': return '#7D9E82';
          case 'shoyu': return '#D4A762';
          case 'miso': return '#F2E2C4';
          default: return '#999';
        }
      })
      .call(d3.drag<SVGCircleElement, SimulationNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add node labels
    const label = g.append('g')
      .selectAll<SVGTextElement, SimulationNode>('text')
      .data(simulationNodes)
      .join('text')
      .text(d => d.name)
      .attr('font-size', 10)
      .attr('dx', 12)
      .attr('dy', 4);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x || 0)
        .attr('y1', d => d.source.y || 0)
        .attr('x2', d => d.target.x || 0)
        .attr('y2', d => d.target.y || 0);

      node
        .attr('cx', d => d.x || 0)
        .attr('cy', d => d.y || 0);

      label
        .attr('x', d => d.x || 0)
        .attr('y', d => d.y || 0);
    });

    // Add click handler for nodes
    node.on('click', (event, d) => {
      setSelectedNode(d);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
      svg.remove();
    };
  }, [nodes, links]);

  return (
    <div className={styles.container} ref={containerRef}>
      <Modal isOpen={!!selectedNode} onClose={() => setSelectedNode(null)}>
        {selectedNode && (
          <>
            <ModalHeader>
              <ModalTitle>{selectedNode.name}</ModalTitle>
              <ModalDescription>
                {selectedNode.foundingYear && `Founded in ${selectedNode.foundingYear}`}
              </ModalDescription>
            </ModalHeader>
            <ModalContent>
              <div className={styles.shopDetails}>
                <p>Type: {selectedNode.type}</p>
                <p>Lineage: {selectedNode.lineage}</p>
                <p>Status: {selectedNode.status}</p>
              </div>
              {selectedNode.journeys && selectedNode.journeys.length > 0 && (
                <div className={styles.journeys}>
                  <h3>Available Journeys</h3>
                  <ul>
                    {selectedNode.journeys.map(journey => (
                      <li key={journey.id}>
                        {journey.title}
                        {journey.isPremium && <span className={styles.premiumBadge}>Premium</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ModalContent>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setSelectedNode(null)}>
                Close
              </Button>
              {selectedNode.journeys && selectedNode.journeys.length > 0 && (
                <Button>Start Journey</Button>
              )}
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FamilyTreeVisualization; 