import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FieldDependencyGraph } from '@/types/reportFieldTypes';
import styles from './FieldDependencyGraph.module.css';

interface FieldDependencyGraphProps {
  graph: FieldDependencyGraph;
  onNodeClick: (id: string) => void;
}

const FieldDependencyGraph: React.FC<FieldDependencyGraphProps> = ({
  graph,
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || graph.nodes.length === 0) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Создаем симуляцию
    const simulation = d3.forceSimulation(graph.nodes)
      .force('link', d3.forceLink(graph.links).id(d => (d as any).id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));
    
    // Создаем линии связей
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke', d => d.type === 'calculated' ? '#ff6b6b' : '#4dabf7')
      .attr('stroke-width', 1.5);
    
    // Создаем узлы
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', d => {
        switch (d.type) {
          case 'calculated': return '#ff6b6b';
          case 'number': return '#4dabf7';
          case 'string': return '#51cf66';
          default: return '#adb5bd';
        }
      })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => onNodeClick(d.id));
    
    // Добавляем подписи
    const label = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(graph.nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -15)
      .text(d => d.name)
      .style('font-size', '10px')
      .style('fill', '#495057');
    
    // Обновление позиций
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);
      
      node
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);
      
      label
        .attr('x', d => (d as any).x)
        .attr('y', d => (d as any).y);
    });
    
    // Функции для drag & drop
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return () => {
      simulation.stop();
    };
  }, [graph]);
  
  return (
    <div className={styles.container}>
      <h3>Field Dependency Visualization</h3>
      <svg ref={svgRef} className={styles.graph} width="100%" height="400px">
        <defs>
          <marker 
            id="arrow" 
            markerWidth="10" 
            markerHeight="10" 
            refX="9" 
            refY="3" 
            orient="auto" 
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#4dabf7" />
          </marker>
          <marker 
            id="arrow-calculated" 
            markerWidth="10" 
            markerHeight="10" 
            refX="9" 
            refY="3" 
            orient="auto" 
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#ff6b6b" />
          </marker>
        </defs>
      </svg>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.colorBox} ${styles.number}`}></div>
          <span>Number Field</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorBox} ${styles.string}`}></div>
          <span>String Field</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorBox} ${styles.calculated}`}></div>
          <span>Calculated Field</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.lineSample} ${styles.direct}`}></div>
          <span>Direct Dependency</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.lineSample} ${styles.calculated}`}></div>
          <span>Calculated Dependency</span>
        </div>
      </div>
    </div>
  );
};

export default FieldDependencyGraph;