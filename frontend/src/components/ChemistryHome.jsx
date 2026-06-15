import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";


const ChemistryHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const chemistryExperiments = EXPERIMENT_CATALOG.filter(
    (experiment) =>
      experiment.subject === "chemistry" &&
      experiment.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        subject="chemistry"
        title="Chemistry Virtual Lab"
        description="Mix chemicals, observe reactions, and learn about molecular structures in a completely safe, state-of-the-art virtual environment."
        experiments={chemistryExperiments}
        colorTheme={{
          bg: "bg-emerald-500",
          text: "text-emerald-500",
          border: "border-emerald-500/20",
          hoverBorder: "hover:border-emerald-500/50",
          gradientLight: "from-emerald-50 to-teal-50",
          gradientDark: "from-emerald-950/40 to-teal-950/40"
        }}
      />
    </div>
  );
};

export default ChemistryHome;
