import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";

const PhysicsHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const physicsExperiments = EXPERIMENT_CATALOG.filter(
    (experiment) =>
      experiment.subject === "physics" &&
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
        subject="physics"
        title="Physics Virtual Lab"
        description="Dive into interactive 3D simulations of motion, forces, and electromagnetism. Master the fundamental laws of the universe through hands-on experiments."
        experiments={physicsExperiments}
        colorTheme={{
          bg: "bg-blue-500",
          text: "text-blue-500",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/50",
          gradientLight: "from-blue-50 to-indigo-50",
          gradientDark: "from-blue-950/40 to-indigo-950/40"
        }}
      />
    </div>
  );
};

export default PhysicsHome;
