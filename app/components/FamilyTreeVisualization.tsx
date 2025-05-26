import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RamenNode {
  name: string;
  children?: RamenNode[];
}

const FamilyTreeVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Mock data for the family tree
    const data: RamenNode = {
      name: 'Ramen',
      children: [
        {
          name: 'Shoyu Ramen',
          children: [
            { name: 'Tokyo Shoyu' },
            { name: 'Hakata Shoyu' }
          ]
        },
        {
          name: 'Miso Ramen',
          children: [
            { name: 'Sapporo Miso' },
            { name: 'Nagoya Miso' }
          ]
        },
        {
          name: 'Tonkotsu Ramen',
          children: [
            { name: 'Fukuoka Tonkotsu' },
            { name: 'Kumamoto Tonkotsu' }
          ]
        }
      ]
    };

    // Set up the SVG dimensions
    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add custom SVG background (ramen-themed)
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#ramen-pattern)');

    // Define the ramen pattern
    const defs = svg.append('defs');
    const pattern = defs.append('pattern')
      .attr('id', 'ramen-pattern')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 100)
      .attr('height', 100);

    // Add a simple ramen bowl shape to the pattern
    pattern.append('path')
      .attr('d', 'M50,20 L80,50 L50,80 L20,50 Z')
      .attr('fill', 'none')
      .attr('stroke', '#FFA500')
      .attr('stroke-width', 2);

    // Create a hierarchical layout
    const hierarchy = d3.hierarchy<RamenNode>(data);
    const treeLayout = d3.tree<RamenNode>().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    // Create links
    const linkGenerator = d3.linkHorizontal<d3.HierarchyPointLink<RamenNode>, d3.HierarchyPointNode<RamenNode>>()
      .x(d => d.y)
      .y(d => d.x);

    svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Create nodes
    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Add circles to nodes
    nodes.append('circle')
      .attr('r', 10)
      .attr('fill', '#FFA500')
      .attr('stroke', '#FF4500')
      .attr('stroke-width', 2)
      .on('mouseover', function() {
        d3.select(this).attr('r', 15).attr('fill', '#FFD700');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 10).attr('fill', '#FFA500');
      });

    // Add labels to nodes
    nodes.append('text')
      .attr('dy', '.31em')
      .attr('x', d => d.children ? -13 : 13)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#333');

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default FamilyTreeVisualization; 