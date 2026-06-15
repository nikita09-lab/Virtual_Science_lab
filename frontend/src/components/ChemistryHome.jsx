import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";

const ChemistryHome = () => {
  const [chemistryExperiments, setChemistryExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data load
    setTimeout(() => {
      const filtered = EXPERIMENT_CATALOG.filter(
        (experiment) => experiment.subject === "chemistry"
      );
      setChemistryExperiments(filtered);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
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
  );
};

export default ChemistryHome;
