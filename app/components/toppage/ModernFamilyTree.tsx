"use client";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
  lineage?: string;
  group?: string;
}

interface Link {
  source: string;
  target: string;
}

interface ModernFamilyTreeProps {
  nodes: Node[];
  links: Link[];
  activeJourney?: string | null;
  previewedJourney?: string | null;
}

const GROUP_COLORS: Record<string, string> = {
  "origin": "#FF4500",
  "direct": "#1E90FF",
  "odo": "#9C27B0",
  "classic": "#FF9800",
  "musashi": "#00BCD4",
  "ichiroku": "#E91E63",
  "capital": "#607D8B",
  "default": "#999"
};

const GROUP_LABELS: Record<string, string> = {
  "origin": "発祥（吉村家）",
  "direct": "直系システム",
  "odo": "王道家グループ",
  "classic": "クラシック系",
  "musashi": "武蔵家系",
  "ichiroku": "壱六家系",
  "capital": "資本系",
  "default": "その他"
};

const WIDTH = 1200;
const HEIGHT = 600;

const ModernFamilyTree: React.FC<ModernFamilyTreeProps> = ({ nodes, links, activeJourney, previewedJourney }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // SVG background gradient
    svg.append("defs")
      .append("linearGradient")
      .attr("id", "bg-gradient")
      .attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#fffbe7" },
        { offset: "100%", color: "#f3f6ff" }
      ])
      .enter()
      .append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);
    svg.append("rect")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("fill", "url(#bg-gradient)");

    // Zoom and pan
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 2])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
    );

    // Main group
    const g = svg.append("g");

    // D3 simulation (tweaked for less overlap)
    const sim = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links as any).id((d: any) => d.id).distance(160).strength(0.7))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force("collision", d3.forceCollide().radius(48));

    // Draw links (color by source group)
    const link = g.append("g")
      .attr("stroke-width", 3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        const source = nodes.find(n => n.id === (typeof d.source === 'object' ? (d.source as any).id : d.source));
        return GROUP_COLORS[source?.group ?? "default"];
      })
      .attr("opacity", 0.25);

    // Draw nodes
    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 28)
      .attr("fill", d => {
        // Highlight nodes if activeJourney or previewedJourney is set
        const journey = activeJourney || previewedJourney;
        if (journey === 'direct-lineage') {
          if (d.group === 'direct' || d.group === 'origin') {
            return '#FFD700'; // gold highlight for direct lineage
          }
          return '#E0E0E0'; // dim others
        }
        return GROUP_COLORS[d.group ?? "default"];
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .style("filter", "drop-shadow(0 2px 8px #0002)")
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke", "#222")
          .attr("stroke-width", 7)
          .transition().duration(150)
          .attr("r", 34);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 4)
          .transition().duration(150)
          .attr("r", 28);
      })
      .on("click", (_, d) => setSelected(d));

    // Node labels
    const label = g.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.name)
      .attr("font-size", 15)
      .attr("font-family", "inherit")
      .attr("fill", d => {
        const journey = activeJourney || previewedJourney;
        if (journey === 'direct-lineage') {
          if (d.group === 'direct' || d.group === 'origin') {
            return '#B8860B'; // dark gold for highlighted
          }
          return '#BBB'; // dim others
        }
        return '#222';
      })
      .attr("text-anchor", "middle")
      .attr("dy", 44)
      .style("pointer-events", "none");

    sim.on("tick", () => {
      link
        .attr("x1", d => (typeof d.source === 'object' ? (d.source as any).x : (nodes.find(n => n.id === d.source) as any)?.x))
        .attr("y1", d => (typeof d.source === 'object' ? (d.source as any).y : (nodes.find(n => n.id === d.source) as any)?.y))
        .attr("x2", d => (typeof d.target === 'object' ? (d.target as any).x : (nodes.find(n => n.id === d.target) as any)?.x))
        .attr("y2", d => (typeof d.target === 'object' ? (d.target as any).y : (nodes.find(n => n.id === d.target) as any)?.y));
      node
        .attr("cx", d => (d as any).x)
        .attr("cy", d => (d as any).y);
      label
        .attr("x", d => (d as any).x)
        .attr("y", d => (d as any).y);
    });

    return () => { sim.stop(); };
  }, [nodes, links, activeJourney, previewedJourney]);

  // Legend
  const legendItems = Object.keys(GROUP_COLORS).filter(key => key !== "default");

  return (
    <div style={{ width: "100%", height: HEIGHT, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001", position: "relative" }}>
      <svg ref={svgRef} width={WIDTH} height={HEIGHT} style={{ display: "block", width: "100%", height: HEIGHT }} />
      {/* Floating legend */}
      <div style={{
        position: "absolute", right: 32, top: 32, background: "rgba(255,255,255,0.95)", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 16, zIndex: 20, minWidth: 160
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>系統一覧</div>
        {legendItems.map(key => (
          <div key={key} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
            <span style={{
              display: "inline-block", width: 18, height: 18, borderRadius: 9, background: GROUP_COLORS[key], marginRight: 10, border: "2px solid #fff", boxShadow: "0 1px 4px #0001"
            }} />
            <span style={{ fontSize: 15 }}>{GROUP_LABELS[key]}</span>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{
          position: "absolute", left: 40, top: 40, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0002", padding: 24, minWidth: 220, zIndex: 10
        }}>
          <h3 style={{ margin: 0 }}>{selected.name}</h3>
          <p style={{ margin: "8px 0 0 0", color: "#888" }}>系統: {GROUP_LABELS[selected.group ?? "default"]}</p>
          <p style={{ margin: "8px 0 0 0", color: "#888" }}>Lineage: {selected.lineage || "N/A"}</p>
          <button style={{ marginTop: 16 }} onClick={() => setSelected(null)}>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default ModernFamilyTree; 