import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";

const BiologyHome = () => {
  const [biologyExperiments, setBiologyExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data load
    setTimeout(() => {
      const filtered = EXPERIMENT_CATALOG.filter(
        (experiment) => experiment.subject === "biology"
      );
      setBiologyExperiments(filtered);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
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
  );
};

export default BiologyHome;
