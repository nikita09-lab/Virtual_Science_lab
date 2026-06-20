import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";

const BiologyHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const biologyExperiments = EXPERIMENT_CATALOG.filter(
    (experiment) =>
      experiment.subject === "biology" &&
      experiment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search experiments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        )}
      </div>

      <SubjectDashboard
        subject="biology"
        title="Biology Virtual Lab"
        description="Explore the anatomy of living organisms, cells, and organs in stunning 3D. Discover the building blocks of life through interactive exploration."
        experiments={biologyExperiments}
        colorTheme={{
          bg: "bg-rose-500",
          text: "text-rose-500",
          border: "border-rose-500/20",
          hoverBorder: "hover:border-rose-500/50",
          gradientLight: "from-rose-50 to-pink-50",
          gradientDark: "from-rose-950/40 to-pink-950/40"
        }}
      />
    </div>
  );
};

export default BiologyHome;