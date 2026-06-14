import { useState } from "react";
import { Link } from "react-router-dom";
import { EXPERIMENT_CATALOG } from "../data/experiments";
import GraphExplorer from "../components/GraphExplorer";
import BackButton from "../components/BackButton";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useProgress } from "../context/ProgressContext";

const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const { completedIds } = useProgress();

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] flex flex-col fade-in">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <BackButton label="Back to Lab" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">Scientific Knowledge Graph</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg max-w-2xl">
            Explore the interconnected world of science. Click on a node to view its prerequisites and dive into the experiment.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[500px]">
        {/* Graph Container */}
        <div className="flex-1 relative rounded-3xl h-[500px] lg:h-auto">
          <GraphExplorer catalog={EXPERIMENT_CATALOG} onNodeClick={handleNodeClick} />
        </div>

        {/* Details Panel */}
        {selectedNode && (
          <div className="w-full lg:w-96 flex-shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl flex flex-col overflow-y-auto animate-fade-in relative h-fit lg:max-h-full">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="mb-6 mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 ${
                selectedNode.subject === 'biology' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                selectedNode.subject === 'chemistry' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {selectedNode.subject}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                {selectedNode.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="space-y-6 flex-1">
              {/* Status */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Status</h3>
                {completedIds.has(selectedNode.id) ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 rounded-xl text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Completed
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-2 rounded-xl text-sm font-bold">
                    <AlertCircle className="w-5 h-5" /> Pending Exploration
                  </div>
                )}
              </div>

              {/* Concepts */}
              {selectedNode.concepts?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Core Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.concepts.map(c => (
                      <span key={c} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {selectedNode.prerequisites?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Prerequisites</h3>
                  <div className="space-y-2">
                    {selectedNode.prerequisites.map(pId => {
                      const prereq = EXPERIMENT_CATALOG.find(e => e.id === pId);
                      const isDone = completedIds.has(pId);
                      return (
                        <div key={pId} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate mr-2">{prereq?.title}</span>
                          {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link 
                to={selectedNode.link}
                className="w-full flex items-center justify-center py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black tracking-wide transition-all shadow-lg hover:shadow-indigo-500/25"
              >
                Launch Lab <span className="ml-2 text-xl leading-none">&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
