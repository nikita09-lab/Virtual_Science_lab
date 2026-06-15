import { EXPERIMENT_CATALOG } from "../data/experiments";
import SubjectDashboard from "./SubjectDashboard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState, useEffect } from "react";

const PhysicsHome = () => {
  const [physicsExperiments, setPhysicsExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data load
    setTimeout(() => {
      const filtered = EXPERIMENT_CATALOG.filter(
        (experiment) => experiment.subject === "physics"
      );
      setPhysicsExperiments(filtered);
      setLoading(false);
    }, 1000); // 1s delay for demo
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
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
  );
};

export default PhysicsHome;
