import { useMemo, useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useTheme } from "../context/ThemeContext";

const GraphExplorer = ({ catalog, onNodeClick }) => {
  const fgRef = useRef();
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];

    // Add Subject Nodes (Central Hubs)
    const subjects = [...new Set(catalog.map(exp => exp.subject))];
    subjects.forEach(subject => {
      nodes.push({
        id: subject,
        name: subject.charAt(0).toUpperCase() + subject.slice(1),
        group: "subject",
        val: 15
      });
    });

    // Add Experiment Nodes
    catalog.forEach(exp => {
      nodes.push({
        id: exp.id,
        name: exp.title,
        group: exp.subject,
        val: 8,
        data: exp
      });
      
      // Link experiment to its subject hub
      links.push({
        source: exp.subject,
        target: exp.id,
        color: 'rgba(150, 150, 150, 0.2)'
      });

      // Link to prerequisites
      exp.prerequisites.forEach(prereq => {
        links.push({
          source: prereq,
          target: exp.id,
          color: 'rgba(100, 100, 255, 0.5)'
        });
      });
    });

    return { nodes, links };
  }, [catalog]);

  const getNodeColor = (node) => {
    if (node.group === "subject") return theme === "dark" ? "#f8fafc" : "#0f172a";
    if (node.group === "biology") return "#f43f5e"; // rose-500
    if (node.group === "chemistry") return "#10b981"; // emerald-500
    if (node.group === "physics") return "#3b82f6"; // blue-500
    return "#8b5cf6"; // violet
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-200);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 shadow-inner">
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeRelSize={1}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkWidth={1.5}
        linkColor={link => link.color}
        onNodeClick={(node) => {
          if (node.group !== "subject") {
            onNodeClick(node.data);
          }
        }}
        backgroundColor={theme === "dark" ? "transparent" : "#f8fafc"}
      />
    </div>
  );
};

export default GraphExplorer;
